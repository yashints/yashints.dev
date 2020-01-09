---
path: '/clipboard-api/'
author: Yaser Adel Mehraban
date: 2020-01-09
title: "Get to know the Clipboard API, be smarter with user interactions 📋"
popular: true
tags: [webdev, showdev, clipboardapi]
---
 
We face many situations in which we need to interact with user's clipboard. Up until recently, browsers were using `document.execCommand` for clipboard interactions. It sounded great and it was (and still is) widely supported way to copy, cut, and paste into web apps, but the catch was that clipboard access is asynchronous and can just write to DOM.

<!--more-->

## Background

The fact that clipboard access is asynchronous means the user experience was suffering because a clipboard transfer was happening. This got worst when pasting because in most cases you need to sanitise the content can be safely processed. 

It even got worst when permissions got into the equation, or the browser had to copy information from a link in the text and page had to wait for a network request, so the usage wasn't that widespread.

## Clipboard API

It was all sad and gloomy until the new [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) was born. This API is a replacement for `document.execCommand` based copy and pasting that has a well defined permissions model and doesn't block the page.

This API is a property of the `window.navigator` and is constructed from below properties and methods:

* `read()`
* `readText()`
* `write(data)`
* `writeText(text)`
* `addEventListener(event, handler)`
* `removeEventListener(event, handler)`
* `dispatchEvent(event)`

To detect whether the feature is supported in the browser or not you can do:

```js
if (navigator.clipboard) {
  // yep, happy coding.
} else {
  // oh no 😢. Use execCommand for now
}
```

In addition to that goodness, it can also read from and write to system clipboard 😍. Access to clipboard is behind [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API), which means without user's permission none of these operations are permitted.

## Copy text to clipboard

Text can be copied to the clipboard by calling the `writeText` method. This function returns a promise that will be resolved or rejected based on how the operation was performed.

```js
navigator.clipboard.writeText('I am writing to clipboard 📋')
  .then(() => {
    console.log('Woohoo');
  })
  .catch(err => {    
    console.error('Oh no: ', err);
  });
```

On of the reasons the catch function might be called is that the permission is not granted by the user or they deny it.

You can use an `async` function and `await`:

```js
async function writeTextToClipboard() {
  try {
    await navigator.clipboard.writeText('I am writing to clipboard 📋');
    console.log('Woohoo');  
  } catch (err) {
    console.error('Oh no: ', err);
  }
}
```

## Read from clipboard

To read the copied text from clipboard, you can use the `readText` method and wait for the returned promise:

```js
navigator.clipboard.readText()
  .then(text => {
    console.log('Pasted content: ', text);
  })
  .catch(err => {
    console.error('Oh no: ', err);
  });
```

And with `async/await`:

```js
async function getCopiedTextFromClioboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Oh no: ', err);
  }
}
```

Let's see this in a demo.

<iframe height="265" style="width: 100%;" scrolling="no" title="Clipboard API Demo" src="https://codepen.io/yashints/embed/preview/oNgqbaX?height=265&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/oNgqbaX'>Clipboard API Demo</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Notice you had to give permission for it to work.

## Handling paste

You can hook up to the (surprise) `paste` event on the `document` to be able to receive the text when it's copied into clipboard and a paste action is triggered by user agent. If you want to modify the received data, you need to prevent the event from bubbling up.

```js
document.addEventListener('paste', async (e) => {
  e.preventDefault(); // need to do something with the text
  try {
    let text = await navigator.clipboard.readText();
    text = text.toUpperCase();
    console.log('Pasted UPPERCASE text: ', text);
  } catch (err) {
    console.error('Oh no: ', err);
  }
});
```

## Handling copy

Similar to paste, you can handle copy events too:

```js
document.addEventListener('paste', async (e) => {
  e.preventDefault(); 
  try {
    for (const item of e.clipboardData.items) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
    }
    console.log('Image copied.');
  } catch (err) {
    console.error('Oh no: ', err);
  }
});
```

## Permissions

The `navigator.clipboard` is only supported for pages served over _HTTPS_, plus clipboard access is restricted only when allowed to prevent further abuse. Active pages can write to clipboard, but reading requires granted permission.

There two new permissions which was introduced when Clipboard API was developed:

* The `clipboard-write` is granted automatically to any active tab.
* The `clipboard-read` must be requested.

```js
const queryOpts = { name: 'clipboard-read' };
const permissionStatus = await navigator.permissions.query(queryOpts);
// Will be 'granted', 'denied' or 'prompt':
console.log(permissionStatus.state);

// Listen for changes to the permission state
permissionStatus.onchange = () => {
  console.log(permissionStatus.state);
};
```

## Images

We don't always use text, so the new `write()` method was introduced to allow us to write other data formats to the clipboard. This method is asynchronous too and truth is, `writeText` is calling this method behind the scenes.

### Write to clipboard

To write an image to clipboard, you need to convert your image to a `Blob`. You can do it using a canvas element by calling the `toBlob()` function. At this point you can only pass one image at a time and multi image is under progress by Chrome team.

```js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

var img = new Image();
img.setAttribute('crossorigin', 'anonymous');
img.onload = function() {
  ctx.drawImage(img, 0, 0, 150, 150);
  img.style.display = 'none';

  canvas.toBlob(function(blob) {
    navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
  })
};
  
img.src = 'https://image-url';
```

### Read the image from clipboard

To read the image you'll need to use the `read()` method, which reads the data and returns a list of `ClipboardItem` objects. You can use `for...of` which handles the `async` part for you as well.

Each returned object can have different type, so best option would be to call `getType()` on it and act accordingly. In our case the corresponding type would be `Blob`.

```js
const items = await navigator.clipboard.read(); 

for (const clipboardItem of items) {
  for (const type of clipboardItem.types) {        
    if (type === "image/png") {
      console.log(type);
      const blob = await clipboardItem.getType(type);        
    }
  }
}
```

You can see a full demo here:

<iframe height="265" style="width: 100%;" scrolling="no" title="Clipboard API Image Demo" src="https://codepen.io/yashints/embed/preview/bGNvpGM?height=265&theme-id=default&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/bGNvpGM'>Clipboard API Image Demo</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Summary

We saw how easy and convenient it is to work with clipboard with this awesome API, and how much better the user experience will be.

So without further ado, happy coding 💻.
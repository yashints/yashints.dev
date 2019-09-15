---
path: '/aria-live/'
author: Yaser Adel Mehraban
date: 2019-09-14
title: "aria-live, accessibility tips 🦮"
popular: true
tags: [showdev, webdev, a11y, html]
---

Last week I talked about [JavaScript and AI using Tensorflow.js](https://www.componentsconf.com.au/schedule) at [ComponentsConf](https://www.componentsconf.com.au/) in Melbourne, Australia. The line up was a killer and I got to listen to some amazing talks, one of which got me hooked. It's about accessibility and how we can be more inclusive by doing very little at our end.

<!--more-->

## Background

We all create websites or applications which is used by many people who can see our pages, however, we don't realise these are also consumed by people who can't see them and use assistive technologies such as screen readers.

I am not talking about static pages here, we're dealing with dynamic pages where an area in the page gets changed without refreshing the whole page thanks to our friend JavaScript. This can be updating the ticket's price list, or updating the search result on the fly.

When this happens screen readers usually are not aware, unless we let them know there was an update on the page and that's where `aria-live` regions come to the rescue.

## How does `aria-live` works?

`aria-live` lets us mark a part of the page as "live", which means updates to this area should be communicated to the user regardless of where in the page they have focused on rather than requiring the user to be on that area when the update happens. This means they won't miss the updates even if they're currently reviewing other parts of the page.

For example, if the user clicks a button and an action is done, the status message which appears as a result should be communicated to them.

In its simplest form, an `aria-live` looks like this:

```html
<div class="status" aria-live="polite">Thanks for your feedback.</div>
```

There are three values which can be used with `aria-live` attribute, `polite`, `assertive`, and `off`. 

## It doesn't make sense? Let's see it in action

To demonstrate how it all works, I've created a CodePen with three regions for each of the above values.

Here is the code:

```html
<h1>Polite</h1>

<button onclick="updateContent('msg')">To view the updates, click this button!</button>
<br/> <br/>

<div id="msg" role="region" aria-live="polite" id="msg"></div>

<h1>Assertive</h1>

<button onclick="updateContent('msg2')">To view the updates immediately, click this button!</button>
<br/> <br/>

<div id="msg2" role="region" aria-live="assertive"  id="msg"></div>
<h1>Off</h1>

<button onclick="updateContent('msg3')">No updates will be announced, so don't click this button 😂!</button>
<br/> <br/>

<div id="msg3" role="region" aria-live="off" id="msg"></div>
```

And a simple function to simulate the content change:

```js
function updateContent(id) {  
  document.querySelector(`#${id}`).textContent = 'Content changed: ' + Math.random()
};
```

## Let's be polite 😊

`aria-live="polite"` tells assistive technology to alert the user to this change when it has finished whatever it is currently doing. It's great to use if something is important but not urgent, and accounts for the majority of `aria-live` use.

You can see how it works in the video below using a demo I created on [CodePen](https://codepen.io/yashints/pen/jONKgMw). In this demo I am changing the content of the message box with each click with a random number. You can see that windows narrator reads the current message before reading the next one, although the message has changed.

<video controls="controls">
  <source type="video/mp4" src="https://yashintsblogassets.s3-ap-southeast-2.amazonaws.com/2019/polite.mp4"></source>  
  <p>Your browser does not support the video element.</p>
</video>

## Holly molly, something urgent happened ⚠️

`aria-live="assertive"` tells assistive technology to interrupt whatever it's going on and alert the user to this change immediately. This is only for important and urgent updates, such as a status message like "There has been a server error and your changes are not saved; please refresh the page", or updates to an input field as a direct result of a user action, such as buttons on a stepper widget.

You can see that in the assertive `aria-live` region, the narrator reads the next message as soon as it appears, even if it means it cuts off the previous one.

<video controls="controls">
  <source type="video/mp4" src="https://yashintsblogassets.s3-ap-southeast-2.amazonaws.com/2019/assertive.mp4"></source>  
  <p>Your browser does not support the video element.</p>
</video>

## Turn it off and save energy 😁

`aria-live="off"` tells assistive technology to temporarily suspend `aria-live` interruptions. If the updates are finished, you should definitely set the `aria-live` region to off. This will help the assistive technology to stop tracking changes of the dynamic content.

## Making sure the `aria-live` regions work effectively

This is a powerful tool, but you know the saying:

> With great power, comes great responsibility.

### Include the area from beginning

The first and foremost consideration is that you have to make sure the region is there on page load and it's empty. This is not a hard and fast rule, but many issues might occur if the region is not there initially.

❌ Don't do:

```html
<div class="dynamic-content"></div>

<script>
document.querySelector(".dynamic-content").innerHTML = `<div id="msg" aria-live="polite">
    Content changed!
</div>`
<script>
```

✔️ Instead:

```html
<div class="dynamic-content">
  <div id="msg" aria-live="polite"></div>
</div>

<script>
  document.querySelector('#msg').textContent = 'Content changed!'
</script>
```

## Want to hide the text but get it announced 😲?

If you want screen readers to announce your updates but would like to visually hide the text on screen, you have a bit of problem with usual wats like `display: none` or `visibility: hidden`. Both of these would cause the updates to be missed.

Another historical way was to add `text-indent: -9999px` to your element, but that has some performance issues since the browser WILL draw a 9999 pixel box on your (even worst on mobile).

So what should we do? Well, there are two ways you can do this:

Using `overflow: hidden` and small width and height:

```css
.hide-text { 
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

Or using `overflow: hidden` and `text-indent: 100%`:

```css
.hide-text {
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}
```

These are the most efficient ways of hiding text on screen, while keeping the performance in check.

## `aria-atomic`

This attribute indicates that the entire region should be considered as whole when communicating updates. Imagine a date widget consisting of day, month and year which has `aria-live=assertive` and `aria-atomic=true`. When the user changes the value of the day, the whole date will be read again.

```html
<input type="number" value="02" onchange="updateDate('day', event)"/>/
<input type="number" value="12" onchange="updateDate('month', event)"/>/
<input type="number" value="1983" onchange="updateDate('year', event)"/>

<div class="user-date" aria-live="assertive" aria-atomic="true">  
  <span id="day">02</span>/
  <span id="month">12</span>/
  <span id="year">1983</span>
</div>
```

And for its JavaScript:

```js
function updateDate(type, event) {
  if(event && event.target && event.target.value) {
    document.querySelector(`#${type}`).textContent = event.target.value;
  }
}
```

Now if you change the stepper in any of the inputs, the whole date should be read.

[[warning]]
| ⚠ The above did not work with windows narrator. However, [ChromeVox](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn), a Chrome extension I use for accessibility testing, worked as expected.

## What else?

There are other useful attributes you might want to look at:

* `aria-relevant`: which indicates what types of changes should be presented to the user.
* `aria-busy`: which lets you notify assistive technology that it should temporarily ignore changes to an element, such as when things are loading.

## Summary

We discussed the what, the how and the why of `aria-live` so far. We also saw how to hide the text without losing the ability to communicating updates to users, and furthermore, saw how to make the whole area atomically live using `aria-atomic`.

Hope this helps you with your journey to make web a more inclusive place for everybody, and happy coding.
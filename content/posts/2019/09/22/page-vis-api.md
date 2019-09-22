---
path: '/page-visibility-api/'
author: Yaser Adel Mehraban
date: 2019-09-22
title: "Page Visibility API, let's help users save their battery life 😀"
popular: true
tags: [showdev, webdev, javascript, pagevisibilityapi]
thumbnail: './bn.jpg'
---

Are you want of those people with 200 tabs open? Are you tired of carrying your laptop charger with you all the time? Well, I am here to let you know we can help users save battery, data, and time, if we know how to use the **Page Visibility API**.

<!--more-->

## The why

Imagine your user has a few tabs open, one running a heavy animation, the other getting a lot of data from the server, and another running a video from YouTube. These all require resources from user's computer and that's why sometimes having a few tabs open you suddenly realise you're running out of battery, or your data allowance is finishing.

💡 What if you could pause the current operation on a tab/window if the user isn't looking at it? 

With `Page Visibility API`, you can do that.

## Page Visibility API

This API allows a developer to become aware if the user has lost focus on the page, or has returned to it again. When the user minimises, or switches to another tab/window, the API sends a `visibilitychange` event to let the listeners know the state of the page.

**Page Visibility API** is a very useful tool in your toolbox which gives you the power to not perform unnecessary operations when the page is not visible to user.

This API adds the following properties to the `Document` interface:

* `hidden`: which is a read-only attribute and returns true if the page is in a state to be considered hidden to user.
* `visibilityState`: which is a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) indicating the document's current visibility state. It can have four values, `visible`, `hidden`, `prerender`, and `unloaded`.

You can also listen to the `visibilitychange` event which will trigger your callback function whenever the visibility changes:

```js
function handleVisibilityChange () {
    if (document.hidden) {
        // stop that task 🛑
    } else {
        // you can start it again go ▶️
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange, false);
```

## `visibilityState`

As mentioned before, this property can have four different values each of which representing a different tab/window state:


* **visible**: This means the tab/window is visible or partially so. In other words, it means the page is the foreground tab of a non-minimised window.
* **hidden**: Page is not visible due to being minimised or the device's screen is off.
* **prerender**: The page is now being prerendered and is not visible to user.
* **unloaded**: This means the user is about to close the current page.

[[warning]]
| ⚠️ You need to know that not all browsers support the last two states.

## Demo

The simplest scenario is playing video on the page, so we will be using that as an example. Let's use a simple video element on the page which will be paused when the user focuses on another tab.

```html
<body>
    <h1>Demo: Page Visibility API</h1>
    
    <main>
        <video id="videoElement" 
               poster="http://media.w3.org/2010/05/sintel/poster.png" width="400"
               controls="" >
           <source id='mp4' src="http://media.w3.org/2010/05/sintel/trailer.mp4" type='video/mp4'/>
        <source id='webm' src="http://media.w3.org/2010/05/sintel/trailer.webm" type='video/webm'/>
        <source id='ogv' src="http://media.w3.org/2010/05/sintel/trailer.ogv" type='video/ogg'/>
            <p>Sorry, there's a problem playing this video. Please try using a different browser</p>
        </video>
    </main>
    
    
    <script>    

    (function() {
        'use strict';
        
        // Set the name of the "hidden" property and the change event for visibility
        var hidden, visibilityChange; 
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") { // Firefox up to v17
          hidden = "mozHidden";
          visibilityChange = "mozvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") { // Chrome up to v32, Android up to v4.4, Blackberry up to v10
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
        }
        
        var videoElement = document.getElementById("videoElement");

        // If the page is hidden, pause the video;
        // if the page is shown, play the video
        function handleVisibilityChange() {
          if (document[hidden]) {
            videoElement.pause();
          } else {
            videoElement.play();
          }
        }

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
          alert("This demo requires a modern browser that supports the Page Visibility API.");
        } else {
          // Handle page visibility change   
          document.addEventListener(visibilityChange, handleVisibilityChange, false);
            
          // When the video pauses and plays, change the title.
          videoElement.addEventListener("pause", function(){
            document.title = 'Paused';
          }, false);
            
          videoElement.addEventListener("play", function(){
            document.title = 'Playing'
          }, false);
        }

    })();
    </script>

</body>
```

All we're doing is to get a reference to the video element and hook into the `visibilitychange` event. When the page is hidden, we simply pause the video. Once the focus is back in, we play it.

![Simples](./simples.jpg)

I've create a [live version on Glitch](https://aluminum-argon.glitch.me) you can have a look. Play the video and click on another tab. The video will get paused and once you're back, it plays again.

## Summary

A good web application does not necessarily require hot features and impressive UX. Sometimes a performing web application would appeal to users like no other. Hope this little article helps you help your users in many ways.

Happy exploring 😊.
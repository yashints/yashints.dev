---
path: '/Intersection-observer-v2/'
author: Yaser Adel Mehraban
date: 2020-06-22
title: "Introducing the Intersection Observer V2 ⛌"
popular: true
tags: [showdev, webdev, javascript, intersectionobserver]
---

As I mentioned in [one of my other posts](https://yashints.dev/blog/2018/11/12/web-perf-4), **Intersection Observer** will report when an element appears in the viewport, after applying all `overflow` and `CSS clips`. However, there is no way currently to find out whether an item is being put on top of this element, or some filter is applied to it which may alter or obscure the element's display.

<!--more-->

## Context

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is now widely used by developers especially since Safari added support a while back and it's now available in all major browsers. If you want to be notified when an element appears in the viewport such as an image, if you want to lazy load it you can use this API. In its most basic form the code looks like this:

```javascript
const logIfIsInViewPort = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      console.log(entry);
    }
  }
};

const observer = new IntersectionObserver(logIfIsInViewPort);
observer.observe(document.querySelector('.element-selector'));
```

## The problem

As great as it sounds, this API is not perfect. For example it can't tell you whether or not an element is covered by another content (which is called occluded), or if a filter is applied to it to hide or obscure it's content (such as `opacity`, `filter`, `transform`, etc.).

This can lead to dangerous situations where some people might do fraud or abuse the web. So [Intersection Observer V2](https://w3c.github.io/IntersectionObserver/v2/) was born to prevent these types of scenarios.

## Intersection Observer V2

As I said, the primary motivation for this API is to prevent those situations where a fraud might be possible, or people could abuse the user's privacy in a way especially if the said content is put in an iframe.

Intersection Observer V2 works by tracking the actual visibility of the element, just like the end user would see it. By passing an option to it's constructor, the collection of `IntersectionObserverEntry` will contain a new boolean called `isVisible`.

```js
const handler = (changes) => {
  for(const change in changes) {
    // feature detection
    if(typeof change.isVisible !== 'undefined') {
      if(change.isIntersecting && change.isVisible) {
        console.log(`Visible since ${change.time}`);
      } else {
        // fallback to v1 if not supported
        change.isVisible = true;
      }
    }
  }
}

const observer = new IntersectionObserver(handler, {
  threshold: [1.0],  
  trackVisibility: true, // this will give you the isVisible property
  delay: 100
});

observer.observe(document.querySelector('.target-element-selector'));
```

## Additional parameters

The object which is passed in the constructor has a few properties:

* **threshold**: A list of thresholds which will trigger a callback.
* **trackVisibility**: A boolean indicating whether or not to track the visibility of the element.
* **delay**: A number defining the minimum delay in milliseconds between notification for a given object.

> 💡 Note that tracking visibility is an expensive operation and should only be used when necessary. The performance implications can cause more harm than good if abused.

## How does it determine visibility?

Determining whether the element is visible or not is not as simple as you might think. Based on the spec:

* If `false` is passed as the value of `trackVisibility`, the element is considered visible.
* If the target element has an effective transformation matrix other than `2D` then the element is considered invisible.
* If the target element or any of its children, has an effective capacity other than `1.0`, then it's considered invisible.
* If the target element or any of its children has a filter applied, then it's considered invisible.
* If the browser cannot guarantee the target is fully visible, then it's considered invisible.

## What's the catch?

This is in a draft state and still work in progress. Apart from Chrome, none of the other major browsers currently support it.

## Summary

Although this hasn't been implemented in most browsers yet, it's a great tool to prevent some of the common attacks such as `clickjacking` or `likejacking`, or `cursorjacking`.
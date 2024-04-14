---
path: '/image-capture-api/'
author: Yaser Adel Mehraban
date: 2020-09-06
title: "Take a selfie 🤳 using Image Capture API and a few lines of code"
popular: true
tags: [showdev, webdev, javascript, imagecaptureapi]
---

It's been a while since I last wrote about Intersection Observer V2, partly because I had a lot on my plate and I was feeling exhausted and partly because I was working on my first [PluralSight course on web performance for PWAs](app.pluralsight.com/library/courses/web-performance-progressive-web-apps).

But I am back, and this time we're going to review how to take a selfie from your webcam using [Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API).

<!--more-->

## Image Capture API

There are some really useful APIs which allow us to work with media like audio, video, etc. I will write about those too, but this time I wanted to show you how you can extract a frame from your video feed such as your webcam with a few lines of code.

[Image Capture API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API) enables us to capture an image or frame from video devices. In addition to capturing data, it also allows you to retrieve information about device capability such as image size, red-eye detection and whether or not there is flash turned on.

## Usage

We need to take some actions to be able to work with media devices. First thing first we need to get a reference of the device:

```js
navigator.mediaDevices.getUserMedia({ video: true })
  .then(mediaStream => {
    // Do something with the stream.
  })
```

Next we need to get the visual parts of the media stream by calling `getVideoTracks` method of the `mediaStream` object:

```js
const track = mediaStream.getVideoTracks()[0];
```

Of course we're assuming that the first item in the array is the one you want to use, but don't worry if not, you can loop through all the tracks, find the one you need and either get it with its right index, or by calling `getTrackById` method.

After we've got our track, it's time to capture our image. If you wanted to configure some of the settings on your media device such as zoom level, you need to do it now before capturing our image:

```js
const capabilities = track.getCapabilities();
// Check whether zoom is supported or not.
if(!capabilities.zoom) {
  return;
}

const zoom = capabilities.zoom.max - capabilities.zoom.min;

track.applyConstraints({ advanced : [{ zoom: zoom }] });
```

When we're done with settings, we can then create an instance of the `ImageCapture` object:

```js
let imageCapture = new ImageCapture(track);
```

Once that's done, you can capture an image from your video feed by calling the `takePhoto` method:

```js
imageCapture.takePhoto()
  .then(blob => createImageBitmap(blob))
  .then(imageBitmap => {
    // do something with the photo
  })
  .catch(error => console.error(error));
```

## Permissions

Similar to other APIs you would need permission to be able to access the webcam on devices. If you didn't see any pop up, make sure you give the camera permission to the site on your browser to be able to get your code working properly. You can try that with below demo.



## Demo

You can see a working example of this in my CodePen below:

<iframe height="265" style="width: 100%;" scrolling="no" title="Image Capture API" src="https://codepen.io/yashints/embed/preview/bGpaWKY?height=265&theme-id=light&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/bGpaWKY'>Image Capture API</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

I hope you've learnt a new thing or two and till next time 👋🏽.
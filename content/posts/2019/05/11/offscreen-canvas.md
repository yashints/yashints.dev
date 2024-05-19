---
path: '/offscreen-canvas/'
author: Yaser Adel Mehraban
date: 2019-05-11
title: 'OffscreenCanvas - Render your graphics off the main thread'
popular: true
tags: [webdev, tips, frontend, canvas, performance]
cover: ./socialpreview.png
---

Rendering images on a web page can be a very compute heavy operation. This makes it harder to run these kind of operations on the main thread since it might slow down the rendering or affect the user experience.

<!--more-->

# Background

[Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) is one of the most interesting HTML elements in my opinion. The most popular reasons of using it are drawing graphics or animations.

From Google Developers site:

> It is often used to create beautiful user experiences in media-rich web applications and online games.

The fact that you can script it, raises the bar even higher and makes the element even more interesting. This gives you great flexibility in so many situations, but we're going to focus on animations or rendering in general today.

# Problem

At the same time, executing JavaScript is one of the most frequent [sources of user experience](https://yashints.dev/blog/2018/10/12/web-perf-3) issues. Because all the JavaScript code [runs on the same thread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) as user interaction, these sort of heavy compute operations can affect the user experience in addition to real and perceived performance.

# Example

To give you an example of how easy it is to use canvas, consider the following code:

```html
<canvas id="canvas" width="300" height="300">
  An alternative text describing what your canvas
  displays.
</canvas>
```

And in your JavaScript file:

```js
var mainCanvas = document.getElementById(
  'myCanvas'
)
var mainContext = mainCanvas.getContext('2d')

var canvasWidth = mainCanvas.width
var canvasHeight = mainCanvas.height

var angle = 0

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame

function drawCircle() {
  mainContext.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  )

  // color in the background
  mainContext.fillStyle = '#EEEEEE'
  mainContext.fillRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  )

  // draw the circle
  mainContext.beginPath()

  var radius =
    25 + 150 * Math.abs(Math.cos(angle))
  mainContext.arc(
    225,
    225,
    radius,
    0,
    Math.PI * 2,
    false
  )
  mainContext.closePath()

  // color in the circle
  mainContext.fillStyle = '#006699'
  mainContext.fill()

  angle += Math.PI / 64

  requestAnimationFrame(drawCircle)
}

drawCircle()
```

This is how it looks like:

<iframe height="220" style="width: 100%;" scrolling="no" title="CanvasAnimation" src="//codepen.io/yashints/embed/wbWppN/?height=265&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/wbWppN/'>CanvasAnimation</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Now let's add a twist to this code. Let's run a bit of code at the same time as the animation is running. We add a button and a handler that calls a function to calculate the Fibonacci number sequence 🤷‍♂️. So let's get into it and add the button:

```html
<button type="button" id="make-busy">
  Hit the main thread!
</button>
```

And let's implement the Fibonacci series with a recursive function. Then we will use the `requestAnimationFrame` to make sure this code is run on the next available repaint. For more info on `requestAnimationFrame`, make sure to check out [the documentation](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

```js
function fibonacci(num) {
  if (num <= 1) return 1

  return fibonacci(num - 1) + fibonacci(num - 2)
}

document
  .querySelector('#make-busy')
  .addEventListener('click', () => {
    document.querySelector('#busy').innerText =
      'Main thread working...'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fibonacci(40)
        document.querySelector(
          '#busy'
        ).innerText = 'Done!'
      })
    })
  })
```

Now if you click on the button, you will see that the animation will stop and resume after the call to `fibonacci` function is returned.

<iframe height="265" style="width: 100%;" scrolling="no" title="CanvasAnimation" src="//codepen.io/yashints/embed/QREBrx/?height=265&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/QREBrx/'>CanvasAnimation</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

You can clearly see how users might feel if they face a similar situation on your web application. And this is when the `OffscreenCanvas` can help.

# OffscreenCanvas

Up until recently, the drawing capabilities of canvas was directly dependent on the `<canvas>` element which meant it would depend on DOM (Document Object Model). `OffscreenCanvas` on the other hand, decouples DOM and Canvas API by moving it's operations off screen.

To make it even more interesting, the rendering operations can now be run inside a worker, thanks to the aforementioned decoupling. This alone opens the doors of possibilities to all sorts of performance improvements.

## Using it in a worker

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are the web's version of multi threading. They allow you to run code/tasks in a separate thread (aka background 😁). Now that the decoupling between DOM and Canvas API has landed, we can run it inside a worker.

By expanding our previous example, we will add another copy of the same animation, but this time we'll do the rendering in an `OffscreenCanvas` in a web worker.

We need to setup our worker code in a script (I've named `animation.js`) which we can use later. First we need to move our animation code to its own file. Then let's create our worker code:

```js
let animationWorker = null
self.onmessage = function(e) {
  switch (e.data.msg) {
    case 'start':
      if (!animationWorker) {
        importScripts(
          e.data.origin + '/animation.js'
        )
        animationWorker = new ThemedAnimation(
          e.data.canvas.getContext('2d')
        )
      }
      animationWorker.start()
      break
    case 'stop':
      if (!animationWorker) {
        return
      }
      animationWorker.stop()
      break
  }
}
```

No you can create two canvas elements side by side:

```html
<main>
  <section class="support">
    Your browser does not support OffscreenCanvas.
  </section>
  <div>
    <h1>Canvas on main thread</h1>
    <p>
      Interaction is blocked when a theme is
      loading
    </p>
    <canvas
      id="canvas-window"
      width="400"
      height="400"
    ></canvas>
  </div>
  <div>
    <h1>Canvas on worker thread</h1>
    <p>
      Interaction works even if a theme is loading
    </p>
    <canvas
      id="canvas-worker"
      width="400"
      height="400"
    ></canvas>
  </div>
</main>
```

And finally create the worker from the script tag above, request an animation frame (we used `setTimeOut` previously), and run the animation in both canvases at the same time.

```js
document
  .querySelector('main')
  .classList.toggle(
    'supported',
    'OffscreenCanvas' in window
  )
document
  .querySelector('#make-busy')
  .addEventListener('click', () => {
    document.querySelector('#busy').innerText =
      'Main thread working...'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Animation.fibonacci(40)
        document.querySelector(
          '#busy'
        ).innerText = 'Done!'
      })
    })
  })

const canvas = document.querySelector('#case1')
const animationWindow = new Animation(
  document
    .querySelector('#canvas-window')
    .getContext('2d')
)
animationWindow.start()
const workerCode = document.querySelector(
  '#workerCode'
).textContent
const blob = new Blob([workerCode], {
  type: 'text/javascript',
})
const url = URL.createObjectURL(blob)
const worker = new Worker(url)
const offscreen = document
  .querySelector('#canvas-worker')
  .transferControlToOffscreen()
const urlParts = location.href.split('/')
if (
  urlParts[urlParts.length - 1].indexOf('.') !==
  -1
) {
  urlParts.pop()
}
worker.postMessage(
  {
    msg: 'start',
    origin: urlParts.join('/'),
    canvas: offscreen,
  },
  [offscreen]
)
URL.revokeObjectURL(url) // cleanup
```

Let's see what's happening here. First we need to detect the feature (OffscreenCanvas is not fully supported yet). Next we hook an event handler for our button to put some load on the main thread. This will put some stress on our animation rendering in the main thread.

Afterwards, we get our canvas and run the animation code in the main thread, after which, we do the same in our worker. Except that we have to send a message to our worker to get that started (pay attention to the switch case in the worker code).

And last but not least, make sure you don't miss the most important part of the code which is call to `transferControlToOffscreen` on the canvas. This is where the magic of `OffscreenCanvas` happens. This method converts our regular canvas into an OffscreenCanvas instance.

Below you can see the whole code in action:

<iframe height="500" style="width: 100%;" scrolling="no" title="CanvasAnimation" src="https://yashints.github.io/offscreencanvas/" frameborder="no" allowtransparency="false" allowfullscreen="false">
  See the full code <a href='https://github.com/yashints/offscreencanvas/'>OffscreenCanvas</a> by Yaser Adel Mehraban
  (<a href='https://yashints.dev'>@yashints</a>) on <a href='https://yashints.github.io/offscreencanvas/'>GitHub Pages</a>.
</iframe>

# Summary

We saw the difference in rendering smoothness when using an `OffscreenCanvas` in comparison with running the same on the main thread. This amazing feature can be used alongside all of the other techniques in [my previous posts on web performance](https://yashints.dev/blog/2018/09/29/web-perf-1) to help you have a faster website and happier customers 😊.

---
path: '/tfjs-transfer-learning/'
author: Yaser Adel Mehraban
date: 2019-12-16
title: "Transfer learning with Tensorflow.js"
popular: true
tags: [showdev, webdev, tensorflowjs, transferlearning]
cover: ./socialpreview.png
---
 
[Tensorflow.js](https://www.tensorflow.org/js/) is a library which lets you perform machine learning in the browser or in Node. A while ago I wrote [an intro](https://yashints.dev/blog/2018/11/27/get-started-with-tensorflowjs) on it and also gave a few talks including one which had a live demo where I re-trained the [Speech Command](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands) model and flew a drone using my voice 😍. Many people asked about the details, so I decided to blog the whole thing down.

<!--more-->

## Intro

[Speech Command](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands) is a machine learning model which allow you to classify 1-second audio snippets from the speech command dataset which has about 18 basic words (i.e. up, left, right, down, yes, no, etc) in it at the moment.

In this article we want to expand the dataset using three words which we will use to fly a drone with. To do this we will be using a method called transfer learning, where we will use the pre-trained model and retrain it to learn new words.

## Requirements

You will need some basic knowledge around web development and JavaScript, and nothing else.

## Get started

We will be using [Glitch](https://codesandbox.io/) to quickly implement the app. So go ahead and[remix this starter template](https://glitch.com/~tfjs-glitch-starter).

First thing first we should add the `tensorflowjs` and `speech-command` script to our page:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Transfer learning with Tensorflow.js and Speech Command</title>
    <script src="https://unpkg.com/@tensorflow/tfjs"></script>
    <script src="https://unpkg.com/@tensorflow-models/speech-commands"></script>
  </head>
  <body>
    <h1>Tensorflow.js</h1>
    <div id="info"></div>
    
    <!-- include the Glitch button to show what the webpage is about and
          to make it easier for folks to view source and remix -->
    <div class="glitchButton" style="position:fixed;top:20px;right:20px;"></div>
    <script src="https://button.glitch.me/button.js"></script>
    
    <!-- import the webpage's javascript file -->
    <script src="/script.js" defer></script>
  </body>
</html>
```

You can leave the default Glitch button for now or delete it if you want. That just gives you ability to share it with others after it's finished so they can remix and use it.

We will use the `<div id="info">` tag to show output of model and training on the screen.

## Load the model

Now we need to load the model which is very simple. All you need to do is to call the `create` method on the speech commands' object. The `BROWSER_FFT` argument passed to it is just telling speech command to use the browser's native Fourier transform. For more information regarding [Speech Command's APIs have a look at their ReadMe](https://github.com/tensorflow/tfjs-models/blob/master/speech-commands/README.md).  

```js
let recogniser;

async function app() {
 recogniser = speechCommands.create('BROWSER_FFT');
 await recogniser.ensureModelLoaded();
}

app();
```

💡 Note: If you're using your local editor and _npm_ to pull down the packages, you need to import the `speechCommand`:

```js
import * as speechCommands from '@tensorflow-models/speech-commands';
```

## Collecting data

It's time to collect our sample audio to be able to feed it into our model. Our intention is to add three words (take off, land, and flip) to Speech Command dataset. For this we use three buttons to represent our words (labels in the world of machine learning) and another to capture background noise. The background noise bit is really important because it can make or break the whole setup (my first demo failed just because of this).

```html
<button id="takeoff" onmousedown="collectSample(0)" onmouseup="collectSample(null)">Take Off</button>
<button id="Land" onmousedown="collectSample(1)" onmouseup="collectSample(null)">Land</button>
<button id="flip" onmousedown="collectSample(2)" onmouseup="collectSample(null)">Flip</button>
<button id="noise" onmousedown="collectSample(3)" onmouseup="collectSample(null)">Noise</button>
```

And we will need to implement the `collectSample` method:

```js
const NUM_FRAMES = 6;
let samples = [];

function collectSample(label) {
 if (recogniser.isListening()) {
   return recogniser.stopListening();
 }
 if (label == null) {
   return;
 }
 recogniser.listen(async ({spectrogram: {frameSize, data}}) => {
   let vals = normalise(data.subarray(-frameSize * NUM_FRAMES));
   samples.push({vals, label});
   document.querySelector('#info').textContent =
       `${samples.length} sample collected`;
 }, {
   overlapFactor: 0.999,
   includeSpectrogram: true,
   invokeCallbackOnNoiseAndUnknown: true
 });
}

function normalise(x) {
 const mean = -100;
 const std = 10;
 return x.map(x => (x - mean) / std);
}
```

Let's go through what's happening here. The `collectSample` method associates a label with the output of `recogniser.listen()`. The `includeSpectrogram` flag makes sure that recogniser gives the raw data frequency of 1 sec of audio which then is divided into 43 frames.

Because we're aiming for short sound tracks, we will take into accounts only the last 6 frames (~140ms), enough to give us time to pronounce the words:

```js
let vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
```

And last, to avoid any numerical issues, we normalise the data to have an average of 0 and a [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of 1. In our case the spectrogram values are usually large negative numbers around -100 with deviation of 10.

All this info is saved to the samples variable.

Feel free to test your sample collection to see if everything works fine so far.

## Train the model

Now we need to build a model with the correct architecture (like Speech Command) and feed our sample data to it for training. We will use another button to trigger the training:

```html
<br/><br/>
<button id="train" onclick="train()">Train</button>
```

```js
const INPUT_SHAPE = [NUM_FRAMES, 232, 1];
let model;

async function train() {
 toggleButtons(false);
 const ys = tf.oneHot(samples.map(e => e.label), 3);
 const xsShape = [samples.length, ...INPUT_SHAPE];
 const xs = tf.tensor(flatten(samples.map(e => e.vals)), xsShape);

 await model.fit(xs, ys, {
   batchSize: 16,
   epochs: 10,
   callbacks: {
     onEpochEnd: (epoch, logs) => {
       document.querySelector('#info').textContent =
           `Accuracy: ${(logs.acc * 100).toFixed(1)}% Epoch: ${epoch + 1}`;
     }
   }
 });
 tf.dispose([xs, ys]);
 toggleButtons(true);
}

function buildModel() {
 model = tf.sequential();
 model.add(tf.layers.depthwiseConv2d({
   depthMultiplier: 8,
   kernelSize: [NUM_FRAMES, 3],
   activation: 'relu',
   inputShape: INPUT_SHAPE
 }));
 model.add(tf.layers.maxPooling2d({poolSize: [1, 2], strides: [2, 2]}));
 model.add(tf.layers.flatten());
 model.add(tf.layers.dense({units: 3, activation: 'softmax'}));
 const optimizer = tf.train.adam(0.01);
 model.compile({
   optimizer,
   loss: 'categoricalCrossentropy',
   metrics: ['accuracy']
 });
}

function toggleButtons(enable) {
 document.querySelectorAll('button').forEach(b => b.disabled = !enable);
}

function flatten(tensors) {
 const size = tensors[0].length;
 const result = new Float32Array(tensors.length * size);
 tensors.forEach((arr, i) => result.set(arr, i * size));
 return result;
}
```

And we add a call to build model in our entry function when the app loads:

```js
async function app() {
  recogniser = speechCommands.create("BROWSER_FFT");
  await recogniser.ensureModelLoaded();

  document.getElementById("info").textContent = "Model loaded";

  buildModel();
}
```

At this point, you can see a train button on the page and if you click it after you've collected some sample data, you can see the training happen and the accuracy of the model shown after it's finished.

So let's break this down because it does look a bit busy. First thing first we need to build a model with the right architecture. This model will have four layers, a convolutional layer that processes the audio data, a max pool layer, a flatten layer, and a dense layer that maps to all three actions.

The input shape of the model is `[NUM_FRAMES, 232, 1]` where each frame is 23ms of audio containing 232 numbers that correspond to different frequencies. In this demo we're using samples that are 6 frames long (~140ms) because we're using short words to control the drone.

For the training part, we're using 1- epochs (imagine the number of iterations which model uses to go through running it's operations end to end).

## Capturing the words

It's time to capture a word, feed it into the model and see how accurate it is. Let's add another button to trigger listening:

```html
<br/><br/>
<button id="listen" onclick="listen()">Listen</button>
```

Then we need to listen to the microphone through browser and feed that into the model to see what is the output.

```js
async function controlDrone(labelTensor) {
  const label = (await labelTensor.data())[0];
  if (label == 3) {
    return;
  }
  let recognisedWord = "none";
  switch (label) {
    case 0:
      recognisedWord = "take off";
      break;
    case 1:
      recognisedWord = "land";
      break;
    case 2:
      recognisedWord = "flip";
      break;    
  }
  document.getElementById("info").textContent = recognisedWord;
}

function listen() {
  if (recogniser.isListening()) {
    recogniser.stopListening();
    toggleButtons(true);
    document.getElementById("listen").textContent = "Listen";
    return;
  }
  toggleButtons(false);
  document.getElementById("listen").textContent = "Stop";
  document.getElementById("listen").disabled = false;

  recogniser.listen(
    async ({ spectrogram: { frameSize, data } }) => {
      const vals = normalise(data.subarray(-frameSize * NUM_FRAMES));
      const input = tf.tensor(vals, [1, ...INPUT_SHAPE]);
      const probs = model.predict(input);
      const predLabel = probs.argMax(1);
      await controlDrone(predLabel);
      tf.dispose([input, probs, predLabel]);
    },
    {
      overlapFactor: 0.999,
      includeSpectrogram: true,
      invokeCallbackOnNoiseAndUnknown: true
    }
  );
}
```
Again, let's break this down a bit. The `listen` method will listens to the microphone real time and feeds that into the model for predictions. The logic is very similar to `collectSample` method where we normalise the data and drop all frames except the `NUM_FRAMES` (6) frames. The difference is that we call `model.predict` method to see what is been spoken.

The output of the prediction is a tensor with the shape of `[1, numClasses]` representing a probability distribution over all our classes (labels). We will use the first one returned to as it will be the strongest match using `probs.argMax(1)`.

Now we can call the `.data()` and get it's first argument to get our label from it:

```js
const label = (await labelTensor.data())[0];
```

I've used a switch case for simplicity, but feel free to chuck them all in a set and use it's index.

**Note:** It's very important to dispose the output tensors to clean up the memory through a call to `tf.dispose([input, probs, predLabel]);`.

## Test the whole demo

It's time to give our full demo a shot. Record the samples and the background noise, then train the model and then verify it using the listen button.

> 💡 For my demo, I had to use a recording of the drone's flying in order to be able to run it successfully. That's because the first command always works because there is no background noise, but once the drone is up, the noise of the drone will mask the consequent words 😁. So when recording noise, use a drone's actual noise which you can find on [YouTube]().

[See the full working demo on Glitch](https://glitch.com/~abrasive-ixora).

I will do another post on how to wire this up with the server side code to fly the drone 🚁 (think of a drone when you look at the helicopter emoji 😁).
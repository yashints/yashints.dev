---
path: '/playwright/'
author: Yaser Adel Mehraban
date: 2020-01-24
title: "If you consider Puppeteer cool, then Playwright is awesomeness \U0001F60D"
popular: true
tags: [webdev, showdev, testing, playwright]
cover: ./socialpreview.png
---
 
If you've ever used [Puppeteer](https://github.com/puppeteer/puppeteer), you'd know it enables you to control a Chrome instance (or any other **Chrome DevTools** Protocol based browser) and execute common actions, much like in a real browser - programmatically, through a decent API. The same team has now build a new product called [Playwright](https://github.com/microsoft/playwright) which apparently is their new favourite.

<!--more-->

## What is Playwright? 🤔

[Playwright](https://github.com/microsoft/playwright) is a Node library which allows you to automate all major browsers - Chrome, Firefox, WebKit, and the new Microsoft Edge - plus the ability to execute actions, take screenshots, and much more, similar to Puppeteer.

In their own words:

> Playwright is focused on enabling cross-browser web automation platform that is **ever-green**, **capable**, **reliable** and **fast**. Our primary goal with Playwright is to improve automated UI testing by eliminating flakiness, improving the speed of execution and offering insights into the browser operation.

Imagine the possibility of running end to end tests on all major browsers before you ship your any product to your users.

## Is is replacing Puppeteer?

Based on what I see and how they've answered, I'd say YES. But with a promise to contain all of the functionality of Puppeteer, and make it a cross platform, vendor-neutral, and a collaboration effort between all major parties.

The lessons learnt are incorporated into it, APIs are testing-friendly, and it will be a cloud native product. For example all the user agent/device emulation is setup consistently on an object called `BrowserContext` to enable _multi-page_ scenarios, `click` waits for the element to be available and visible by default, there is a way to wait for _network_ and other events, etc.

## Getting started

You can install Playwright via `npm`:

```bash
npm i playwright
```

This will install Playwright and its dependencies. Note that it will also download the browser binaries which are quite bulky (~50MB to ~150MB).

### Launching a browser

Playwright module provides a method to launch a browser instance. The following is a typical example of using Playwright to drive automation. Below snippet shows opening a Chrome instance and browsing `example.com` page.

```js
const playwright = require('playwright').chromium;  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await playwright.launch();
  const context = await browser.newContext();
  const page = await context.newPage('http://example.com');
  // other actions...
  await browser.close();
})();
```

### Taking a screenshot of the page

You can execute most of the actions available on DevTools. For example we can take a screenshot of the page like so:

```js
const pw = require('playwright');

(async () => {
  const browser = await pw.webkit.launch(); // or 'chromium', 'firefox'
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.example.com/');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
```

### Emulate a device

```js
const playwright = require('playwright').firefox;  
const iPhone = playwright.devices['iPhone 11 Pro'];

(async () => {
  const browser = await playwright.launch();
  const context = await browser.newContext({
    viewport: iPhone.viewport,
    userAgent: iPhone.userAgent
  });
  const page = await context.newPage('http://example.com');
  // other actions...
  await browser.close();
})();
```

### Going beyond simple

Playwright allows you to easily emulate geo-location data.

```js
const pw = require('playwright');
const pixel2 = pw.devices['Pixel 2'];

(async () => {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({
    viewport: pixel2.viewport,
    userAgent: pixel2.userAgent,
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: { 'https://www.google.com': ['geolocation'] }
  });

  const page = await context.newPage('https://maps.google.com');
  await page.click('text="Your location"');
  await page.waitForRequest(/.*pwa\/net.js.*/);
  await page.screenshot({ path: 'colosseum-android.png' });
  await browser.close();
})();
```

Note how we had to set the grant the necessary  permission on the context, which means this is exactly what happens when a user browses the page.

### Accessing elements on page

`ElementHandle` represents an in-page DOM element. `ElementHandles` can be created with the `page.$` method, similar to what we've been using in DevTools.

```js
const playwright = require('playwright').chromium;  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await playwright.launch();
  const context = await browser.newContext();
  const page = await context.newPage('https://example.com');
  const hrefElement = await page.$('a');
  await hrefElement.click();
  // ...
})();
```

### Typing in text boxes

You can emulate a user typing into text fields, for example performing a search action:

```js
const elementHandle = await page.$('input');
await elementHandle.type('Hello'); // Types instantly
await elementHandle.type('World', {delay: 100}); // Types slower, like a user
await elementHandle.press('Enter');
```

### What else?

You can even play with mouse (pun intended):

```js
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

## What next?

The list of the available actions and what is available on the [API documentation page](https://github.com/microsoft/playwright/blob/master/docs/api.md). The list is almost overwhelming, in a good way 😁.

## What browsers are supported?

* **Chromium**: Playwright uses upstream versions of Chromium.
* **WebKit**: Playwright makes a number of modifications to WebCore and WebKit2 in order to extend WebKit's remote debugging capabilities and support the full set of Playwright APIs.
* **Firefox**: Playwright makes a number of modifications to Firefox as well. Those are adding support for content script debugging, workers, CSP, emulation, network interception, etc. etc.
* **MS Edge**: Since it's based on Chromium, it's supported as well.

## What is the update cadence?

The team follow [semver](https://semver.org/), and the team are trying to keep in sync with Chromium update cycle, possibly once a month.

## But

Playwright is in a stage where there might be breaking changes coming up as it progresses through full support for those browsers. You can find more information around this on their [Is Playwright Ready?](https://aslushnikov.github.io/isplaywrightready/) page.


So go have fun and enjoy this awesome emerging web technology 👍🏼. I will be exploring this on a couple of my side projects too, so stay tuned for more posts.
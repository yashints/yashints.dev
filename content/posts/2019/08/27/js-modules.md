---
path: '/js-modules/'
author: Yaser Adel Mehraban
date: 2019-08-27
title: "JavaScript modules, the good, the bad and the ugly 🧐"
popular: true
tags: [showdev, webdev, javascript, module]
---

If you ever stumbled upon a piece of vanilla JavaScript code and wanted to refactor it to a module, or have a `CommonJS` module and want to convert it to [`ES6 Modules`](https://tc39.es/ecma262/#sec-modules), you might have faced a couple of tricky situations. I had to go through one of those recently and stumbled upon some  differences/points that you need to be aware of when working with modules. As always, thought sharing these would help someone else, so here we go 😊.

<!--more-->

## CommonJS & `require`

This is the most common type of code seen on many open source projects before ES6 was put on earth by the GODS 😁.

### Usage

```js
const _ = require('underscore'); // from an npm package 

const reverseString = require('./reverseString.js'); // from internal module
```

### Definition

In the `reverseString.js` you would need to write something like this to get it working:

```js
const reverseString = (sentence) => sentence.split("").reverse().join("");

module.exports = reverseString;
```

The only thing you need to pay attention to is that the value you assign to `module.exports` is the same you get when using `require`. And if you want to use the function you just exported:

```js
const reverseString = require('./reverseString.js');

console.log(reverseString("madam")); // madam, gotcha 😂
```

### Multi export

In real life situations, we will need to export more than one function from our module. This is as easy as wrapping all of those in an object. Imagine you have a file called `stringHelpers.js`:

```js
const reverseString = (sentence) => {...};
const toUpperCase = (sentence) => {...};
const convertToCamelCase = (sentence) => {...};


module.exports = {
  reverseString: reverseString, 
  toUpperCase, // you can omit the assignment if the name is equal
  toLowerCase: convertToLowerCase,
};
```

As you can see, the value of the `module.exports` will be an object, which means when using it, you will have to use the properties on the object:

```js
const stringHelpers = require('./stringHelpers.js');

console.log(stringHelpers.reverseString('racecar')); // racecar 🤣
```

We can also rewrite our module in a different way:

```js
module.exports = {};

module.exports.reverseString = () => {...};
module.exports.toUpperCase = () => {...};
module.exports.toLowerCase = () => {...};
```

These two ways of creating the module are exactly the same, it's up to you which convention to follow.

## ES6 Modules

[ES6 Modules](https://tc39.es/ecma262/#sec-modules) is created to create a format which both `CommonJS` and `AMD` (Async Module Definition) users are happy with. In their simplest form compared to `CommonJS` approach, ES6 Modules ***always*** export an object.

```js
const reverseString = (sentence) => {...};

export default reverseString;
```

### Default export

One of the major benefits of having modules are to hide the internal implementation details and expose only what's needed. In this case I am just exporting one function, and in addition I am exporting it as `default`. When you export something as `default`, you get to import it with their original name or even an alias. Plus you get to omit the curly braces.

```js
import reverseString from './reverseString.js';

import defaultExport from './reverseString.js';

console.log(reverseString('madam')); //madam
console.log(defaultExport('madam')); //madam
```

![Made up name gif](./madeup.gif)

If you look into the object which is exported from the file, you will see below object:

```js
{
  default: (sentence) => {...}
}
```
You can also export the function directly:

```js
export const reverseString = (sentence) => {...};
```

Which will result in:

```js
{
  reverseString: (sentence) => {...}
}
```

In which case you will need to use its name to be able to import it, plus you have to use curly braces:

```js
import { reverseString } from './reverseString.js';

console.log(reverseString('madam')); //madam
```

### Mixed export

You can also have a default export alongside named ones:

```js
export const reverseString = (sentence) => {...};
export const toUpperCase = (sentence) => {...};
const convertToCamelCase = (sentence) => {...};

export default convertToCamelCase;
```

Which then will give you:

```js
{
  reverseString: (sentence) => {...},
  toUpperCase: (sentence) => {...},
  default: (sentence) => {...}
}
```

And when importing, you can use their names, or import everything in one object:

```js
import convertToCamelCase, { reverseString, toUpperCase } from './stringHelpers.js';

// or

import * as stringHelpers from './stringHelpers.js';
```

Now to be fair, you can change the name of a named export after exporting too:

```js
import { reverseString as madeUpName } from './stringHelpers.js';
```

### Importing the whole module

Sometimes you have a block of code which needs to be executed without the need to access any of the module's internal values. In this case you can import the whole module just to have its global code executed:

```js
// other code or possible exports

window.addEventListener("load", function() {
    console.log("Window is loaded");
});
```

Then import the whole module:

```js
import './loadEventListener.js';
```

## Why should you use modules 😍?

There are many benefits when it comes to use ES6 Modules (or even CommonJS format). I will go through some of those here:

* Ease in sharing the code (both internal and between projects).
* Independant testability.
* Having ability to hide the implementation details.
* Single responsibility principle, code can be split in smaller chunks with a specific purpose.
* Simplifying dependency detection/injection.
* Defining clear interface for a block of code.
* Can be used alongside a dependency injection system to load a block of code.
* Can help the tree shaking to eliminate unused code.

## What's the catch 🤔?

There are a few points you should be aware of while using ES6 Modules:

* They are running in strict mode by default (you don't need to have `use strict` anymore).
* Top level value of `this` is `undefined`.
* Top level variables are local to the module.
* ES6 Modules are loaded and executed asynchronously. This means the browser will finish parsing and loading the `HTML` first, and then executes the module code. The load can be in parallel or be done beforehand using `link rel=preload`.

## Trick or treat?

This one is probably my favourite part. You can dynamically load the module and execute it. This is done by using the `import` keyword as a function rather than normal command.

```js
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });
```

Or even better:

```js
const module = await import('/modules/my-module.js');
```

### Wow that's great, but why 🧐?

Suppose you have an application which has different user experience or behaviour for mobile vs desktop. This problem can't be solved just by having a responsive design, so you build a _page renderer_ which loads and renders each page based on visitor's platform.

Technically this is just a strategy pattern where the page renderer decides which module to load at run time. This can be solved easily using dynamic imports. There are many other use cases out there which can be benefited from dynamic imports.

However, with great power, comes great responsibility. You need to be careful when to use this fantastic feature as it has its own drawbacks. At the least, you lose automatic bundling of lazy-loaded chunks, type inference and more.

## How can I use them?

I've shown you many examples in this article how to consume a module in another file or module. However, sometimes you need to consume them in browser (from `HTML`). Chrome, Safari, Firefox and Edge all support ES6 Modules, however you need to change your script tag's type from script to module:

```js
// html.js
export function tag (tag, text) {
  const el = document.createElement(tag)
  el.textContent = text

  return el
}
```

```html
<script type="module">
  import { tag } from './html.js'

  const h1 = tag('h1', ' Hello Modules!')
  document.body.appendChild(h1)
</script>
```

Or just simply import the module file into another file and use external reference:

```js
// app.js
import { tag } from './html.js'

const h1 = tag('h1', ' Hello Modules!')
document.body.appendChild(h1)
```

```html
<script type="module" src="app.js"></script>
```

**Tip**: There are still some old browsers out there **cough** IE11 **cough** which doesn't support it, so make sure you have a back up plan. This can be done using `nomodule` attribute.

```js
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

## Summary

We had a look at before and after ES6 Modules and saw some of the differences in syntax. We saw the power of the module system in JavaScript and its benefits when it comes to using it in larger code bases. And at last we reviewed dynamic import which has massive potential but should be used with cautious.

Hope you've enjoyed the read and till next time 👋🏼.
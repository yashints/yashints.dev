---
id: 8
path: '/es6-new-features-part-ii/'
title: 'ES6 new features (Part II)'
date: 2016-07-07
author: Yaser Adel Mehraban
popular: false
categories: [ES6, JS]
tags: [arrow functions, const, ES6, let, promises]
thumbnail: './es6.png'
---

Well for a long time I wanted to write a blog post about migrating Angular 1.x to 2, however, before doing so I thought it is really helpful to write about some prerequisites of that.

<!--more-->

This is the second article in ES6 new features series.

[Part I](/2016/07/06/es6-new-features-part-i/)

[Part III](/2016/07/11/es6-new-features-part-iii/)

### 6. Arrow Functions in ES6

Do you remember the fat functions of CoffeeScript? Now we have them in ES6. An arrow function expression has a shorter syntax compared to function expressions and lexically binds the this value (does not bind its own this, arguments, super, or new.target).

Arrow functions are always anonymous. The fat arrows are amazing because they would make your `this` behave properly, i.e., `this` will have the same value as in the context of the function—it won’t mutate. The mutation typically happens each time you create a closure.

```javascript
var a = ['Hydrogen', 'Helium', 'Lithium', 'Beryl­lium']

var a2 = a.map(function(s) {
  return s.length
})

var a3 = a.map(s => s.length)
```

The parenthesis `()` are optional for single params in an arrow function signature. You need them when you use more than one param.

```javascript
var ids = ['56', '5632']
var messages = ids.map(function(value, index, list) {
  return 'ID of ' + index + ' element is ' + value + ' ' // explicit return
})
```

And more eloquent version of the code in ES6 with parenthesis around params and implicit return:

```javascript
var ids = ['56', '5632']
var messages = ids.map(
  (value, index, list) => `ID of ${index} element is ${value} `
) // implicit return
```

### 7. Promises in ES6

Promises have been a controversial topic. There were a lot of promise implementations with slightly different syntax. q, bluebird, deferred.js, vow, avow, jquery deferred to name just a few.

Promises have been around quite a while and are defined by a spec called Promise/A+. ES6 has adopted this spec for its Promise implementation.

Promises give us a way to handle asynchronous processing in a more synchronous fashion. They represent a value that we can handle at some point in the future. And, better than callbacks here, Promises give us guarantees about that future value, specifically:

1.  No other registered handlers of that value can change it (_the Promise is immutable_)
2.  We are guaranteed to receive the value, regardless of when we register a handler for it, even if it's already resolved (_in contrast to events, which can incur race conditions_).

```javascript
// an immediately resolved promise
var p2 = Promise.resolve('foo')

// can get it after the fact, unlike events
p2.then(res => console.log(res))

var p = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(4), 2000)
})

// handler can't change promise, just value
p.then(res => {
  res += 2
  console.log(res)
})

// still gets 4
p.then(res => console.log(res))
```

The standard way to create a Promise is by using the `new Promise` constructor which accepts a handler that is given two functions as parameters. The first handler (_typically named_ `resolve`) is a function to call with the future value when it's ready; and the second handler (_typically named_ `reject`) is a function to call to reject the Promise if it can't resolve the future value.

```javascript
var p = new Promise(function(resolve, reject) {
   if (/* condition */) {
      resolve(/* value */);  // fulfilled successfully
   }
   else {
      reject(/* reason */);  // error, rejected
   }
});
```

And with ES6 arrow functions:

```javascript
var wait1000 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000)
}).then(() => {
  console.log('Yay!')
})
```

Now with a slight modification we can revise that to look like this:

```javascript
var wait1000 = () =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, 1000)
  })

wait1000()
  .then(function() {
    console.log('Yay!')
    return wait1000()
  })
  .then(function() {
    console.log('Wheeyee!')
  })
```

### 8. Block-Scoped Constructs Let and Const

ES6 provides two new ways of declaring variables: `let` and `const`, which mostly replace the ES5 way of declaring variables, `var`. `let` works similarly to `var`, but the variable it declares is _block-scoped_, it only exists within the current block.

`var` is _function-scoped_. In the following code, you can see that the `let`-declared variable `tmp` only exists with the block that starts in line A:

```javascript
function order(x, y) {
  if (x > y) {
    // (A)
    let tmp = x
    x = y
    y = tmp
  }
  console.log(tmp === x) // ReferenceError: tmp is not defined
  return [x, y]
}
```

`const` works like `let`, but the variable you declare must be immediately initialized, with a value that can’t be changed afterwards.

```javascript
const foo; // SyntaxError: missing = in const declaration

const bar = 123;
bar = 456; // TypeError: `bar` is read-only
```

Since `for-of` creates one _binding_ (storage space for a variable) per loop iteration, it is OK to `const`-declare the loop variable:

```javascript
for (const x of ['a', 'b']) {
  console.log(x)
}
// Output:
// a
// b
```

The following table gives an overview of six ways in which variables can be declared in ES6:

|            | Hoisting           | Scope         | Creates global properties |
| :--------- | :----------------- | :------------ | :------------------------ |
| `var`      | Declaration        | Function      | Yes                       |
| `let`      | Temporal dead zone | Block         | No                        |
| `const`    | Temporal dead zone | Block         | No                        |
| `function` | Complete           | Block         | Yes                       |
| `class`    | No                 | Block         | No                        |
| `import`   | Complete           | Module-global | No                        |

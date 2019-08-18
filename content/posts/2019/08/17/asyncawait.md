---
path: '/js-async-await/'
author: Yaser Adel Mehraban
date: 2019-08-17
title: "6 points you need to know about async & await in JavaScript"
popular: true
tags: [showdev, webdev, async, await]
thumbnail: './asyncawaitjs.jpg'
---

If you have faced a code like below, then this article will help you in multiple ways 😁.

```js
fetchPizzas()
  .then((pizzas) =＞ {
    return sortByToppings(pizzas)
      .then((pizzas) =＞ {
        return checkDeliveryOptions(pizzas)
          .then((pizzasWithDelivery) =＞ {
            return checkBirthdayGift(pizzasWithDelivery)
              .then((pizza) =＞ {
                return sendToCustomer(pizza);
              });
          });
      });
  });
```

<!--more-->

## A little bit of background

There are many a times where we have a bunch of tasks to be executed sequentially. The examples are from File handling to calling databases multiple times based on the result of the previous call. Or calling multiple APIs in a sequence where one call is dependenat on another.

Prior to introduction of `async/await`, many used callbacks alongside `setTimeOut` to simulated the behaviour they wanted (aka callback hell). Later on people started to use promises which made the code much more readable but they would end up in the same place when the number of calls where high (aka promise hell).

## Async functions

A function in JavaScript is `async` when it operates asynchronously via the event loop, using an implicit promise to return its result. Furthermore, the type of its result should be an [`AsyncFuncton`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) object.

This function is nothing but a combination of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generator_functions). I will not going into details of generators, but they usually contains one or many `yield` keywords.

Now lets see the `async` function in action. Assume we have a function which returns a string:

```js
function hi() {
  return 'Hi from JavaScript';
}

hi(); // 'Hi from JavaScript'
```

If we put `async` in front of the function, then it no longer returns string, it will be a promise which is wrapped around the string value automatically.

```js
async function hi() {
  return 'Hi from JavaScript';
}

hi(); // Promise {<resolved>: "Hi from JavaScript"}
```

Now in order to get the value from the promise we act like before:

```js
hi().then(console.log); // 'Hi from JavaScript'
```

You might be wondering how this can help to solve the promise hell. Just bare with me and we'll get there step by step with examples so it'd be clear when we're finished.

## Await

The `await` makes JavaScript engine to wait until a promise is resolved/rejected and returns it's result. This keyword can only be used inside an `async` function.

```js
const doSomething = async () => {
  console.log(await hi())
};

// 'Hi from JavaScript'
```

You might think since `await` forces the JavaScript engine to wait, it will have some cost on CPU. But that's not the case because the engine can perform other scripts while waiting for the promise to get resolves/rejected. Plus this is way more elegant that using `promises` and `.then`.

[[warning]]
|**Warning:** If you try to invoke an `async` function using `await` inside a normal function, you will get a syntax error.

```js
function doSomething() {
  await hi(); // Uncaught SyntaxError: await is only valid in async function
}
```

## A small catch

Most people who start working with `async/await` forget that they can't invoke an `async` function on top level code. This is due to the fact that we can't have `await` inside a normal function and the top level functions are normal by default.

```js
let response = await hi(); // syntax error in top-level code
console.log(response);
```

What you can do however, is to wrap your code in an `async` `IIFE` (immediately invoked function execution) and call it right there:

```js
(async () => {
  let response = await hi(); 
  console.log(response); // 'Hi from JavaScript'
  ...
})();
```

## Error handling

As I said before, most `async` functions can be written as a normal function with promises. However, `async` functions are less `error-prone` when it comes to error handling. If an awaited call fails, the exception is automatically caught and the `Error` object will be propagated to the caller using the implicit return promise.

Prior to this, we had to reject the promise which was returned from the normal function and use a `.catch` in the caller. I've seen many places where the developers used a try/catch and throw a new exception which meant the stack trace would be reset.

```js
async function hi() {
  throw new Error("Whoops!");
};

async function doSomething() {

  try {
    let response = await hi();
    return response;
  } catch(err) {    
    console.log(err);
  }
}

doSomething();
```

Or you can avoid the `try/catch` because the promise generated by the call to `hi` becomes rejected. Then simply use `.catch` to handle the error.

```js
async function hi() {
  throw new Error("Whoops!");
};

async function doSomething() {
  let response = await hi();
  return response;
}

doSomething().catch(err => {
  console.log(err);
});
```

You can ignore the catch all together and handle all the exceptions using a [global exception handler](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onrejectionhandled) if you think that's more suitable to your situation. Something like this which uses the `onrejectionhandled` property of `WindowsEventHandlers` mixin.

```js
window.onrejectionhandled = function(e) {
  console.log(e.reason);
}
```

## Promise.all compatibility

You can use `async/await` alongside `Promise.all` to wait for multiple promises:

```js
const responses = await Promise.all([
  fetch('yashints.dev/rss'),
  hi(),
  ...
])
```

If an error occurs, it propagates as usual, from the failed promise to `Promise.all` and then turns to an exception that you can catch using any of the above methods.

## `await` can take in a "thenable"

Similar to `promise.then`, if you have any object which has a `.then` method, `await` will accepts it. This is to support scenarios where a 3rd-party object which is not a promise, but promise-compatible (it supports `.then`), it would be enough to use it with `await`.

```js
class Greeting {
  constructor(name) {
    this.name = name;
  }

  then(resolve, reject) {
    console.log(resolve);

    setTimeout(() => resolve(`Hi ${this.name}`));
  }
};

async function greet() {
  const greeting = await Greeting('Yaser');

  console.log(greeting); // Hi Yaser
};

greet();
```

## `async` class methods

You can have an `async` class method. Just prepend it with `async` and you're good to go.

```js
class Order {
  async deliver() {
    return await Promise.resolve('Pizza');
  }
}

new Order()
  .delivery()
  .then(console.log); // Pizza
```

## Summary

Just to quickly go through what we discussed so far:

1. `async` keyword makes a method asynchronous, which in turn always returns a promise and allows `await` to be used.
2. `await` keyword before a promise makes JavaScript wait until that is resolved/rejected. If the promise is rejected, an exception is generated, otherwise the result is returned.
3. Together, they provide a great opportunity for us to write clean, more testable, asynchronous code.
4. With `async/await` you wouldn't need `.then/.catch`, but just note that they are still based on promises.
5. You can use `Promise.all` to wait for multiple `async` functions calls.
6. You can have an `async` method in a class.

I know there are many great articles around `async/await`, but I tried to cover some items where I had to constantly remind myself of. Hope it will help you to have a centralised place for most of what you need to write clean asynchronous JavaScript.

Have fun exploring these points.
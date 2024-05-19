---
path: '/write-faster-js/'
author: Yaser Adel Mehraban
date: 2019-05-20
title: 'Write faster JavaScript'
popular: true
tags: [webdev, showdev, javascript, performance]
cover: ./socialpreview.png
---

Most of the times, we write code which is being copy pasted from all over internet. [StackOverflow](https://stackoverflow.com/) is the main source these days for finding solutions to all sort of problems. But is it OK to blindly copy paste code without really knowing what's happening behind the scenes?

<!--more-->

# A bit of context

Don't get me wrong when I say **StackOverflow** should not be used blindly. It's a great source of information for most of the day to day issues and bugs developers face all around the world. It's just that we should be a bit more proactive and decide the best way out of all the available options out there.

Let me show you some examples where a piece of code can be written in multiple ways, and the most obvious choice is not necessarily the best one.

## Chaining array loop chaining

Let's assume we have an array with `200,000` objects which include name and age properties. We want to have the name of all people under age of 22 (assume we have `100,000` of them). This the solution most people might use:

```js
const under22People = originalList
  .filter(x => x.age < 22)
  .map(x => x.name)
```

Since `ES5` and `ES6` were introduced, a nice set of array methods emerged. `ES6s` cleaner syntax makes it painless to chain methods in order to produce our desired results. The problem lies in how we use these nice methods without realising how they're performed.

In the first glance, this looks to be a really nice code, but if we look closer, we have a loop which runs `200,000` times when doing the filtering, and another `100,000` times when selecting the name.

This is where we just need to loop through these items once. So let's have a look at how can we rewrite this code:

```js
const under22People = []
originalList.forEach(({ age, name }) => {
  age >= 18 && under22People.push(name)
})
```

Now this code runs only `200,000` times. It doesn't look as nice as the chained methods, but it sure has much better performance.

You can even use the `reduce` method to do the same:

```js
const under22People = originalList.reduce(
  (acc, { age, name }) => {
    return age >= 18 ? [...ac, name] : acc
  },
  []
)
```

It sure looks much less readable, but it does the exact same job for us.

## Abusing arrow functions

One of the good questions you could ask yourself when writing `JavaScript` is whether you know the difference between a traditional function and an arrow function (aka fat function).

From MDN Web Docs:

> An arrow function expression is a syntactically compact alternative to a [regular function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function), although without its own bindings to the `this`, `arguments`, `super`, or `new.target` keywords. Arrow function expressions are ill suited as methods, and they cannot be used as constructors.

Before you ask, no they are not JavaScript equivalent of anonymous functions in languages like `C#`. But for now the only thing you need to care about is that they don't have scope.

Once of the many of their use cases is using them in class field. Consider in `React` you don't need to manually bind your functions anymore like:

```js
this.handleClick = this.handleClick.bind(this)
```

Instead you will write your class like:

```js
class MyComponent extends Component {
  handleClick = () => {
    // ...
  }

  render() {
    // ...
  }
}
```

As you might know, usual functions are defined in the prototype and will be shared across all instances. If we have a list of `N` components, these components will share the same method. So, if our components get clicked we still call our method `N` times, but it will call the same prototype. As we’re calling the same method multiple times across the prototype, the `JavaScript` engine can optimize it.

On the other hand, for the arrow functions in class properties, if we’re creating `N` components, these `N` components will also create `N` functions. You can see by looking at the transpiled version, that class properties are initialised in the constructor. Which means if we click on `N` components, `N` different functions will be called.

So consider this approach next time you are writing your new shiny `React` component.

## Nested functions VS IIFEs

Nesting a function inside another function seems like a good idea to isolate some logic from outside world. Consider below code:

```js
function doSomething(arg1, arg2) {
  function nestedHelper(arg) {
    return process(arg)
  }

  return nestedHelper(arg1) + nestedHelper(arg2)
}
```

The problem with above code is that every time you call `doSomething`, the `nestedHeler` is recreated. In order to prevent that you can use an `IIFE` (Immediately invoked function):

```js
const result = (function() {
  function privateHelper(arg) {
    var result = process(arg)
    return result
  }

  return function(arg1, arg2) {
    return (
      privateHelper(arg1) + privateHelper(arg2)
    )
  }
})()
```

When this code gets executed, the nested method will be created only once 🤷‍♂️.

# Use Sets over Arrays where possible

The most obvious difference between an `array` and a `Set` is that `array` is an _indexed_ collection, whereas, a `Set` is key based.

So why you should be using a `Set`?

### Searching for an Item

Using `indexOf()` or `includes()` to check whether an item exists in an array is slow. In a `Set` you can find an item really easy using `has()`:

```js
const mySet = new Set([1, 1, 2])

console.log(mySet.has(2)) // true
```

### Deleting an Item

In a `Set`, you can delete an item by its value. In an array, the equivalent is using `splice()` based on an element’s `index`. As in the previous point, depending on indices is slow.

```js
const mySet = new Set([1, 2, 3, 4, 5])

mySet.delete(1)
```

### Insert an Item

It is much faster to add an item to a `Set` than to an array using `push()` or `unshift()`.

```js
const mySet = new Set([1, 2])

mySet.add(3) // Successfully added
```

### Storing NaN

You cannot use `indexOf()` or `includes()` to find the value `NaN`, while a `Set` is able to store this value.

### Removing Duplicates

`Set` objects only store unique values. If you want to avoid storing duplicates, this is a significant advantage over arrays, where additional code would be required to deal with duplicates.

```js
const mySet = new Set([1, 1, 2])

mySet.add(3) // Successfully added

console.log(mySet.values()) // 1,2,3
```

# Summary

There are many of these examples where you might want to be careful when writing code in a real world business application. Speed is one of the most important part of every web application and considering some items like above points, will increase your code's performance which can result in happier users 😊.

Hope this has helped you to start thinking about what other ways there are to solve the same issue rather than the first solution you'll find on the web.

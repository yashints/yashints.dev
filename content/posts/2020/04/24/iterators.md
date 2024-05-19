---
path: '/iterators/'
author: Yaser Adel Mehraban
date: 2020-04-24
title: "Have you ever thought about for loops? ➰"
popular: true
tags: [showdev, webdev, javascript, forloops]
cover: ./socialpreview.png
---
 
Using a loop is almost a must in our day to day life. But have you ever thought what kind of loop should you use? Do you know the difference between enumerables and iterables? This article sheds some light in this space, so read on if you're interested.

<!--more-->

## Background

Looping has seen quite a few changes from when I started programming. I remember using while loops and thinking wow, this is cool (I was printing starts on console using MS-DOS).

For loop is another way to iterate through a data structure which contains many items. But non of these methods iterate over the actual structure. They use a sequence, usually named `i` which mirrors the identifier for you.

```js
const fruits = ['🍉', '🍎', '🍌'];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 🍉, 🍎, 🍌
```

Here `i` is an index which allows you to access the elements of fruits array and is not part of the array itself. But with progress on **JavaScript**  towards more modern ways of programming, things have changes now. We have `for...in`, and `for...of` loops which use a different mechanism for going through items in a collection.

## Concepts

Before we delve into these newer ways of iteration, we need to be on the same page around some concepts. So let's go through them now:

* **Iterables**: This is a kind of loop where we are performing a repetition. Meaning the same set of actions are performed on each item. 
* **Enumerables**: This is a kind of loop where we making mention of, or counting items one at a time. This means the collection's elements can be distinctly identified and referenced.

That didn't click for me at first, but after going through some examples, it finally made sense. If you consider a _full pencil case_, that's an enumerable. When you _line up at Aldi_ to pay, that line is an iterable. A _wad of cash_ is an enumerable, whereas a _row of keys on your keyboard_ is an iterable.

> 💡 In order for an object to be `iterable`, it MUST implement an `@@iterator` property which returns an iterator. An iterator object is one which has a `next` method which returns the next item in the collection. That's why an object is not an iterable.

By now you should have started to see the pattern here. The best analogy I came across is:

> 😍 **Enumerables** are like rectangles whereas **iterables** are squares. This means all `iterables` are `enumerables`, however, not all `enumerables` are `iterables`.

## `for...in`

So let's start from `enumerables`. You can go through enumerables using `for...in`. The use case is mainly to go through key-value pairs in an object:

```js
const superCar = {
  make: 'Lamborghini',
  model: 'Veneno',
  year: '2020'
};

for (let key in superCar) {
  console.log(`${key} --> ${superCar[key]}`);
}

// make --> Lamborghini
// model --> Veneno
// year --> 2020
```

You can also use `for...in` to go through index values of an iterable like an array or a string:

```js
let fact = 'Lamborghini is the best!';

for (let index in fact) {
  console.log(`Index of ${fact[index]}: ${index}`);
}

// Index of L: 0
// Index of a: 1
// Index of m: 2
// Index of b: 3
// ...
```

> 💡 Beware that you can't iterate on `Symbol` properties with `for...in` and that's because `Symbols` are primitive data types that are _always_ unique. They are generally used as private properties to avoid name clashes when inheritance is used.

## Using `for...of`

This kind of loop is applicable to "iterable objects" meaning the item after `of` MUST be an `iterable`:

```js
const fruits = ['🍉', '🍎', '🍌'];

for (let fruit of fruits) {
  console.log(`${fruit} is delicious.`);
}

// 🍉 is delicious.
// 🍎 is delicious.
// 🍌 is delicious.
```

And again we can use it on strings, but with a slight difference:

```js
let fact = 'Yas';

for (let char of fact) {
  console.log(char);
}

// Y
// a
// s
```

## Summary

We saw the difference between these two modern ways of looping through collections, let's make more informed decisions as to use what where and write cleaner, more readable code 👊🏽.
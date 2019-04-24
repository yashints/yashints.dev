---
path: '/dedupe-array-js/'
author: Yaser Adel Mehraban
date: 2019-04-24
title: 'Removing duplicates from arrays in JavaScript'
popular: false
categories: [web, Performance Tuning]
tags: [web, performance, page load time]
thumbnail: './javascript.png'
---

There are multiple ways to remove duplicates from an array with JavaScript. But, it's very important to know the details of how efficient they, especially if you're dealing with large arrays.

<!--more-->

## Simplest approach

The easiest way is to use ES6's (ECMAScript 2015) `Set` object. This let's you store unique values of any type. It will automatically remove duplicates for us, isn't that sweet?

```js
const fruit = [
  'apple',
  'orange',
  'avo',
  'pear',
  'cherries',
  'strawberries',
  'avo',
  'avo',
];

let uniqueFruit = [...new Set(fruit)];

console.log(uniqueFruit); // ['apple', 'orange', 'avo', 'pear', 'cherries', 'strawberries']
```

Here we had to use the `spread` operator to get an array from `Set` again.

## Smart but naïve approach

We can use the built in filter method of ES5 to achieve the same:

```js
const fruits = [
  'apple',
  'orange',
  'avo',
  'pear',
  'cherries',
  'strawberries',
  'avo',
  'avo',
];

const uniqueFruit = fruits.filter(
  (item, i, arr) => {
    return arr.indexOf(item) == i;
  }
);

console.log(uniqueFruit); // ['apple', 'orange', 'avo', 'pear', 'cherries', 'strawberries']
```

What we're doing here is not that complex. We're going through each element and check if the first position of this item in the array is equal to current position. Since these two positions are different for duplicate items, they will get filtered and we end up with a unique array 🤩.

[[warning]]
| **Warning:** This approach is not that efficient for large arrays (quadratic time).

## Hash table to rescue

This approach is to place each item in a `hashtable` and then check for it's presence. This gives a linear time, but has at least two pitfalls:

- Since hash keys can only be string, this code doesn't distinguish number and numeric strings. This means `['1', 1]` will return `[1]`.
- Because of ☝🏼, all objects will be equal 🤦‍♂️.

```js
function unique(fruits) {
  var seen = {};
  return fruits.filter(item => {
    return seen.hasOwnProperty(item)
      ? false
      : (seen[item] = true);
  });
}
```

## The hybrid and best approach

A better approach combines both approaches. It uses hash lookups for primitive types and linear search for objects:

```js
function unique(fruits) {
  var prims = {
      boolean: {},
      number: {},
      string: {},
    },
    objs = [];

  return fruits.filter(item => {
    var type = typeof item;
    if (type in prims)
      return prims[type].hasOwnProperty(item)
        ? false
        : (prims[type][item] = true);
    else
      return objs.indexOf(item) >= 0
        ? false
        : objs.push(item);
  });
}
```

## Sort & unique

Another option is to sort the array and then remove the items equal to the one right after:

```js
function unique(fruits) {
  return fruits
    .sort()
    .filter((item, pos, ary) => {
      return !pos || item != ary[pos - 1];
    });
}
```

This item is similar to hash table approach, it does not work with objects. And more importantly we have to change the original array which is a side effect and not a good way to go about this.

## Using reduce

```js
const uniqueFruits = fruits.reduce((a, b) => {
  if (a.indexOf(b) < 0) a.push(b);
  return a;
}, []);

console.log(uniqueFruits); // ['apple', 'orange', 'avo', 'pear', 'cherries', 'strawberries']
```

This approach uses an accumulator to see whether the item is previously inserted into it or not. Very similar to filter approach we introduced earlier, a bit faster though.

## Summary

These are just a couple of ways of doing the same operation. But as you can see, very different in nature and support in browsers. Pick carefully and happy coding.

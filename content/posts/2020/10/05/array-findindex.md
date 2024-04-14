---
path: '/array-findindex/'
author: Yaser Adel Mehraban
date: 2020-10-05
title: "Find an item in an array with the new 'findIndex' method 🔎"
popular: true
tags: [showdev, webdev, javascript, findindex]
---

Searching for items in an array has been the point of discussion for many years and debate on what is the best and optimum way for searching for objects has had many solutions, some effective and some not.

However, with the all new `findIndex` method on `Array.prototype` you have the flexibility to search for objects using your own comparison callback method.

<!--more-->

## The what

The `findIndex` method returns the index of the first element in an array if the callback method passed to it returns `true`, otherwise it returns `-1`.

```js
const isPerfectSquare = (num) => {
  return num > 0 && Math.sqrt(num) % 1 === 0;
}

console.log([1, 3, 8, 9, 12].findIndex(isPerfectSquare)); // 1
console.log([1, 6, 7, 10, 14].findIndex(isPerfectSquare)); // -1
```

There are two facts you should know:

* This method does not run once it found the first matching element.
* It does not change the original array.

## Syntax

```js
array.findIndex(function(currentValue, index, arr), thisValue);
```

### Parameters

* **function:** This is your callback function which checks for a condition to match the element you're after.
* **currentValue:** This holds the current element's value.
* **index:** This is an optional parameter which holds the current index.
* **arr:** This is also an optional parameter which holds the array that the current element belongs to.
* **thisValue:** Yet another optional parameter, if a value is passed, it will be used as `this` value inside the function, otherwise `undefined` will be passed.

### Return value

It will return the index of the found item or `-1` if the callback function is not satisfied.

## How it works under the hood?

When the `findIndex` is called with one or two arguments, the following steps are executed:

1. Let `O` be ? `ToObject(this value)`
2. Let `len` be ? `LengthOfArrayLike(O)`
3. If `IsCallback(predicate)` is `false`, throw a **TypeError** exception
4. Let `k` be 0
5. Repeat, while `k < len`
  - Let `Pk` be ! `ToString(k)`
  - Let `kValue` be ? `Get(O, Pk)`
  - Let `testResult` be ! `ToBoolean(? Call(predicate, thisArg, « kValue, k, O »))`
  - If `testResult` is `true`, return `k`
  - Set `k` to `k + 1`
6. Return `-1`
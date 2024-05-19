---
path: '/swap/'
author: Yaser Adel Mehraban
date: 2020-05-15
title: "Swapping variables in JavaScript \U0001F501"
popular: true
tags: [showdev, webdev, javascript, swap]
cover: ./socialpreview.png
---
 
There may be many different reasons why you'd want to swap two variables be it just changing two item's location in an array or when sorting collections. The traditional way is just define a new variable, assign one value to it, put one of the items in the old place, then put the temp variable back in the new place. But my question is, is that the only way?

<!--more-->

## Traditionally

The old way of swapping two variables is done like below:

```javascript
let x = "Yas";
let y = "Hints";

let temp = x;
x = y;
y = temp;

console.log(x); // Hints
console.log(y); // Yas
```

There is nothing wrong with this approach unless you're doing it frequently.

## Without the temp variable

There is another way you could swap two variables without any temp variable. But this only works with numbers:

```javascript
let x = 10;
let y = 20;

x = x + y;
y = x - y
x = x - y;

console.log(x); // 20
console.log(y); // 10
```

This works two, but now we're doing three additional operations to save some space, so you need to be careful when you use this one. Another thing to consider with this approach is the chance of having overflows with additions or subtractions (`sum` should be less than `Number.MAX_SAFE_INTEGER` which is `9007199254740991`).

## Bitwise `XOR`

Similar to above approach, you could use `XOR` to swap the two variables, but this also works only on numbers:

```javascript
let x = 3;
let y = 5;

x = x ^ y;
y = x ^ y;
x = x ^ y;

console.log(x); // 5
console.log(y); // 3
```

If you're not familiar with `XOR`, it works on bits. When you perform `XOR` two bits, it evaluates to `1` if they are different, and evaluates to `0` if they're the same.

| x | y | XOR |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 1 | 1 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |

So let's see why this works.

1. `x = x ^ y`
2. `y = y ^ x` when `x = (x ^ y)`, so the `y = (x ^ y) ^ y` which equals to `x ^ (y ^ y) = x ^ 0 = x`. So now our `y` is the old `x`.
3. `x = x ^ y` when according to our first step `x` is not `x ^ y`, and so `x = (x ^ y) ^ x = y ^ (x ^ x) = y ^ 0 = y`.

Is this better than the previous one, probably faster, but still limited to numbers only.

## ES6 destructuring

Destructuring is an `ES6` feature which is used a lot in many of the modern frameworks. In its core, it allows you to store array elements in variables.

```javascript
let x;
let y;

[x, y] = [1, 2, 3];

console.log(x); // 1
console.log(y); // 2
```

Now considering how we can use this to swap the elements of an array:

```javascript
let x = "Yas";
let y = "Hints";

[x, y] = [y , x];

console.log(x); // Hints
console.log(y); // Yas
```

This method is much elegant, but still creates two arrays to perform the swapping. So the efficiency might not be that good if you're swapping many elements.

## Summary

Just because a feature is available, doesn't mean you should use it in every situation. Think about what is the most important factor in the solution you're implementing. If it's space, choose one which doesn't take much, although it's a bit slower.

If the memory doesn't matter but speed is important, choose accordingly. But definitely consider the situation before deciding on your approach.

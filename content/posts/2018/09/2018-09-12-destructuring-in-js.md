---
path: 'destructuring-in-js/'
title: 'Destructuring in JavaScript'
subtitle: 'An effective way to access array/object literals'
date: 2018-09-12
author: Yaser Adel Mehraban
categories: [Destructuring, JS]
tags: [destructuring, js]
thumbnail: './destructring.jpg'
---

With improvements on JavaScript and ECMAScript many awesome features are added which we don't normally use. However, when you read other people's code from OSS to doing a simple code review, you might face these features used and not know what they do.

<!--more-->

One of these cool features is destructuring which was added to ES6 a while back. By that I mean it's not something new, but it is not used regularly either.

## What is it

The object and array literal expressions provide an easy way to create packages of data:

```js
let x = [1, 2, 3, 4];
let y = {
  prop1: 'value1',
  prop2: 1233,
};
```

The destructuring assignment uses similar syntax to extract one or multiple of these literals into letiables on the left hand side:

```js
let x = [1, 2, 3, 4];

// Previously
let b = x[0];
let c = x[1];

// Destructuring
let [d, e] = x;

console.log(d); // 1
console.log(e); // 2

let y = {
  prop1: 'value 1',
  prop2: 1233,
};

// Previously
let f = y.prop1;
let g = y.prop2;

// Destructuring
let { f, g } = y;

console.log(f); // value 1
console.log(g); // 1234
```

This is very similar to existing features of `Python` or `Perl` and is very handy at times which I mention later.

## Arrays

When destructuring arrays you have some flexibility to what you want to extract but not too much. For example you can extract item `1` to `n` of an array by using `n` number of variables in the left hand side (you can use `var`, `let` and `const`).

However, extracting certain elements might be a bit easier. Here is what I mean:

```js
// ... in below line means you have to repeat the variable names there
let [var1, var2, var3, ..., varN] = array;

// However, extracting certain elements is easier
const list = [1, 2, 3, 4, 5];

const [a, , , b] = list;
console.log(a); // 1
console.log(b); // 4
```

As you can see you can skip the unwanted literals easily.

You can also nest pattern as many as you like:

```js
var [a, [[b], c]] = [1, [[2], 3]];
console.log(a);
// 1
console.log(b);
// 2
console.log(c);
// 3
```

### rest pattern

You can capture the trailing elements of an array using `rest` operator:

```js
var [a, ...b] = [1, 2, 3, 4];
console.log(b); // [2, 3, 4]
```

Bare in mind that if you try to get items outside of array boundary, you will get our friend `undefined` 😏.

## Objects

When destructuring objects you can leave the name of the variable to come from property name or you can specify you own name:

```js
const obj = { foo: 'lorem', bar: 'ipsum' };

const { foo, bar } = obj;
console.log(foo); // lorem

const { myFoo: foo, myBar: bar } = obj;
console.log(myFoo); // lorem
```

Like arrays you can nest and combine as many levels as you like:

```js
const complexObj = {
  first: {
    prop1: 'lorem ipsum',
  },
  arrayProp: ['lorem', { second: 'ipsum' }],
};

let {
  first: { prop1 },
  arrayProp: [, { second }],
} = complexObj;

console.log(prop1); // "lorem ipsum"
console.log(first); // "lorem"
console.log(second); // "ipsum"
```

There is a catch when destructuring objects which is you have to use either var, let or const otherwise you will get error.

```js
{ prop1 } = {prop1 : "lorem"}; // Syntax error
```

This happens because JavaScript engine thinks this is block statement with `{`. The solution is to wrap it in parentheses:

```js
({ prop1 } = { prop1: 'lorem' }); // No errors
```

Last point in destructuring is that you cannot destructure `null` or `undefined` or you get a type error:

```js
var { oops } = null; // TypeError: null has no properties
```

The reason is simple, when using an object assignment, the value which is destructured should be convertible to object. `null` and `undefined` are simply not. When destructuring arrays, the value should have an iterator.

## Where we should use this pattern

#### Simplifying APIs

When you are exposing a function, it is always good to expose it in a way which gets a single parameter instead of multi, since the consumers then have to remember the order of params and whether or not they are optional.

This way you can use one parameter and then destructure it and you can have the benefit of using you code as if you had multiple parameter. This is simpler with an example:

```js
// Before
function worstMethodEver(param1, param2, param3, ...) {
    if (param1) {
        switch(param2) {
            case param3:
                return;
        }
    }
}

// The user calls this like worstMethodEver(1, 2, 3, ...);

// After
function awesomeMethod({param1, param2, param3, ...}) {
    if (param1) {
        switch(param2) {
            case param3:
                return;
        }
    }
}

// The user calls this like awesomeMethod(obj);

```

On top of the previous example we can also provide default value when destructuring:

```js
function awesomeMethod({param1 = "Default lorem", param2, param3, ...}) {
    if (param1) {
        switch(param2) {
            case param3:
                return;
        }
    }
}
```

#### Returning multiple values

Although multiple return values aren't baked into the JS eco system properly, you can return an array and destructure the result:

```js
function returnMultipleValues() {
  return [1, 2];
}
const [foo, bar] = returnMultipleValues();
```

Or with an object:

```js
function returnObject() {
  return {
    foo: 1,
    bar: 2,
  };
}
const { foo, bar } = returnObject();
```

#### importing names from CommonJs modules

This one you've probably used a lot:

```js
const { a, b } = require('module');
```

And with this we're done, hope you now think of ways to use this feature and make your life and others easier 😜.

---
path: '/js-can-do-that/'
author: Yaser Adel Mehraban
date: 2019-06-26
title: 'JavaScript can do that?'
subtitle: ''
popular: true
tags: [webdev, javascript, showdev]
thumbnail: './hdtew.jpg'
cover: ./socialpreview.png
---

You might be wondering why I am writing less these days. I assure you, it's not because I am getting lazy (I am ATM 🤩), it's just that I am on a long overdue holiday. But to keep my juices going, I thought now that I am having fun, let's write a fun post 😊.

<!--more-->

In this post I will go through some of the funniest yet unbelievable JavaScript snippets ever. Are you ready?

## `[]` is equal `![]`

Array is equal to not array 😂:

```js
;[] == ![] // -> true
```

**💡 What's happening?**

The abstract equality operator converts both sides to numbers before comparing them, and both sides will be converted to `0` for different reasons. Arrays are truthy, so the right hand side becomes false which then is coerced to `0`. On the left however, the empty array is coerced to a number without becoming a boolean first, and empty arrays are coerced to `0`, despite being truthy 🤯.

## `true` is `false`

True is false:

```js
!!'false' == !!'true' // -> true
!!'false' === !!'true' // -> true
```

**💡 What's happening?**

`true` is `truthy` and is represented by value 1 (number), `true` in string form, is `NaN`. So:

```js
true == 'true' // -> false
false == 'false' // -> false
```

`false` is not the empty string, so it's a truthy value, so:

```js
!!'false' // -> true
!!'true' // -> true
```

Cool, ha? 😎

## baNaNa 🍌

Let's create a banana:

```js
'b' + 'a' + +'a' + 'a' // -> baNaNa
```

**💡 What's happening?**

This one is an old trick, remixed. The expression is converted to `"ba" + (+"a") + "a"`, and since `"a"` is converted to a number, it becomes `NaN`.

## Let's fail

You wouldn't believe this in your wildest dreams, but:

```js
;(![] + [])[+[]] +
  (![] + [])[+!+[]] +
  ([![]] + [][[]])[+!+[] + [+[]]] +
  (![] + [])[!+[] + !+[]]
// -> 'fail'
```

**💡 What's happening?**

If we break this lot into smaller pieces, we notice that the following pattern occurs often:

```js
![] + [] // -> 'false'
![] // -> false
```

We try adding `[]` to `false`, but because of a number of function calls internally, we'll end up converting the right operand into a string:

```js
![] + [].toString() // -> 'false'
```

Thinking of a string as an array we can access its first character via `[0]`:

```js
'false'[0] // -> 'f'
```

The rest is obvious, but the `i` is tricky. The `i` in fail is grabbed by generating the string `falseundefined` and taking the element on index `['10']`.

## Array equality is evil 👾

Array equality is evil in JavaScript, see below:

```js
[] == ''   // -> true
[] == 0    // -> true
[''] == '' // -> true
[0] == 0   // -> true
[0] == ''  // -> false
[''] == 0  // -> true

[null] == ''      // true
[null] == 0       // true
[undefined] == '' // true
[undefined] == 0  // true

[[]] == 0  // true
[[]] == '' // true

[[[[[[]]]]]] == '' // true
[[[[[[]]]]]] == 0  // true

[[[[[[ null ]]]]]] == 0  // true
[[[[[[ null ]]]]]] == '' // true

[[[[[[ undefined ]]]]]] == 0  // true
[[[[[[ undefined ]]]]]] == '' // true
```

**💡 What's happening?**

The explanation behind this is rather long. So I introduce you to [section 7.2.13 Abstract Equality Comparison](https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison) of the specification.

## `parseInt` is just bad

`parseInt` is famous by its quirks, I just mention one of the most famous ones:

```js
parseInt('f**k') // -> NaN
parseInt('f**k', 16) // -> 15
```

**💡 What's happening?**

This happens because `parseInt` will continue parsing character by character until it hits one it doesn't know. The `f` in `f**k` is the hexadecimal digit `15`.

## `NaN` is ~~not~~ a number

Type of `NaN` is a `number`:

```js
typeof NaN // -> 'number'
```

**💡 What's happening?**

Explanations of how `typeof` and `instanceof` operators work:

- [12.5.5 The `typeof` Operator](https://www.ecma-international.org/ecma-262/#sec-typeof-operator)
- [12.10.4 Runtime Semantics: `InstanceofOperator(O,C)`](https://www.ecma-international.org/ecma-262/#sec-instanceofoperator)

## Comparison of three numbers

This one is gold:

```js
1 < 2 < 3 // -> true
3 > 2 > 1 // -> false
```

**💡 What's happening?**

Why does this work that way? Well, the problem is in the first part of an expression. Here's how it works:

```js
1 < 2 < 3 // 1 < 2 -> true
true < 3 // true -> 1
1 < 3 // -> true

3 > 2 > 1 // 3 > 2 -> true
true > 1 // true -> 1
1 > 1 // -> false
```

You can fix this with greater than or equal operator (`>=`):

```js
3 > 2 >= 1 // true
```

Read more about Relational operators in the specification:

- [12.10 Relational Operators](https://www.ecma-international.org/ecma-262/#sec-relational-operators)

And that's just some of the fun we can have with JavaScript. No wonder some people do not like it, since they don't understand how it works 😂.

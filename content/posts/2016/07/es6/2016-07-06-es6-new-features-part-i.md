---
id: 7
path: '/es6-new-features-part-i/'
title: 'ES6 new features (Part I)'
date: 2016-07-06
author: Yaser Adel Mehraban
popular: false
categories: [ES6, JS]
tags: [ES6, features]
thumbnail: './es6.png'
---

Well for a long time I wanted to write a blog post about migrating Angular 1.x to 2, however, before doing so I thought it is really helpful to write about some prerequisites of that.

<!--more-->

This is the first article in ES6 new features series.

[Part II](/2016/07/07/es6-new-features-part-ii/)

[Part III](/2016/07/11/es6-new-features-part-iii/)

Number one in the list would be ES6. Which is the topic of today's post. ES6 (often referred to as “Harmony”) is the upcoming sixth major release of the ECMAScript language specification.

However, that does not put things in perspective. I prefer to say it is the newest JavaScript implementation, simple as that.

I just briefly list them here and go through one by one:

1.  Default Parameters in ES6
2.  Template Literals in ES6
3.  Multi-line Strings in ES6
4.  Destructuring Assignment in ES6
5.  Enhanced Object Literals in ES6
6.  Arrow Functions in ES6
7.  Promises in ES6
8.  Block-Scoped Constructs Let and Const
9.  Classes in ES6
10. Modules in ES6
    Although it might look like a short list but they are the most important ones.

### 1. Default Parameters in ES6

If you remember previously we had to explicitly specify a value if the coming parameter to a method didn't have one.

```javascript
var bar = function(foo) {
  var temp = foo || 'default value'
}
```

Now it is like one of high level languages such as C#.

```javascript
var bar = function(foo = 'default value') {
  //code goes here
}
```

### 2. Template Literals in ES6

Template literals or interpolation in other languages is a way to output variables in the string. So in ES5 we had to break the string like this:

```javascript
var fullname = firstname + ' ' + lastname
```

In ES6 though you can use the new syntax \${} which is again like C#:

```javascript
var fullname = `Your name is ${firstname} ${lastname}.`
```

### 3. Multi-line Strings in ES6

Previously we had to use + to shape multiple line strings something like this:

```javascript
var fourAgreements =
  'You have the right to be you.' + 'You can only be you when you do your best.'
```

But in ES6 they introduced the multi-line string literal ` which makes life easier:

```javascript
var fourAgreements = `You have the right to be you.
    You can only be you when you do your best.`
```

### 4. Destructuring Assignment in ES6

This can be a little confusing as there is some logic behind it. In ES5 when we wanted to extract  some properties from an object we should define them as below:

```javascript
var data = $('body').data(), // data has properties cat and mouse
  house = data.cat,
  mouse = data.mouse
```

In ES6, we can replace the ES5 code above with these statements:

```javascript
var { cat, mouse } = $('body').data() // we'll get house and mouse variables
```

### 5. Enhanced Object Literals in ES6

First of all let's see what is an object literal. An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces (`{}`).

What you can do with object literals now in ES6 is mind blowing! It has started from something like a glorified JSON in ES5 to something like a class in ES6.

```javascript
var sales = 'Toyota'

function carTypes(name) {
  if (name === 'Honda') {
    return name
  } else {
    return "Sorry, we don't sell " + name + '.'
  }
}

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: sales }

console.log(car.myCar) // Saturn
console.log(car.getCar) // Honda
console.log(car.special) // Toyota
```

Additionally, you can use a numeric or string literal for the name of a property or nest an object inside another. The following example uses these options.

```javascript
var car = { manyCars: { a: 'Saab', b: 'Jeep' }, 7: 'Mazda' }

console.log(car.manyCars.b) // Jeep
console.log(car[7]) // Mazda
```

In ES6 Object Literals are extended to support setting the prototype at construction, shorthand for `foo: foo` assignments, defining methods, making super calls, and computing property names with expressions.

```javascript
var obj = {
  // __proto__
  __proto__: theProtoObj,
  // Shorthand for ‘handler: handler’
  handler,
  // Methods
  toString() {
    // Super calls
    return 'd ' + super.toString()
  },
  // Computed (dynamic) property names
  ['prop_' + (() => 42)()]: 42,
}
```

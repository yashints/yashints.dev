---
path: '/string/'
author: Yaser Adel Mehraban
date: 2020-05-11
title: "All you need to know about string in JavaScript \U0001F9F5"
popular: true
tags: [showdev, webdev, javascript, string]
cover: ./socialpreview.png
---
 
`String` is one of the primitive types in JavaScript and we use it in every project we work on no matter what. But how familiar are you with the methods available in JavaScript to work with a string variable? Let's have a quick look at those in this article.

<!--more-->

## Introduction

A primitive value such as "Yas" doesn't have any methods or properties, mainly because it's not an object. But with JavaScript, methods and properties are available because it treats primitive values as objects.

Let's have a look at the simplest method you have most definitely used:

## String length

The `length` property returns the length of a string:

```js
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
console.log(alphabet.length); // 26
```

Pay attention on how `length` property is available on a primitive type. Not all languages are following the same principle when dealing with such behaviour though. In `PHP` we have helper functions:

```php
<?php
echo strlen("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
?>
```

## Finding a text in string

There are a few methods to help you find a sub-string in a `String`. Let's go through them and see what are their differences:

### `indexOf`

The `indexOf` method returns the index of the **first** occurrence of a specified text in a string:

```javascript
const txt = "Can you find Yas in 'dryasdust'?";
console.log(txt.indexOf('yas')); // 23
```

There a few points you need to know here. First, JavaScript counts positions from zero, and second, `indexOf` is case sensitive.

```js
const txt = "Can you find Yas in 'dryasdust'?";
console.log(txt.indexOf('Yas')); // 13
```

This method returns `-1` if it can't find the text:

```javascript
const txt = "There is no 0 in 11";
console.log(txt.indexOf('zero')); // -1
```

You can pass a second argument to let the `indexOf` know where to start looking for the text:

```javascript
const txt = "We have SQL and no-SQL databases!";
console.log(txt.indexOf('SQl', 10)); // 19
```

### `lastIndexOf`

As the name suggests, `lastIndexOf` is used to find the last occurrence of a text in a string.

```javascript
const txt = "Can you find Jam in 'JamStack'?";
console.log(txt.indexOf('Jam')); // 21
```

This method also returns `-1` if it can't find the text you're looking for, and takes a second parameter to start the search. However, since this method starts the search backward, the second parameter acts as cutting the string from that position to the end:

```javascript
const txt = "Can you find Jam in 'JamStack'?";
console.log(txt.lastIndexOf('Jam', 6)); // -1
```

### `search`

The `search` method also searches the string for a text and returns the **first** occurrence of the text:

```javascript
const txt = "Can you find Jam in 'JamStack'?";
console.log(txt.search('Jam')); // 13
```

You might think that `search` and `indexOf` are the same. However, there are differences in these two:

* `search` doesn't accept any other parameter
* `indexOf` cannot take powerful search values such as regular expressions

That's right, `search` will accept regex as argument as well, for example, to perform a case insensitive search you might want to use `search` instead of `indexOf`:

```javascript
const txt = "There is Jam in JamStack!";
console.log(str.search(/jam/i)); // 9

console.log(txt.indexOf('jam')); // -1
```

You can also search for non usual patterns, e.g. finding any character that is not a word or whitespace:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.search(/[^\w\s]/g)); // 24
```

### `endsWith`

The `endsWith` methods checks whether the string ends with the specified text. It returns `true` if it does, and `false` if it doesn't:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.endsWith("Stack!")); // true
```

> 💡 This method is case sensitive.

### `startsWith`

Similar to `endsWith`, this method checks whether a string starts with the specified text. This method is also case sensitive:

```javascript
const txt = "JamStack's got Jam";
console.log(txt.startsWith("JamStack")); // true
```

### `includes`

`includes` allows you to check whether or not a string contains a specified text and is case sensitive:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.includes("in")); // true
console.log(txt.includes("Jam")); // true
console.log(txt.includes("jam")); // false
```

### `localeCompare`

`localeCompare` will compare two strings in the current locale. It returns a negative number indicating if the reference string occurs before the compare string, positive if it occurs after, and `0` if they are equivalent:

```javascript
const a = 'réservé'; 
const b = 'RESERVE';
console.log(a.localeCompare(b)); // 1
console.log(a.localeCompare(b, 'en', { sensitivity: 'base' })); // 0
```

## Extracting sub-strings

There are three methods which allow you to extract part of a string.

### `slice`

`slice` extracts part of a string and returns the extracted part in a new string. It takes two arguments, start position, and end position (the end position will not be included).

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.slice(9, 12)); // Jam
```

If you pass a negative value, it will start from the end of the string:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.slice(-16, -13)); // Jam
```

You can omit the second parameter, and it will extract from start to the end of the string:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.slice(16)); // JamStack!
```

### `substring`

The `substring` method is similar to `slice` but it won't accept negative indexes:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.substring(16)); // JamStack!
console.log(txt.substring(9, 12)); // Jam
```

### `substr`

`substr` method is similar to `slice` with one difference that the second parameter is the length of the text to be extracted and not the position:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.substr(9, 3)); // Jam
```

And if you omit the second parameter, it will extract to the end of the string. Furthermore, if the index you pass is negative, it will count from the end:

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.substr(-9)); // JamStack!
```

### `split`

Although this method is not directly used for extracting a text value, it's good for splitting the string value by a character and return an array of substrings:

```javascript
const txt = "There is Jam in JamStack!";
const words = txt.split(' ');
console.log(words[4]); // JamStack!
```

A few points regarding this method:

* The simplest case is a single character, also referred to as delimiter. For example you can split a tab separated value (TSV) by using `str.split("\t")`.
* If the separator contains multiple characters, that entire string needs to be found.
* If the separator cannot be found, the return value is an array with one element containing the whole string.
* If the separator appears at the beginning or end of the array, it still counts. Meaning the return value is an array with a string value, and one empty string item either at the start or at the end of the array.
* If you pass an empty string `"` as the separator, it splits the string into single UTF-16 characters.

```javascript
const txt = "There is Jam in JamStack!";
console.log(txt.split('Jam')); // ["There is ", " in ", "Stack!"]
console.log(txt.split('test')); // ["There is Jam in JamStack!"]
console.log(txt.split('There')); // ["", " is Jam in JamStack!"]
console.log(txt.split('')); // ["T", "h", "e", "r", "e", " ", "i", "s", " ", "J", "a", "m", " ", "i", "n", " ", "J", "a", "m", "S", "t", "a", "c", "k", "!"]
```

## Replacing string content

The `replace` method, as the name suggests, replaces a part of the string with the provided text:

```javascript
const txt = "Who's awesome!";
console.log(txt.replace("Who's", "You're")); // You're awesome!
```

> 💡 This method doesn't change the original string, it returns a new one. 

By default, it's **case sensitive** and just replaces the **first** match:

```javascript
const txt = "This 🐶 is a good 🐶!";
console.log(txt.replace("This", "That")); // This 🐶 is a good 🐶!
console.log(txt.replace("🐶", "🐕‍🦺")); // This 🐕‍🦺 is a good 🐶!
```

To do a case insensitive replace or to replace all matches, you could use regex:

```javascript
const txt = "This 🐶 is a good 🐶!";
console.log(txt.replace(/THIS/i, "That")); // That 🐶 is a good 🐶!
console.log(txt.replace(/🐶/g, "🐩")); // This 🐩 is a good 🐩!
```

## Case conversion

To convert a string to uppercase or lowercase you can use `toUpperCase` and `toLowerCase` respectively:

```javascript
const txt = "What's up bro!";
console.log(txt.toLowerCase()); // what's up bro!
console.log(txt.toUpperCase()); // WHAT'S UP BRO!
```

We also have `toLocaleLowerCase` and `toLocaleUpperCase` methods to convert according to user's current locale:

```javascript
const dotted = 'İstanbul';
console.log(`EN-US: ${dotted.toLocaleLowerCase('en-US')}`); // "i̇stanbul"
console.log(`TR: ${dotted.toLocaleLowerCase('tr')}`); // "İSTANBUL"
```

## Concatenation

You can use `concat` to join two strings together (like `+` operator):

```javascript
let message = "Hello" + " " + "World!";
console.log(message); // Hello World!
message = "Hello".concat(" ", "World!");
console.log(message); // Hello World!
```

## Trimming and padding

### `trim`

To remove whitespace from both sides of a string value, you can use the `trim` function:

```javascript
let message = "     Hello World!     ";
console.log(message.trim()); // "Hello World!"
```

> 💡 Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.).

### `padStart`

The `padStart` method adds a given string at the start of the original string (multiple times, if needed), until the resulting string reaches the given length.

```javascript
const str1 = '5';
console.log(str1.padStart(6, '0')); // 000005
```

### `padEnd`

The opposite of `padStart` is the `padEnd`. 

```javascript
const txt = 'OMG Jam';
console.log(txt.padEnd(25, '.')); // OMG Jam..................
console.log('OMG Jam'.padEnd(10)); // "OMG Jam   "
```

## Getting the string value

There are two methods where you can get the value of a string in JavaScript. You might say, Yas are you crazy, we already have the value in the variable. But remember that I said JavaScript treats a string variable as an object under the hood, so these methods come from the `Object.prototype`.

### `valueOf`

The `valueOf` returns the primitive value of an object. For string values, JavaScript does it for you under the hood whenever you invoke a method which needs the primitive value. But you can also call this method to get it:

```javascript
const txt = "Yas";
console.log(txt.valueOf()); // "Yas"
```

### `toString`

Similar to the above method, `toString` is used to return the value of a string.

```javascript
const stringObj = new String('Yas');
console.log(stringObj); // String {"Yas"}

console.log(stringObj.toString()); // "Yas"
```

## `repeat`

This method is my personal favourite. You can pass a number to the `repeat` method and it returns your string repeated by that number. It's really good if you want to have some long text generated for testing purposes:

```javascript
const txt = "Lorem ipsum faked,";
console.log(txt.repeat(5)); // Lorem ipsum faked,Lorem ipsum faked,Lorem ipsum faked,Lorem ipsum faked,Lorem ipsum faked,
```

## Character methods

### `charAt`

The `charAt` returns a new string consisting of the single UTF-16 code unit which is located at the index specified:

```javascript
const txt = "There is Jam in JamStack!";
const index = 4;
console.log(`The character at index ${index} is ${txt.charAt(index)}`); // "The character at index 4 is r"
```

### `charCodeAt`

The `charCodeAt` returns an integer between `0` and `65535` representing the UTF-16 code unit at the given index:

```javascript
const txt = "There is Jam in JamStack!";
const index = 4;
console.log(`The character code at index ${index} is ${txt.charCodeAt(index)}`); //The character code at index 4 is 101
```

### `codePointAt`

The `codePointAt` method returns a non negative integer representing the Unicode point value of the specified index:

```javascript
const icons = '☃★♲';
console.log(icons.codePointAt(1)); // "9733" 
'\uD800\uDC00'.codePointAt(0)  // 65536
```

## `normalize`

And last, but not least, the `normalize` method returns the Unicode normalisation form of a string:

```javascript
const myAlias = '\u0059\u0061\u0073\u0068\u0069\u006e\u0074\u0073';
console.log(`${myAlias}`); // Yashints
```

## Summary

Hope you enjoyed reading this and learnt a few tricks which could help you at what you do day to day. And let's finish this article with a joke:

> What do you call it when Wilhelm II makes a string of bad puns? 👉🏽
A Kaiser roll
---
path: 'chromedevtools/'
title: 'Chrome DevTools'
subtitle: 'can do that'
date: 2019-01-13
author: Yaser Adel Mehraban
popular: true
categories: [chrome, devtools, tips and tricks]
tags: [chrome, devtools, tips and tricks]
thumbnail: './chrome-dev-logo-icon.png'
---

[Google Chrome](https://www.google.com/chrome/) is currently one of the most popular web browsers used by developers today. The [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) can greatly improve your workflow by helping you develop, test and debug your websites right within your browser.

<!--more-->

However, there are tons of tips and tricks that we don't know about it which can help us even further. Just because we don't see them in menus doesn't mean we shouldn't use them to boost our productivity.

So I got inspired by [VS Code can do](https://vscodecandothat.com/) that series by by [Burke Holland](https://twitter.com/burkeholland) and [Sarah Drasner](https://twitter.com/sarah_edo) and decided to write about these here. Hope it helps you as it's helping me and many others day by day 👌.

Are you ready? Here we go:

## Screen shots

You can capture a full page screen shot or what is in the screen without any extension. Simply press <kbd>CTRL</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> for windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> for Mac users, to open up the command pallet and type `screenshot` to see the menu of three options:

- Capture full size screenshot
- Capture screenshot
- Capture node screenshot

Selecting any of those options will save an image of the website to your computer.

![Chrome DevTools Screenshot](./screenshot.gif)

## Drag and Drop in elements panel

I didn't know this until last week and it's awesome. You can drag and drop elements wherever you want inside elements panel and it would reflect the changes in the page. It's very good if you want to quickly see how things look like with small changes.

![Chrome DevTools Drag Drop](./drgdrop.gif)

## Pretty Print { } minified source code

Sometimes you like to see the source code formatted like the original code. This makes more sense in terms of CSS rules or code which is not uglified. This built in feature has saved me some time when debugging CSS rules. Simply press `{}` at the bottom of the page.

![Chrome DevTools pretty print](./prettyprint.gif)

## Reference the selected element in console

Sometimes you might want to manipulate an element using JavaScript rather than changing the HTML inside element panel.

![Chrome DevTools reference element](./refelement.gif)

## Watch expressions

Many times you would like to watch a particular expression to see how it changes under certain circumstances. This is really easy, simply add the expression to watch section:

![Chrome DevTools watch expression](./watch.gif)

And as you saw you can see the last expression using `$_`.

## Snippets

We all have some repetitive piece of code we use time to time. From a template for an click handler to a document ready function, it can be anything really. That's where the code snippets section comes in handy. You can store a snippet and use it real easy. Just open the snippet section and click `new`. Write your snippet down and whenever you want to use it, press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> for windows and <kbd>Cmd</kbd>+<kbd>Enter</kbd> for Mac users, or right click and press `run`.`

![Chrome DevTools code snippets](./snippet.gif)

## Overriding location

If you are writing a web application with information depending where the user is, you might want to check the app behaves as expected with user's location. That's where location override in Chrome DevTools is very useful. Simply press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> for windows and <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> for Mac users, to open the command pallet, type `sensors`, and then select a different location from override location drop down. You can even set it to a custom latitude and longitude if you have them.

![Chrome DevTools location override](./locationoverride.gif)

## Editing any text on screen

Sometimes you have a limited width and want to see how a long text looks like on the page. Or you simply are checking whether ellipsis appear if the text is long enough. Chrome DevTools has a feature called design mode which you can set it on in the console and then change any text you want and watch the changes on the fly. Super cool right? 😎

![Chrome DevTools design mode](./designmode.gif)

That's it for this post. Keep an eye out for the second post 👀.

Also if you likes this post please spread the word and share it 👍.

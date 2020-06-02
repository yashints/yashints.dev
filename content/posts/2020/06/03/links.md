---
path: '/links/'
author: Yaser Adel Mehraban
date: 2020-06-03
title: "Links and JavaScript 🔗"
popular: true
tags: [showdev, webdev, javascript, links]
thumbnail: './link.jpg'
---

I see some occasions where web developers who are a bit less familiar with accessibility use links incorrectly in different forms. So I thought let's write a quick guide on _Links_ in JavaScript apps.

<!--more-->

## Background

It's safe to assume that anyone who's used the web have seen them. They take users from one page to another either within the same application or to an external website. There were really hot when they were introduced back in **1966** by a team led by [Douglas Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart). 

In the early 1980s _Ben Shneiderman_, a computer scientist at the University of Maryland, with his graduate student _Dan Ostroff_ were preparing a videodisk exhibit for a museum. It was then where they used a caption that had all the information and users could click on it to see the photo associated with it.

At first, this discovery was called `embedded menu` but that term was quickly replaced by `hyperlink`. [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) cited Shneiderman’s hyperlink work in his spring 1989 manifesto for what would become the World Wide Web.

Back then, this feature was super hot and it still is. People use it without even thinking about it and it's become a natural part of the web.

## Enough background, tell me what's this all about

Let's review what they do:

* As mentioned before they allow users to navigate between pages within a site or to an external one.
* And more importantly they help search engines and bots to find resources and going from one page to another by following the links. Think of this as a giant maze where they need to blindly follow the links to discover stuff.
* And last, the crawlers use them to understand the architecture of a site and the type of content they have. It's a critical part of their decision making when assigning a page to a specific topic.

## But how do you make a link?

### `a` tag with `href`

Turns out it's not as straightforward as one might think. The simplest way to put a link on your site is to use a good old `<a>` tag with a `URL` which it points to in the `href` attribute.

```html
<a href="/elsewhere">A good link, YES ╰(*°▽°*)╯</a>
```

### `a` tag with `href` and event handler

For those with special circumstances, they might sprinkle a little bit of JavaScript on top and use an event handler to navigate the user programmatically:

```html
<a href="/elsewhere" onclick="goTo('elsewhere')">Okay ¯\_(ツ)_/¯</a>
```

This is fine as the link stays functional and you can upgrade the functionality using JavaScript. 

### `a` tag without `href`

But some people decide to remove the `href` attribute. This is not a good idea because you now prevented crawlers to find out where this link goes to:

```html
<a onclick="goTo('elsewhere')">Please don't ╯︿╰</a>
```

### `a` tag with `href` but no link

In other occasions, people use the `href` attribute without a URL or with a pseudo URL:

```html
<a href="javascript:goTo('elsewhere')">Seriously? (⊙_⊙)？</a>
```

This is even worse than the previous case as it just confuses the hell out of every crawler out there.

### using `button`

You might think it's a good idea to use a button to navigate the user, but let me tell you, that's not a good idea either. The rule of thumb is that if the purpose is to do something on the current page, it could be a button. But if it's takes users to another page or to an external site, it should be a link.

```html
<button onclick="goTo('elsewhere')">But why? <( _ _ )> </button>
```

### any other HTML element

It's worth noting that you shouldn't simulate a link using any other HTML element and add a click handler with JavaScript:

```html
<div onclick="goTo('elsewhere')">NOOOOOOOOOOOOOOOO!!!!!!!!!!!! (#`O′)</div>
```

This not only wrong for crawlers, but also messes up the screen readers and causes a lot of trouble for people with any vision impairment. So please just use a link with a proper URL.

## What is a proper URL? I hear you ask

You saw we ruled out the pseudo URLs like `javascript:doSomething()`, but let's take a look at URLs more closely. 

```text
http://example.com/old-school-url

example.com/page#section
```

A URL contains these elements:

* A protocol (optional), which defines the protocol to be used for navigation such as `http`, or `https`.
* It also has a host, `example.com` or `yashints.dev`. A host is a name that one or some computers respond to. Usually it points to an IP address.
* It has a path to specific asset on that computer such as an HTML file, an image, CSS file or a font. But that's not always the case, sometimes the path is handled via JavaScript and is used to replace part of the content in a page. This technique is called Single Page Application or SPA.
* Some URLs might contain another part such the second example above. That part which comes after the `#` sign, is called a fragment identifier. By itself a fragment identifier is not a piece of content. It just points to a specific part in the content such as a header.

> 💡 Because fragments are not suppose to point to different content, crawlers ignore them altogether. This means for single page applications where they use fragment like routing, crawlers don't follow them and that's why people use techniques such as server side rendering or SSR to allow crawlers become aware of the page's content.

## Summary

To sum it all up:

* Use proper link markup, `a` tag with `href` attribute.
* Do not use other HTML elements to navigate users.
* Do not omit the `href` attribute on an anchor tag.
* And last but not least, do not use fragment identifiers to load different content in SPAs if you can.

Hope you've enjoyed reading this and thanks for drooping by. Until next article, Ta.
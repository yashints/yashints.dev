---
path: '/scrol-to-text/'
author: Yaser Adel Mehraban
date: 2020-06-14
title: "Did you know about scroll to text? 📜"
popular: true
tags: [showdev, webdev, javascript, scrolltotext]
---

You probably have used fragments in links to point a link to a part of your page such as a heading. This technique is used in table of content for example and it's a common pattern.

<!--more-->

## Background

To extend the current support for scrolling to an anchor element in a page, the W3C have proposed a solution which basically adds the ability to link to a DOM element with id, or textual content on a page to make it easier for browsers to understand what the users are interested and scroll there when they visit the page. In addition to make it visually easier to follow, they have added the highlight to the text so that users will know where to look at on first sight.

## Scroll to Text Fragment

So that's how [Scroll to Text Fragment](https://github.com/WICG/scroll-to-text-fragment) was born. It has been shipped to Chrome and Microsoft Edge called [Scroll to Text Fragment](https://github.com/WICG/scroll-to-text-fragment) which allows you to link to a specific text on a page, using a fragment provided in the URL. When the page is loaded, the browser highlights the text and scrolls it into view.

This is the generic syntax:

```
#:~:text=[prefix-,]textStart[,textEnd][,-suffix]
          context  |-------match-----|  context
```

> 💡 Square brackets indicate an optional parameter.

Here is an example:

```html
<a href="https://yashints.dev/#:~:text=Meet&text=Yas">
  Click to go to a specific portion of a page
</a>
```

And you can test it live by [clicking here](https://yashints.dev#:~:text=Meet&text=Yas).

If you want to target an exact text:

```html
<a href="https://yashints.dev/#:~:text=almond%20croissant%20addict">
  Click to go to a specific portion of a page
</a>
```

[Try it here](https://yashints.dev/#:~:text=almond%20croissant%20addict).


You can also add an end text in which case the text directive refers to a range of text on the page.

```html
<a href="https://yashints.dev/#:~:text=Although,web%20developer">
  Click to go to a specific portion of a page
</a>
```

[Try it here](https://yashints.dev/#:~:text=Although,web%20developer).


## Use cases

### Search engines

When search engines will link to pages which contain relevant information to the query, they will scroll and highlight that so the user will find it easier.

### Citation / Reference links

Links are sometimes used as citations on some pages where the author wishes to enforce a claim by pointing to a reference such as _Wikipedia_. These reference pages can contains large chunks of text and finding the information can be difficult. So having the ability to scroll to that section and highlight it is really encouraging to readers to follow the links.

### Sharing a specific text or paragraph

Sometimes you want to share a piece of text to someone for example by email or on social media, it's really helpful to be able to link directly to the specific section rather than the whole page.

Nowadays people share short snippets directly in tweets or create screenshots which can contain more text and post those. With this they won't need to do that since links can be more meaningful.

## Summary

And that's how the web is moving towards a better place where users are the centre of attention for us developers and the more we know how to make their lives easier the more they trust us to take care of it for them.

Enjoy your evening and till next time 👋🏽.
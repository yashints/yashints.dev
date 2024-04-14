---
id: 1
path: '/how-to-show-or-hide-content-without-any-js-library-or-code/'
title: 'How to show or hide content without any JS library or code'
date: 2016-06-18
author: Yaser Adel Mehraban
popular: false
categories: [css, Html, JQuery, JS]
tags: [css, html, javascript, Jquery]
---

Mentioning this is trivial as no one seems to notice this while using default JQuery show and hide methods to show or hide an element on a page. As you might have noticed this before when you use `hide()`, the element gets a  `display:none;` style. The problem is when you use `show()` to show the element again and here is when you see`display:block;` is added to element styles.

<!--more-->

The problem compounds when animations get added into the mix (tons of inline CSS). I’m not saying don’t use them, but there are better ways and you can clean up after yourself in the DOM. Here’s an example for a simple hide/show.

## HTML

```html
<a href="#target1" class="trigger">Toggle Content area 1</a>
<div id="target1" class="content">the content you want to hide/show</div>
```

## CSS

```css
// with this method I get to choose how I want to hide the content
.is-hidden {
  position: absolute;
  top: -9999px;
  left: -9999px;
}

// and I can easily make it work w/o JS
.content:target {
  position: static;
}
```

## JavaScript

```javascript
$('.trigger').on('click', function(e) {
  e.preventDefault();

  var target = $(this).attr('href'); // returns #target1

  // see if the target area is hidden
  if( $(target).hasClass('is-hidden') ) {

    // if it's hidden, remove the class, but hide it so we can softly fade it in
    $(target).removeClass('is-hidden').hide().fadeIn(250, function(){

      // because fadeIn() adds some inline CSS, let's remove it to clean up the DOM
      $(target).removeAttr('style');
    });
  } else {

    // fade out the content
    $(target)fadeOut(250, function(){

     // once it's faded out, add the class and clean up the DOM
     $(this).addClass('is-hidden').removeAttr('style');
    });
  }
});
```

## Why should you be concerned?

I’ve been using this method for a very long time. I prefer it because it’s a cleaner separation between CSS and JavaScript and I’m not forced to use jQuery’s hide/show method of `display:none` (which really isn’t good for accessibility).

Of course, the `fadeIn()` method could also be moved into a CSS animation at this point to clean this up even further.

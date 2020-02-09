---
path: '/marquee/'
author: Yaser Adel Mehraban
date: 2020-02-09
title: "Retro HTML, let's create marquees 😃"
popular: true
tags: [webdev, showdev, html, marquee]
---
 
One of the first things I learnt to do with HTML was using marquee to move text across the screen horizontally. It was so cool to be able to create advertisements on a page and make users notice things with just a tag. Of course people overused it and then it became a out of fashion item in the new designs just like baggy jeans from 90s.

<!--more-->

## History

The HTML `<marquee>` element was used to insert a scrolling area of text. You could control what happened when the text reached the edge of it's area using its attribute. Of course when I use past tense it doesn't mean it's not supported anymore. It became obsolete a while back, but most browsers still support it.

You can see it in action:

<iframe height="265" style="width: 100%;" scrolling="no" title="Marquee" src="https://codepen.io/yashints/embed/preview/QWbwVKr?height=265&theme-id=default&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/QWbwVKr'>Marquee</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## CSS marquees

So I want to simulate some of these with just CSS. We'll be using animations and play with overflow to simulate text reaching to the edge.

### Scrolling text

So let's play with `translateX()` to specify the content placement at the start and end of the animation. We'll use this to keep the text moving between start and end.

For the animation we will use an infinite linear with 20 seconds duration.

```css
.marquee {
  height: 50px;
  overflow: hidden;
  position: relative;
}
.marquee span {
  font-size: 2em;
  color: turquoise;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  transform:translateX(100%);
  animation: cssmarquee 10s linear infinite;
}
@keyframes cssmarquee {
  0% {
  transform: translateX(100%);
  }
  100% {
  transform: translateX(-100%);
  }
}
```

And the HTML is simple:

```html
<div class="marquee">
  <span>Scrolling Text </span>
</div>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS-Marquee-ScrollText" src="https://codepen.io/yashints/embed/preview/ZEGYMLw?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/ZEGYMLw'>CSS-Marquee-ScrollText</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Slide in

Now let's slide in the text and fix it at the beginning. We'll use `ease-out` with a `200%` value for `translateX` start and `0%` for the end.

```css
.marquee {
  height: 50px;
  overflow: hidden;
  position: relative;
}
.marquee span {
  font-size: 2em;
  color: green;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: left;
  animation: cssmarquee 10s ease-out;
}
@keyframes cssmarquee {
  0% {
    transform: translateX(200%);
  }
  100% {
    transform: translateX(0%);
  }
}
```

I won't repeat the `HTML` code again to save some typing 😁. It's exactly as above.

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS-Marquee-SlineIn" src="https://codepen.io/yashints/embed/preview/wvaBEJp?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/wvaBEJp'>CSS-Marquee-SlineIn</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Left to right

Now let's move the text from left to right this time. Again, we'll use a linear infinite animation with the reverse values for `translateX` as our first example.

The only other difference will be the initial value for transform property.

```css
.marquee {
  height: 50px;
  overflow: hidden;
  position: relative;
}
.marquee span {
  font-size: 2em;
  position: absolute;
  width: 100%;
  height: 100%;
  color: green;
  margin: 0;
  line-height: 50px;
  text-align: center;
  /* Starting position */
  transform: translateX(-100%);
  animation: cssmarquee 20s linear infinite;
}
@keyframes cssmarquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS-Marquee-L2R" src="https://codepen.io/yashints/embed/preview/xxGbarb?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/xxGbarb'>CSS-Marquee-L2R</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Scroll vertically

By now you should be comfortable guessing what will be using. Instead of `translateX`, we will be using `translateY`.

```css
.marquee {
  height: 100px;
  overflow: hidden;
  position: relative;
}
.marquee span {
  font-size: 2em;
  position: absolute;
  color: green;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  transform: translateY(-100%);
  animation: cssmarquee 5s linear infinite;
}
@keyframes cssmarquee {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
```

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS-Marquee-Down" src="https://codepen.io/yashints/embed/preview/LYVEJjG?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/LYVEJjG'>CSS-Marquee-Down</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Bouncing text

Now let's assume back then people wanted to get fancy. We want to bounce the text this time 😃. We will need to add `alternate` to our animation and reduce the delay. We will also add `trnslateX` so that the content doesn't bounce off the whole page.

```css
.marquee {
  height: 200px;
  overflow: hidden;
  position: relative;
}
.marquee span {
  font-size: 2em;
  position: absolute;
  color: turquoise;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  transform: translateY(70%);
  animation: cssmarquee 1s linear infinite alternate;
}
@keyframes cssmarquee {
  0% {
    transform: translateY(70%);
  }
  100% {
    transform: translateY(0%);
  }
}
```

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS-Marquee-Bounce" src="https://codepen.io/yashints/embed/preview/ZEGYMJP?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/ZEGYMJP'>CSS-Marquee-Bounce</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Typewriting effect

Now this time we want to mix our animation with a bit of stepping to create a typewriter effect. We will be using `from` and `to` for our keyframes. Then use `steps` and `step-end` to simulate the text and blink cursor effect.

```css
body {
  font-family: 'Special Elite', cursive;
  background: #efefef;
  padding-top: 5em;
  display: flex;
  justify-content: center;
}

.typewriter h1 {
  overflow: hidden; 
  border-right: .15em solid green; 
  white-space: nowrap;
  margin: 0 auto; 
  letter-spacing: .15em; 
  animation: 
    type 4s steps(50, end),
    blink-cursor .7s step-end infinite;
}

@keyframes type {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-cursor {
  from, to { border-color: transparent }
  50% { border-color: green; }
}
```

Don't forget to add the `Special Elite` font from Google fonts.

```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Special+Elite&display=swap" rel="stylesheet">
</head>
```

<iframe height="265" style="width: 100%;" scrolling="no" title="CSS-Marquee-TypeWriter" src="https://codepen.io/yashints/embed/preview/qBdEMxb?height=265&theme-id=default&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/yashints/pen/qBdEMxb'>CSS-Marquee-TypeWriter</a> by Yaser Adel Mehraban
  (<a href='https://codepen.io/yashints'>@yashints</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Summary

That was it. You can go back to whatever important job you were doing. A bit of distraction is always good for me and hope this bit was good for you too 😊. Until next time 👋🏼.
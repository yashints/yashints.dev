---
path: 'angular-virtual-scroll/'
title: 'Angular Virtual Scrolling'
subtitle: 'Improve the performance with little effort'
date: 2018-12-06
author: Yaser Adel Mehraban
categories:
  [angular, virtual scroll, performance tuning]
tags:
  [angular, virtual scroll, performance tuning]
thumbnail: './vscroll.jpg'
---

If you have followed my series on performance improvement, you would've stumbled upon my [image optimisation post](/blog/2018/11/10/web-perf-4) where I went through a series of steps to lazy load images on your page.

<!--more-->

## Problem

When you have many items in your page, regardless of their nature (text, images, video, etc), it tends to slow down your page tremendously. There are ways to get around this but you should put too much effort into this.

When it comes to Angular, it gets even worst since this can cause really slow scrolling, plus you have to do dirty check on each of these nodes.

But fear not, I have good news for you, with Angular V7 out, there is a new feature called [Virtual Scroll](https://material.angular.io/cdk/scrolling/overview) which allows you to displays large lists of elements in a performing way by only rendering the items that fit on-screen. This may seem trivial but I am here to prove you wrong.

## DOM nodes

To prove its benefits, I created an application which has a list of thousands items containing a title and an image.

Then I used the virtual scroll feature to see how many DOM nodes are created at each time when I scroll and here is the result:

![Virtual Scrolling only loads 5 nodes](./vscrolldom.gif)

As you can see from the picture, it only loads 5 items at a time no matter where I am in the list. This is specifically good if you want to implement infinite scrolling behaviour on mobile 🔥.

## Network calls

To even make it better, I used the site [Lorem Picsum](https://picsum.photos/) to give each item a different image (to prevent the browser from caching the image) and since only five `DOM` nodes are created at a time, the network calls are also done accordingly.

![Virtual scroll network calls when scrolling](./vscrollnetcall.gif)

Remember we had to use the `Intersection API` to achieve this. It's very convenient isn't it? 👌

## How to do it

Ok, let's get to how to implement this. First let's create a new project using [Angular CLI](https://cli.angular.io/):

```bash
ng new virtual-scroll
```

With the newer versions of CLI it prompts you to specify whether you will need routing module and what is the default style file format (CSS/SCSS, etc.).

Now you will need to add the CDK package:

```bash
npm i -s @angular/cdk
```

[[info]]
|**Note:** You will have to navigate to the virtual-scroll folder first.

Once done open the created folder with your editor of choice #VSCode 😁, and open your `app.module.ts` file.

Import the `ScrollingModule` and `ScrollDispatcher` from CDK and add them to your module:

```ts
import {
  ScrollingModule,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ScrollingModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
  ],
  providers: [ScrollDispatcher],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

[[info]]
|**Note:** I am using Material Design and that's why I have more imports.

Now open your `app.component.ts` file (feel free to create a new component if you like, I am just hacking something together 🤷‍) and create an array of 1000 items containing a title and an image:

```ts
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IImage {
  title: string;
  src: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  images: IImage[] = Array.from(
    new Array(1000),
    (x, i) => ({
      title: `Image #${i}`,
      src: `https://picsum.photos/200/?${i}`,
    })
  );

  observableImages = new BehaviorSubject<
    IImage[]
  >(this.images);
}
```

I am using a subject behavior from RxJs just to simulate having an observable and loading data async from server.

Now in the `app.component.html` add we need to add the `cdk-virtual-scroll-viewport` and give it an `itemSize` which has a pixel unit.

This is basically where everything is glued together.

When all items are the same fixed size (in this case all cards have the same height), you can use the `FixedSizeVirtualScrollStrategy`. This can be easily added to your viewport using the `itemSize` directive. The advantage of this constraint is that it allows for better performance, since items do not need to be measured as they are rendered.

```html
<cdk-virtual-scroll-viewport
  class="list-container lg"
  [itemSize]="200"
>
  <div
    *cdkVirtualFor="let image of observableImages | async;"
  >
    <mat-card class="example-card">
      <mat-card-header>
        <div
          mat-card-avatar
          class="example-header-image"
        ></div>
        <mat-card-title
          >{{image.title}}</mat-card-title
        >
        <mat-card-subtitle>WoW</mat-card-subtitle>
      </mat-card-header>
      <img
        mat-card-image
        [src]="image.src"
        alt="Random photo"
      />
      <mat-card-content>
        <p>
          This is a random image selected from
          LoremPicsum.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  </div>
</cdk-virtual-scroll-viewport>
```

All I have here is a container with `200px` as `itemSize`. Inside I am creating a `div` in a loop over my list asynchronously and giving it a title, and an image.

The `HTML` for card is from [Angular Material examples](https://material.angular.io/components/card/examples).

And that's it. Now run `ng serve` in VSCode terminal and open up a browser and navigate to `localhost:4200`.

## Done

And that's it. Look at how easy it is to implement a lazy loading strategy for items in a list in Angular with their new `Virtual Scroll` feature with so little code required.

You can read more about this feature on [Angular Material website](https://material.angular.io/cdk/scrolling/overview) and the code for this example is available on [my GitHub repository]().

If you liked the post please spread the word so other people can benefit from using this new feature 🙏.

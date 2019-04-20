---
path: 'angular-preloading/'
title: 'Boost up your performance using Angular preloading strategy'
date: 2018-06-20
author: Yaser Adel Mehraban
popular: true
categories: [Angular, Router, Preloading Stragetgy]
tags: [angular, router, preloading strategy, lazy loading]
thumbnail: './preloading.png'
---

[Angular Router](https://angular.io/api/router/Router) has been supporting lazy loading of child modules for a long time. What's even more cool is that later on they added `PreloadAllModules` strategy so you can preload all of the modules in the background asynchronously. This will help boost up the loading time and performance tremendously.

<!--more-->

To use this feature your `RouterModule` will look like this:

```typescript
routes: Routes = [
  ...
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Implementing your own preloading strategy

The above feature is great, however, in real world and most of the times the application is too big and loading all the modules in the background is just adding extra traffic while in reality users might not navigate to all of your child routes. [Angular](https://angular.io/) does not have any other predefined strategy, but it allows you to customise the preloading by implementing its `PreloadingStrategy` class.

This will allow you to preload your core modules, the ones your users use the most, and let the other modules be loaded on demand. Reminds me of that old saying:

> Moderation in all the things is the best policy.

So let's get implementing 👨‍💻.

### 1- Add a flag to routes

First we need to add a flag to our routes so that we know which ones to preload and which to not. We assume we have four routes called `Home`, `Shop`, `About`, and `Contact` from which the first two are the most frequently visited routes.

```typescript
routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shop',
    loadChildren: './shop/shop.module#ShopModule',
    data: { preload: true }, // flag we will use to track what route to be preloaded
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule',
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule',
  },
]
```

[[info]]
|**Note** The data property is reserved by the router to allow developers to add their custom values to their route configs.

As you can see we used the data property to be able to define our flag. This will get used in our strategy later.

### 2- Create our custom strategy

Ok now it's time to create our custom strategy:

```typescript
import { PreloadingStrategy, Route } from '@angular/router'

import { Observable, of } from 'rxjs'

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null)
  }
}
```

What is happening is that we just check the flag we added and preload the route if that is set to true. A preloading strategy expects a class with a method `preload()`. The preload method should return an `Observable` calling the load parameter or an `Observable` of null. Now that we have the strategy defined lets use it.

### 3- Use the custom strategy in our routing module

Now that we have the basics lets use this custom strategy in our routing module:

```typescript
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CustomPreloadingStrategy } from './custom-preloading-strategy'

routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shop',
    loadChildren: './shop/shop.module#ShopModule',
    data: { preload: true }, // flag we will use to track what route to be preloaded
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule',
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule',
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ], // Using our own custom preloader
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy],
})
export class AppRoutingModule {}
```

And that's it. Now if you run your application, the home component will load within the main bundle, shop component will load asynchronously in the background. It means that by the time user clicks the shop from the nav menu, it's already loaded and it feels super fast.

If user clicks on any of the about or contact, however, there would be another script loaded containing that component and you will need to handle the waiting time by showing a spinner or something. I am joking, I hate spinners, I will write another blog post soon on how to improve the performance so you won't need a spinner.

Hope this helps to increase your applications performance and make you curious enough to dive deeper in Angular and its awesome new features.

Until next post, adiós.

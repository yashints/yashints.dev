---
id: 10
path: '/preparation-steps-for-angular-2-migration/'
title: 'Preparation steps for Angular 2 migration'
date: 2016-07-13
author: Yaser Adel Mehraban
comments: true
categories: [Angular, JS, AngularJS]
tags:
  [
    angular,
    angular 2,
    component,
    directive,
    migration,
    systemjs,
    typescript,
    webpack,
  ]
thumbnail: './migration.png'
---

I've seen many ways to shape an Angular app in different companies. This means when we try to upgrade to Angular 2 some of them might be easy to migrate compared to others.

<!--more-->

So why we don't try to write some code that is easy to migrate even before trying to upgrade???

According to Angular official website there are a few keys and patterns to follow which lets us make the transition smoother when the time comes. But first let's discuss why we should upgrade.

## Why Upgrade

You might have not noticed but Angular 1.x can be very dangerous in the hand of a developer who does not know how stuff works and only wants to get the task done without thinking of the consequences.

Thinking about all of the watches that will be put in a page plus a code that can be very poor designed is very scary and need to be considered by every team lead or team member specially during code reviews.

Anyway below you can find a couple of strong reasons on why we should think of moving towards Angular 2:

- **Better Performance** - Angular 2 comes with a way faster change detection, template pre-compilation, faster bootstrap time, view caching and plenty other things that make the framework pretty fast.
- **Server-side Rendering** - The next version of Angular has been split up into two parts, an application layer and a render layer. This enables us to run Angular in other environments than the browser like Web Workers or even servers.
- **More powerful Templating** - The new template syntax is statically analyzable, removes many directives and integrates better with Web Components and other elements.
- **Better Ecosystem** - Of course, at the time of writing this article, this is not true. But the Angular 2 ecosystem will eventually be better and more interesting to us in the future.

## Consider Following Angular Style Guide

The [Angular Style Guides](https://angular.io/guide/styleguide) is a collection of useful patterns and practices that helps developers write readable, maintainable, cleaner and efficient code.  It contains a wealth of information about how to write and organize Angular code - and equally importantly - how **not** to write and organize Angular code.

In writing Angular 2, the team members tries to maintain the **good** parts while get rid of the **bad** ones. Although there are way more than that to be said but general idea is that it should be a framework which people can rely on in their production environments.

There are a few particular rules in there that I would like to bold here:

1.  There should be one component per file, which let's us not only have maintainable code but also makes it easy to migrate them one at a time regardless of the destination framework (e.g Angular 2 or React).
2.  The [Folders-by-Feature Structure](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure) and [Modularity](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity) rules define similar principles on a higher level which tell us different parts of the app should be placed in different folders and modules.

## Don't choose anything else than a module loader

JavaScript admittedly has plenty of flaws, but one of the largest and most prominent is the lack of a module system: a way to split up your application into a series of smaller files that can depend on each other to function correctly. While doing so having large number of smaller files is better than small number of large files, but it does not work well if we have to load them all into Html file by script tags.

Because of dependencies that exists with this structure the need for a module loader is vital. There are a couple of good tools out there like Webpack, Browserify or SystemJs which pretty much are making use of typescript built in module system.

By specifying _import_ and *export* in modules we define which modules can be exported and which ones depend on another.

## We should migrate to TypeScript

Because Angular 2 itself is recommending to use that, we should migrate our current code to TypeScript even before starting the migration so there would be one less concern when the day comes. By just importing TypeScript compiler and renaming files from `*.js` to `*.ts` wouldn't be enough. You have to at least follow some of the ES6 new features which you can find here ([part 1](/2016/07/06/es6-new-features-part-i/), [part 2](/2016/07/07/es6-new-features-part-ii/), [part 3](/2016/07/11/es6-new-features-part-iii/)). That's why I started with them as one of the most important prerequisites of the process.

## Directives as Components

Angular 2 is heavily dependent on Components which basically are a portion of UI whose got a special logic behind that. The UI part can be a template but by containing them in a *directive* you can make sure that migration process would be easier.

Well that somehow makes things in perspective but to be more precise a directive which contains the template, controller and bindings required to deliver that functionality. Based on Angular website a directive should cover bellow items to be Angular 2 compatible:

- `restrict: 'E'`. Components are usually used as elements.
- `scope: {}` - an isolate scope. In Angular 2, components are always isolated from their surroundings, and we should do this in Angular 1 too.
- `bindToController: {}`. Component inputs and outputs should be bound to the controller instead of using the `$scope`.
- `controller` and `controllerAs`. Components have their own controllers.
- `template` or `templateUrl`. Components have their own templates.
  Also it is mentioned that the directive should not use `compile`, `replace: true`, `priority` and `terminal`.

This is how a ideal directive looks like:

```javascript
export function myDetailDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      myInfo: '=',
      getCreditCardInfo: '&',
    },
    template: `
      <h2>My name is: {{ctrl.myInfo.myName}}</h2>      
      <button ng-click="ctrl.onClick()">Get card info</button>
    `,
    controller: function() {
      this.onClick = () => {
        this.getCreditCardInfo({ name: this.myInfo })
      }
    },
    controllerAs: 'ctrl',
  }
}
```

If you are already using Angular 1.5 you should use its Component API which helps you define such directives. This API enforces you to use controllerAs syntax and also has good default values for `scope` and `restrict`.

The above directive looks like below:

```javascript
export const myDetail = {
  bindings: {
    myInfo: '=',
    getCreditCardInfo: '&',
  },
  template: `
    <h2>My name is: {{ ctrl.myInfo.myName }}</h2>
    <button ng-click="ctrl.onClick()">Get card info</button>
  `,
  controller: function() {
    this.onClick = () => {
      this.getCreditCardInfo(this.myInfo)
    }
  },
}
```

{: .box-note}
**Note:** I had to remove the \$ from above code because of mark down rendering errors.

## Upgrade using the given Adapter

When everyone was thinking of how to deal with breaking changes introduced in the very initial introduction of Angular 2, they were trying to tackle this issue to make it easier to upgrade. They came up with *ng-upgrade,* an awesome Adapter which let's you mix Angular 1 and 2 code together.

This way, (if you've already done the steps mentioned earlier) you can start migrating your components one by one and not worry about what happens with current state of the product. The story gets more exciting as directives and services in one application can interact with the other one which is amazing (and also **dangerous** in the wrong hands).

In order for this to happen four things need to be in place:

- **Dependency Injection** - Exposing Angular 2 services into Angular 1 components and vice-versa.
- **Component Nesting** - Angular 1 directives can be used in Angular 2 components and Angular 2 components can be used in Angular 1 directives.
- **Content Projection / Transclusion** - Angular 1 components transclude Angular 2 components and Angular 2 component project Angular 1 directives.
- **Change Detection** - Angular 1 scope digest and change detectors in Angular 2 are interleaved.

With these four things being interoperable, we can already start upgrading our applications component by component. Routing is another part that can help but is not necessarily mandatory, since we can totally stick with any Angular 1 routing system while upgrading.

An example is shown in the following code to illustrate what we talked about:

```javascript
import { UpgradeAdapter } from '@angular/upgrade'

var adapter = new UpgradeAdapter()
var app = angular.module('myApp', [])

adapter.bootstrap(document.body, ['myApp'])
```

Cool now we can take advantage of ng-upgrade in our Angular 1 app and start migrating to Angular 2. Of course there are a lot more to do but you get the idea.

## User service instead of factory

If you are planning to upgrade to Angular 2 and also the language you are using like ES6, it completely makes sense that you should use `.service()` instead of `.factory()` where a service can be potentially a class.

In Angular 2, a service is also just a class, so this seems like a logical step to undertake.

I think that's enough for making you think about the steps you have to take to be ready take off. For a full documentation on preparation you can read [this page](https://angular.io/guide/upgrade).

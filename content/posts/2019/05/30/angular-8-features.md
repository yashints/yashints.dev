---
path: '/angular-8-features/'
author: Yaser Adel Mehraban
date: 2019-05-30
title: 'What's new in Angular 8'
popular: true
tags: [angular, webdev, showdev, features]
thumbnail: './8.jpg'
---

You might already know that [Angular](https://angular.io) 8 is out now, but what it means for you or your organisation is described below.

<!--more-->

# Ivy

To put your mind at rest, Ivy is not here **yet**. If you don't know what is Ivy, it's the Angular's new renderer which promises a ton of improvements in term of how Angular renders the view. It is radically different from anything we have seen in mainstream frameworks, because it uses incremental `DOM`. Stay tuned for more news on this in coming weeks.

# Differential loading

Differential loading is a feature in which browser decides to use modern vs legacy JavaScript based on its own capabilities.

This is really important not just because we can use modern JavaScriptm but because we can get rid of all of those polyfills we've had to ship with our applications previously.

In short it takes advantage of the `es2015` flag in the TypeScript config and creates two bundles one for modern browsers and one for older ones.

```json
{
  "compilerOptions": {
  …
  "module": "esnext",
  "moduleResolution": "node",
  …
  "target": "es2015",
  …
},
```

At runtime, Angular generates two script tags in your HTML:

```html
<script type="module" src="…"> // Modern JS

<script nomodule src="…"> // Legacy JS
```

Browsers that can handle modern JavaScript will load the first bundle and ignores the second whereas the older ones ignore the first and load the first one.

This will give you some massive reduction in bundle size when the application is more than a hello world 😉.

# Dynamic imports in route configurations

Angular team have now changed the way you used to lazy load child modules in route configuration. Previously you had:

```ts
{path: '/about', loadChildren: './about/about.module#AboutModule'}
```

With the new syntax, it leverages the dynamic import which is a huge advantage over the old syntax:

```ts
{path: `/about`, loadChildren: () => import(`./about/about.module`).then(m => m.AboutModule)}
```

Why is this better I hear you ask. The main reason is that you can get errors during development from your editor. If you misspelled the module name or the file name previously, it wouldn't throw error until you trued to bundle the app because it was just a string.

Now you get squiggly lines under file name or module name if you make a mistake.

# Builders

You might know that you can tap into CLI commands like `ng new`, `ng generate`, `ng add`, and `ng update` using Schematics. Angular team now allow you to tap into more commands using the new builders for CLI like `ng build`, `ng test, and`ng run`.

What this allowed the team to achieve is huge because now you can run your custom build or test flows. One of the good examples is the new version of [AngularFire](https://github.com/angular/angularfire2) which adds a `deploy` command to make the build and deploy seamless when working on a project which uses Firebase for deployment. As if, you can now run:

```bash
ng run hellow-world:deploy
```

This command will both build the project and deploys it to Firebase, how good is this?

# Workspace APIs

Up until now, you had to manually open your `angular.json` and modify it to make changes to workspace config. With this new API you can now read and modify these configurations much more conveniently. [Read more here](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/core/README.md#workspaces).

# Web Worker Support

Web workers are great for adding support to offload a heavy operation in a different thread and speed up your application's performance. Imagine image or video manipulation, or finding the optimum path between two points on a map and how they can impact the application's speed.

Now you can add a web worker easily by running:

```bash
ng generate webWorker awesome-worker
```

Once finished you will have a web worker and you can use it in your application. The CLI will take care of the bundling for you, so all you need to do, is leverage the power it brings to you:

```ts
const worker = new Worker(
  `./awesome-worker.worker`,
  { type: `module` }
)
```

To make this even more interesting, CLI will also correctly handle the code splitting and bundling.

In your worker file which is located in `src/app/awesome.worker.ts`, you will have a scaffolded method to receive a message from your application as a starter which you can expand however you like:

```ts
addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`
  postMessage(response)
})
```

In your `app.component.ts` you can then interact with the worker and send a message:

```ts
if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker('./awesome.worker', {
    type: 'module',
  })
  worker.onmessage = ({ data }) => {
    console.log('page got message: ${data}')
  }
  worker.postMessage('hello')
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
```

# AngularJS migration

If you were using `$location` service in your AngularJS application, now you will get `LocationUpgradeModule` which puts the responsibilities of `$location` service to `Location` service in Angular.

This means if you're use `ngUpgrade`, your life is a bit easier having routes in both AngularJS and Angular apps.

Documentation around best practices for lazy loading parts of AngularJS app into your Angular app is also happened in this version which gives you insight on how to upgrade most used features first, and only load AngularJS for the remaining subset.

Read more around the [best practices here](https://v8.angular.io/guide/upgrade#create-a-service-to-lazy-load-angularjs).

# New guide around deprecated features

They also release a new guide around deprecations and removals. They claimed they are committed to support features in `N + 2` in major releases. For example if you're using a deprecated feature in Angular 7, it will be available in 8 and 9, but not 10.

One of the features which is now deprecated in 8 is `platform-webworker`. To find out about all deprecated and removals check out [their deprecation guide](https://v8.angular.io/guide/deprecations).

# Breaking changes

This version came with some breaking changes. The most important one is that `@bazel/typescript` is now a `peerDependency` of `@angular/bazel` so its users must add `@bazel/typescript` to their `package.json`.

From core perspective, it's now required that all `@ViewChild` and `@ContentChild` queries have a _static_ flag specifying whether the query is _static_ or _dynamic_. The compiler previously sorted queries automatically, but in 8.0 developers are required to explicitly specify which behaviour they have in mind. This is a temporary requirement as part of a migration; see https://v8.angular.io/guide/static-query-migration for more details.

To read more refer to [their change log](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# How to update

Simply run this command from your terminal and have fun exploring these new hot features.

```bash
ng update @angular/cli @angular/core
```

The rest is taken care of by the CLI.

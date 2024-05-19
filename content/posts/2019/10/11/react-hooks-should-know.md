---
path: '/react-hooks-should-know/'
author: Yaser Adel Mehraban
date: 2019-10-06
title: "React hooks you should know about \U0001F525"
popular: true
tags: [showdev, webdev, reactjs, hooks]
cover: ./socialpreview.png
---

[React Hooks](https://reactjs.org/docs/hooks-overview.html) are somewhat a new addition to React. They allow you to use React features without the need to use a class. But I am not going to go through an introduction in this post, there are many great into posts out there. This post shows you eight hooks and what you can achieve with them.

<!--more-->

## `react-use-form-state` hook

Forms are a very common pattern when it comes to getting information from users. From small to large forms, they all have their own state we have to manage, whether it's for validation or to populate another input based on previous selection.

This hook is a handy tool which allows you simplify managing form's state using the native HTML input fields.

You can install it with:

```bash
npm i react-use-form-state
```

And a simple usage:

```js
import { useFormState } from 'react-use-form-state';
 
export default function SignUpForm({ onSubmit }) {
  const [formState, { text, email, password, radio }] = useFormState();
 
  function handleSubmit(e) {
    // ...
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input {...text('name')} />
      <input {...email('email')} required />
      <input {...password('password')} required minLength="8" />
      <input {...radio('plan', 'free')} />
      <input {...radio('plan', 'premium')} />
    </form>
  );
}
```

With this you get a `json` structure like this:

```js
{
  values: {
    name: 'Mary Poppins',
    email: 'mary@example.com',
    password: '1234',
    plan: 'free',
  },
  touched: {
    name: true,
    email: true,
    password: true,
    plan: true,
  },
  validity: {
    name: true,
    email: true,
    password: false,
    plan: true,
  },
  errors: {
    password: 'Please lengthen this text to 8 characters or more',
  },
  clear: Function,
  clearField: Function,
  reset: Function,
  resetField: Function,
  setField: Function,
}
```

It also allow you to initialise it via `initialState` object, a wide variety of on form event handlers, advanced input options, custom input validation, custom controls and much more. Definitely check their [GitHub Repo](https://github.com/wsmd/react-use-form-state) for more information.

## `use-media`

This tiny hook is really handy if you're trying to deliver a responsive user experience. It tracks the state of a CSS media query and lets you act on that.

With `useEffect`:

```js
import useMedia from 'use-media';
// Alternatively, you can import as:
// import {useMedia} from 'use-media';

const Demo = () => {
  // Accepts an object of features to test
  const isWide = useMedia({minWidth: 1000});
  // Or a regular media query string
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');

  return (
    <div>
      Screen is wide: {isWide ? '😃' : '😢'}
    </div>
  );
};
```

With `useLayoutEffect`:

```js
import {useMediaLayout} from 'use-media';

const Demo = () => {
  // Accepts an object of features to test
  const isWide = useMediaLayout({minWidth: 1000});
  // Or a regular media query string
  const reduceMotion = useMediaLayout('(prefers-reduced-motion: reduce)');

  return (
    <div>
      Screen is wide: {isWide ? '😃' : '😢'}
    </div>
  );
};
```

For more information about this nifty little hook, visit [this GitHub repo](https://github.com/streamich/use-media).

## `react-firebase-hooks`

I don't have to tell you how great firebase is, but what if you could use a set of hooks to easily integrate with it? It's got 4 set of hooks for you to use: 
* [Auth Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth)
* [Cloud Firestore Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore)
* [Cloud Storage Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master/storage)
* [Realtime Database Hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master/database)

Usage:

```js
import { useAuthState } from 'react-firebase-hooks/auth';

const CurrentUser = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const login = () => {
    firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');
  };
  const logout = () => {
    firebase.auth().signOut();
  };

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
};
```

Of course you don't hard code your username and password right? 😁


Find out more [here](https://github.com/CSFrequency/react-firebase-hooks).

## `use-onClickOutside` hook

Many times has happened for me to need to be aware of when the user clicks outside of an element. This might be to change something or perform an action. This little hook allows you to do exactly that:

```js
import * as React from 'react'
import useOnClickOutside from 'use-onclickoutside'

export default function Modal({ close }) {
  const ref = React.useRef(null)
  useOnClickOutside(ref, close)

  return <div ref={ref}>{'Modal content'}</div>
}
```

As you can see, you can provide a ref to an element and pass it to the hook. If there is a click anywhere outside of the element, the the call-back function, in this case `close` is called.

Find out more about this hook [in this GitHub repo](https://github.com/Andarist/use-onclickoutside).

## `useIntersectionObserver` hook

You might remember I did a [post on image optimisation](https://yashints.dev/blog/2018/11/12/web-perf-4) and how `IntersectionObserver` API is a handy tool to load an image lazily when it appears on viewport.

This hook allows you to use this great API:

```js
import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "react-hook-intersection-observer";

const App = () => {
  const root = useRef();    // We need a ref to our "root" or our parent,
  const target = useRef();  // We need a ref to our "target" or our child-to-watch,

  // Let's use a bit of state.
  const [isThingIntersecting, setThingIntersecting] = useState(false);

  // Here's our hook! Let's give it some configuration...
  useIntersectionObserver({
    root,
    target,

    // What do we do when it intersects?
    // The signature of this callback is (collectionOfIntersections, observerElement).
    onIntersect: ([{ isIntersecting }]) => setThingIntersecting(isIntersecting)
  });

  return (
    <div className="App">
      <h1>useIntersectionObserver</h1>
      <h2>
        The thing is currently{" "}

        {!isThingIntersecting && <span style={{ color: "red" }}>not</span>}{" "}

        <span style={{ color: isThingIntersecting ? "green" : "black" }}>
          intersecting
        </span>

        !
      </h2>


      <div ref={root} className="black-box">
        <div className="larger-box">
          <div ref={target}>THE THING</div>
        </div>
      </div>
    </div>
  );
};
```

To find out more, have a look at [this GitHub repo](https://github.com/TejasQ/react-hook-intersection-observer).

## react use collection

This is a collection of some great hooks you can use in categories like **Sensors**, **UI**, **Animations**, **Side-effects**, **Lifecycles**, and **State**.

An example is `useLocation` which gives you the ability to access the location of the browser.

```js
import {useLocation} from 'react-use';

const Demo = () => {
  const state = useLocation();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};
```

If you're using Internet Explorer (but why 😂), you can use [this polyfill](https://github.com/streamich/react-use/issues/73).

Or you can use `useBattery` to track the battery status on a mobile device:

```js
import {useBattery} from 'react-use';

const Demo = () => {
  const batteryState = useBattery();

  if (!batteryState.isSupported) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>not supported</span>
      </div>
    );
  }

  if (!batteryState.fetched) {
    return (
      <div>
        <strong>Battery sensor</strong>: <span>supported</span> <br />
        <strong>Battery state</strong>: <span>fetching</span>
      </div>
    );
  }

  return (
    <div>
      <strong>Battery sensor</strong>:&nbsp;&nbsp; <span>supported</span> <br />
      <strong>Battery state</strong>: <span>fetched</span> <br />
      <strong>Charge level</strong>:&nbsp;&nbsp; <span>{ (batteryState.level * 100).toFixed(0) }%</span> <br />
      <strong>Charging</strong>:&nbsp;&nbsp; <span>{ batteryState.charging ? 'yes' : 'no' }</span> <br />
      <strong>Charging time</strong>:&nbsp;&nbsp;
      <span>{ batteryState.chargingTime ? batteryState.chargingTime : 'finished' }</span> <br />
      <strong>Discharging time</strong>:&nbsp;&nbsp; <span>{ batteryState.dischargingTime }</span>
    </div>
  );
};
```

To find out about all of those, check [this GitHub repo](https://github.com/streamich/react-use).

## React Redux hooks

React Redux now offers a set of hook APIs as an alternative to the existing `connect()` Higher Order Component. These APIs allow you to subscribe to the Redux store and dispatch actions, without having to wrap your components in `connect()`.

Here is the `useSelector` hook returns a part of all of store using a selector function.

```js
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector(state => state.counter)
  return <div>{counter}</div>
}
```

Checkout [their comprehensive documentation](https://react-redux.js.org/next/api/hooks) to find out more.

## react-hanger

A set of helpful hooks with focus on primitive types state changing. They have two version, but the recommendation is to use V2.

Install:

```bash
yarn add react-hanger
```

Usage:

```js
import React, { Component } from "react";

import {
  useInput,
  useBoolean,
  useNumber,
  useArray,
  useOnMount,
  useOnUnmount
} from "react-hanger";

const App = () => {
  const newTodo = useInput("");
  const showCounter = useBoolean(true);
  const limitedNumber = useNumber(3, { lowerLimit: 0, upperLimit: 5 });
  const counter = useNumber(0);
  const todos = useArray(["hi there", "sup", "world"]);

  const rotatingNumber = useNumber(0, {
    lowerLimit: 0,
    upperLimit: 4,
    loop: true
  });

  return (
    <div>
      <button onClick={showCounter.toggle}> toggle counter </button>
      <button onClick={() => counter.increase()}> increase </button>
      {showCounter.value && <span> {counter.value} </span>}
      <button onClick={() => counter.decrease()}> decrease </button>
      <button onClick={todos.clear}> clear todos </button>
      <input type="text" value={newTodo.value} onChange={newTodo.onChange} />
    </div>
  );
};
```

You can play with these in [this CodeSandbox](https://codesandbox.io/s/44m70xm70).

Check [this GitHub repo](https://github.com/kitze/react-hanger) for more information.

## Summary

I was surprised to find out how many hooks have already being developed by the community to be honest. There are so many and I can't go through all of them here. But if you're hungry for more, check [this gem](https://github.com/rehooks/awesome-react-hooks) I found which has a collection of tools, hooks, tutorials, videos, podcasts, and more.
---
path: '/e2e-vue-playwright/'
author: Yaser Adel Mehraban
date: 2021-02-07
title: "How to end-to-end test your Vue.js apps with Playwright"
popular: true
tags: [webdev, showdev, vue, playwright]
thumbnail: './vue-playwright.png'
---

[Playwright](https://playwright.dev/) is one of the recently released end to end testing frameworks which enables fast, reliable and capable automation and is cross platform. I really like it, but since it's very easy to setup and the community around it is super cool, I like it even more. 

In this article I want to show you how you can write some tests for any [Vue.js](https://vuejs.org/) application which is using [Auth0](https://auth0.com/) as an identity provider. However, this could be used with any other provider too, since it covers the basics and makes you ready to write tests which cover different scenarios and user interactions.

<!--more-->

## Concepts

Before we delve into the nitty gritty of things here, we should all agree on a few concepts:

* **End-to-end tests:** End-to-end tests (AKA E2E) are like back box testing where you don't test individual components or unit of code, instead you focus on testing a scenario end to end. With this type of tests, you use a real instance of the application. They are ideal for creating reliable and bug free application since they mimic user behaviour.
* **Vue.js:** is a fantastic progressive frontend framework which is ideal for building user interfaces. It's like a middle ground between Angular and React and is built from ground up with developers in mind. It's easy to pickup and integrate with other libraries or existing projects.
* **Auth0:** is an identity provider which has gained a really good reputation thanks to its complete solution which helps people secure their applications and add features like single sign on, multi-factor authentication and social media login to their applications.


## Stage is set

I have an application which is written in _Vue.js_. I have added authentication and authorization using _Auth0_ and have different features shown/hidden to users based on their access levels.

However, my unit and component tests don't seem to cover some scenarios which our end users will do when interacting with our application. Some of this is because I have to use mocks when doing component testing, and unit tests don't cover more than a piece of code.

Now I need a way to test my application as if a user is sitting in front of their computer and uses our application. To achieve this, I will have to use end-to-end tests.

## Options

There are some great E2E test frameworks out there, and here are just a few:

* Protractor
* Nightwatch.js
* Cypress
* TestCafe
* Playwright
* WebdriverJS
* OpenTest
* Puppeteer

And many more. However, I really like Playwright because it is easy to use and setup, it's cross platform and integrates nicely with every CI/CD pipeline you'd think of.

## The code

So I have an application which basically lists movies and people can buy tickets and go watch it in an imaginary gold cinema. The app also has an admin page where only users with administrator role can access. So let's break through the code bit by bit:

### Main setup

In order for us to use the _Auth0_ as a plugin with _Vue 3_ we need to create a plugin and set it up in our main file. However, Vue 3 has changed the way we setup the plugins. So here is our little plugin (note code has been removed for brevity):

```js
import createAuth0Client from '@auth0/auth0-spa-js';
let client;
///all the other methods and definitions
export const setupAuth = async (options, callbackRedirect) => {
  client = await createAuth0Client({
    ...options,
  });
  try {
    if (window.location.search.includes('code=') 
      && window.location.search.includes('state=')) {
      const { appState } = await client.handleRedirectCallback();
      callbackRedirect(appState);
    }
  }
  //...
  return {
    install: app => {
      app.config.globalProperties.$auth = authPlugin;
    },
  };
}
```

We also implement a route guard in the same file:

```js
import { computed, watchEffect } from 'vue';

const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  popupOpen: computed(() => state.popupOpen),
  claims: computed(() => state.claims),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
  getUser,
};

export const routeGuard = (to, from, next) => {
  const { isAuthenticated, loading, claims } = authPlugin;
  const verify = () => {
    if (!isAuthenticated.value) {
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    if (to?.meta?.authorize) {
      const roles = claims.value['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (roles.find(r => r === to.meta.authorize.role)) {
        return next();
      } else {
        return next('/unauthorized');
      }
    }
  };
  if (!loading.value) {
    return verify();
  }
  watchEffect(() => {
    if (loading.value === false && claims.value) {
      return verify();
    }
  });
};
```

This route guard might look intimidating at first glance, but all we're doing is to create an object which exposes the Auth0 client methods, and then checks the route for a metadata property called authorize which holds the value of the role which should have access to the page.

The rest is just checking whether they match and allow the redirect or send the user to the unauthorized page.

In our main file:

```js
import { createApp } from 'vue';
import router from './router';
import { setupAuth } from '@/auth/auth-plugin';

const authConfig = {
  domain: process.env.VUE_APP_DOMAIN,
  client_id: process.env.VUE_APP_CLIENTID,
  redirect_uri: process.env.VUE_APP_REDIRECT_URL,
  audience: process.env.VUE_APP_AUDIENCE,
  advancedOptions: {
    defaultScope: 'openid profile email crud:users',
  },
};

function callbackRedirect(appState) {
  router.push(appState && appState.targetUrl ? appState.targetUrl : '/');
}

let app = createApp(App)
  .use(router);

setupAuth(authConfig, callbackRedirect).then(auth => {
  app.use(auth).mount('#app');
});
```

Here we're simply creating an options object which is requied by the Auth0 SDK which has the client id, domain etc.

And once that's done, we will create our app but instead of using the plugin right away, we will call the `setupAuth` which will then creates the client instance and returns the plugin instance. Now all we need to do is to call the `.use` and use our plugin instance.

## Login component

Now that we've got our auth plugin setup, it's time to setup our login component. Fortunately it doesn't require much code:

```html
<div v-if="!user">
  <a href="#" class="signup" @click.prevent="login">
    You need to sign in first!
  </a>
</div>
```
And in our component:

```js
/// code removed for brevity
export default {
  methods: {
    login: async function() {
      try {
        await this.$auth.loginWithPopup();
        const user = await this.$auth.getUser();
        const accessToken = await this.$auth.getTokenSilently();
        this.$store.commit('SET_USER', user);
        //...
      }
    }
  }
  //...
}
```

The way this login works is that by clicking on the login button there would be a popup window opened from _Auth0_ where the user enters their credentials and press submit.

## Router config

And the last thing we would have here would be the routing configuration:

```js
import { createWebHistory, createRouter } from 'vue-router';
import { routeGuard } from '@/auth/auth-plugin';
//other imports
export const routes = [
  {
    path: '/',
    component: Home,
  },
  //...other routes
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: Admin,
    beforeEnter: routeGuard,
    meta: {
      authorize: {
        role: 'Admin',
      },
    },
  },
  {
    path: '/unauthorized',
    component: UnAuthorized,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

And that's the basics of our application. Don't worry I will put a link to the GitHub repo at the end so you would have all the code. I just want you to know at a really high level how the app is setup.

## Setting up the tests

In order to add the package to our app, we will do it via the CLI. So go ahead and execute below command in your terminal at the root of your client app:

```bash
vue add e2e-playwright --dev
```

It will take a while and a whole bunch of stuff happens behind the scene, but it does all the heavy lifting for you, create a folder for the E2E tests, and even creates a example test for your convenience. It adds _Playwright_ so you can write tests, and _chai_ to handle assertions.

## Writing tests

Writing tests is the next step, for each test you have a few basic things to do. Import the necessary objects and methods:

```js
const { chromium } = require('playwright');
const { expect } = require('chai');
```

Here I am importing Chrome, but you have the option to use Safari or Firefox if you wish.

Now we need some variables:

```js
const baseUrl = 'http://localhost:8080/';
const adminPassword = 'Super_Secure_Pass';
const adminUserName = 'admin@example.com';
const normalUserName = 'user@example.com';
const normalUserPassword = 'Super_Secure_Pass';
```

I am just defining the passwords here to make it easier to understand, you make sure you have them in your environment files and use them that way so that you don't commit user names and passwords into your source code.

Now it's time to write our tests, basically you need a describe method which is your test suite. In there you would need two variables for your browser and page instances:

```js
describe('Authenticated Vue App: ', () => {
  let browser;
  let page;
})
```

Now you would need to create an instance of your browser and page. So go ahead and add a `beforeEach` method. Inside that, lunch your browser, create a new page and navigate to your home page:

```js
before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto(baseUrl);
});
```

Make sure you close these objects at the end of the tests via an `after` method:

```js
after(async () => {
  await page.close();
  await browser.close();
});
```

You're now ready to write your first test. In this test we're going to go to admin page without authentication and see what happens. Based on our router guard's code, we know that the user should be redirected to login:

```js
it('An unauthenticated user should not be able to see the admin page', async () => {
  await page.goto(`${baseUrl}admin`);
  expect(page.url()).to.equal(`${baseUrl}login?returnUrl=/admin`);
});
```

If you now run the tests by running `yarn test:e2e`, you should see the test pass.

### More complicated tests

Now to add a spin on our test, say we wanted to actually login and see what happens. In this case we need to click on the login button, then find the opened window and fill in the username and password, then click on submit and come back to our app. This would require a bit more coding, but still easy to find out from _Playwright's_ documentation.

First you would need to find the login button, then you need to use a `Promise.all` method to be able to get a reference to your popup window:

```js
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  await page.click('a.signup')      
]);
```

Now that you have the reference, you need to fill in the info and click on the login:

```js
await popup.fill('input[type="email"]', adminUserName);
await popup.fill('input[type="password"]', adminPassword);
await popup.click('button[type="submit"]');
```

And at last you need to make an assertion. Say you wanted to see whether an admin user will have access to the admin page. To do the assertion, you need to hook up to the close event of the popup window. So your test will look like:

```js
it('be redirected back to admin page after login', async () => {
    await page.goto(`${baseUrl}admin`);
    
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      await page.click('a.signup')      
    ]);

    popup.on('close', async () => {
      expect(page.url()).to.equal(`${baseUrl}admin`);
    });

    await popup.fill('input[type="email"]', adminUserName);
    await popup.fill('input[type="password"]', adminPassword);
    await popup.click('button[type="submit"]');
  });
```

The reason why you'd need a `waitForEvent` method in the `Promise.all` method is that you need to wait for the popup window to be able to get a handle on it. Now if you run the tests again, they should all pass.

## Full code

You can find the full source code on my [GitHub repository here](https://github.com/yashints/vue-e2e-playwright).

## Summary

And that's how easy it is to write tests which mimic user interactions and can make you confident to ship reliable software. Happy testing and let me know what could automation have you done with Playwright if you got to that point 👋🏽👋🏽.


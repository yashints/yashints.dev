---
path: '/vue-form-handling/'
author: Yaser Adel Mehraban
date: 2019-11-10
title: "Handling forms with Vue.js \U0001F9FE"
popular: true
tags: [showdev, webdev, vuejs, formmanagenment]
cover: ./socialpreview.png
---

[Vue.js](https://vuejs.org/) is an approachable, versatile, performant, and progressive framework to build user interfaces with. I've written two separate articles on it so far:

* [A comprehensive intro to Vue.js](https://yashints.dev/blog/2019/10/18/vue-intro)
* [Deliver a better user experience using Vue Router](https://yashints.dev/blog/2019/10/30/vue-router)

This time we will have a look at handling form with **Vue.js**, something which is almost inevitable in enterprise applications.

<!--more-->

## Background

When it comes to working with forms, it's always good to know the in and out of how to handle them in your choice of framework. Of course there are some common knowledge around forms, but dealing with one can be tough at times especially if you care about the user experience.

## Scenario

Assume we have a sign up form for new users on our product. We want to build this sign up form, from scratch, and step by step together.

## Start

Let's start a new application and create a component first:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Handling Forms with Vue.js</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

</head>

<body>
  <div class="container" id="app">
    <div class="">
      <section class="mt-md">
        <h1 class="title">Form handling with Vue.js</h1>
        <p class="text-muted">
          Learn how to work with forms, including <strong>validation</strong>!
        </p>
        <hr>      
        
        <section class="form">
          <!--Our form will be here-->
        </section>
      </section>
    </div>
  </div>
  
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>


<script>
  new Vue({
    el: '#app'
  })
</script>

</body>
</html>
```

## Text inputs

As I mentioned in my intro, you can bind form input values to **Vue**'s data object using `v-model`. So let's add a few text inputs for name and last name.

```html
<form>
  <div class="form-group">
    <label for="firstName">First name</label>
    <input type="text" v-model="form.firstName" class="form-control" id="firstName" placeholder="Enter your name">
  </div>
  <div class="form-group">
    <label for="lastName">Last name</label>
    <input type="text" v-model="form.lastName" class="form-control" id="lastName" placeholder="Enter your last name">
  </div>
</form>
```

In the code snippet we just defined, we're using two text inputs and binding them to first name and last name of the form property in the data object. The `v-model` creates a two way binding between our input and its corresponding property. To be sure that we've got everything right, you can use the code snippet below and see the values as you're typing:

```html
<div class="shadow">
  <div v-for="(item, k) in form">
    <strong>{{ deCamelCase(k) }}</strong> {{item}}
  </div>
</div>
```

And in your JavaScript code:

```js
// the rest
<script>
  new Vue({
    el: '#app',
    data: {
      form: {
        firstName: '',
        lastName: ''
      }
    },
    methods: {
      deCamelCase: function(str) {
        const result = str.replace(/([A-Z]+)/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1) + ':'
      }
    }
  })
</script>
```

If you start typing into any of those text boxes, you should see the result in the bottom `div`.

## Setting default value

**Vue** will ignore the `value`, `checked`, or `selected` attributes of the inputs you use and uses the data object as source of truth. This means you can set default values for your form fields:

```js
data: {
  form: {
    firstName: 'Yas',
    lastName: ''
  }
}
```

You can see the value of the input get set to `Yas` when the page renders.

## Textarea

Adding a `textarea` is exactly like adding a normal text input:

```html
<div class="form-group">
  <label for="notes">Additional information</label>
  <textarea v-model="form.additionalInfo" class="form-control" id="notes" rows="3"></textarea>
</div>
```

Don't forget to add the `additionalInfo` to your data object.

## Select element

Adding 

```html
<div class="form-group">
  <label for="ageGroup">Select your age group</label>
  <select v-model="form.ageGroup" class="form-control" id="ageGroup">
    <option value="1">18-22</option>
    <option value="2">22-25</option>
    <option value="3">25-27</option>
    <option value="4">27-30</option>
    <option value="5">30-33</option>
  </select>
</div>
```

And in your data object:

```js
form: {
  firstName: 'Yas',
  lastName: '',
  additionalInfo: '',
  ageGroup: ''
}
```

If you want to add `multiselect` to your element, all you need to do is to add the attribute and change the type of the `ageGroup` property from string to array. If you want a default selection, simply set the value of the `ageGroup` in the data object and **Vue** will take of the rest.

If you want to populate the options dynamically, simply use a `v-for` directive:

```html
<option v-for="option in options" v-bind:value="option.value">
  {{ option.text }}
</option>
```

## Checkbox & Radio buttons

A single checkbox is very straightforward to use, the value of it will be a `boolean`:

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Terms and Conditions</h5>
    <h6 class="card-subtitle mb-2 text-muted">Read and agree</h6>
    <p class="card-text">Doggo ipsum clouds what a nice floof long water shoob doggo extremely cuuuuuute,   heckin good boys long water shoob.</p>
    <div class="form-check">
      <input class="form-check-input" 
        type="checkbox" 
        v-model="form.agreeToTsCs" 
        value="" id="termsAndConditions">
      <label class="form-check-label" for="termsAndConditions">
        Agree with terms and conditions
      </label>
    </div>
  </div>
</div>
```

And don't forget to add the property:

```js
form: {
  firstName: 'Yas',
  lastName: '',
  additionalInfo: '',
  ageGroup: '',
  agreeToTsCs: false
}
```

For multiple checkboxes, they all use the same property, but the type would be array.

A single radio button by itself is normally useless, so you'd want to use a radio button group. The value of the property would be the value of the selected radio input:

```html
<div class="form-check">
  <input class="form-check-input" 
    type="radio" 
    name="termSelection" 
    v-model="form.enrollingTerm"
    id="termSelection1" value="1">
  <label class="form-check-label" for="termSelection1">
    Term 1
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" 
    type="radio" 
    name="termSelection" 
    v-model="form.enrollingTerm"
    id="termSelection2" 
    value="2">
  <label class="form-check-label" for="termSelection2">
    Term 2
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" 
    type="radio" 
    name="termSelection" 
    v-model="form.enrollingTerm"
    id="termSelection3" 
    value="3">
  <label class="form-check-label" for="termSelection3">
    Term 3
  </label>
</div>
```

And add the property:

```js
form: {
  firstName: 'Yas',
  lastName: '',
  additionalInfo: '',
  ageGroup: '1',
  agreeToTsCs: false,
  enrollingTerm: ''
}
```

## Modifiers

There are a few modifiers which will be helpful for different scenarios and are provided out of the box. Let's review them one by one:

### .lazy

By default `v-model` will update the value of the input with your property on every `input` event. If you don't want that to happen, you can add `.lazy` and it will happen after `change` event:

```html
<div class="form-group">
  <label for="lazilyUpdated">This input will update after <code>change</code> event</label>
  <input type="text" class="form-control" v-model.lazy="form.lazilyUpdated" id="lazilyUpdated" placeholder="">
</div>
```

If you start typing on this text box, it will not get updated until you move away (blur happens).

### .number

This one will cast the value to be always a number:

```html
<div class="form-group">
  <label for="alwaysNumber">This property will always be number</code> event</label>
  <input type="number" class="form-control" v-model.number="form.alwaysNumber" id="alwaysNumber" placeholder="">
</div>
```

For the property you can use:

```js
form: {
  firstName: 'Yas',
  lastName: '',
  additionalInfo: '',
  ageGroup: '1',
  agreeToTsCs: false,
  enrollingTerm: '',
  lazilyUpdated: '',
  alwaysNumber: null
}
```

And just to make sure it works, you can add this to your value area:

```html
<div>{{ typeof(form.alwaysNumber) }}</div>
```

This is useful because `input type=number` will give you a string value and you have to use `parseInt` or `parseFloat` to get the correct type.

### .trim

This one is very obvious, it scrapes the whitespace from typed text:

```html
<div class="form-group">
  <label for="alwaysTrimmed">Trimmed text</code> event</label>
  <input type="text" class="form-control" v-model.number="form.alwaysTrimmed" id="alwaysTrimmed" placeholder="">
</div>
```

And:

```js
form: {
  firstName: 'Yas',
  lastName: '',
  additionalInfo: '',
  ageGroup: '1',
  agreeToTsCs: false,
  enrollingTerm: '',
  lazilyUpdated: '',
  alwaysNumber: null,
  alwaysTrimmed: ''
}
```

Now copy paste this string into the input and watch what happens 👉🏼 `   test    test`.

## Validation

You wouldn't want to send data invalidated to your server, right? Form validation is a key to handling any form data entered by users. In its simplest form, you could implement all your validation rules in a method and check them as the user continues or even before submitting.

However, we all know how much boiler plate code you have to write for that. So the most logical option is to find out what are our options out there. The open source community is very active and for most of what you need, there is already a matured library for it. We will review the most popular choice here, [vuelidate](https://github.com/vuelidate/vuelidate).

First you will need to install it:

```bash
npm install vuelidate --save
```

If you want to have validation enabled globally, you just need to import the library and use a plugin:

```js
import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
```

If you just want this on a single component, you could import a mixin directly:

```js
import { validationMixin } from 'vuelidate'

var Component = Vue.extend({
  mixins: [validationMixin],
  validations: { ... }
})
```

### Basic usage

Let's add some validation to our form. Say we want to make the first and last name mandatory, and set a minimum length for last name.

```js
import { required, minLength } from 'vuelidate/lib/validators'

new Vue({
  el: '#app',
  data: {
    form: {
      firstName: 'Yas',
      lastName: '',
      additionalInfo: '',
      ageGroup: '1',
      agreeToTsCs: false,
      enrollingTerm: '',
      lazilyUpdated: '',
      alwaysNumber: null,
      alwaysTrimmed: ''
    }
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    deCamelCase: function(str) {
      const result = str.replace(/([A-Z]+)/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1) + ':'
    }
  }
})
```

Now in our template we need to add the validation error message:

```html
<div class="form-group">
  <label for="firstName">First name</label>
  <input
        type="text"
        v-model="form.firstName"
        class="form-control"
        id="firstName"
        placeholder="Enter your name"
      />
  <div v-if="!$v.form.firstName.required" class="text-danger">
    First name is required</div>
</div>
<div class="form-group">
  <label for="lastName">Last name</label>
  <input
        type="text"
        v-model="form.lastName"
        class="form-control"
        id="lastName"
        placeholder="Enter your last name"
      />  
  <div v-if="!$v.form.lastName.required" class="text-danger">
    Last name is required</div>
  <div v-if="!$v.form.lastName.minLength" class="text-danger">
    Last name should be minimum 4 character</div>
</div>
```

Now you will have error messages shown when any of those rules are not met. Note that for first name I've used `$error`, which gives us ability to hide the error until the form is submitted or the status of the form property becomes `dirty`. For last name, I've used individual error fields, but that means that the error is visible on page load. A simple fix would be:

```html
<div v-if="$v.form.lastName.$error">
  <div v-if="!$v.form.lastName.required"
    :class="{ 'text-danger': !$v.form.lastName.required }">
    Last name is required</div>
  <div v-if="!$v.form.lastName.minLength"
    :class="{ 'text-danger': !$v.form.lastName.minLength }">
    Last name should be minimum 4 character</div>
</div>
```

## All the code together in action

You can find the complete code on [StackBlitz](https://stackblitz.com/edit/vue-formhandling) and play with it to explore more scenarios.

## Summary

We saw how form handling is very straight forward in **Vue**, and learnt a few tricks like `lazy`, and `trim` on `v-model` directive. We saw how error handling would be simple using a validation library instead of doing it from scratch and reinvent the wheel. And last but not least, we saw how to use `vuelidate` library to handle our form's errors.

Hope this has been helpful for you and stay tuned for the next article about state management in **Vue.js**.
---
layout: post
title: "Angular reactive forms and custom validations"
date: 2017-12-19 20:37
author: Yaser Adel Mehraban
comments: true
categories: [Angular, Reactive Forms]
tags: [angular, custom validation, reactiveforms]
---
When using [reactive forms](https://v2.angular.io/docs/ts/latest/guide/reactive-forms.html) in [Angular](https://angular.io/) we usually avoid template based validation like `required`, `maxlength` and so on. Instead we use the `Validators` in the `@angular/forms` like this:
<!--more-->
```javascript
this.heroForm = this.fb.group({
  name: ['', Validators.required ],
});
```

{: .box-note}
**Note**: in the above code, `fb` is an instance of `FormBuilder` which is injected into the constructor.

However, sometimes we want to implement a custom logic for our validations. Scenarios like checking a property value based on another property or checking whether two entered email addresses are equal.

## Template

We will take the email address scenario here as our base example and implement a custom validator that checks whether or not they are the same. 

First let's see how the template looks like:

```html
<form novalidate>
  <label>
    <span>Full name</span>
    <input
      type="text"
      name="name"
      placeholder="Your full name">
  </label>
  <div>
    <label>
      <span>Email address</span>
      <input
        type="email"
        name="email"
        placeholder="Your email address">
    </label>
    <label>
      <span>Confirm address</span>
      <input
        type="email"
        name="confirm"
        placeholder="Confirm your email address">
    </label>
  </div>
  <button type="submit">Sign up</button>
</form>
```

As you can see, it is a pretty simple form with three fields: name, email and its confirmation. Now let's create the form for this template:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({...})
export class SignupComponent implements OnInit {
  user: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', Validators.required],      
      email: ['', Validators.required],
      confirm: ['', Validators.required]
    }, {
      validate: (formGroup: FormGroup) => {
        return this.validateEmailConfirmation(formGroup);
      }
    });
  }
}
```

So in our model we have a name which is required, an email address and its confirmation which are required as well. However we cannot access confirm control value here so we will need another way for the confirmation validation.

That's when the second parameter to `group` method on `FormBuilder` comes to play. It takes a function which can be executed when the values are changed. In this case we are expecting a form group as input and we are calling a private method from our component and pass that form group as input to that method.

Now let's implement the `validateEmailConfirmation` method:

```typescript
private validateEmailConfirmation(formGroup: AbstractControl): {[key: string]: boolean} {
  const email = formGroup.get('email');
  const confirm = formGroup.get('confirm');
  if (!email || !confirm) {
    return null;
  }

  if (email.value !== confirm.value) {
    return {
      confirm: false
    };
  }
}
```

First we get the email and confirm controls by calling the `get` method on the form group. Then we check that both of them do exists by a `truthy` check. If either of them do not exists we just return null. 

Returning null means that the result is valid (remember that we have required all of them so that wouldn't be a problem).

At last we compare the two values and if they are not equal we return an object which has a key and a `boolean` value assigned to it.

## Binding the template to the form

We can now bind the form to the template and the validation messages to it:

```html
<form novalidate (ngSubmit)="onSubmit(user)" [formGroup]="user">
  <div class="form-group">
    <label>
      <span>Full name</span>
      <input type="text" placeholder="Your full name" formControlName="name">
    </label>
    <div class="error" *ngIf="user.get('name').hasError('required')">
      Name is required
    </div>
  </div>
  <div class="form-group">
    <label>
      <span>Email address</span>
      <input type="email" placeholder="Your email address" formControlName="email">
    </label>
    <div class="error" *ngIf="user.get('email').hasError('required')">
      Email is required
    </div>
  </div>  
  <div class="form-group">
    <label>
      <span>Confirm address</span>
      <input type="email" placeholder="Confirm your email address" formControlName="confirm">
    </label>
    <div class="error" *ngIf="user.get('confirm').hasError('required')">
      Confirming email is required
    </div>
    <div class="error" *ngIf="user.hasError('confirm')">
      The email and its confirmation do not match.
    </div>
  </div>
  <button type="submit" [disabled]="user.invalid">Sign up</button>
</form>
```

The first thing we have modified in the template is `[formGroup]` to the form and assigned the form group we made to it. Then we added `formControlName` to each one of the inputs.

So far we are wired up. Then we disabled the submit button if the form is invalid. And when it comes to error messages we get the control from the form and check for error messages with normal validation e.g. `required`.

We need one more error message for when the two email address do not match and because we are using a custom validator we will need to check for errors on the form group rather than the controls. 

Note that we are just checking for `user.hasError('confirm')` to see whether they are equal or not.

And that's it. We now have a working form with all the bindings and validations in place. Hope this helps to code better and do not forget to spread the love 😉

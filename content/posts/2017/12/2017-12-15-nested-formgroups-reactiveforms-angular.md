---
layout: post
title: "How to use nested form groups using ReactiveForms in Angular"
date: 2017-12-15 07:33
author: Yaser Adel Mehraban
comments: true
categories: [Angular]
tags: [angular, formarray, formcontrol, formgroup, reactiveforms]
image: /img/posts/ReactiveForms.jpg
---
[Full source code here](https://github.com/yashints/NestedFormGroupsAngular).

Before I start, let's see what does reactive mean.

When talking about [reactive forms](https://angular.io/guide/reactive-forms), it means that we are avoiding to use `ngModel`, `required` and so on. This means that instead of showing that Angular is taking care of the form for us, we can use the underlying APIs to do so. 
<!--more-->
In a simpler term, instead of using template driven model binding, we can construct our own form and the way they should be bound, validated and so on. For more information please refer to [Angular documentation here](https://angular.io/guide/reactive-forms).

Now if you are creating a form in [Angular ](https://angular.io/) using Reactive Forms and you have a complex object to bind to i.e. your form has multiple sections and each of them should be bound to a child object, then you can simply use [FormControl](https://angular.io/api/forms/FormControl#formcontrol) on an input like this:

```html
<input formControlName=”parent.child.property”/>
```
 
Instead you can use nested form groups that make it easy to understand and prevent you from having a large flat object to use in your bindings. So let's see how we should do it properly.

Let's assume we have a form to let user select some services they want to purchase as part of a package. Each service is presented in UI as a checkbox which user can check or uncheck.

{: .box-note}
**Note:** Assumptions I've made: You are familiar with Angular and also had some basic exposure to Reactive Forms.

Our model would look something like this:

```javascript
export class Package {
  name: string;
  serviceInfo: ServiceInfo;
}

export class ServiceInfo {
  deliveryDate: Date;
  services: Array<string>;
}
```

And we can then create the form group using the `FormBuilder` which we can inject into our constructor:

```javascript
export class MyForm {
  packageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      serviceInfo: this.fb.group({
        deliveryDate: '',
        services: this.fb.FormArray()
      })
    });
  }
}
```

For now I just used an array but we will change this shortly after we created our service catalogue object:

```javascript
serviceList: Array<any> = [
  { name: 'ADSL', code: 'ADSL', selected: false },
  { name: 'Cable Broad Band', code: 'CBL', selected: false },
  { name: 'Foxtel TV', code: 'FOXTEL', selected: true },
  { name: 'Home Wireless', code: 'HWL', selected: true },
  { name: '4G Network', code: '4G', selected: false }
];
```
Now we can create a method which will generate the desired `FormArray` for us (just to keep the form group creation clean) using the above catalogue:

```javascript
buildServiceList() {
  const arr = this.serviceList.map(service => {
    return this.fb.control(service.selected);
  });
  return this.fb.array(arr);
}
```

This method will simply create a `FormArray` and adds `Boolean` controls to it where the service's selected property is `true`. We can now use this method to generate our `FormGroup`:

```javascript
ngOnInit(): void {
  this.packageForm = this.fb.group({
    name: ['', Validators.required],
    serviceInfo: this.fb.group({
      deliveryDate: '',
      services: this.buildServiceList()
    })

  });
}
```

So far we have defined our `FormGroup` and we can now use it in our HTML template.

```html
<div class="container">
  <h1>Select your services</h1>
  <form [formGroup]="packageForm" (submit)="onSubmit()">
      <div class="form-group">
        <label for="name">Your name:</label>
        <input name="name" formControlName="name" />
      </div>
      <div formGroupName="serviceInfo">
        <div class="form-group">
          <label>Delivery Date:</label>
          <input formControlName="deliveryDate" type="date"/>
        </div>
          <div class="form-group">
              <label>Services:</label>
              <div *ngFor="let service of services.controls; let i = index">
                  <label>
                      <input type="checkbox" [formControl]="service" value=""/>
                  </label>
              </div>
          </div>
      </div>
      <div>
        <button class="btn btn-primary">Save</button>
      </div>
  </form>
</div>
```

In this template, I've used a form which has `[formGroup]` to use our `packageForm`. Then I've defined a form control for the name property.

Once that is done it is now time to go ahead and create the template for the child `FormGroup`.  As you can see we need a container element (I've used `div` in this case but you can use `ng-container` if you don't want any element on DOM for that). We tell Angular that this part should be assigned to a `FormGroup` named "serviceInfo".

Now we define our delivery date as normal formControl and when it comes to services we can then loop through the services array and generate them. There are two ways to access the array. As you can see in the above template I've stored the array in a class property and then used it to keep my template more readable.

However you can access it like this using the packageForm:

```html
<div *ngFor="let service of packageForm.controls.serviceInfo.controls.services.controls; let i = index"></div>
```

You can see why I've stored it in a local variable now. Now when you make changes to the form, you can see it below when I am just outputting the value of the form.

Alright we just need to extract the selected services when the form is submitted. I've created another method to do so:

```javascript
getSelectedServices() {
  return this.packageForm.value
    .services.filter(x => x)
              .map((selected, i) => this.serviceList.map( service => service.code ));
}
```

You can then call this on submit to extract the services and save it as an `Array<string>`:

```javascript
onSubmit() {
    const formValue = Object.assign({}, this.packageForm.value, {
      selectedServices:  this.getSelectedServices()
    });
    console.log(formValue);
}
```

And that's it. Hope this helps people like me who are looking to use complex objects in their UI forms and want to use `Reactive Forms` as their desired method.

And as always don't forget to spread the love by sharing this if it was useful, and also feedback always is welcomed.


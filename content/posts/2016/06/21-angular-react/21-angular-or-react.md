---
id: 5
path: '/angular-or-react/'
title: 'Angular or React???'
date: 2016-06-21
author: Yaser Adel Mehraban
popular: true
categories: [Angular, JS, reactjs]
tags:
  [
    angularjs,
    binding,
    debugging,
    performance,
    reactjs,
    scope,
    template,
    transclusion,
  ]
thumbnail: './angular-vs-react.jpg'
---

Spoiler alert: we cannot compare these two as they are different in nature, but, I try to go through some points you to need to consider, when choosing a front end technology.

<!--more-->

When you **deploy** your app you probably want to delay sending unnecessary files to client and increase the page load speed. Well if that's the case Angular has very little support for that as you can lazy load html templates.

Although you can do so for the JS files but you eventually end up with a spaghetti code which is hard to maintain and also takes some time to completely address what you need.

In this area React is the winner as it simply is JS and doesn't care, you can lazy load files with RequireJS and also integrate with frameworks like WebPack.

I think **learning** Angular would take more time than React. As some people including  me have experienced you can learn React to a good extent in about a week. With Angular, however, it takes some time to learn the basics and then it gets harder as you go like a marriage.

Good **abstraction** is priceless. Abstraction provides fast development and hides details that are not necessary for the developer using a library.

Angular is week in keeping people away from its model state as so many developers have had to debug its internal state as they were debugging their code. React's abstraction has led to it being less flexible like not be able to add attributes to Html tags (which I think is fixed by mixins implementation). However in total React is the winner.

**Data model complexity** is another factor which means how it is structured to be shown in view later on. Angular is suffering from relying heavily in scope because of the copy-n-compare. React gives you the ability to choose without facing performance hits and the outcome depends on whether you are a good or bad coder.

Next thing to consider is **binding**. Angular allows you to bind only to model. This means that you cannot bind to a server/async service. If you want to do that you have to have intermediate models and even then you will suffer from the explicit watches and digest cycle.

React on the other hand provides syntactic sugar for binding which is called valueLink. It is a single attribute for both "Value" and "onChange" properties. This is so simple to believe that it is doing what you want but it does and if you understand it well, you can implement any of your needs easily.

Then it comes **debugging**. With debugging you want to achieve mostly two things. First why you logic is not working and second why the HTML outcome does not look like what you wanted to be.

Angular does a good job of providing constructs that are logical, like services. If used correctly, they make the code easier to test and debug, but any good programmer will try to separate code and logic with or without them.

React has two main scenarios - updating the model/doing other actions as a result of user events; and the one-way rendering flow which is always the same. This means that there are fewer places to look for your bugs and the stack traces have clear distinction between React's code, and your own. They normally don't mix. React also has less magic, and it's all concentrated in one place - the vDom comparison. It is a closed black box but in our experience, it worked as expected.

Time to discuss **performance tweaking**. In Angular you need to count the number of scopes, global scope variables and functions (which makes scope heavy and sometimes tided to other scopes) and in some cases you have to implement a component in pure js as you can find heaps of articles on Angular perf tuning.

On the other hand React makes it easy to take control of performance by letting you choose between customising when the DOM should be updated by yourself or let React take care of it by a simple comparison of the vDOM. Of course if your model if complex you need to do it yourself by implementing a custom ShouldComponentUpdate method to use efficient way of doing state and dirty checks.

Next comes my favourite **Code Reuse**. No one can deny the fact that there are thousands of libraries ready to use for Angular. The point here is to not use too many libraries from different vendors due to namespace and priority collisions. React lets you do that by creating reusable components and it is super easy to create complex hierarchical component structures that can be used for future needs. But the winner is Angular as you can almost find anything from a simple date only directive to a complex file upload with background ajax calls to upload your file with nice UI which has progress bar and everything.

Templating is another important feature of any front end framework. Angular is a clear winner in this case but not in all aspects and you will see why when I walk you through an example. Imagine that you are writing a repeater which looks like this in React:

```javascript
var createItem = function(itemText) {
  return <li> {itemText} </li>
}

return <ul> {this.props.items.map(createItem)} </ul>
```

In Angular this will be like:

```html
<ul>
  <li ng-repeat="item in items"><span ng-bind="item"></span></li>
</ul>
```

Which one is better to you?

The question here will be how do we get advantage of all of React's benefits while preserving this great feature of Angular.

The answer is by using rt pre-compiled templates. You can find more information on this [here](http://wix.github.io/react-templates/).

Thanks to this awesome feature the code above will become:

```html
<ul>
  <li rt-repeat="item in items">{item} at index {itemIndex}</li>
</ul>
```

And this is a true **if expression** which means this will not render if the condition is false:

```html
<label rt-if="chips.isGoodForHealth"> I don't think so </label>
```

It is nice, isn't it. Now wait for this sugar:

```html
<div rt-scope="this.getItems() as items" title="{item.title}">
  Item Description: {item.description}<br />
  Last viewed at:
  <span rt-class="{status:true, lasSeen:this.lastSeen(item) > '25-11-2015'}"
    >{item.lastSeen}</span
  >
</div>
```

Also for **transclusion**:

```html
<span>{this.props.children}</span>
```

And **handling events**:

```html
<div>
  <div
    rt-repeat="task in tasks"
    style="font-weight:{task.selected ? 'bold' : 'normal' }"
    onClick="() => this.toggleTask(task)"
  >
    {task.title}
  </div>
  <button onClick="{this.save}">Save</button>
</div>
```

**Conclusion**: It seems that the question is wrong basically because each framework has something special to offer and is used it a specific scenario. Also you can combine them together (we've done that in one project and it is very nice and easy to get done) to use the React's fast rendering experience along with end-to-end features of Angular. Of course there are a lot of other ways to combine React with other techs to replace Angular but they have their own pros and cons.

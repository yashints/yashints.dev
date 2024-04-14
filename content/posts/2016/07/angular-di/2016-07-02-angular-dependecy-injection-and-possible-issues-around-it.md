---
id: 6
path: '/angular-dependecy-injection-and-possible-issues-around-it/'
title: 'Angular dependency injection and possible issues around it'
date: 2016-07-02
author: Yaser Adel Mehraban
popular: true
categories: [Angular, JS]
tags: [angular, dependency injection]
---

Have you ever wondered why you angular code works perfectly in you dev environment but not in production?

<!--more-->

Angular leverages dependency injection all across the framework. It works with functions defined for `controller`, `directive`, `service`, `factory`, etc. This can create an issue when minifying JavaScript assets. To illustrate this issue let's late a look at a test controller:

```javascript
function TestCtrl($scope, $log) {
  $scope.$watch('random-event', function() {
    $log.log('hello world')
  })
}

angular.module('test').controller('TestCtrl', TestCtrl)
```

Here, we're injecting two services into the controller: `$scope` and `$log`.

If we look it the code after minification using any tool (I've used uglified here) we should see something like this:

```javascript
function TestCtrl(t, l) {
  t.$watch('random-event', function() {
    l.log('hello world')
  })
}
angular.module('test').controller('TestCtrl', TestCtrl)
```

If you've guessed that the parameter names in TestCtrl which have changed to t and l does not mean anything to Angular, you are exactly right. Angular doesn't have any idea that these are actually supposed to be `$scope` and `$log` respectively and will therefor throw an error.

To tackle this problem you have the ability to strictly mention the names and order of your dependencies using array syntax. Because the string won't get minified there is no chance that Angular miss any dependency if written like this:

```javascript
angular.module('test').controller('TestCtrl', [
  '$scope',
  '$log',
  function($scope, $log) {
    $scope.$watch('random-event', function() {
      $log.log('hello world')
    })
  },
])
```

There is another way that I prefer to use and is a bit cleaner as well which is using `$indject` property. This will keep the core readable and maintainable as you would clearly see the order and name of the of the dependencies within your code file:

```javascript
function TestCtrl($scope, $log) {
  $scope.$watch('random-event', function() {
    $log.log('hello world')
  })
}

TestCtrl.$inject = ['$scope', '$log']

angular.module('test').controller('TestCtrl', TestCtrl)
```

That's better, isn't it?

Now I will show you how it looks like after minification so you would see the difference:

```javascript
function TestCtrl(t, l) {
  t.$watch('random-event', function() {
    l.log('hello world')
  })
}

TestCtrl.$inject = ['$scope', '$log']

angular.module('test').controller('TestCtrl', TestCtrl)
```

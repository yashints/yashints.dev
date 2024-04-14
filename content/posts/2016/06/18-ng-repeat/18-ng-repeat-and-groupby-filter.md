---
id: 2
path: '/ng-repeat-and-groupby-filter/'
title: 'ng-repeat and groupBy filter'
date: 2016-06-18
author: Yaser Adel Mehraban
popular: true
categories: [Angular, Html, JS]
tags: [angularjs, dropdown, html, ngOptions, ngRepeat, select]
---

TL/DR,

If you are using angular-filter already don't read this.

Recently I was working on a task for creating a responsive UI which involved changing the html select with a button. Then with a click or tap on the button there should be a list shown like a drop down. Well I though ok let's do that and quickly started using bootstrap dropdown.

<!--more-->

Then when it came to showing the list I needed to do a group by and well I did this:

```html
<ul>
  <li data-ng-repeat="facility in facilities | groupBy: 'region.name'"></li>
</ul>
```

Well at that point I wasn't aware that I needed `Angular-Filter.js` in order to achieve what I wanted, because you can use a group by statement in `ngOptions` in a select:

```html
<select
  ng-model="myColor"
  ng-options="color.name group by color.shade for color in colors"
>
</select>
```

The problem was that I didn't want another file added to our current bundle,
so I decided to think how to do that without importing that dependency. Well for
those who hadn't face this situation there are a couple of ways to get the
desired result: 1- You can create a filter and added to your app. Then use it
inside `ngRepeat`. This is what I did as my first attempt:

```javascript
angular.module('myApp', []).filter('groupBy', function() {
  return function(data, key) {
    if (!(data && key)) return
    var result = {}
    for (var i = 0; i < data.length; i++) {
      if (!result[data[i][key]]) result[data[i][key]] = []
      result[data[i][key]].push(data[i])
    }
    return result
  }
})
```

When I tried it out I got errors on console. The error was infinite loop in the angular digest cycle. The digest cycle is the stage in which Angular ensures the changes of the model have settled, so that it can render the view with the updated changes.

In order to do that, Angular starts a loop in which each iteration evaluates all the template expressions of the view, as well as the watcher functions of the `$scope`.

If in the current iteration the result is the same as the previous one, then Angular will exit the loop. Otherwise, it will try again. If after 10 attempts things haven’t settled, Angular will exit with an error: The [Infinite digest loop error](https://docs.angularjs.org/error/$rootScope/infdig).

It’s because the `ngRepeat` directive adds a watcher  into its container’s `$scope` for the collection that’s being iterated.

This means that in our case, the `ngRepeat` directive is doing this, which is causing the error:

```javascript
$scope.$watchCollection("students | groupBy: 'class'", function ngRepeatAction(collection)
{
...
}
```

Since the `$filter` is returning a new `Object` containing new arrays every time it runs, this causes the digest cycle to get into an infinite loop for the `$watchCollection` function.

Well I had to revise my code and had a couple of options again. The first one is a code used by  [Ariel Mashraki (a8m)](https://github.com/a8m) and is a very clever way. The only issue is that it cannot be combined with other filters:

```javascript
.filter('groupBy', function ($timeout) {
    return function (data, key) {
        if (!key) return data;
        var outputPropertyName = '__groupBy__' + key;
        if(!data[outputPropertyName]){
            var result = {};
            for (var i=0;i&lt;data.length;i++) {
                if (!result[data[i][key]])
                    result[data[i][key]]=[];
                result[data[i][key]].push(data[i]);
            }
            Object.defineProperty(data, outputPropertyName, {enumerable:false, configurable:true, writable: false, value:result});
            $timeout(function(){delete data[outputPropertyName];},0,false);
}
return data[outputPropertyName];
};
})
```

Well it is simply creating a non-enumerable property in the original `Array` that is being filtered with the result of the ‘groupBy’.

This way, when the digest cycle triggers the `$filter`, the `$filter` will first check if the property has already been set. If it hasn’t, it will do the `groupBy` and will save the result in the non-enumerable property.

If the property has already been set, it will return the cached value. Also, notice that there is a `$timeout` that deletes that property after the digest cycle has finished.

The second one is the one used by  [Johnny Hauser (m59peacemaker)](https://github.com/m59peacemaker) which is cleaner and you can use it with other filters as well:

```javascript
angular.module("pmkr.filters", [])
    .filter('groupBy', ['pmkr.filterStabilize', function(stabilize) {
        return stabilize(function(data, key) {
            if (!(data & amp; & amp; key)) return;
            var result = {};
            for (var i = 0; i & lt; data.length; i++) {
                if (!result[data[i][key]])
                    result[data[i][key]] = [];
                result[data[i][key]].push(data[i])
            }
            return result;
        });
    }])
    .factory('pmkr.filterStabilize', [
        'pmkr.memoize',
        function(memoize) {
            function service(fn) {
                function filter() {
                    var args = [].slice.call(arguments);
                    // always pass a copy of the args so that the
                    // original input can't be modified
                    args = angular.copy(args);
                    // return the `fn` return value or input
                    // reference (makes `fn` return optional)
                    var filtered = fn.apply(this, args) || args[0];
                    return filtered;
                }
                var memoized = memoize(filter);
                return memoized;
            }
            return service;
        }
    ])
    .factory('pmkr.memoize', [
        function() {
            function service() {
                return memoizeFactory.apply(this, arguments);
            }

            function memoizeFactory(fn) {
                var cache = {};

                function memoized() {
                    var args = [].slice.call(arguments);
                    var key = JSON.stringify(args);
                    var fromCache = cache[key];
                    if (fromCache) {
                        return fromCache;
                    }
                    cache[key] = fn.apply(this, arguments);
                    return cache[key];
                }
                return memoized;
            }
            return service;
        }
    ]);
```

Just be careful that if you are doing it for large arrays you may face some performance issues with this solution.

2- Group by your list in your controller and use two `ng-repeat` to simulate the original list. This one very simple and I don't get deep into it. You can easily use a library like underscore and use its group by like this:

```javascript
var list = _(facilities).groupBy(function(o) {
  return o.region.name
})
```

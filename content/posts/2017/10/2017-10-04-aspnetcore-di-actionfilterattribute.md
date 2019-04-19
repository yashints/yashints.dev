---
layout: post
title: "Using ASP.NET Core DI to inject objects into ActionFilterAttribute"
date: 2017-10-04 11:01
author: Yaser Adel Mehraban
comments: true
categories: [asp.net, asp.net mvc, aspnetcore, C#, Dependency Injection]
tags: [actionfilterattribute, aspnetcore, aspnetmvc, DI, servicefilter]
---
## Problem

Let's assume you want to validate something before a request hits your [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) controller's action method. One of the possible solutions is to create an `ActionFilterAttribute` and use its `OnActionExecutionAsync` (in case you like to do it asynchronously) to do the checking. Now if you are depending on something like configuration or even another instance of a class it is going to be tricky.
<!--more-->
{: .box-note}
**Note**: The purpose of this post is not to introduce the `ActionFilterAttributes`. [For that you can have a look at here](https://msdn.microsoft.com/en-us/library/system.web.mvc.actionfilterattribute(v=vs.118).aspx).

The way you use your filter attribute is to put it above your action like this:

```cs
public class ValidateSomethingAttribute : ActionFilterAttribute
{
  public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
  {
    await DoSomething(context);
    await base.OnActionExecutionAsync(context, next);
  }
}

public class MyController: Controller 
{
  [ValidateSomethingAttribute]
  public ActionResult Get() 
  {
  }
}
```

## Why use dependency injection (DI)?
    
Obviously there are two ways you can pass an input to an action filter. You can pass an input or you can use dependency injector (and I am not talking about scalar values here). The benefit of having dependency injector inject that dependency is that you won't need to define a public property in your filter and pass it from controller.
    
Instead you can define a private property and set it from the filter's constructor:
    
```cs
public class ValidateSomethingAttribute : ActionFilterAttribute
{
  private readonly IConfiguration _configuration;

  public ValidateSomethingAttribute(IConfiguration configuration) 
  {
    _configuration = configuration;
  }
  
  public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
  {
    await DoSomething(context);
    await base.OnActionExecutionAsync(context, next);
  }
}
```
    
## How to get it injected
    
Filters that are implemented as attributes and added directly to controller classes or action methods cannot have constructor dependencies provided by [dependency injection (DI)](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection). This is because attributes must have their constructor parameters supplied where they are applied. This is a limitation of how attributes work.

Now the question is how to have DI to inject that dependency into our filter for us. The answer is by using another filter called `ServiceFilter`.

## ServiceFilterAttribute
    
From [Microsoft Docs](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/filters):
    
A `ServiceFilter` retrieves an instance of the filter from DI. You add the filter to the container in `ConfigureServices`, and reference it in a `ServiceFilter` attribute.

All we need to do is to let DI know it should resolve our filter attribute and inject it using a service filter:
    
```cs
public void ConfigureServices(IServiceCollection services)
{
    ...

    services.AddScoped&lt;ValidateSomethingAttribute&gt;();
}
```

and in the controller:
    
```cs    
[ServiceFilter(typeof(ValidateSomethingAttribute))]
public IActionResult Index()
{
    return View();
}
```

And done, you now can depend on ASP.NET Core DI to handle everything for you and not worry about initialising objects with their dependencies.

To me this way is very neat and better than trying to pass the dependencies as parameters, especially if the number of dependencies are high.

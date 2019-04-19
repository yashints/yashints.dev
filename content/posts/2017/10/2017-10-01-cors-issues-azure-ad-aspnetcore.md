---
layout: post
title: "CORS issues when using Azure AD in ASP.Net Core and Angular"
date: 2017-10-01 23:32
author: Yaser Adel Mehraban
comments: true
categories: [Angular, asp.net, asp.net mvc, aspnetcore, authentication, Azure AD]
tags: [angular, aspnetcore, authentication, azureactivedirectory, cors]
image: /img/posts/cors.jpg
---
Recently, I wrote a [post](/2017-09-28-integrating-spa-azure-ad/) about using [Azure Active Directory](https://azure.microsoft.com/en-au/services/active-directory/) (AD) as authentication mechanism for a single page application written in Angular. It also consumed [ASP.NET Core 2.0](https://github.com/aspnet/Home) as API layer an we saw how to wire up the whole thing end to end.
<!--more-->
In my approach I redirected user to Azure from client side, however, there are other ways you can follow in which the user is redirected from server to Azure login page. In such cases you might struggle with [cross origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) aka CORS issues as it will be required for the application to behave properly.

## Why?

The reason for that is because another domain is trying to call your API for token generation purposes. So if you don't enable the CORS the authentication will not be successfully done.

To allow `CORS` we need to add the header `Access-Control-Allow-Origin` to the requests. There are two ways we can enable it, globally or on certain requests.

### Configure the CORS policy

Before going deeper into those, you will need to configure the CORS in your `ConfigureServices` method on your `Startup.cs`:

```cs
public void ConfigureServices(IServiceCollection services)
{
    // Add service and create Policy with options
    services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy",
            builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials() );
    });    
    
    services.AddMvc(); 
}
```
    
I prefer the policy over just enabling CORS because it gives us more control to be able to explicitly specify when do we want to enable it.
    
Now that you've done configuring let's see both ways, I mentioned earlier. For enabling the CORS globally, you can use the middle-ware available in `Microsoft.AspNetCore.Cors` NuGet package:
    
```cs
public void Configure(IApplicationBuilder app)
{
    // ...

    // global policy - assign here or on each controller
    app.UseCors("CorsPolicy");

    // ...
    
    app.UseMvcWithDefultRoutes();
}
```
    
It is very important to call the middle-ware before adding MVC as otherwise it will not work, since the request gets terminated by MVC pipeline.
    
The second way (also my preferred option) is to add it the controller we need (e.g. login controller):
    
```cs
[EnableCors("CorsPolicy")]
[Authorize]
public class LoginController : Controller
{
    ...
}
```
    
It's all done. Your application now supports CORS and the authentication will be successful.
    
## Refine the policy
    
    
If you paid attention to the policy you will find out that we are enabling the `CORS` for all domains, all headers and all methods. This is can lead to security issues later on, so let's refine this to just allow that from Azure AD and not other domains.
    
In the policy you just need to set the domain instead of using `AllowAnyOrigin`:
    
```cs
services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("https://login.microsoftonline.com")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
```

This makes sure that our APIs are only available to the specified domain rather than any domain which is much more secure.

Hope this helps resolving the issue you're facing.

## References

*   [ASP.NET Core docs](https://docs.microsoft.com/en-us/aspnet/core/security/cors)
*   [Azure Samples](https://github.com/Azure-Samples/active-directory-angularjs-singlepageapp-dotnet-webapi)

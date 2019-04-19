---
layout: post
title: "Authentication in ASP.NET Core 2.0"
date: 2017-09-23 20:40
author: Yaser Adel Mehraban
comments: true
categories: [asp.net, aspnetcore, authentication, authorization, C#, security]
tags: [2fa, active, aspnetcore, authentication, qrcode, security, sms]
image: /img/posts/net-core-logo-proposal.jpg
---
As you might know the [.NET Core 2.0](https://blogs.msdn.microsoft.com/dotnet/2017/08/14/announcing-net-core-2-0/) was release recently and with it come many improvements and changes. In this post I will point out a couple of changes from a security and authentication perspective.
<!--more-->
## Authentication

If you have previously used any form of authentication in ASP.NET Core 1.0, you would know that in order to configure your preferred mechanism you have to call one of the middle-wares available. For example if you wanted to use cookie authentication (local) this is how it would look like:

```cs
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
    AuthenticationScheme = "Cookie",
    LoginPath = new PathString("/Account/Login/"),
    AccessDeniedPath = new PathString("/Account/Forbidden/"),
    AutomaticAuthenticate = true,
    AutomaticChallenge = true
});
```

This basically means that you are letting ASP.Net know that you want to use cookie authentication with a specific login/access denied path. Also you want to enable automatic authenticate which means the `middleware` will run on every inbound request, look for a cookie and if one is present it will validate it, and if valid create an identity from it and add it to the current user.
    
I will not go through more details as it is not the purpose of this post but you can find all the details on [Microsoft Official Documentation](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?tabs=visual-studio%2Caspnetcore2x). Same thing is true if you wanted to use [JWT bearer](https://blogs.msdn.microsoft.com/webdev/2017/04/06/jwt-validation-and-authorization-in-asp-net-core/) or any other form of authentication.
    
```cs
app.UseJwtBearerAuthentication(new JwtBearerOptions()
{
    Audience = "http://localhost:5001/", 
    Authority = "http://localhost:5000/", 
    AutomaticAuthenticate = true
});
```

Remember that you can use multiple middle wares in conjunction to support more complex scenarios.
    
However, this has changed quite a bit in version 2.0 in a sense that all of these has been combined into a single service which you will need to configure. Also they have moved from `Microsoft.AspNetCore.Http.Authentication` namespace to `Microsoft.AspNetCore.Authentication`.  

Also instead of calling `context.Authentication.Authenticate|Challenge|SignInAsync` you will call them on context directly like `context.Authenticate|Challenge|SignInAsync`.
    
That said if you just change your framework you will get a compile error which is awesome:
    
![Obsolete Authentication Option](/img/posts/obsoleteauth.png)
    
To achieve the above scenario you will need to first configure the service:

```cs    
services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
  .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => 
  {
    options.LoginPath = new PathString("/Account/Login/");
    options.AccessDeniedPath = new PathString("/Account/Forbidden/");
  });
```
    
It is very similar to how you used to configure your cookie authentication middle ware, except that you now have to define a default scheme in the constructor of the service. In above we've configured the default to be `CookieAuthenticationDefaults.AuthenticationScheme`.
    
There is a **catch** here, and that is just be defining the service configuration your application will not use authentication, you will need add `app.UseAuthentication();` at the top of the `Configure()` method.

```cs
// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    app.UseAuthentication();            
}
```
    
## Authorization

You still can use your older code for authorisation though:
    
```cs
services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
});
```

And in your controller:
    
```cs
[Authorize(Policy = "RequireAdminRole")]
    public class AdminController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

## Active vs Passive

With the new version there is only one active authentication scheme at a time, because of the fact that it is not a single service. But first let me give a bit of history on what is active vs passive.

Well authentication middleware has the concept of passive vs active. Active middleware always intercepts every incoming request and attempts to authenticate the call.

If successful they create a principal that represents the current user and assign that principal to the hosting environment. Passive middleware, on the other hand, only inspects the request when asked to.

Are you wondering what is the benefit of this? Well you won't get complex scenarios where one of the middleware is failed but you cannot prevent others to get invoked.

## Two Factor Authentication (2FA) is now added

ASP.NET Identity has now support for two factor authentication using Time-based One-time Password Algorithm (TOTP), and in fact that is now its default option. That means you can use the authenticator app using a [QR Code](https://wikipedia.org/wiki/QR_code) which is preferred over SMS 2FA which was available in version 1.0.

Also the ASP.NET Core web app templates support authenticators, but do not provide support for QRCode generation. QRCode generators ease the setup of 2FA.
---
layout: post
title: "Using Azure B2C as your identity manager (Part 2)"
date: 2017-08-21 20:03
author: Yaser Adel Mehraban
comments: true
categories: [Angular, aspnetcore, Azure B2C]
tags: [angular 4, aspnetcore, authentication, b2c]
image: /img/posts/b2c.png
---
This article is one of the two part series I wrote on how to use Azure B2C as your identity manager.
<!--more-->
You can find [part 1 here.](/2017-08-16-using-azure-b2c-identity-manager-part-1/)

[Full source code on Github.](https://github.com/yashints/Angular4AzureB2C)

## Recap

In my previous post I talked about how to setup the Azure B2C and get ready to integrate that into your application. There are a two ways to do this, mentioned below, however, I will show you how to implement the second one here from scratch.

## Options available:

1.  Only server side integration
2.  Server and client side integration

## What do you need?

If you've read and followed the previous post you should now have an `application id` and a `secret key` (you won't need the secret key for this approach), plus your tenant login endpoint information. To cut it short, you will need the below configuration:

```json
"AzureAd": {
  "Tenant": "your-tenant-name.onmicrosoft.com",
  "ClientId": "7e232743-66f4-429e-9855-5b42f4dd08c6",
  "Policy": "B2C_1_policyname",
  "ScopeRead": "read",
  "ScopeWrite": "write"
}
```
I put the information needed in above format to make it easy to be placed inside an [Asp.Net Core](https://docs.microsoft.com/en-us/aspnet/core/) application config (`appsettings.json` or `web.config`). 

As you can see you will need the tenant name, application id which you've created (I've called it client id), the policy name you want to use for authentication purpose, and the scopes you will need such as read and write.
    
    
## Setup the authentication

Now is the time to use this information. Create a class file and name it `ConfigueAzureAuth` (or pick any name you like). Inside this file create a partial class and name it `Startup`. Now in this class use the code below:

```cs    
public partial class Startup
{
  public static string ScopeRead;
  public static string ScopeWrite;
  private void ConfigureAzureAdAuth(IApplicationBuilder app)
  {
    var tenant = Configuration["Authentication:AzureAd:Tenant"];
    var clientId = Configuration["Authentication:AzureAd:ClientId"];
    var policy = Configuration["Authentication:AzureAd:Policy"];

    var jwtBearerOptions = new JwtBearerOptions
    {
      MetadataAddress = $"https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration?p={policy}",
      Audience = clientId,
      Events = new JwtBearerEvents
      {
        OnAuthenticationFailed = (ctx) =>
        {
          //Do whatever you would do for failed authentication
          //Normally log the exception and return 403 to client for this approach
          return Task.CompletedTask;

        }
      }
    };
    
    app.UseJwtBearerAuthentication(jwtBearerOptions);
    ScopeRead = Configuration["Authentication:AzureAd:ScopeRead"];
    ScopeWrite = Configuration["Authentication:AzureAd:ScopeWrite"];
  }
}
```

As you can see there is not much to write in this class, it is a very basic configuration to use [JSON web token](https://jwt.io/) (JWT) bearer authentication.
    
Now open up the `Startup.cs` and put this line inside `Configure` method:
    
```cs
public void Configure(IApplicationBuilder app, IHostingEnvironment env){
  //Rest of the code
  
  ConfigureAzureAdAuth(app);
 
  //code might continue
}
```

Alright, so far you've told Asp.Net Core to use JWT bearer token with the Azure B2C endpoint, however, this is just to handle the server side check of the token which comes back from login process and and extract the claims to `User` object.
    
Now that we've configured everything, it is time to use `Authorize` filter on one of the controllers. I've just used the default SampleDataController for this purpose.

```cs
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
 
namespace Web.Controllers
{
  [Route("api/[controller]")]
  [Authorize]
  public class SampleDataController : Controller
  {
    private static string[] Summaries = new[]
    {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
 
    [HttpGet("[action]")]
    public IEnumerable<WeatherForecast> WeatherForecasts()
    {
      var rng = new Random();
      return Enumerable.Range(1, 5).Select(index => new WeatherForecast
      {
        DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
        TemperatureC = rng.Next(-20, 55),
        Summary = Summaries[rng.Next(Summaries.Length)]
      });
    }
 
    public class WeatherForecast
    {
      public string DateFormatted { get; set; }
      public int TemperatureC { get; set; }
      public string Summary { get; set; }
 
      public int TemperatureF
      {
        get
        {
          return 32 + (int)(TemperatureC / 0.5556);
        }
      }
    }
  }
}
```

## Configuring the client side
   
In this approach we will need to interact with Azure B2C from our SPA application. For this we need some metadata about the endpoint and application id we have. Since I am using a client library called [oidc-client](https://github.com/IdentityModel/oidc-client-js), we will need a setting similar to this:
    
```json
"AzureClientConfig": {
  "Authority": "https://login.microsoftonline.com/your-tenant-domain/oauth2/v2.0/authorize",
  "Client_id": "your-application-id",
  "Redirect_uri": "https://localhost/loginCallback",
  "Post_logout_redirect_uri": "https://localhost",
  "Response_type": "id_token token",
  "Scope": "openid https://your-tenant-domain/app-name/read https://your-tenant-domain/app-name/user_impersonation",
  "Silent_redirect_uri": "https://localhost",
  "AutomaticSilentRenew": true,
  "FilterProtocolClaims": false,
  "LoadUserInfo": false,
  "MetadataUrl": "https://login.microsoftonline.com/your-tenant-domain/v2.0/.well-known/openid-configuration?p=B2C_1_susitest",
  "ResetPassUrl": "https://login.microsoftonline.com/your-tenant-domain/oauth2/v2.0/authorize?p=B2C_1_passwordReset"
}
```

I just point out some important notes in the setting you will need to change:
    
* Replace the `your-tenant-domain` with your tenant domain name you will find on your B2C blade. This will tell the login endpoint which B2C instance to use.
* `Client-id` is your application id you created earlier. This is exactly what you used to setup the server side settings.
* `Redirect-uri` is where the login response is sent to. You will need a handler at this URL which we will setup later on. Same goes for logout URL which is usually your login page.
* In the scope section you see I put `app-name` in between the scope name and the tenant domain. This is the name of the application that you created. You can find the name of the application in the Applications menu of the B2C blade information page.
* If you intend to use silence renewal for user sessions then you should set the right URL and create the handler for it which I am not going to do here. I will cover that in a separate post later however.
* At the end of the `MetadataUrl` and `ResetPassUrl` you should put your policy names that you created for that purpose.
    
Now it's time to consume this information.
    
## Creating the application
    
I am going to use the default angular template of [Visual Studio 2017](https://www.visualstudio.com/vs/whatsnew/) for this example which will setup a project for me with [Asp.Net Core 2.0](https://blogs.msdn.microsoft.com/webdev/2017/08/14/announcing-asp-net-core-2-0/) and [Angular 4](https://angular.io/).
    
Open up your Visual Studio and create a new web project (Select angular template). You should have a structure like below.
    
![Project Structure](/img/posts/b2cvsprojstructure.jpg)
    
I am going to create a config module which can be configured to be injected to our service later using DI in Angular. Below is the file I've created in the `ClientApp/app` folder:

```javascript    
import { NgModule, InjectionToken } from '@angular/core';
 
export let B2C_CONFIG = new InjectionToken<B2CConfig>('b2cconfig');
 
export class B2CConfig {
	authority: string;
	client_id: string;
	redirect_uri: string;
	post_logout_redirect_uri: string;
	response_type: string;
	scope: string;
	silent_redirect_uri: string;
	automaticSilentRenew: boolean;
	filterProtocolClaims: boolean;
	loadUserInfo: boolean;
	metadataUrl: string;
	resetPassUrl: string;
}
 
export const APP_B2C_CONFIG: B2CConfig = {
	authority: 'https://login.microsoftonline.com/angular4b2c.onmicrosoft.com/oauth2/v2.0/authorize',
	client_id: '11246517-8ca1-41e9-8054-55acd1dfa250',
	redirect_uri: 'http://localhost:51126',
	post_logout_redirect_uri: 'http://localhost:51126',
	response_type: 'id_token token',
	scope: 'openid https://angular4b2c.onmicrosoft.com/spaapp/read https://angular4b2c.onmicrosoft.com/spaapp/user_impersonation',
	silent_redirect_uri: 'http://localhost:51126',
	automaticSilentRenew: false,
	filterProtocolClaims: false,
	loadUserInfo: false,
	metadataUrl: 'https://login.microsoftonline.com/angular4b2c.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_dev',
	resetPassUrl: 'https://login.microsoftonline.com/angular4b2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_reset'
};
 
@NgModule({
	providers: [{
		provide: B2C_CONFIG,
		useValue: APP_B2C_CONFIG
	}]
})
export class B2CConfigModule { }
```    

Now let's create the services we need. We will need to services, one which plays the route guard role and the other for authentication. Since I will be using [oidc-client](https://github.com/IdentityModel/oidc-client-js), I will use their Authentication service code. So here is our Authentication service which I've created inside services folder.
    
Since the code is a bit long I won't show the code here but don't worry, a fully working version is to be found on my GitHub [repository](https://github.com/yashints/Angular4AzureB2C).
    
However to demonstrate how you should use the above config, I'll go through the necessary bits:

```javascript
mgr: UserManager;
 
constructor( @Inject(B2C_CONFIG) private config: B2CConfig,
  private http: Http,
  private router: Router) {
  this.mgr = new UserManager(this.config);
}
```

Once you got the config in the constructor you can go ahead and initialise the user manager from the `oidc-client` library. Once initialised, you can then use its startSignIn method to initiate the login process which you will do behind your login button.
    
```javascript
startSigninMainWindow() {
    this.mgr.signinRedirect({ data: 'some data' }).then(() => {
     console.log('signinRedirect done');
  }).catch( (err) => {
     console.log(err);
  });
}
```

In my login component I just have a login button which calls the above method from authentication service.
    
```javascript
import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
 
@Component({
  selector: 'login',
  styleUrls: ['./login.css'],
  templateUrl: './login-component.html'
})
export class LoginComponent {
 
  constructor(private service: Auth) { }
 
  login() {
    this.service.startSigninMainWindow();
  }
}
```

OK, it's time to create our route guard service. In this service we just tell Angular which route should be protected.

```javascript
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from './auth.service';
import { Observable } from 'rxjs/Rx';
 
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
 
  constructor(private auth: Auth, private router: Router) { }
 
  checkLogin(): Observable<boolean> | boolean {
    let isLoggedIn = this.auth.isLoggedInObs();
    isLoggedIn.subscribe((loggedin) => {
      if (!loggedin) {
        this.router.navigate(['login']);
      }
    });
    return isLoggedIn;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }
 
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
```

You can see from above code that on route activation we will check whether the user is logged in or not. If the user is logged in, the redirection continues, otherwise it will be rejected.
    
Now you can use this service on any route using `canActivate` property of the route.
    
```javascript
RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
])
```
  
Once done, if you run the app and click on the forecast menu, it will redirect you to login page. The only thing left to do is to handle the login callback from Azure B2C login endpoint.
    
This is as easy as calling a method from oidc-client called `signinRedirectCallback` method. For that I've already create a method in authentication service.
  
```javascript
redirectCallback() {
  this.mgr.signinRedirectCallback()
   .then(user => {
    this.currentUser = user;
    this.router.navigateByUrl('/');
   })
   .catch(err => {
    if (err && err.error_description && err.error_description.indexOf('AADB2C90118') > -1) {
     let url = `${this.config.resetPassUrl}&client_id=${this.config.client_id}&redirect_uri=${this.config.redirect_uri}&response_type=${this.config.response_type}&scope=${this.config.scope}&nonce=${this.randomString(32)}`;
     window.location.href = url;
    }
    else {
     this.router.navigateByUrl('/login');
    }
    console.log(err);
   });
 }
```

The only ugly piece of code in this function is that I have to handle the reset password redirection manually. That catch block is for doing this bit.
    
You're all set now, not quite though. You will need to modify your fetch data component to send the API request using `Authorization` code you've got from login callback.
    
Fortunately the code we got from the `oidc-client` repository does have the code we need, so all we have to do in replace the `http` with our authentication service and use that to send the get request.

```javascript
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {Auth} from "../../services/auth.service";
 
@Component({
 selector: 'fetchdata',
 templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
 public forecasts: WeatherForecast[];
 
		constructor(http: Auth, @Inject('BASE_URL') baseUrl: string) {
			http.AuthGet(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
   this.forecasts = result.json() as WeatherForecast[];
  }, error => console.error(error));
 }
}
 
interface WeatherForecast {
 dateFormatted: string;
 temperatureC: number;
 temperatureF: number;
 summary: string;
}
```

As you can see, I've replaced the `http` instance with auth service and `http.get` with `http.AuthGet`which will add the `Authorization` header to request.

## Testing the whole code

Just run the project and navigate to fetch data menu. It will redirect to login page, which after clicking on login, you will be redirected to the login page on Azure. After the login, it then redirects you back to your home component which will then handle the response and you're good to go.

Hope this post has helped you to get a high level overview of how to integrate your SPA application with B2C. In the next post I will show you how to use [Graph API](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-devquickstarts-graph-dotnet) to read and write information on your B2C tenant.

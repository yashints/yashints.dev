---
path: '/graph-sdk-v5/'
author: Yaser Adel Mehraban
date: 2024-04-18
title: "Microsoft Graph SDK has changed, a lot!!!"
popular: true
tags: [microsoft, graphapi, graphsdk]
---

Have you ever wanted to do something within the context of Microsoft products and wondered how can I do it via APIs or programmatically? I have been in far too many situations where performing a simple task like forwarding multiple calendar events to my colleague which can't be done via the Outlook UI has bothered me, hence leveraging the power of [Microsoft Graph APIs](https://learn.microsoft.com/en-us/graph/overview) heavily in even in my day to day tasks.

<!--more-->

## Context

As I mentioned earlier, the challenge was brought up when I decided to forward 20 odd events in my calendar to my colleague and thought why do it manually? 

## Setup

I quickly started VS Code and created a new DotNet console application and added the Graph SDK packages I needed which I knew of:

```bash
dotnet new console -n ForwardEmails

cd ForwardEmails

dotnet add package Microsoft.Graph
dotnet add package Azure.Identity
```

## Creating the client

Next was to create a client and call the APIs to get the events I wanted, but before I do that, I had to make sure I have an [app registration created with the required permissions on Microsoft Graph APIs](https://learn.microsoft.com/en-us/graph/auth-register-app-v2).

But that was when I found out my old code is not working anymore because the `DelegateAuthenticationProvider` is no more. The SDK has moved to [Kiota's](https://github.com/microsoft/kiota) `IAccessTokenProvider` which one can use to create a custom token provider and use it to instantiate the client. Of course I only have this problem because I am not allowed to use an app registration on the Microsoft tenant, but I would assume many organisations might implement similar precautions in place. For information on ready to use providers you can check out the [documentation here](https://learn.microsoft.com/en-us/graph/sdks/choose-authentication-providers?tabs=csharp).

```csharp
public class TokenProvider : IAccessTokenProvider
{
    public Task<string> GetAuthorizationTokenAsync(Uri uri, Dictionary<string, object> additionalAuthenticationContext = default,
        CancellationToken cancellationToken = default)
    {
        var token = "token";
        // get the token and return it in your own way
        return Task.FromResult(token);
    }

    public AllowedHostsValidator AllowedHostsValidator { get; }
}
```

Now I could use that provider to instantiate the client:

```csharp
var authenticationProvider = new BaseBearerTokenAuthenticationProvider(new TokenProvider());
var graphServiceClient = new GraphServiceClient(authenticationProvider);
```

## Removal of the `request` method

Graph SDK uses the fluent API pattern to construct the request for different objects within Graph APIs. However, they have now removed the `request()` method and instead use regular methods like `GetAsync` and `PostAsync` which get parameters to customise the request information based on the `RequestInformation` class instead of the `IBaseRequest`.

As an example:

```csharp
var user = await graphServiceClient
  .Me
  .Request()  // this is removed
  .GetAsync();
```

Is simplified to:

```csharp
var user = await graphServiceClient
  .Me
  .GetAsync();
```

## Adding header and url parameters

The next change that I found out about was the way we now have to pass in the header and URL parameters. Previously we used to use specific methods like `Header`, `Filter` and `Select` to add these:

```csharp
var groups = await graphServiceClient
  .Me
  .TransitiveMemberOf
  .Request()
  .Header("ConsistencyLevel", "eventual")
  .Filter($"id eq '{groupId}'&$count=true") // This combines the $filter and $count
  .Select("id")
  .GetAsync();
```

With the new version we have to pass these as a parameter to the method itself:

```csharp
var groups = await graphServiceClient
  .Me
  .TransitiveMemberOf
  .GraphGroup
  .GetAsync((requestConfiguration) =>
  {
    requestConfiguration.QueryParameters.Select = ["id"];
    requestConfiguration.QueryParameters.Filter = $"id eq '{groupId}'";
    requestConfiguration.QueryParameters.Count = true;
    requestConfiguration.Headers.Add("ConsistencyLevel", "eventual");
  });
```

## Handing the response

From the response perspective, we can get single objects, a collection of objects or even a page iterator. For single it's very straightforward, for collections we could use the models within the `Microsoft.Graph.Models` namespace:

```csharp
var usersResponse = await graphServiceClient
    .Users
    .GetAsync(requestConfiguration => requestConfiguration.QueryParameters.Select = new string[] { "id", "createdDateTime"});

List<User> userList = usersResponse.Value;
```

When the items are too many and the results are returned in pages, you can now leverage a page iterator which you can pass in a callback function in for your logic:

```csharp
var usersResponse = await graphServiceClient
    .Users
    .GetAsync(requestConfiguration => { 
        requestConfiguration.QueryParameters.Select = new string[] { "id", "createdDateTime" }; 
        requestConfiguration.QueryParameters.Top = 5; 
        });

var userList = new List<User>();
var pageIterator = PageIterator<User,UserCollectionResponse>.CreatePageIterator(graphServiceClient,usersResponse, (user) => { userList.Add(user); return true; });

await pageIterator.IterateAsync();
```

## Error handling

All errors and exceptions are now use the exception classes derived from the `APIException` class from the Kiota abstractions which typically is an instance of the `OdataError`:

```csharp
try
{
    await graphServiceClient.Me.DeleteAsync(user);
}
catch (ODataError odataError)
{
    Console.WriteLine(odataError.Error.Code);
    Console.WriteLine(odataError.Error.Message);
    throw;
}
```

## Other cool features

And there are other cool features like using parameter objects when calling `Odata` functions or actions, batching requests, supporting `$count` in request builders, and so on you could find in the [change logs](https://github.com/microsoftgraph/msgraph-sdk-dotnet/blob/dev/docs/upgrade-to-v5.md), however, the coolest one to me was the backing store which is a new feature. 

This allows you to get an object, update it and when you wanted to send the data back only the changes are sent back and not the whole object which is also known as dirty tracking:

```csharp
// get the object
var @event = await graphServiceClient
    .Me.Events["event-id"]
    .GetAsync();

// the backing store will keep track that the property change and send the updated value.
@event.Recurrence = null;// set to null 

// update the object
await graphServiceClient.Me.Events["event-id"]
    .PatchAsync(@event);
```

Hope this helps many developers to quickly upgrade to the new version and enjoy a much better developer experience.


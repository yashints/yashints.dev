---
path: '/azure-function-bindings/'
author: Yaser Adel Mehraban
date: 2021-03-29
title: "Exploring Azure Function Bindings ⚡"
popular: true
tags: [showdev, azure, function, binding]
---

[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) is one of the the serverless services in Azure which allows you to run your business logic without worrying about where it's running and how it scales. But it being serverless is not the highlight of this amazing service, the way it's designed which allows you to leverage a very diverse set of triggers and input/output bindings without writing much code is to me the best of the best. So in this article I've decided to take you on a journey with a few of the common triggers and bindings and show you how to set them up quickly and without writing any unnecessary code.

<!--more-->

## Working with Azure Functions locally

Before we delve into the main topic of our discussion, I should quickly show you how easy it is to create and run these functions locally using a code editor or even a simple terminal.

If you're using [Visual Studio Code](https://code.visualstudio.com/), you need to install the [Azure Functions Extensions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions). For the command line approach, you'll need the [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2) and either [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) or [Azure PowerShell](https://docs.microsoft.com/en-us/powershell/azure/install-az-ps) to create Azure resources. You can also use the [Visual Studio 2019](https://azure.microsoft.com/downloads/) in which case you need to install its Azure Development component. It has built in templates for you to get started and be able to create functions and deploy them to Azure right there and then. You can find [the tutorial here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-your-first-function-visual-studio).

The good news is that all of these tools are cross platform and compatible with Windows, Linux and MacOS.

I'll just show you one of them and leave the rest to you. After you have installed the necessary tools, open a terminal (I use [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/)) and initialize a new function using the init command:

```bash
func init myLocalFunctionProj --dotnet

cd myLocalFunctionProj
```

You can use other languages too. For a list of supported languages please [visit the our documentation](https://docs.microsoft.com/en-us/azure/azure-functions/supported-languages).

Now that you have a project you can create one or multiple functions in it:

```bash
func new --name HttpExample --template "HTTP trigger" --authlevel "function"
```

This will create an HTTP triggered function for you which you can run using:

```bash
func start
```

Now you can send request to your function, so open a browser and visit `http://localhost:7071/api/HttpExample?name=Yas`, the function should return the result and the browser should show you a `Hello Yas` message. You're now ready to explore triggers and binding.

## Triggers

There are quite a few triggers available which will cover almost any scenario you could think of. From a simple HTTP trigger to timer and blob, and a whole lot more are supported without you needing to write code. If I wanted to just quickly go through the most common ones, they are:

| Type | Purpose |
|------|---------|
| **Timer** | Execute a function at a set interval. |
| **HTTP** | Execute a function when an HTTP request is received. |
| **Blob** | Execute a function when a file is uploaded or updated in Azure Blob storage. |
| **Queue** | Execute a function when a message is added to an Azure Storage queue. |
| **Azure Cosmos DB** | Execute a function when a document changes in a collection. |
| **Event Hub**	 | Execute a function when an event hub receives a new event. |
| **Event Grid** | Execute a function when an event is sent to Event Grid topics or queues. |

All of my examples will be using Csharp but you can use your language of choice. Examples of those can be found on [Azure Functions documentation site](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=csharp).

### Timer trigger

Timer triggers allow you to run the function on a schedule. All you need is a `TimerTrigger` attribute with its configuration:

```csharp
[FunctionName("TimerTriggerCSharp")]
public static void Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
{
    if (myTimer.IsPastDue)
    {
        log.LogInformation("Timer is running late!");
    }
    log.LogInformation($"Csharp Timer trigger function executed at: {DateTime.Now}");
}
```

This function will run based on the [CORN expression](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=csharp#ncrontab-expressions) you have specified. Our example CORN expression will run the function 12 times an hour, every 5th minute of every hour of the day.

### Blob trigger

Blob triggers are very powerful and allow you to cover verity of scenarios from creating an image thumbnail on upload to check a file for virus.

```csharp
[FunctionName("BlobTriggerCSharp")]        
public static void Run([BlobTrigger("container-name/{name}")] Stream myBlob, string name, ILogger log)
{
    log.LogInformation($"Csharp Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
}
```

> 💡 You will need the `Microsoft.Azure.WebJobs.Extensions` package to use these attributes.

### Cosmos DB trigger

If you wanted to become aware when a document is inserted/updated in your Cosmos DB, you can use this trigger:

```csharp
[FunctionName("CosmosTrigger")]
public static void Run([CosmosDBTrigger(
    databaseName: "ToDoItems",
    collectionName: "Items",
    ConnectionStringSetting = "CosmosDBConnection")]IReadOnlyList<Document> documents,
    ILogger log)
{
    if (documents != null && documents.Count > 0)
    {
        log.LogInformation($"Documents modified: {documents.Count}");
        log.LogInformation($"First document Id: {documents[0].Id}");
    }
}
```

All you need is the connection string in your `local.settings.json` in the connection string section:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<storage-connection-string>"
  },
  "ConnectionStrings": {
    "CosmosDBConnection": "<cosmosdb-connection-string>"
  }
}
```

For all the other examples you can update your settings file accordingly. I won't be going through more triggers because I want to show the bindings. But you can find examples of all the supported triggers in our [reference documentation section](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=csharp).

## Bindings

Bindings allow you to have input and output to/from your function out of the box. This is where magic happens and it's super powerful. For example, if you wanted to have a function which is triggered by a queue and gets a blob as input, you will need this:

```csharp
[FunctionName("BlobInput")]
public static void Run(
    [QueueTrigger("queue-name")] string myQueueItem,
    [Blob("container/{queueTrigger}", FileAccess.Read)] Stream myBlob,
    ILogger log)
{
    log.LogInformation($"BlobInput processed blob\n Name:{myQueueItem} \n Size: {myBlob.Length} bytes");
}
```

In this example the queue message contains the name of the blob. Or imagine people are uploading images into a blob container and you wanted an Azure Function to create thumbnails for you. You will need a blob trigger and a blob output:

```csharp
[FunctionName("CreateThumbnail")]
public static void Run(
    [BlobTrigger("images/{name}")] Stream image,
    [Blob("thumbnails/{name}", FileAccess.Write)] Stream thumbnail,
    ILogger log)
{
  IImageFormat format;

  using (Image<Rgba32> input = Image.Load<Rgba32>(image, out format))
  {
    input.Mutate(x => x.Resize(320, 200));
    input.Save(output, format);
  }  
}
```
The two image will share the same name, although the container name is different. For the name of the output blob, you could also use some pre-defined functions such as `{rand-guid}` to generate a unique identifier or `{DateTime}` to use current time as the name, although this might not match your requirement all the times.

But what if you wanted to write it into the same container? In that case you couldn't simply use the `{name}` for your output binding. To generate the name of the output blob at runtime, you need to use imperative bindings.

### IBinder

Instead of using the `[Blob]` attribute, you could use an instance of `IBinder` interface which gives you much more control over your output binding and it's name. The same example with a binder will look like:

```csharp
using System;
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats;
using System.Threading.Tasks;
using SixLabors.ImageSharp.PixelFormats;

namespace functions
{
  public static class createThumbnail
  {
    [FunctionName("createThumbnail")]
    public static async Task Run(
        [BlobTrigger("images/original-{blobName}", Connection = "AzureWebJobsStorage")] Stream image,
        string blobName,
        IBinder binder,
        ILogger log)
    {
      IImageFormat format;

      using (Image<Rgba32> input = Image.Load<Rgba32>(image, out format))
      {
        input.Mutate(x => x.Resize(320, 200));

        using (var writer = await binder.BindAsync<Stream>(
                      new BlobAttribute($"images/thumbnail-{blobName}", FileAccess.Write)))
        {          
          input.Save(writer, format);
        }
      }
    }
  }
}

```
> 💡 The reason we added a suffix to the blob name is to prevent the infinite look when we write to the same container. 

## Other bindings

There are heaps of bindings available for you to leverage and create great solutions to solve your business problems and [you can find out about them here](https://docs.microsoft.com/en-us/azure/azure-functions/). All you need to do is to select the `Reference > Triggers and bindings` from the left hand side.

## Summary

Hope this article has been interesting enough to intrigue you to go checkout Azure Functions and leverage their power to solve your business problems. Until next post, Sayōnara 👋🏽.
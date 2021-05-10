---
path: '/from-arm-to-bicep/'
author: Yaser Adel Mehraban
date: 2021-04-30
title: "From ARM to Bicep 💪🏽"
popular: true
tags: [showdev, azure, arm, bicep]
---

If you have deployed a resource in [Microsoft Azure](https://azure.microsoft.com/) as part of your CI/CD pipeline you have probably worked with [ARM templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview). These templates can be used to automate your resource deployment to Azure and help you to have consistent environments whether it's for testing, development or production purposes. However, there are some shortcomings when it comes to complex environments especially when you have many resources and the dependency between them makes the templates to be either super busy, very complex, or unreadable.

For that Microsoft has introduced [Bicep](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/bicep-overview) which is designed to overcome these issues and help you with your infrastructure as code setup.

<!--more-->

## What's not working with ARM templates?

Although there are some great features which make working with ARM templates a good experience such as functions, variables, nested templates etc, there is some room for improvements regarding below which has been raised by the community:

* **No comments**: As of now you can't use comments in the JSON files used by [Azure Resource Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview). Since the users of ARM templates are mainly developers, comments would potentially help the next user to better understand the template and what's going on in it. I'd personally argue with the fact that if you need comments in a template it probably means you need to refactor it, however, this is something which could come handy at times.
* **Parameter duplication**: Since ARM templates are reusable, you would normally use parameters for customising the resource naming, number of resources to be deployed, pricing tier and so on. The problem is that these parameters would be needed and if you haven't provided a default value you would get an error. So you might end up with lots of parameters repeated in different files for different environments, or simply replicating a single file and have lot's of extra parameters which are not needed.
* **Validation**: Although there is a validate command you can use to validate your templates, there might be times where validation doesn't show you enough information or is not enough to prevent a failure in the actual run.

## What is Bicep?

Bicep is a DSL (domain specific language) which can be used to write your Infrastructure as Code (IaC). Instead of writing ARM templates you write your code with Bicep and it will transpile it to ARM for you. It simplifies the authoring experience and addresses some of the issues we mentioned earlier. Compared to using JSON, Bicep can help you simplify the template definition a great deal. 

Let's see this using a simple example. Imagine you are trying to create a storage account in Azure, with ARM template this is the minimum you will need:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountType": {
      "type": "secureString"
    }
  },
  "variables": {
    "diagStorageAccountName": "[concat('diags', uniqueString(resourceGroup().id))]"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2019-06-01",
      "name": "[variables('diagStorageAccountName')]",
      "location": "[resourceGroup().location]",
      "sku": {
        "name": "[parameters('storageAccountType')]"
      },
      "kind": "Storage"
    }
  ]
}
```

Using Bicep it will be simplified to:

```js
@secure()
param storageAccountType string
param location string = resourceGroup().location
var diagStorageAccountName = concat('diags', uniqueString(resourceGroup().id))
resource diagsAccount 'Microsoft.Storage/storageAccounts@2019-06-01' = {
  name: diagStorageAccountName
  location: location
  sku: {
    name: storageAccountType
  }
  kind: 'Storage'
}
```

You can see how much time and space you could be saving if you were to use Bicep.

## Benefits

When it comes to the benefits of using Bicep, there is a list published in our documentation:

* Support for all resource types and API versions.
* Better authoring experience using editors such as VS Code (you will get validation, type-safety, intellisense).
* Modularity can be achieved using [modules](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/bicep-modules). You can have modules representing an entire environment or a set of shared resources and use them anywhere in a Bicep file.
* Integration with Azure services such as Azure Policy, Templates specs, and Blueprints.
* No need to store a state file or keep any state. You can even use the [what-if operation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/template-deploy-what-if) to preview your changes before deploying them.
* Bicep is open source with a strong community supporting it.

## Syntax

Every Bicep resource will have the below syntax:

```js
resource <symbolic-name> '<resource-type>@<api-version>` = {  
  //properties
  name: 'bicepstorage2063'
  location: 'northcentralus'  
  properties: {
    //...sub properties
  }
}
```

Where:

* `resource`: is a reserved keyword.
* `symbolic name`: is an identifier within the Bicep file which can be used to reference this resource elsewhere.
* `resource-type`: is the type of the resource you're defining, e.g. `Microsoft.Storage`.
* `api-version`: each resource provider publishes its own API version which defines which version of the Azure Resource Manager REST API should be used to deploy this resource.
* `properties`: these are the resource specific properties. For example every resource has a `name` and `location`. In addition some have sub properties which you can pass on.

## Parameters

When we talk about infrastructure as a code and reusability of our templates, we definitely end up using parameters to customise our resources. Be its name, sku, username or password, we will need to change these per environment or application.

In a Bicep file you can define the parameters that need to be passed to it when deploying resources. You can put validation on the parameter value, provide default value, and limit it to allowed values. The format of a parameter will be such as below:

```js
param <parameter-name> <parameter-type> = <parameter-value>
```
Where:

* `param`: is a reserved keyword.
* `parameter-name` is the name of the parameter.
* `parameter-type`: is the type of the parameter such as `string`, `object`, etc.
* `parameter-value`: is the value of the parameter you're passing in.

Let's review two examples to get a better understanding of the structure.

```js
@minLength(3)
@maxLength(24)
param storageName string
```
In this example you're limiting the `storageName` parameter's value length to be between 3 and 24 characters. Or:

```js
@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_RAGRS'
  'Standard_ZRS'
  'Premium_LRS'
  'Premium_ZRS'
  'Standard_GZRS'
  'Standard_RAGZRS'
])
param storageRedundancy string = 'Standard_LRS'
```

In this example you're specifying the allowed values for the `storageRedundancy` parameter and also provide the default value if nothing is provided during the deployment.

With ARM templates you had to use a separate file to pass the parameters during the deployments usually with a name ending in `.parameters.json`. In Bicep you need to use the same JSON file to pass the parameters in:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageName": {
      "value": "myuniquestoragename"
    },
    "storageRedundancy": {
      "value": "Standard_GZRS"
    }
  }
}
```

## Variables

Similar to parameters, variables play an important part in our templates, especially when it comes to naming conventions. These can store complex expressions to keep our templates clean and their maintenance simple. In Bicep variables are defined using the `var` keyword:

```js
var <variable-name> = <value>
```

Where `variable-name` is the name of your variable. For example in our previous Bicep file we could have used a variable for our storage name:

```js
var storageAccName = 'sa${uniqueString(resourceGroup().id)}'

resource stg 'Microsoft.Storage/storageAccounts@2019-06-01' = {
  name: storageAccountName
  //...
}
```
Since we need a unique name for our storage account the `uniqueString` function is used (Don't worry about that for now). The point is that we can create variables and use them in our template with ease.

There are multiple variable types you can use:

* String
* Boolean
* Numeric
* Object
* Array

## Expressions

Expressions are used in our templates for variety of reasons, from getting the current location of the resource group to subscription id or the current datetime.

### functions

The good thing is that **ANY** valid [ARM template function](https://docs.microsoft.com/azure/azure-resource-manager/templates/template-functions) is also a valid Bicep function.

```js
param currentTime string = utcNow()

var location = resourceGroup().location

var makeCapital = toUpper('all lowercase')
```

### Ternary operator

To use conditions in your deployments you would use the `if` function in ARM templates, however, that's not supported in Bicep. Instead, you can leverage the **ternary operator**:

```js
param globalRedundancy bool = true

resource stg 'Microsoft.Storage/storageAccounts@2019-06-01' = {
  name: storageAccountName
  location: location
  kind: 'Storage'
  sku: {
    name: globalRedundancy ? 'Standard_GRS' : 'Standard_LRS' // if true --> GRS, else --> LRS
  }
}
```

## Output

ARM templates have an output section where you could send information out of your pipeline to be accessed within other deployments or subsequent tasks. In Bicep you have the same concept via the `output` keyword.

```js
resource stg 'Microsoft.Storage/storageAccounts@2019-06-01' = {
  //...
}

output storageId string = stg.id
```

This will return the storage id out to be used later.

## Loops

In ARM templates if you wanted to deploy a resource multiple times you could leverage the `copy` operator to add a resource `n` times based on the loop count. In Bicep you have the `for` operator at your disposal:

```js
resource foo 'my.provider/type@2021-03-01' = [for <ITERATOR_NAME> in <ARRAY> = {...}]
```
Where `ITERATOR_NAME` is a new symbol that's only available inside your resource declaration.

```js
param containerNames array = [
  'images'
  'videos'
  'pdf'
]

resource blob 'Microsoft.Storage/storageAccounts/blobServices/containers@2019-06-01' = [for name in containerNames: {
  name: '${stg.name}/default/${name}'
  //...
}]
```

This snippet creates three containers within the storage account in a loop.

## Existing keyword

If you want to deploy a resource which is depending on an existing resource you can leverage the `existing` keyword.

```js
resource stg 'Microsoft.Storage/storageAccounts@2019-06-01' existing = {
  name: storageAccountName
}
```

You won't need the other properties since the resource already exists. You need enough information to be able to identify the resource. Now that you have this reference, you can use it in other parts of your deployment.

## Modules

In ARM templates you had the concept of linked templates when it came to reuse a template in other deployments. In Bicep you have `modules`. You can define a resource in a module and reuse that module in other Bicep files.

```bash
.
├── main.bicep
└── stg.bicep
```

In our `stg` file you will define the resource, its parameters, variables, outputs, etc:

```js
//stg.bicep
param storageAccountName
var storageSku = 'Standard_LRS'

resource stg 'Microsoft.Storage/storageAccounts@2019-06-01' = {
  name: storageAccountName
  location: resourceGroup().location
  kind: 'Storage'
  sku: {
    name: storageSku
  }
}
```

And in the `main` file you will reuse the storage account as a module using the `module` keyword:

```js
//main.bicep
module stg './storage.bicep' = {
  name: 'storageDeploy'
  params: {
    storageAccountName: '<YOURUNIQUESTORAGENAME>'
  }
}

output storageName array = stg.outputs.containerProps
```

You only need to pass the required properties which in case of our storage account is the name.

## The `any` keyword

There might be some cases where Bicep throws a false positive when it comes to errors or warnings. This might happen based on different situations such as the API not having the correct type definition. You can use the `any` keyword to get around these situations when defining resources which have incorrect types assigned. One of examples is the container instances CPU and Memory properties which expect an `int`, but in fact they are `number` since you can pass non-integer values such as `0.5`.

```js
resource wpAci 'microsoft.containerInstance/containerGroups@2019-12-01' = {
  name: 'wordpress-containerinstance'
  location: location
  properties: {
    containers: [
      {
        name: 'wordpress'
        properties: {
          ...
          resources: {
            requests: {
              cpu: any('0.5')
              memoryInGB: any('0.7')
            }
          }
        }
      }
    ]
  }
}
```

By using `any` and passing the value you can get around the possible errors which might be raised during the build or the validation stage.

## Tooling

In terms of tooling the support is the same if not better than the ARM templates.

### VS Code extension

VS Code comes with [an official extension for Bicep](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep). This extension gives you validation, intellisense, dot property access, snippets etc.

### CI/CD

If you're using [GitHub Actions](https://github.com/features/actions) for your CI/CD pipeline, there is already a [Bicep action](https://github.com/marketplace/actions/bicep-build) created by our developer advocate [Justin Yoo](https://github.com/justinyoo) which you can use to build you bicep file and deploy it to Azure.

### CLI

Bicep comes with a CLI that you can install locally on [Windows, MacOS, and Linux](https://github.com/Azure/bicep/blob/main/docs/installing.md). That gives you the ability to build and deploy your Bicep files with [Azure CLI](https://docs.microsoft.com/en-us/cli/azure).

## Summery

In short, I highly recommend using Bicep and improving your IaC and deployments. Of course if your ARM templates are too many, or very complex you might benefit from converting them more, but if you already have a streamlined pipeline with maintainable templates, you could keep them and create any new template using Bicep instead.
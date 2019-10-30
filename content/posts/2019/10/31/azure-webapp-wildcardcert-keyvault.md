---
path: '/azure-webapp-wildcardcert-keyvault/'
author: Yaser Adel Mehraban
date: 2019-10-31
title: "Infrastructure as code, Azure app service using a wildcard certificate from KeyVault"
popular: false
tags: [showdev, azure, wildcardcert, webapps]
---

This post is one of those posts which is related to my consulting side. I was involved in a project where infrastructure as code was the approach from get go and since we had everything on Azure, we chose a mix of ARM templates and PowerShell. I hit a few issues along the way which I think it's very valuable to be aware of for many people and especially myself in future on a similar project 😊.

<!--more-->

## Background

I don't want to go through the whole architecture, suffice to know we have a few [App Services](https://azure.microsoft.com/en-us/services/app-service/web/) and [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) which need SSL binding and custom host name only in _production_. Since we're managing the DNS records with [Cloudflare](https://www.cloudflare.com/), we got a wildcard cert for our domain and we imported the [PFX file](https://en.wikipedia.org/wiki/PKCS_12) into a [Key Vault](https://azure.microsoft.com/en-us/services/key-vault/) in a separate resource group to be used in our release.

## First try

So the ARM template we had looked like this initially:

```json
{
  "parameters": {
    //...
  },
  "variables": {
    //...
  },
  "resources": [
    {
      "type": "microsoft.insights/components",
      "apiVersion": "2015-05-01",
      "name": "[variables('appInsightsName')]",
      "location": "[variables('appInsightsLocation')]",
      "tags": {
        "displayName": "app-insights",
        "project": "[variables('projectName')]",
        "environment": "[parameters('environment')]"
      },
      "kind": "web",
      "properties": {
        "Application_Type": "web",
        "Request_Source": "IbizaWebAppExtensionCreate"
      }
    },
    {
      "apiVersion": "2016-09-01",
      "type": "Microsoft.Web/serverfarms",
      "kind": "app",
      "name": "[variables('appServicePlanName')]",
      "tags": {
        "displayName": "app-service-plan",
        "project": "[variables('projectName')]",
        "environment": "[parameters('environment')]"
      },
      "location": "[parameters('deploymentLocation')]",
      "properties": {
        "name": "[variables('appServicePlanName')]",
        "perSiteScaling": false,
        "reserved": false,
        "targetWorkerCount": 0,
        "targetWorkerSizeId": 0
      },
      "dependsOn": [],
      "sku": {
        "name": "[parameters('appServicePlanSku')]",
        "tier": "[parameters('appServicePlanTier')]",
        "size": "[parameters('appServicePlanSize')]",
        "family": "[parameters('appServicePlanFamily')]",
        "capacity": "[parameters('appServicePlanCapacity')]"
      }
    },
    {
      "apiVersion": "2016-08-01",
      "type": "Microsoft.Web/sites",
      "kind": "app",
      "name": "[variables('appServiceName')]",
      "tags": {
        "displayName": "app-service",
        "project": "[variables('projectName')]",
        "environment": "[parameters('environment')]"
      },
      "location": "[parameters('deploymentLocation')]",
      "properties": {
        "name": "[variables('appServiceName')]",
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "siteConfig": {
          "appSettings": [
            {
              "name": "WEBSITE_RUN_FROM_PACKAGE",
              "value": "1"
            }
          ]
        },
        "httpsOnly": "[parameters('appServiceHttpsOnly')]"
      },
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "[resourceId('microsoft.insights/components', variables('appInsightsName'))]"
      ],
      "resources": [
        {
          "apiVersion": "2015-08-01",
          "name": "Microsoft.ApplicationInsights.AzureWebSites",
          "type": "siteextensions",
          "dependsOn": [
            "[resourceId('Microsoft.Web/Sites', variables('appServiceName'))]"
          ],
          "properties": {}
        },
        {
          "name": "appsettings",
          "type": "config",
          "apiVersion": "2015-08-01",
          "dependsOn": [
            "[resourceId('Microsoft.Web/sites', variables('appServiceName'))]",
            "Microsoft.ApplicationInsights.AzureWebSites"
          ],
          "properties": {
            "APPINSIGHTS_INSTRUMENTATIONKEY": "[reference(variables('appInsightsName'), '2015-05-01').InstrumentationKey]"
          }
        }
      ]
    },
    {
      "type": "Microsoft.Web/sites/config",
      "apiVersion": "2016-08-01",
      "name": "[concat(variables('appServiceName'), '/web')]",
      "location": "[parameters('deploymentLocation')]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites', variables('appServiceName'))]"
      ],
      "tags": {
        "displayName": "app-service",
        "project": "[variables('projectName')]",
        "environment": "[parameters('environment')]"
      },
      "properties": {
        "alwaysOn": "[parameters('appServiceAlwaysOn')]"
      }
    },
    {
      "type": "Microsoft.Web/certificates",
      "name": "[variables('certificateName')]",
      "apiVersion": "2016-03-01",
      "location": "[resourceGroup().location]",
      "condition": "[equals(parameters('environment'), 'prod')]",
      "properties": {
        "keyVaultId": "[parameters('prodKeyVaultId')]",
        "keyVaultSecretName": "[parameters('prodKeyVaultSecretName')]",
        "serverFarmId": "[resourceId('Microsoft.Web/serverFarms', variables('appServicePlanName'))]"
      },
      "dependsOn": ["[concat('Microsoft.Web/sites/', variables('appServiceName')]"]
    },
    {
      "type": "Microsoft.Web/sites/hostnameBindings",
      "name": "[concat(variables('appServiceName'), '/', parameters('customHostname'))]",
      "apiVersion": "2016-03-01",
      "location": "[resourceGroup().location]",
      "condition": "[equals(parameters('environment'), 'prod')]",
      "properties": {
        "sslState": "SniEnabled",
        "thumbprint": "[reference(resourceId('Microsoft.Web/certificates', variables('certificateName'))).Thumbprint]"
      },
      "dependsOn": [
        "[concat('Microsoft.Web/certificates/', variables('certificateName'))]"
      ]
    }
  ],
  "outputs: {
    //...
  }

}
```

There are a few important things here you need to pay attention to. First, we have the `Microsoft/certificate` conditionally deployed, same as `sites/hostnameBindings` if we're deploying to production. Second, note how we have a reference to the certificate in Key Vault in the certificate properties. And last, we have a reference to the certificate in the `hostNameBinding` in the same template.

## First try

When we first tried this, we hit a permission error on the Key Vault the template was referencing. I had made sure that the Azure DevOps service principal is added into the access policy of the Key Vault and also the tick the `Azure Resource Manager for template deployment
` checkbox to allow referencing the secret from within ARM template.

[[danger]]
| **Error** Failed to add App Service certificate to the app, Check error for more details. Error Details: The service does not have access to '/subscriptions/XXXebXXX-XXX-XXXX-XXX-XXXXX/resourcegroups/XXXXX/providers/microsoft.keyvault/vaults/xxxxxxxxvault' Key Vault. Please make sure that you have granted necessary permissions to the service to perform the request operation.

This was really strange to me and I had no clue as to what's missing. However, after a bit of Googling, I found out there are two service principals which belong to Microsoft and you have to add those to your Key Vault's access policy in order to be able to link a certificate to your App Services.

[Here is the kick starter template repository on GitHub](https://github.com/Azure/azure-quickstart-templates/blob/master/101-app-service-certificate-wildcard/README.md) which explains what needs to be done. But in short, you need to run these commands:

```powershell
Login-AzureRmAccount

Set-AzureRmContext -SubscriptionId AZURE_SUBSCRIPTION_ID

Set-AzureRmKeyVaultAccessPolicy -VaultName KEY_VAULT_NAME -ServicePrincipalName f3c21649-0979-4721-ac85-b0216b2cf413 -PermissionsToSecrets get,set,delete

Set-AzureRmKeyVaultAccessPolicy -VaultName KEY_VAULT_NAME -ServicePrincipalName abfa0a7c-a6b6-4736-8310-5855508787cd -PermissionsToSecrets get
```

After running these commands, the error was gone and we could progress further. Note that the application ids are fixed.

## Second try

Once the necessary permissions was granted, we run the deployment again to be hit with the second issue, this time I was so baffled by this error:

[[danger]]
| **Error** Another certificate exists with same thumbprint XXXXXXXXXXXXXXXXXXXX at location xxxx in the Resource Group xxxxxx.

I wasn't sure what's causing the issue since I thought that since we're reusing the same certificate, linking them wouldn't be a problem. But when I looked at the deployments on the resource group, I found out Azure is trying to create multiple `Microsoft•Web/certificates` resources which will have the same thumbprint and so it fails. As Aussies say it, fair dinkum.

So I extracted the certificate resource to the parent ARM template and passed a reference of it down to linked templates:

```json
{
  //parent ARM template
  "resources": [
    {
      "type": "Microsoft.Web/certificates",
      "name": "[parameters('prodKeyVaultSecretName')]",
      "condition": "[equals(parameters('environment'), 'prod')]",
      "apiVersion": "2016-03-01",
      "location": "[parameters('deploymentLocation')]",
      "properties": {
        "keyVaultId": "[parameters('prodKeyVaultId')]",
        "keyVaultSecretName": "[parameters('prodKeyVaultSecretName')]"
      }
    },
    //...
    {
      "apiVersion": "2017-05-10",
      "name": "web-client-app-service-linked-template",
      "type": "Microsoft.Resources/deployments",
      "metadata": {
        "comments": "Linked ARM template deploys web client app service"
      },
      "properties": {
        "mode": "Incremental",
        "templateLink": {
          "uri": "[concat('https://', parameters('artefactsStorageAccountName'),'.blob.core.windows.net/',parameters('artefactsStorageAccountContainerName'),'/client-web-app/azuredeploy.json',parameters('artefactsStorageAccountSasToken'))]",
          "contentVersion": "1.0.0.0"
        },
        "parametersLink": {
          "uri": "[concat('https://', parameters('artefactsStorageAccountName'), '.blob.core.windows.net/', parameters('artefactsStorageAccountContainerName'),'/client-web-app/azuredeploy.parameters-', parameters('environment'), '.json', parameters('artefactsStorageAccountSasToken'))]",
          "contentVersion": "1.0.0.0"
        }
      },
      "dependsOn": [
        "[resourceId('Microsoft.Web/certificates', parameters('prodKeyVaultSecretName'))]"
      ]
    },
  ]
}
```

And in the linked template:

```json
{
  "resources": [
    {
      "apiVersion": "2016-08-01",
      "type": "Microsoft.Web/sites",
      "kind": "app",
      "name": "[variables('appServiceName')]",
      "tags": {
        "displayName": "app-service",
        "project": "[variables('projectName')]",
        "environment": "[parameters('environment')]"
      },
      "location": "[parameters('deploymentLocation')]",
      "properties": {
        "name": "[variables('appServiceName')]",
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "siteConfig": {
          "appSettings": [
            {
              "name": "WEBSITE_RUN_FROM_PACKAGE",
              "value": "1"
            }
          ]
        },
        "httpsOnly": "[parameters('appServiceHttpsOnly')]",
        "hostNameSslStates": [
          {
            "name": "[parameters('customHostname')]",
            "sslState": "SniEnabled",
            "thumbprint": "[reference(concat('Microsoft.Web/certificates/', parameters('certificateName')), '2016-03-01').Thumbprint]",
            "toUpdate": true
          }
        ]
      },
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', variables('appServicePlanName'))]",
        "[resourceId('microsoft.insights/components', variables('appInsightsName'))]"
      ],
      "resources": [
        {
          "apiVersion": "2015-08-01",
          "name": "Microsoft.ApplicationInsights.AzureWebSites",
          "type": "siteextensions",
          "dependsOn": [
            "[resourceId('Microsoft.Web/Sites', variables('appServiceName'))]"
          ],
          "properties": {}
        },
        {
          "name": "appsettings",
          "type": "config",
          "apiVersion": "2015-08-01",
          "dependsOn": [
            "[resourceId('Microsoft.Web/sites', variables('appServiceName'))]",
            "Microsoft.ApplicationInsights.AzureWebSites"
          ],
          "properties": {
            "APPINSIGHTS_INSTRUMENTATIONKEY": "[reference(variables('appInsightsName'), '2015-05-01').InstrumentationKey]"
          }
        },
        {
          "type": "hostNameBindings",
          "name": "[parameters('customHostname')]",
          "condition": "[equals(parameters('environment'), 'prod')]",
          "apiVersion": "2016-08-01",
          "dependsOn": [
            "[resourceId('Microsoft.Web/sites', variables('appServiceName'))]"
          ],
          "properties": {
            "siteName": "[variables('appServiceName')]",
            "domainId": null,
            "hostNameType": "Verified"
          }
        }
      ]
    },
  ]
}
```

Notice the reference to the certificate resource in the `hostNameSslStates` property. And again we kicked off a new release to be hit with another problem.

This time it complained about a missing resource for non prod environments which was fair, as I forgot to apply the condition to the thumbprint reference.

## Third try

So I applied an if condition to the thumbprint thinking it would work:

```json
{
  "hostNameSslStates": [
    {
      "name": "[parameters('customHostname')]",
      "sslState": "SniEnabled",
      "thumbprint": "[if(equals(parameters('environment'), 'prod'), reference(concat('Microsoft.Web/certificates/', parameters('certificateName')), '2016-03-01').Thumbprint, '')]",
      "toUpdate": true
    }
  ]
}
```

Which failed again. This time I found out that the reference evaluation happens regardless of if statement. So I removed the `hostNameSslStates` altogether and used the full resource:

```json
{
  "resources": [
    {
      "type": "hostNameBindings",
      "name": "[parameters('customHostname')]",
      "condition": "[variables('isProd')]",
      "apiVersion": "2016-08-01",
      "dependsOn": [
        "[resourceId('Microsoft.Web/sites', variables('appServiceName'))]"
      ],
      "properties": {
        "siteName": "[variables('appServiceName')]",
        "domainId": null,
        "hostNameType": "Verified",
        "sslState": "SniEnabled",
        "thumbprint": "[reference(concat('Microsoft.Web/certificates/', parameters('certificateName')), '2016-03-01').Thumbprint]"
      }
    }
  ]
}
```

Which failed again 😭😭😭. For the same reason as before, which was the reference to the missing resource.

## Forth try

So I tried the if condition trick again this time on the `thumbprint` property of the `hostNameBindings` resource:

```json
{
  "type": "hostNameBindings",
  "name": "[parameters('customHostname')]",
  "condition": "[variables('isProd')]",
  "apiVersion": "2016-08-01",
  "dependsOn": [
    "[resourceId('Microsoft.Web/sites', variables('appServiceName'))]"
  ],
  "properties": {
    "siteName": "[variables('appServiceName')]",
    "domainId": null,
    "hostNameType": "Verified",
    "sslState": "SniEnabled",
    "thumbprint": "[if(variables('isProd'), reference(concat('Microsoft.Web/certificates/', parameters('certificateName')), '2016-03-01').Thumbprint, '')]"
  }
}
```

And guess what, it was successful. OMG, I was so happy that this was working.

## Summary

So if you have a wildcard certificate and you want to reuse it in multiple App Services, DO NOT create the certificate for one of those, simply create one and share it with all of them.

Here are some points which might be helpful to know:

* The ARM deployment respects the conditional resource in the `dependsOn` section. Meaning if the resource is conditionally created, it doesn't have any effect in the order of deployment and it won't fail it either.
* You can't use a `reference` function in the variable section. Otherwise my life would've been much easier 😁.
* When using a `reference` on a property, the function is evaluated regardless of the fact that you have an if condition or not (happy to be proven wrong with this one).
* And last, you need to be patient when working with ARM templates 😂.

Hope this article helps someone else and saves their time. I am planning to create a template set and create a PR into kick starter repo. But don't have any timeline as of now.
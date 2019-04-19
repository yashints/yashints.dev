---
layout: post
title: "Generate a self sign cert with PowerShell"
date: 2017-06-22 09:23
author: Yaser Adel Mehraban
comments: true
categories: [PowerShell]
tags: [powershell]
image: /img/posts/ps.png
---

Have ever been stumbled upon needing a certificate very fast and looking for tools for hours? Well I found a series of `PowerShell` commands which makes your life super easy.
<!--more-->
I am sure there are many people who've tried `OpenSSL`, `MakeCert.exe`, `IIS` or may other tools and spend hours searching to generate a `self-sign` certificate for testing or other purposes.

Well with `PowerShell` it can be this easy. The commands you need are `New-SelfSignedCertificate` and `Export-PfxCertificate`. The way you use them is as follows.

```ps
New-SelfSignedCertificate -certstorelocation cert:\localmachine\my -dnsname yourdomainname
```
    
You can put whatever you like as your domain name, which will be put in the subject.
    
Running this command will generate a certificate and prints out the thumbprint for you which you will need if you want to export your certificate.
    
You will need a password to export your certificate which you can define it as a variable:

```ps    
$pwd = ConvertTo-SecureString -String "P@$sw0rd" -Force -AsPlainText
```
    
And finally you can export your certificate by using export command:

```ps    
Export-PfxCertificate -cert cert:\localMachine\my\{thumbprint} -FilePath d:\temp\cert.pfx -Password $pwd
```

You will need to replace the `{thumbprint}` with the thumbprint you got from the execution of the first command.

And Vola, you've got a PFX file containing your private key which you can use.

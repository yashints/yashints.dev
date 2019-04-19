---
layout: post
title: "Troubleshooting Xamarin project issues with visual studio"
date: 2017-01-09 13:43
author: Yaser Adel Mehraban
comments: true
categories: [Xamarin, Xamarin forms]
tags: [Mobile development, Xamarin, Xamarin forms]
image: /img/posts/VSXamarin.jpg
---

Today I started to install Xamarin and create a pet project for myself. While doing so I faced a couple of issues and solved them using a couple of hints from SO which are worth sharing so other new starters like me can fix them quicker than me.
<!--more-->
## Android emulator opens, but project does not deploy and start

This happens specially using VS ` new > project > run ` combination. You will see that it builds and everything is fine, however, the emulator starts and your application will appear/not appear at all and drop quickly afterwards. You will most likely get a message like:

{: .box-error}
**Error:** Android application is debugging. Could not connect to the debugger.

And also you might face this message in console:

{: .box-error}
**Error:** AOT module 'mscorlib.dll.so' not found: dlopen failed: library "/data/app/<your app name>.Droid-1/lib/x86/libaot-mscorlib.dll.so" not found.

The latter is easy to fix, you just need to open the emulator settings dialog and clear the `Use Fast Deployment` checkbox.

![Use Fast Deployment](/img/posts/image.png)

The former is happening because of a very stupid option inside hyper-v and you can fix it by opening the hyper-v and from device selection choose your emulator. After that click on settings and navigate to `processor > Compatibility`, then tick the **Migrate to a physical computer with a different processor version** and you should be good to give it a go.

![Migrate to a physical computer with a different processor version](/img/posts/image9.png)

## Missing Files inside AppData\Local\Xamarin Folders

This one happened to me after running the universal Xamarin installer and finishing the steps in visual studio to create a new Xamarin forms project and click build.

By this time I was getting different error messages like:

{: .box-error}
**Error:** Could not find mudule xxx in 'Xamarin.Android.Support.Design' 

or 

{: .box-error}
**Error:** Could not find mudule xxx in 'Xamarin.Android.Support.v4' 

or any of the following folders:

*   Xamarin.Android.Support.Design
*   Xamarin.Android.Support.v4
*   Xamarin.Android.Support.v7.AppCompat
*   Xamarin.Android.Support.v7.CardView
*   Xamarin.Android.Support.v7.MediaRouter
*   Xamarin.Android.Support.v7.RecyclerView

The reason (most probable) is failing in download a file called `android_m2repository_r10.zip` from the google repository. However that is not always the case. For any reason the fix is completely the same.

#### Automatic Fix

* Delete the versioned library folder that is giving you errors:

  **Mac Directory:** `/Users/[Username]/.local/share/Xamarin/{SUPPORT LIBRARY NAME}/{VERSION NUMBER}`

  **Windows Directory:** `C:\Users\[Username]\AppData\Local\Xamarin\{SUPPORT LIBRARY NAME}\{VERSION NUMBER}`

* Rebuild your project (Which will kickoff a Build Task to re-download the library).

#### Manual Fix

There are two steps to manually fixing this error.

1. Adding the `m2repository` folder to the `/content` folder.
2. Adding the respective Android Support Library / Google Play Services `.aar` contents to the `/embedded` folder.

You can follow the instruction mentioned on Xamarin troubleshooting guide [here](https://developer.xamarin.com/guides/android/troubleshooting/resolving-library-installation-errors/) to fully resolve the issue.

However the short version is:

* Get the `URL` of the missing m2repository download
* Use a `MD5` hash on the download URL from the given table
* Rename the file to `{MD5HASH}.zip` (Where MD5HASH is the hashed download URL)
* Place the new hashed .zip file in your `Xamarin\zips` directory

Hope this helps you save some time.
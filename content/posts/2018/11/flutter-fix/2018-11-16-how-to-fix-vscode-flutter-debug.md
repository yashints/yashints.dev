---
path: 'how-to-fix-vscode-flutter-debug/'
title: 'How to fix debugging Flutter in VS Code'
date: 2018-11-16
author: Yaser Adel Mehraban
categories: [vscode, flutter]
tags: [vscode, flutter]
thumbnail: './vscodeflutter.jpg'
---

## Intro

[Flutter](https://flutter.io) is a framework created by [Google](https://google.com) which allows you to build beautiful native apps on iOS and Android from a single codebase.

<!--more-->

I recently finished my project at my latest client and had it mind to play with, so I set everything up based on their [documentation](https://flutter.io/docs) which to my opinion is the most straight forward doc I've ever seen.

You will need to install a few things:

- Flutter
- Android Studio
- An editor of choice (which mine is [Visual Studio Code](https://code.visualstudio.com/))

Once the setup is done, you will have a hello world app you could make. Flutter uses dart which I find it interesting. It's similar to `Java Script`, but it supports types like `Type Script` (however it is not a super set of JS like `Type Script`).

You will also need to install one of the android images since you will need it for running your app if you don't want to test it on an actual device.

When you're ready just hit debug in VS code and the app runs on the simulator. It's really fascinating since it uses Material Design theme and it almost looks the same in iOS and Android.

## Problem

Now all these was to let you know that currently if you run the app once, exit from it and change something or run it again without change, you will get an error:

[[danger]]
| Program linking failed. "terminating with uncaught exception of type std::bad_alloc: std::bad_alloc" failed

At first I thought I messed something up. So I started stripping my code to see which change has broken the app.

## Resolution

Nothing helped, so I started Googling to see if someone else has faced the same issue and [there it was](https://github.com/flutter/flutter/issues/22568).

Based on this thread all I need to do was to add a lunch settings to VS Code and specify the `--enable-software-rendering` flag:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart",
      "args": ["--enable-software-rendering"]
    }
  ]
}
```

And that's it. This will resolve the issue. If you don't want to use this approach you can also uninstall the app from the simulator and run it again, however, this works sometimes and not always.

They might fix this issue later but for now that's the way.

Hope this helps you explore more into Flutter and create some awesome apps.

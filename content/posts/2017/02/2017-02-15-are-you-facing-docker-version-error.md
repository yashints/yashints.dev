---
layout: post
title: "Are you facing docker version error?"
date: 2017-02-15 18:16
author: Yaser Adel Mehraban
comments: true
categories: [docker]
tags: [docker, docker-compose]
---
I was working with my docker image for my pet project and suddenly got a message saying:
<!--more-->
{: .box-error}
**Error:** client version 1.22 is too old. Minimum supported API version is 1.24, please upgrade your client to a newer version.

I just opened a command line and typed:

```ps
$ docker version
```

And guess what? this is the output:

```
Client:
  Version:      1.13.0-rc7
  API version:  1.25
  Go version:   go1.7.3
  Git commit:   48a9e53
  Built:        Tue Feb 14 17:56:00 UTC 2017
  OS/Arch:      linux/amd64

Server:
  Version:      1.13.0-rc7
  API version:  1.25 (minimum version 1.24)
  Go version:   go1.7.3
  Git commit:   48a9e53
  Built:        Tue Feb 14 17:56:00 UTC 2017
  OS/Arch:      linux/amd64</pre>
```

Turns out my current version is higher than the error version, so what is going on here.
    
The catch is the `docker-compose` file format has been versioned and therefore we should increment the version requested in the `docker.yml` file.
    
In any docker-compose file that is used with 1.24 or later version of the docker client, we should request version `2.1`.
    
So change your file to look like this and you should be good to go:
```    
version: '2.1'

  services:
    webapplication102:
      image: user/myapplication
      build:
        context: .
```

Here is the [issue page](https://github.com/docker/compose/issues/4106) on `github` if you need more info.

**Update:**

Version 3 is released, which means you should be able to put 3 instead of 2.1 in your `docker-compose.yml` file.

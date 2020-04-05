---
path: '/git-logs/'
author: Yaser Adel Mehraban
date: 2020-04-05
title: "How I recovered a day's worth of work with git 🏥"
popular: true
tags: [showdev, git, recovery]
---
 
I was working on a project a week ago and had a local branch (with a few commits) I was going to push to upstream to create a PR (pull request). However, after pulling down master and rebasing, I realised all of my code except my first commit is gone after rebase 😱.

<!--more-->

## Background

I had a local branch which I was working on. Since I'd made a few changes before end of the day, I committed those and went about to do some parenting.

The day after that, I restarted my work and had many other changes in a few other commits by the time I was ready to push my code to upstream. But before we do it, it's our practice to pull down master and rebase in case there is any conflict, or changes made by someone else has had any side effects on the bit we've done.

## Rebase

So I pulled down the master branch and rebased it directly from origin using (don't do this at home please, I'll explain later):

```powershell
git pull origin master --rebase
```

Once done, I realised I had some conflicts since someone else had worked on one of the files I'd modified. So I started the merge conflict process and made sure all was good. However, I didn't realised that when I tested the web application, the latest code wasn't refreshed, and I was seeing my own code (don't ask me why, it's an old code base and you need to rebuild and hard refresh every time you make a change).

Having seen all is good I created a PR and went for lunch. One of colleagues then reviewed the PR and since all my changes had gone apart from the small parts from yesterday's commit, he approved and completed the PR.

## Someone raised a bug

I was working on something else when I realised someone has raised a bug on the feature I'd implemented and when I checked the code I was in total shock since most of my code wasn't there anymore. So I checked my local branch and saw that's the case, in fact several of my commits were missing from that branch altogether. 

Later I realised that I'd forgotten to add everything before committing 🤦🏽‍♂️. Just to clarify this was during a really crazy time where we were working day and night for over a week to deliver this project for all of our hospitals across Australia and New Zealand to monitor their resources in intensive care like number of available beds, ventilator, etc. I will tell you all about it once I find some time.

## Initial try

I started by running:

```powershell
git reflog
```

I saw anything but my commits which expected because that commit command never had happened due to the files that weren't added.

## Checking stash

Next thing I checked was my stashed files:

```powershell
git stash list
```

This showed me there were two sets of stashed files.

```powershell
stash@{0}: WIP on elmah: 82eb0a4 Merged PR 426: Fixed pass change page
stash@{1}: WIP on availability: 87b2264 Dashboard is now grouping based on hospital category, has got a filter and a search box to search for hospitals
```

Then I looked into each of these with `git stash show stash@{0}` and `git stash show stash@{1}` but I didn't see any of those.

## checking git database

At this point I realised that I needed some help and I contacted Scott one of our `git` gurus to help me fine out what happened. He suggested we start by checking the database for any lost commit using:

```powershell
git fsck --lost-found
```

From the documentation:

> **--lost-found:**
Write dangling objects into .git/lost-found/commit/ or .git/lost-found/other/, depending on type. If the object is a blob, the contents are written into the file, rather than its object name.

This showed me a bunch of stuff including some dangling commits.

```powershell
Checking object directories: 100% (256/256), done.
Checking objects: 100% (4282/4282), done.
dangling tree 484106954fff79e5a4d7b8fd53fca05311e56e79
dangling blob d10124a92b82ccdcb1521ef814f815b75223e0f3
dangling commit 4c8288a8c30d4171c4935982e18ebd842a2c2811
dangling tree ae02e6d9b291775c9bc1eb1489ba341f8b033f48
dangling commit 2ec37c71f59766d55c09830a5b6e2c5e1c741a95
dangling blob 40c3c7ccbd197c78ceddf71c2be01b0db2114ba9
dangling tag a70363ef35f023e57e00fc625bee362c2e9e4bc9
dangling commit 1184e4a583e3d0f9cf9f3cb994a3375b16d122cd
```

So we started to go through some of these to find out which one contained the files I was after.

We checked out a few of those commits and couldn't find what we were after. Then he suggested we check those dangling blobs which technically are a tree object containing a snapshot of everything in your current branch.

## Checking git dangling blobs

You cannot checkout those objects, instead you need to use below command where the last part is the hash code of the blob you're looking into:

```powershell
 git ls-tree -r d134e9e
```

You can copy this from the output of the previous command and you don't need the whole hash value, just a few from the beginning.

The output of this command looks like this:

```powershell
100644 blob ea25f3a9fe6094d700588f33c340d32281a7614b    src/ARV.Database/ARV.Database.sqlproj.orig
100644 blob 2e47fe1d11bd2624065866591af00f80f16e5e1e    src/ARV.Web.Reach/Partials/hird/incident.form.campuses.list.html
100644 blob 2a6b2547ace20f6bbda788dc4e97e4a749281185    src/ARV.Web.Reach/Scripts/app/core/filters.js
100644 blob a366e78d88695f3c1a2b5617ec03fd24387f2323    src/ARV.Web.Reach/Scripts/app/hird/incident.form.controller.js
100644 blob 461c0e11c1ad64a0bee7bb7f57ba9a99314b1510    src/Arv.Cases.External/App_Data/Arv.Cases.External.XML
100644 blob 276ace5a9dae6be5613beebedcfbf5a64f8e4c4b    src/Arv.Services/Dtos/ReferenceDataDto.cs.orig
100644 blob 5336a10e14295222f28ef087643ac6696dc3cb73    src/Arv.Services/Reach/IIncidents.cs
100644 blob 6e186554f4de5347a754d39ebca1dd8867b7eb0a    src/Arv.Services/Reach/Incidents.cs
100644 blob cf70ac7b4af8f9d8e89c2d84e45a23bdaf7c99de    src/Arv.Services/ReferenceData.cs.orig
100644 blob 502e1286886624c6e0d46b9f65886fbc38b86bca    src/Arv.Web.Core/Controllers/Reach/IncidentController.cs
100644 blob 5ef3891af8afa82dd7cdfc45058a6186e4656c34    src/Arv.Web.Core/Controllers/ReferenceController.cs
100644 blob 49e5d63ba2e59c6389c21c24b81809326711fd27    src/Arv.Web.Core/Controllers/ReferenceController.cs.orig
```

After checking a few of these blobs, I finally found the one which contained a version of the file close to the finishing state (yes I had to redo some of my work, but now I had to spend half an hour instead of a day).

## Checking the file

Once we found the blob, we had to check what's the content of those files. You can do that using:

```powershell
git cat-file -p cf70ac7b
```

Now you can see the content printed out to the console. But if the file is bit enough like my situation, you could just pipe this command to write it to a file like so:

```powershell
git cat-file -p cf70ac7b | out-file temp.js
```

If you're using _linux_ or _Mac_, just use your version of the equivalent.

And that's it, repeat this until you have all of the files you need.

## Summary

A few lessons I learnt from this accident:

* Always check you have added all your files before committing (I know it sounds obvious, but it could happen to you the way it happened to me).
* Always make sure you commit your changes often after each set of critical change.

* This one has become my preference now. Rebase from your local branch and not upstream:

```powershell
git add .

git commit -m "Your awesome and informative commit message"

git checkout master

git pull

git checkout feature-branch

git rebase master
```

* And if you lost your code, don't give up, `git` is a really powerful tool.

Hope this helps someone to save some time in case of a similar accident.
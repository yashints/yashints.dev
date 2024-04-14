---
path: '/gatsby-upgrade/'
author: Yaser Adel Mehraban
date: 2024-04-13
title: "So, I decided to upgrade my blog's engine!!!"
popular: true
tags: [gatsby, blog]
---

So, I've decided to write again and since I haven't had time for quite a while, my blog was still using [Gatsby v2](https://www.gatsbyjs.com/). At first it didn't seem like a big change, but little did I know what was I getting myself into.

<!--more-->

## The why

After almost three years, I decided it's time I write again, however, when I opened my VSCode and run the local environment, it gave me lots of warnings that some packages were not maintained anymore. After a little digging I found out Gatsby is at v5 now while I was still using v2.

I thought to myself it shouldn't be that bad, let's go and upgrade the blog before writing any posts to make sure it's safe and sound. I guess something about writing code and craftmanship and the sense of me still being on top of what's happened in the web world while I've been in the cloud (pun intended).

### Updating Node and packages

First thing first, I needed to update my Node to the latest version since they dropped support for what I had. Then I upgraded the Gatsby CLI too:

```bash
npm install -g gatsby-cli
```

After that you can run the `outdated` command to see what packages have new versions.

```bash
npm outdated
```

If you're brave enough like me, run the update command to update all of the packages:

```bash
npm update
```

But you can run it for just one package as well. For me when it was done, I got like a million different errors all at once, but I was in for a fight, so I started by finding all the packages that were either deprecated or replaced by others such as `gatsby-image` and `gatsby-remark-custom-blocks`.

Of course that took a really long time, but I managed to isolate each and resolve it either by commenting the usage or by replacing the package.

### Updating GraphQL queries

The next thing that was broken was the fact that `GraphQL` queries are now two types, Page and Component queries and I had to make sure I used the new helper `useStaticQuery` from Gatsby instead of `StaticQuery` tag.

### Migration from `gatsby-image`

The biggest change from plugin perspective was to move from `gatsby-image` to `gatsby-image-plugin` which meant there were some breaking changes that I had to fix. [Full guide can be found here](https://www.gatsbyjs.com/docs/reference/release-notes/image-migration-guide/).

### Changes to the way we add SEO

The next thing was using the `Head` API to add SEO to pages which was done differently before. Basically instead of adding a SEO component in each page you need to export a `Head` component:

```javascript
export const Head = () => <Seo title="404: Not Found" />
```

### Styled component updates

The next thing was to change any prop name you pass to styled component to prevent it to be passed down as an attribute to the HTML elements which caused a warning in the browser. The change was not big, just adding a `$` to the beginning of the name fixed the issue, so from:

```javascript
${({ hasmargin }) =>
    hasmargin &&
    `
      margin-right: 1rem;
      
  `}
```

to:

```javascript
${({ $hasmargin }) =>
    $hasmargin &&
    `
      margin-right: 1rem;
      
  `}
```

## Summary

All in all, the changes were not that bad, only time consuming, but I am so glad I got it done and now into writing more content. Stay tuned for some cool content friends 🤘🏽.

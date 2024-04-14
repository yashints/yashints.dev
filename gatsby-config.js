const config = require('./data/config');
const nodePath = require('path');
const Util = require(nodePath.resolve('src/util'));

require('dotenv').config({
  path: `${__dirname}\\.env`,
});

module.exports = {
  siteMetadata: {
    siteUrl: config.url,
    feed_url: `${config.url}${config.siteRss}`,
    title: 'Yashints | Blog',
    description: config.defaultDescription,
    image_url: `https://${config.url}/static/favicon/logo-512x512.png`,
    author: config.author,
    copyright: `${config.defaultTitle} © ${new Date().getFullYear()}`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-yaml',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        url: 'https://api.github.com/graphql',
        typeName: `GitHub`,
        fieldName: `github`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.url,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const postPath = Util.getPostPath(
                  !edge.node.frontmatter.path
                    ? edge.node.frontmatter.title
                    : edge.node.frontmatter.path,
                  edge.node.frontmatter.date
                );
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + postPath,
                  guid: site.siteMetadata.siteUrl + postPath,
                  custom_elements: [
                    {
                      'content:encoded': edge.node.html,
                    },
                  ],
                });
              });
            },
            query: `{							 
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      title
                      path
                      date
                    }
                  }
                }
              }              
						}`,
            output: config.siteRss,
            title: config.title,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'blurred',
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: 'transparent',
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: `gatsby-remark-code-buttons`,
            options: {
              buttonText: 'Copy',
              toasterText: 'Copied to clipboard ✅',
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
          'yas-remark-custom-blocks',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          {
            domain: 'https://www.google-analytics.com',
            crossOrigin: true,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.defaultTitle,
        short_name: config.shortName,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/favicon/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};

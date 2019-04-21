const config = require('./data/config')
const nodePath = require('path')
const Util = require(nodePath.resolve('src/util'))

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: config.url,
    rssMetadata: {
      site_url: config.url,
      feed_url: `${config.url}${config.siteRss}`,
      title: 'Yashints | Blog',
      description: config.defaultDescription,
      image_url: `https://${
        config.url
      }/static/favicon/logo-512x512.png`,
      author: config.author,
      copyright: `${
        config.defaultTitle
      } © ${new Date().getFullYear()}`,
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `bearer ${
            process.env.GITHUB_TOKEN
          }`,
        },
        fetchOptions: {},
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
        query: `{
					site {
						siteMetadata {
							rssMetadata {
								site_url
								title
								author
								copyright
								description
							}
						}
					}
				}`,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }) => {
              return allMarkdownRemark.edges.map(
                edge => {
                  const postPath = Util.getPostPath(
                    !edge.node.frontmatter.path
                      ? edge.node.frontmatter
                          .title
                      : edge.node.frontmatter
                          .path,
                    edge.node.frontmatter.date
                  )
                  return Object.assign(
                    {},
                    edge.node.frontmatter,
                    {
                      description:
                        edge.node.excerpt,
                      url:
                        site.siteMetadata
                          .rssMetadata.site_url +
                        postPath,
                      guid:
                        site.siteMetadata
                          .rssMetadata.site_url +
                        postPath,
                      custom_elements: [
                        {
                          'content:encoded':
                            edge.node.html,
                        },
                      ],
                    }
                  )
                }
              )
            },
            query: `{
							allMarkdownRemark(
								sort: { order: DESC, fields: [frontmatter___date] }
							) {
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!--more-->`,
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve:
              'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                danger: {
                  classes: 'danger',
                  title: 'optional',
                },
                warning: {
                  classes: 'warning',
                  title: 'optional',
                },
                info: {
                  classes: 'info',
                  title: 'optional',
                },
              },
            },
          },
          {
            resolve:
              'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle:
                'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
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
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './static/favicon/logo-512x512.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false,
        },
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
}

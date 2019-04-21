const nodePath = require('path')
const Queries = require('./queries')
const Util = require(nodePath.resolve('src/util'))

exports.createPages = async ({
  actions: { createPage },
  graphql,
}) => {
  try {
    const postTemplate = nodePath.resolve(
      'src/templates/post.js'
    )

    const res = await graphql(Queries)
    res.data.posts.edges.forEach(
      ({
        previous,
        node: {
          frontmatter: { title, path, date },
        },
        next,
      }) => {
        const postPath = Util.getPostPath(
          !path ? title : path,
          date
        )
        const nextPostPath =
          next &&
          Util.getPostPath(
            !next.frontmatter.path
              ? next.frontmatter.title
              : next.frontmatter.path,
            next.frontmatter.date
          )
        const prevPostPath =
          previous &&
          Util.getPostPath(
            !previous.frontmatter.path
              ? previous.frontmatter.title
              : previous.frontmatter.path,
            previous.frontmatter.date
          )
        createPage({
          path: postPath,
          component: postTemplate,
          context: {
            title: title,
            postPath: postPath,
            nextPost: nextPostPath,
            previousPost: prevPostPath,
          },
        })

        // Create blog post list pages
        const postsPerPage = 10
        const numPages = Math.ceil(
          res.data.posts.edges.length /
            postsPerPage
        )

        Array.from({ length: numPages }).forEach(
          (_, i) => {
            createPage({
              path:
                i === 0
                  ? `/blog`
                  : `/blog/${i + 1}`,
              component: nodePath.resolve(
                './src/templates/blog-list.js'
              ),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
              },
            })
          }
        )
      }
    )

    if (res.errors) {
      throw new Error(res.errors)
    }
  } catch (err) {
    console.error(err)
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        Components: `${__dirname}/src/components`,
        Common: `${__dirname}/src/components/common`,
        Static: `${__dirname}/static/`,
        Theme: `${__dirname}/src/components/theme`,
        Data: `${__dirname}/data/config`,
        Util: `${__dirname}/src/util`,
        Images: `${__dirname}/src/static/images`,
      },
    },
  })
}

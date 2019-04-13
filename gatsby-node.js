const nodePath = require('path')
const Queries = require('./queries')
const Util = require(nodePath.resolve('src/util'))

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  try {
    const postTemplate = nodePath.resolve('src/templates/post.js')

    // const res = await graphql(Queries)
    // res.data.posts.edges.forEach(
    //   ({
    //     node: {
    //       frontmatter: { path, date },
    //     },
    //   }) => {
    //     const postPath = Util.getPostPath(path, date)
    //     createPage({
    //       path: postPath,
    //       component: postTemplate,
    //       context: {
    //         postPath: path,
    //         fullPath: postPath,
    //       },
    //     })
    //   }
    // )
    const res = await graphql(Queries)
    res.data.posts.edges.forEach(({ node: { frontmatter: { path } } }) => {
      createPage({
        path: path,
        component: postTemplate,
      })
    })

    if (res.errors) {
      throw new Error(res.errors)
    }
  } catch (err) {
    console.log(err)
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

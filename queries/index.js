module.exports = `
{
  posts: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      previous {
        frontmatter {
          path
        }
      }
      node {
        frontmatter {
          path,
          date
        }
      }
    }
  }
}
`

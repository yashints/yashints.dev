module.exports = `
{
  posts: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      previous {
        frontmatter {
          path,
          date
        }
      }
      node {
        frontmatter {
          path,
          date
        }
      }
      next {
        frontmatter {
          path,
          date
        }
      }
    }
  }
}
`

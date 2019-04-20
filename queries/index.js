module.exports = `
{
  posts: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
  ) {
    edges {
      previous {
        frontmatter {          
          date
          path
          title
        }
      }
      node {
        frontmatter {
          title
          path
          date
        }
      }
      next {
        frontmatter {
          title
          path
          date
        }
      }
    }
  }
}
`

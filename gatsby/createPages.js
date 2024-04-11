const createBlogPages = require('./create/page.js').createBlogPages;
const createPost = require('./create/post.js').createPage;
const createTag = require('./create/tag.js').createTags;

exports.createPages = async (props) => {
  const { graphql } = props;

  const { data } = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              date
              tags
            }
          }
        }
      }
    }
  `);

  const posts = data.posts.edges;

  createBlogPages(props, { posts, prefix: '/blog' });
  createPost(props, { posts });
  await createTag(props, { posts });
};

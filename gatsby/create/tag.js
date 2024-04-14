const path = require('path');

exports.createTags = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const {
    data: {
      allMarkdownRemark: { group },
    },
  } = await graphql(`
    {
      allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  const tagList = group.map(({ tag }) => tag);
  //generate tag pages
  const uniqueTags = [...new Set(tagList)];
  uniqueTags.forEach((tag, i) => {
    createPage({
      path: `/tags/${tag.replace(' ', '')}`,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag,
      },
    });
  });
};

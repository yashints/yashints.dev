const path = require('node:path');

exports.createBlogPages = ({ actions }, options) => {
  const { posts, prefix } = options;
  const { createPage } = actions;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `${prefix}/${i === 0 ? '' : i + 1}`,
      component: path.resolve(`src/templates/blog-list.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

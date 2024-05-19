const nodePath = require('node:path');
const Util = require(nodePath.resolve('src/util'));

exports.createPage = ({ actions }, options) => {
  const { posts } = options;
  const { createPage } = actions;
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const { title, path, date } = post.node.frontmatter;
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      const postPath = Util.getPostPath(!path ? title : path, date);
      const nextPostPath =
        next &&
        Util.getPostPath(
          !next.frontmatter.path
            ? next.frontmatter.title
            : next.frontmatter.path,
          next.frontmatter.date
        );
      const prevPostPath =
        previous &&
        Util.getPostPath(
          !previous.frontmatter.path
            ? previous.frontmatter.title
            : previous.frontmatter.path,
          previous.frontmatter.date
        );
      createPage({
        path: postPath,
        component: nodePath.resolve(`src/templates/post.js`),
        context: {
          title: title,
          postPath: postPath,
          nextPost: nextPostPath,
          previousPost: prevPostPath,
        },
      });

      if (process.env.gatsby_executing_command.includes('develop')) {
        createPage({
          path: `${postPath}/image_share`,
          component: nodePath.resolve(`src/templates/social-media-card.js`),
          context: {
            title: title,
            width: 400,
            height: 200,
          },
        });
      }
    });
  }
};

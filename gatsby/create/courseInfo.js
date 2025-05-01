const path = require('node:path');

exports.createCourseInfo = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/courseinfo',
    component: path.resolve(`src/templates/course-info.js`),
  });
};

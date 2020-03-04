const path = require('path');

module.exports = async ({ createPage, graphql }) => {
  createPage({
    path: `/404`,
    component: path.resolve(__dirname, '../../src/templates/404')
  });
};

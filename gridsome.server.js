const pages = require('./scripts/create-pages');

module.exports = function(api) {
  api.createPages(async ({ graphql, createPage }) => {
    pages.forEach(fn => fn({ graphql, createPage }));
  });
};

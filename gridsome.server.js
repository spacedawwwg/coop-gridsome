const pages = require('./scripts/create-pages');

module.exports = function(api) {
  api.createPages(async ({ graphql, createPage }) => {
    const promises = pages.map(async fn => fn({ graphql, createPage }));
    await Promise.all(promises);
  });
};

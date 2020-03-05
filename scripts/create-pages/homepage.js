const path = require('path');
const fs = require('fs');
const homepageQuery = fs.readFileSync(
  path.resolve(__dirname, '../graphql/homepage.graphql'),
  'utf8'
);
const parentPageRecursiveFragment = fs.readFileSync(
  path.resolve(__dirname, '../graphql/parent-pages-recursive.fragment.graphql'),
  'utf8'
);

module.exports = async ({ createPage, graphql }) => {
  const { data } = await graphql(homepageQuery + parentPageRecursiveFragment);
  createPage({
    path: `/`,
    component: path.resolve(__dirname, '../../src/templates/Homepage'),
    context: data.contentfulHomepage
  });
};

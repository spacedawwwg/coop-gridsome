const path = require('path');
const cloneDeep = require('lodash/cloneDeep');
const parseObjProps = require('../utils/parse-obj-props');
const fs = require('fs');
const pagesQuery = fs.readFileSync(
  path.resolve(__dirname, '../graphql/all-pages.graphql'),
  'utf8'
);
const parentPageRecursiveFragment = fs.readFileSync(
  path.resolve(__dirname, '../graphql/parent-pages-recursive.fragment.graphql'),
  'utf8'
);

module.exports = async ({ createPage, graphql }) => {
  const { data } = await graphql(pagesQuery + parentPageRecursiveFragment);
  data.allContentfulPage.edges.forEach(({ node }) => {
    const slugParts = [node.slug];
    if (node.parentPage) {
      parseObjProps(
        cloneDeep(node.parentPage),
        slug => slug && slugParts.unshift(slug)
      );
    }
    const slug = `/${slugParts.join('/')}`;
    createPage({
      path: slug,
      component: path.resolve(__dirname, '../../src/templates/Page'),
      context: node
    });
  });
};

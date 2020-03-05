const path = require('path');
const cloneDeep = require('lodash/cloneDeep');
const parseObjProps = require('../utils/parse-obj-props');

module.exports = async ({ createPage, graphql }) => {
  const { data } = await graphql(`
    {
      allContentfulPage {
        edges {
          node {
            id
            title
            slug
            body
            ...ParentPageRecursive
          }
        }
      }
    }

    fragment ParentPageRecursive on ContentfulPage {
      parentPage {
        slug
        parentPage {
          slug
          parentPage {
            slug
          }
        }
      }
    }
  `);
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

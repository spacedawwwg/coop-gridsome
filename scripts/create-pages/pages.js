const path = require('path');
const fs = require('fs');
const cloneDeep = require('lodash/cloneDeep');
const parseObjProps = require('../utils/parse-obj-props');
const getImageData = require('../utils/get-image-data');
const contentfulLqipSrc = require('../utils/contentful-lqip-src');
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
  const promises = data.allContentfulPage.edges.map(async ({ node }) => {
    //const context = { ...node };
    const context = node;
    // slugs
    const slugParts = [context.slug];
    if (context.parentPage) {
      parseObjProps(
        cloneDeep(context.parentPage),
        slug => slug && slugParts.unshift(slug)
      );
    }
    const slug = `/${slugParts.join('/')}`;
    context.fullPath = slug;
    // lqip
    if (context.hero) {
      const lqip = await getImageData(
        contentfulLqipSrc(context.hero.media.file.url)
      );
      context.hero.media.file.lqip = lqip;
    }
    createPage({
      path: slug,
      component: path.resolve(__dirname, '../../src/templates/Page'),
      context: context
    });
  });
  await Promise.all(promises);
};

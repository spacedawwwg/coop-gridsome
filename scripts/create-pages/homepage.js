const path = require('path');
const fs = require('fs');
const getImageData = require('../utils/get-image-data');
const contentfulLqipSrc = require('../utils/contentful-lqip-src');
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
  const context = { ...data.contentfulHomepage };
  // lqip
  if (context.hero) {
    const lqip = await getImageData(
      contentfulLqipSrc(context.hero.media.file.url)
    );
    context.hero.media.file.lqip = lqip;
  }
  createPage({
    path: `/`,
    component: path.resolve(__dirname, '../../src/templates/Homepage'),
    context: context
  });
};

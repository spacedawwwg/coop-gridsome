const path = require('path');

module.exports = async ({ createPage, graphql }) => {
  const { data } = await graphql(`
    {
      homepage: contentfulHomepage(id: "5V07J4dWi6tjnMODoJg3Pu") {
        title
        hero {
          id
          title
          media {
            id
            title
            file {
              url
              details {
                image {
                  width
                  height
                }
              }
              fileName
              contentType
            }
          }
          body
          linkText
          linkReference {
            id
          }
        }
      }
    }
  `);
  createPage({
    path: `/`,
    component: path.resolve(__dirname, '../../src/templates/Homepage'),
    context: data
  });
};

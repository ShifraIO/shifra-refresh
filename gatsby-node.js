/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const contentPageTemplate = path.resolve('src/templates/contentPage.js');
    const menuPageTemplate = path.resolve('src/templates/menuPage.js');
    const mapPageTemplate = path.resolve('src/components/Map/MapContainer.js');

    resolve(
      graphql(`
        {
          allContentfulLanguage {
            edges {
              node {
                code
              }
            }
          }
          allContentfulMenuItem {
            edges {
              node {
                slug
              }
            }
          }
          allContentfulPage {
            edges {
              node {
                slug
                parentMenu {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        result.data.allContentfulPage.edges.forEach(edge => {
          const slugPrefix = edge.node.parentMenu.slug;

          //clinic map does not use main template
          if (slugPrefix !== "clinic-locations") {
            createPage({
              path: `${slugPrefix}/${edge.node.slug}`,
              component: mapPageTemplate,
              context: {
                slug: `${edge.node.slug}`,
              },
            });
          } else {
            createPage({
              path: `${slugPrefix}/${edge.node.slug}`,
              component: contentPageTemplate,
              context: {
                slug: `${edge.node.slug}`,
              },
            });
          }
        });

        result.data.allContentfulMenuItem.edges.forEach(edge => {
          createPage({
            path: `${edge.node.slug}`,
            component: menuPageTemplate,
            context: {
              slug: `${edge.node.slug}`,
            },
          });
        });

        return;
      })
    );
  });
};

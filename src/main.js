// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default';

import './assets/styles/main.css';

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  const fonts = [
    'https://assets.digital.coop.co.uk/finder/static/fonts/2cd55546-ec00-4af9-aeca-4a3cd186da53.woff2',
    'https://assets.digital.coop.co.uk/finder/static/fonts/7377dbe6-f11a-4a05-b33c-bc8ce1f60f84.woff2',
    'https://assets.digital.coop.co.uk/finder/static/fonts/627fbb5a-3bae-4cd9-b617-2f923e29d55e.woff2',
    'https://assets.digital.coop.co.uk/finder/static/fonts/aad99a1f-7917-4dd6-bbb5-b07cedbff64f.woff2',
    'https://assets.digital.coop.co.uk/finder/static/fonts/687932cb-145b-4690-a21d-ed1243db9e36.woff2'
  ];

  fonts.forEach(fontPath => {
    head.link.push({
      rel: `preload`,
      as: `font`,
      href: fontPath,
      type: `font/woff2`, 
      crossorigin: ``
    });
  });

  head.link.push({
    rel: `preconnect`,
    href: `https://assets.digital.coop.co.uk/`
  });

  head.link.push({
    rel: `preconnect`,
    href: `//images.ctfassets.net/`
  });

}

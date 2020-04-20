import { storiesOf } from '@storybook/vue';
import { text, object } from '@storybook/addon-knobs';
import Header from './Header.vue';
import headerMenuFixture from './__fixtures__/header-menu-fixture';

const labels = {
  searchActionLabel: 'Search',
  navActionLabel: 'Menu',
  userNavActionLabel: 'Sign In',
  searchInputLabel: 'Search Nexxus US (Results displayed on Google)',
  searchInputPlaceholder: 'Search Products, Articles and More…',
  searchSubmit: 'Go',
  searchTitle: 'Search',
  navigationTitle: 'Navigation',
};

storiesOf('Common components/Header', module).add('default', () => {
  return {
    components: {
      Header,
    },
    props: {
      headerMenu: {
        type: Object,
        default: headerMenuFixture,
      },
      siteUrl: {
        type: String,
        default: text('Site Url', 'https://test.com'),
      },
      labels: {
        type: Object,
        default: object('Labels', labels),
      },
    },
    template: `<Header :header-menu="headerMenu" site-url="siteUrl" :labels="labels" />`,
  };
});

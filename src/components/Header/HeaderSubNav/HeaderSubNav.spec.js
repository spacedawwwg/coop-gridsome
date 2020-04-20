import { render, wait } from '@testing-library/vue';
import headerMenuFixture from '../__fixtures__/header-menu-fixture';

import HeaderSubNav from '.';

import { EventBus } from '../event-bus';

afterEach(() => {
  EventBus.$emit('nav-active', false);
  EventBus.$emit('sub-nav-active', false);
  EventBus.$emit('active-sub-nav-index', 0);
});

function renderHeadeSubNav() {
  return render(HeaderSubNav, {
    hydrate: true,
    props: {
      items: headerMenuFixture.items[0].children.items,
      footerLink: '/products',
      footerLinkText: 'View more... ',
      itemIndex: 0,
    },
    stubs: ['g-link'],
  });
}

test(`renders an image per child item in subnav`, async () => {
  const { getByTestId } = renderHeadeSubNav();
  headerMenuFixture.items[0].children.items.forEach((item, i) => {
    expect(getByTestId(`sub-nav-media_0_${i}`)).toBeVisible();
  });
});

test('renders subnav as active if activeSubnav index is equal to itemIndex', async () => {
  const { getByTestId } = renderHeadeSubNav();
  expect(getByTestId('sub-nav-0').classList.contains(`is-active`)).toBeFalsy();

  EventBus.$emit('sub-nav-active', true);
  EventBus.$emit('active-sub-nav-index', 0);

  await wait();
  expect(getByTestId('sub-nav-0').classList.contains(`is-active`)).toBeTruthy();
});

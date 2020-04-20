import { render, wait } from '@testing-library/vue';

import HeaderSearch from '.';

import { EventBus } from '../event-bus';

afterEach(() => {
  EventBus.$emit('search-active', false);
});

function renderHeaderSearch() {
  return render(HeaderSearch, {
    hydrate: true,
    props: {
      siteUrl: 'someUrl.com',
      searchInputPlaceholder: 'Label1',
      searchSubmit: 'Label2',
      searchInputLabel: 'Label3',
      searchTitle: 'Label4',
    },
    stubs: ['g-link'],
  });
}

test(`renders search section as active if searchActive true`, async () => {
  const { getByTestId } = renderHeaderSearch();
  expect(getByTestId('header-search').classList.contains(`is-active`)).toBeFalsy();

  EventBus.$emit('search-active', true);

  await wait();
  expect(getByTestId('header-search').classList.contains(`is-active`)).toBeTruthy();
});

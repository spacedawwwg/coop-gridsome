import { render, fireEvent } from '@testing-library/vue';
import headerMenuFixture from '../__fixtures__/header-menu-fixture';

import HeaderNav from '.';

import { EventBus } from '../event-bus';

const mockEmit = jest.spyOn(EventBus, '$emit');

afterEach(() => {
  EventBus.$emit('nav-active', false);
  EventBus.$emit('search-active', false);
  EventBus.$emit('sub-nav-active', false);
  EventBus.$emit('user-nav-active', false);
  EventBus.$emit('active-sub-nav-index', null);
});

function renderHeaderNav() {
  return render(HeaderNav, {
    hydrate: true,
    props: {
      navigationTitle: 'Label1',
      headerMenu: headerMenuFixture,
    },
    stubs: ['g-link'],
  });
}

test(`clicking a nav item closes search and user nav and selects the clicked item as the active sub nav`, async () => {
  const { getByTestId } = renderHeaderNav();
  await fireEvent.click(getByTestId('nav-link-0'));

  expect(mockEmit).toHaveBeenCalledWith('search-active', false);
  expect(mockEmit).toHaveBeenCalledWith('user-nav-active', false);
  expect(mockEmit).toHaveBeenCalledWith('active-sub-nav-index', 0);
  expect(mockEmit).toHaveBeenCalledWith('sub-nav-active', true);

  expect(getByTestId('nav-link-0').parentElement.classList.contains(`is-active`)).toBeTruthy();
});

test('menu items that have children render out as buttons, if not then as links', () => {
  const { getAllByTestId } = renderHeaderNav();
  getAllByTestId(/nav-link/).forEach((item, i) => {
    if (headerMenuFixture.items[i].children) expect(item.tagName).toBe('BUTTON');
    else expect(item.tagName).toBe('G-LINK-STUB');
  });
});

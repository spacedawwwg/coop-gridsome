import { render, fireEvent, wait } from '@testing-library/vue';

import headerMenuFixture from './__fixtures__/header-menu-fixture';
import Header from './Header.vue';
import { EventBus } from './event-bus';

const mockEmit = jest.spyOn(EventBus, '$emit');

function renderHeader(options) {
  const extendProps = options?.props || {};
  return render(Header, {
    props: {
      headerMenu: headerMenuFixture,
      siteUrl: 'https://test.com',
      ...extendProps,
    },
    hydrate: true,
    stubs: ['g-link'],
  });
}

afterEach(() => {
  mockEmit.mockClear();
  process.isClient = true;
  global.innerWidth = 1300;
});

test(`renders header logo`, () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-logo`)).toBeVisible();
});

test(`renders header menu`, () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-menu`)).toBeVisible();
});

test(`renders header nav action`, () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-action-nav`)).toBeVisible();
});

test(`renders header search action`, () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-action-search`)).toBeVisible();
});

test(`should toggle nav if nav action is clicked`, async () => {
  global.innerWidth = 375;
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-nav`).classList.contains(`is-active`)).toBeFalsy();
  await fireEvent.click(getByTestId(`header-action-nav`));
  await wait(() => {
    expect(getByTestId(`header-nav`).classList.contains(`is-active`)).toBeTruthy();
    expect(mockEmit).toHaveBeenCalledWith('nav-active', true);
  });
  await fireEvent.click(getByTestId(`header-action-nav`));
  await wait(() => {
    expect(getByTestId(`header-nav`).classList.contains(`is-active`)).toBeFalsy();
    expect(mockEmit).toHaveBeenCalledWith('nav-active', false);
  });
});

test(`should toggle sub nav if parent is clicked`, async () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId(`sub-nav-0`).classList.contains(`is-active`)).toBeFalsy();
  await fireEvent.click(getByTestId(`nav-link-0`));
  await wait(() => {
    expect(getByTestId(`sub-nav-0`).classList.contains(`is-active`)).toBeTruthy();
    expect(mockEmit).toHaveBeenCalledWith('sub-nav-active', true);
  });
  await fireEvent.click(getByTestId(`nav-link-0`));
  await wait(() => {
    expect(getByTestId(`sub-nav-0`).classList.contains(`is-active`)).toBeFalsy();
    expect(mockEmit).toHaveBeenCalledWith('sub-nav-active', false);
  });
});

test(`should toggle search if search action is clicked`, async () => {
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-search`).classList.contains(`is-active`)).toBeFalsy();
  await fireEvent.click(getByTestId(`header-action-search`));
  await wait(() => {
    expect(getByTestId(`header-search`).classList.contains(`is-active`)).toBeTruthy();
    expect(mockEmit).toHaveBeenCalledWith('search-active', true);
  });
  await fireEvent.click(getByTestId(`header-action-search`));
  await wait(() => {
    expect(getByTestId(`header-search`).classList.contains(`is-active`)).toBeFalsy();
    expect(mockEmit).toHaveBeenCalledWith('search-active', false);
  });
});

test(`should show social links if nav action is clicked`, async () => {
  global.innerWidth = 375;
  const { getByTestId } = renderHeader();
  expect(getByTestId(`header-social`).classList.contains(`is-active`)).toBeFalsy();
  await fireEvent.click(getByTestId(`header-action-nav`));
  await wait(() => {
    expect(getByTestId(`header-social`).classList.contains(`is-active`)).toBeTruthy();
  });
  await fireEvent.click(getByTestId(`header-action-nav`));
  await wait(() => {
    expect(getByTestId(`header-social`).classList.contains(`is-active`)).toBeFalsy();
  });
});

test(`renders correct labels`, () => {
  const labels = {
    navActionLabel: 'TEST1',
    userNavActionLabel: 'TEST2',
    searchActionLabel: 'TEST3',
    searchTitle: 'TEST4',
    searchInputLabel: 'TEST5',
    searchInputPlaceholder: 'TEST6',
    searchSubmit: 'TEST7',
    navigationTitle: 'TEST8',
  };
  const { getByTestId } = renderHeader({
    props: {
      labels,
    },
  });
  expect(getByTestId(`header-action-nav-label`).textContent.trim()).toBe(labels.navActionLabel);
  expect(getByTestId(`header-user-nav-label`).textContent.trim()).toBe(labels.userNavActionLabel);
  expect(getByTestId(`header-action-search-label`).textContent.trim()).toBe(
    labels.searchActionLabel
  );
  expect(getByTestId(`header-search-title`).textContent.trim()).toBe(labels.searchTitle);
  expect(getByTestId(`header-search-input-label`).textContent.trim()).toBe(labels.searchInputLabel);
  expect(getByTestId(`header-search-input`).getAttribute('placeholder')).toBe(
    labels.searchInputPlaceholder
  );
  expect(getByTestId(`header-search-submit-label`).textContent.trim()).toBe(labels.searchSubmit);
  expect(getByTestId(`header-nav-title`).textContent.trim()).toBe(labels.navigationTitle);
});

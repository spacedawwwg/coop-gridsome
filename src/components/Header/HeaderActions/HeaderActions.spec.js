import { render, wait, fireEvent } from '@testing-library/vue';

import HeaderActions from '.';

import { EventBus } from '../event-bus';

const mockEmit = jest.spyOn(EventBus, '$emit');

afterEach(() => {
  mockEmit.mockClear();
  process.isClient = false;
  EventBus.$emit('nav-active', false);
  EventBus.$emit('search-active', false);
  EventBus.$emit('sub-nav-active', false);
  EventBus.$emit('user-nav-active', false);
});

function renderHeaderActions(options) {
  const extendProps = options?.props || {};
  return render(HeaderActions, {
    hydrate: true,
    props: {
      searchActionLabel: 'Label1',
      navActionLabel: 'Label2',
      userNavActionLabel: 'Label3',
      ...extendProps,
    },
  });
}

test(`renders header nav action`, () => {
  const { getByTestId } = renderHeaderActions({ props: { isXlScreen: true } });
  expect(getByTestId(`header-action-nav`)).toBeVisible();
});

test('renders a button for the menu icon if isClient is true', async () => {
  process.isClient = true;
  const { getByTestId } = renderHeaderActions({
    props: { isXlScreen: false },
  });
  await wait(() => getByTestId(`header-action-nav`, 'button'));
  expect(getByTestId(`header-action-nav`).tagName).toBe('BUTTON');
});
test('renders an a tag for the menu icon if isClient is true', async () => {
  process.isClient = false;
  const { getByTestId } = renderHeaderActions({
    props: { isXlScreen: false },
  });
  expect(getByTestId(`header-action-nav`).tagName).toBe('A');
});

test('should emit events to eventbus to close user and search when nav is toggled', async () => {
  process.isClient = true;
  const { getByTestId } = renderHeaderActions({
    props: { isXlScreen: false },
  });
  await fireEvent.click(getByTestId('header-action-nav'));
  expect(mockEmit).toHaveBeenCalledWith('search-active', false);
  expect(mockEmit).toHaveBeenCalledWith('user-nav-active', false);
  expect(mockEmit).toHaveBeenCalledWith('nav-active', true);
});

test('should hide search and user icons when nav is active', async () => {
  process.isClient = true;
  const { getByTestId, queryByTestId } = renderHeaderActions({
    props: { isXlScreen: false },
  });
  expect(getByTestId(`header-action-user-nav`)).toBeVisible();
  expect(getByTestId(`header-action-search`)).toBeVisible();

  await fireEvent.click(getByTestId('header-action-nav'));

  expect(queryByTestId(`header-action-user-nav`)).toBeNull();
  expect(queryByTestId(`header-action-search`)).toBeNull();
});

test('should emit events to eventbus to close nav, search, subnav and open usernav when user nav is clicked', async () => {
  process.isClient = true;
  const { getByTestId } = renderHeaderActions({
    props: { isXlScreen: false },
  });
  await fireEvent.click(getByTestId('header-action-user-nav'));
  expect(mockEmit).toHaveBeenCalledWith('search-active', false);
  expect(mockEmit).toHaveBeenCalledWith('user-nav-active', true);
  expect(mockEmit).toHaveBeenCalledWith('nav-active', false);
  expect(mockEmit).toHaveBeenCalledWith('sub-nav-active', false);
});

test('should emit events to eventbus to close nav, usernav, subnav and open search when search nav is clicked', async () => {
  process.isClient = true;
  const { getByTestId } = renderHeaderActions({
    props: { isXlScreen: false },
  });
  await fireEvent.click(getByTestId('header-action-search'));
  expect(mockEmit).toHaveBeenCalledWith('search-active', true);
  expect(mockEmit).toHaveBeenCalledWith('user-nav-active', false);
  expect(mockEmit).toHaveBeenCalledWith('nav-active', false);
  expect(mockEmit).toHaveBeenCalledWith('sub-nav-active', false);
});

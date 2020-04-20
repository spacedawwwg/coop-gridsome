/* eslint-disable no-restricted-syntax */
import Vue from 'vue';

const commonValues = [
  {
    name: 'nav-active',
    value: {
      navActive: false,
    },
  },
  {
    name: 'search-active',
    value: {
      searchActive: false,
    },
  },
  {
    name: 'user-nav-active',
    value: {
      userNavActive: false,
    },
  },
  {
    name: 'sub-nav-active',
    value: {
      subNavActive: false,
    },
  },
  {
    name: 'active-sub-nav-index',
    value: {
      activeSubNavIndex: false,
    },
  },
];

const data = (valueData) => valueData.reduce((agg, item) => ({ ...agg, ...item.value }), {});

const bindListeners = (vm, valueData) => {
  valueData.forEach((item) => {
    const [key] = Object.keys(item.value);
    vm.$on(item.name, (newVal) => {
      vm[key] = newVal;
    });
  });
};

const bus = new Vue({
  data: data(commonValues),
});

bindListeners(bus, commonValues);

export const EventBus = bus;

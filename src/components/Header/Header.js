import whatInput from 'what-input';
import FocusLock from 'vue-focus-lock';
import ClickOutside from 'vue-click-outside';
import HeaderActions from './HeaderActions';
import HeaderSearch from './HeaderSearch';
import HeaderNav from './HeaderNav';
import { EventBus } from './event-bus';

export default {
  components: {
    FocusLock,
    HeaderActions,
    HeaderSearch,
    HeaderNav,
  },
  directives: {
    ClickOutside,
  },
  props: {
    headerMenu: {
      type: Object,
      required: true,
    },
    siteUrl: {
      type: String,
      required: true,
    },
    labels: {
      type: Object,
      default: () => ({
        searchActionLabel: 'Search',
        navActionLabel: 'Menu',
        userNavActionLabel: 'Sign In',
        searchInputLabel: 'Search Nexxus US (Results displayed on Google)',
        searchInputPlaceholder: 'Search Products, Articles and More…',
        searchSubmit: 'Go',
        searchTitle: 'Search',
        navigationTitle: 'Navigation',
      }),
    },
  },
  data: () => ({
    focusOutTimer: null,
    resizeTimer: null,
    resizing: false,
    windowWidth: 0,
  }),
  computed: {
    isMdScreen() {
      return this.windowWidth >= 768;
    },
    isLgScreen() {
      return this.windowWidth >= 1024;
    },
    isXlScreen() {
      return this.windowWidth >= 1300;
    },
    navActive: () => EventBus.navActive,
    searchActive: () => EventBus.searchActive,
    subNavActive: () => EventBus.subNavActive,
    activeSubNavIndex: () => EventBus.activeSubNavIndex,
  },
  watch: {
    $route() {
      this.$nextTick(() => this.closeSubNav());
    },
  },
  mounted() {
    // use button instead of anchor when mounted
    document.addEventListener('focusin', this.focusChanged);
    document.addEventListener('focusout', this.focusChanged);
    window.addEventListener('resize', this.resize);
    this.$nextTick(() => {
      this.setWindowWidth();
    });
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged);
    document.removeEventListener('focusout', this.focusChanged);
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    closeSubNav() {
      if (this.isLgScreen && this.subNavActive) {
        EventBus.$emit('active-sub-nav-index', null);
        EventBus.$emit('sub-nav-active', false);
      }
    },
    focusChanged(event) {
      if (whatInput.ask() !== 'keyboard' || !this.subNavActive) {
        return;
      }
      const el = event.target;
      const parent = el.closest('[data-subnav]');
      const isSubnav = el.dataset.subnav || (parent && parent.dataset.subnav);
      if (this.focusOutTimer) {
        clearTimeout(this.focusOutTimer);
        this.focusOutTimer = null;
      }
      if (event.type === 'focusin' && isSubnav) {
        const subNavIndex = el.dataset.subnav || parent.dataset.subnav;
        if (subNavIndex && this.activeSubNavIndex !== subNavIndex) {
          EventBus.$emit('sub-nav-active', subNavIndex !== null);
          EventBus.$emit('active-subnav-index', subNavIndex);
        }
      } else {
        this.focusOutTimer = setTimeout(() => {
          EventBus.$emit('active-subnav-index', null);
          EventBus.$emit('sub-nav-active', false);
        }, 10);
      }
    },
    setWindowWidth() {
      if (process.isClient) {
        this.windowWidth = window.innerWidth;
      }
    },
    resize() {
      const vm = this;
      if (vm.resizeTimer) {
        clearTimeout(this.resizeTimer);
        vm.resizeTimer = null;
      }
      if (!vm.resizing) {
        vm.resizing = true;
        if (vm.subNavActive || vm.navActive) {
          EventBus.$emit('nav-active', false);
        }
      }
      vm.resizeTimer = setTimeout(() => {
        vm.resizing = false;
        vm.resizeTimer = null;
        vm.setWindowWidth();
      }, 200);
    },
  },
};

import { EventBus } from '../event-bus';

export default {
  name: 'HeaderActionSearch',
  props: {
    isXlScreen: {
      type: Boolean,
      required: true,
    },
    searchActionLabel: {
      type: String,
      required: true,
    },
    navActionLabel: {
      type: String,
      required: true,
    },
    userNavActionLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchActionTag: 'label',
      navActionTag: 'a',
    };
  },
  mounted() {
    this.searchActionTag = 'button';
    this.navActionTag = 'button';
  },
  computed: {
    navActive: () => EventBus.navActive,
    searchActive: () => EventBus.searchActive,
    userNavActive: () => EventBus.userNavActive,
    isClient: () => process.isClient,
  },
  watch: {
    $route() {
      this.$nextTick(() => this.closeNav());
    },
    navActive(newVal) {
      if (newVal === false) {
        this.$nextTick(() => this.closeNav());
      }
    },
  },
  methods: {
    toggleNav(openClose) {
      const htmlEl = document.documentElement;
      const activeClass = 'is-nav-active';
      EventBus.$emit('search-active', false);
      EventBus.$emit('user-nav-active', false);
      const navStatus = openClose === 'close' ? false : !this.navActive;
      EventBus.$emit('nav-active', navStatus);
      setTimeout(() => {
        if (openClose === 'close') {
          htmlEl.classList.remove(activeClass);
        } else {
          htmlEl.classList.toggle(activeClass);
        }
      }, 100);
    },
    toggleUserNav() {
      EventBus.$emit('nav-active', false);
      EventBus.$emit('search-active', false);
      EventBus.$emit('sub-nav-active', false);
      EventBus.$emit('user-nav-active', !this.userNavActive);
    },
    toggleSearch() {
      EventBus.$emit('user-nav-active', false);
      EventBus.$emit('nav-active', false);
      EventBus.$emit('sub-nav-active', false);
      EventBus.$emit('search-active', !this.searchActive);
    },
    closeNav() {
      if (this.navActive || this.searchActive || this.userNavActive) {
        this.toggleNav('close');
        if (this.$refs.navAction) {
          this.$refs.navAction.focus();
        }
      }
    },
  },
};

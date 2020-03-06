import Vue from 'vue';
import whatInput from 'what-input';
import FocusLock from 'vue-focus-lock';
import ClickOutside from 'vue-click-outside';
import headerMenuFixture from './__test__/menu-fixture';

export default Vue.extend({
  components: {
    FocusLock
  },
  directives: {
    ClickOutside
  },
  data: () => ({
    navActive: false,
    subnavActive: false,
    focusedLinkIndex: null,
    activeSubnavIndex: null,
    activeSubnavHeight: 0,
    focusOutTimer: null,
    resizeTimer: null,
    resizing: false,
    windowWidth: 0,
    setActiveSubnavIndexTimeout: null,
    actionTag: 'a',
    headerMenu: headerMenuFixture
  }),
  computed: {
    isClient() {
      return process.isClient;
    },
    isLargeScreen() {
      return this.windowWidth >= 1024;
    },
    headerStyles() {
      let styles = null;
      if (process.isClient) {
        styles = {
          paddingBottom: this.isLargeScreen ? `${this.activeSubnavHeight}px` : 0
        };
      }
      return styles;
    }
  },
  mounted() {
    document.addEventListener('focusin', this.focusChanged);
    document.addEventListener('focusout', this.focusChanged);
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    document.removeEventListener('focusin', this.focusChanged);
    document.removeEventListener('focusout', this.focusChanged);
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    this.actionTag = 'button';
    this.$nextTick(() => {
      this.setWindowWidth();
    });
  },
  methods: {
    toggleNav(openClose) {
      const htmlEl = document.documentElement;
      const activeClass = 'is-nav-active';
      this.navActive = openClose === 'close' ? false : this.navActive;
      setTimeout(() => {
        if (openClose === 'close') {
          htmlEl.classList.remove(activeClass);
        } else {
          htmlEl.classList.toggle(activeClass);
        }
      }, 100);
    },
    subMenuStyles(index) {
      let styles = null;
      if (process.isClient && !this.isLargeScreen) {
        styles = {
          height:
            this.subnavActive &&
            this.activeSubnavIndex !== null &&
            parseInt(this.activeSubnavIndex, 10) === parseInt(index, 10)
              ? `${this.activeSubnavHeight}px`
              : 0
        };
      }
      return styles;
    },
    calculateDelay(index) {
      const time =
        this.subnavActive && this.activeSubnavIndex !== null ? index / 18 : 0;
      return `${time}s`;
    },
    async closeNav() {
      if (this.navActive || (this.isLargeScreen && this.subnavActive)) {
        await this.setActiveSubnavIndex(null).then(this.setActiveSubnavHeight);
        if (this.$refs.navAction) {
          this.$refs.navAction.focus();
        }
      }
    },
    setActiveSubnavHeight() {
      const subnav = this.$refs[`subnav_${this.activeSubnavIndex}`];
      this.activeSubnavHeight =
        this.activeSubnavIndex !== null ? subnav[0].offsetHeight : 0;
    },
    setActiveSubnavIndex(index) {
      const vm = this;
      if (vm.setActiveSubnavIndexTimeout) {
        clearTimeout(vm.setActiveSubnavIndexTimeout);
      }
      return new Promise(resolve => {
        vm.setActiveSubnavIndexTimeout = setTimeout(() => {
          vm.activeSubnavIndex = index;
          vm.subnavActive = index !== null;
          clearTimeout(vm.setActiveSubnavIndexTimeout);
          resolve();
        }, 10);
      });
    },
    toggleSubnav(event, index) {
      let activeSubnavIndex = null;
      if (this.activeSubnavIndex !== index || !this.subnavActive) {
        activeSubnavIndex = index;
      }
      this.setActiveSubnavIndex(activeSubnavIndex).then(
        this.setActiveSubnavHeight
      );
      event.stopPropagation();
      event.preventDefault();
    },
    focusChanged(event) {
      if (whatInput.ask() !== 'keyboard' || !this.subnavActive) {
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
        const subnavIndex = el.dataset.subnav || parent.dataset.subnav;
        if (subnavIndex && this.activeSubnavIndex !== subnavIndex) {
          this.setActiveSubnavIndex(subnavIndex).then(
            this.setActiveSubnavHeight
          );
        }
      } else {
        this.focusOutTimer = setTimeout(() => {
          this.setActiveSubnavIndex(null).then(this.setActiveSubnavHeight);
        }, 10);
      }
    },
    setFocusedLink(index) {
      this.focusedLinkIndex = index;
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
        if (vm.subnavActive) {
          vm.closeNav();
        }
      }
      vm.resizeTimer = setTimeout(() => {
        vm.resizing = false;
        vm.resizeTimer = null;
        vm.setWindowWidth();
      }, 200);
    }
  }
});

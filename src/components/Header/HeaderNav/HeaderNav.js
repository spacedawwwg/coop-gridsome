import HeaderSubNav from '../HeaderSubNav';
import { EventBus } from '../event-bus';

export default {
  name: 'HeaderNav',
  components: {
    HeaderSubNav,
  },
  props: {
    navigationTitle: {
      type: String,
      required: true,
    },
    headerMenu: {
      type: Object,
      required: true,
    },
  },
  computed: {
    subNavActive: () => EventBus.subNavActive,
    activeSubNavIndex: () => EventBus.activeSubNavIndex,
    navActive: () => EventBus.navActive,
  },
  methods: {
    toggleSubnav(event, index) {
      let activeSubNavIndex = null;
      if (this.activeSubNavIndex !== index || !this.subNavActive) {
        activeSubNavIndex = index;
      }
      EventBus.$emit('search-active', false);
      EventBus.$emit('user-nav-active', false);
      EventBus.$emit('active-sub-nav-index', activeSubNavIndex);
      EventBus.$emit('sub-nav-active', activeSubNavIndex !== null);
      event.stopPropagation();
      event.preventDefault();
    },
  },
};

import { EventBus } from '../event-bus';
import Picture from '../../Picture';

export default {
  name: 'HeaderSubNav',
  components: {
    Picture,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    footerLink: {
      type: String,
      required: true,
    },
    footerLinkText: {
      type: String,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    subNavActive: () => EventBus.subNavActive,
    activeSubNavIndex: () => EventBus.activeSubNavIndex,
  },
  methods: {
    calculateDelay(index) {
      const time = this.subNavActive && this.activeSubNavIndex !== null ? index / 18 : 0;
      return `${time}s`;
    },
  },
};

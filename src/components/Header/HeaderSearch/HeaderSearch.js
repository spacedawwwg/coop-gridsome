import { EventBus } from '../event-bus';

export default {
  name: 'HeaderSearch',
  props: {
    siteUrl: {
      type: String,
      required: true,
    },
    searchInputPlaceholder: {
      type: String,
      required: true,
    },
    searchSubmit: {
      type: String,
      required: true,
    },
    searchInputLabel: {
      type: String,
      required: true,
    },
    searchTitle: {
      type: String,
      required: true,
    },
  },
  computed: {
    searchActive: () => EventBus.searchActive,
  },
  watch: {
    searchActive(newVal) {
      if (newVal === true) {
        this.$nextTick(() => this.focusSearch());
      }
    },
  },
  methods: {
    focusSearch() {
      if (this.$refs['search-input']) {
        this.$refs['search-input'].focus();
      }
    },
  },
};

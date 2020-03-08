export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    sources: {
      type: Array,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    dataUri: {
      type: String,
      default: null
    }
  },
  computed: {
    maintainAspectRatio() {
      return this.height && this.width;
    },
    paddingTopPercentage() {
      return this.maintainAspectRatio ? `${(this.height / this.width) * 100}%` : null;
    }
  }
};

import Picture from '../Picture';

export default {
  name: 'PageHero',
  components: {
    Picture
  },
  props: {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      default: null
    },
    cta: {
      type: Object,
      default: null
    },
    media: {
      type: Object,
      default: null
    },
    containerTag: {
      type: String,
      default: 'div'
    },
    headerTag: {
      type: String,
      default: 'h2'
    }
  },
};

import { toPageHero } from '../../mappings';
import PageHero from '../../components/PageHero';

export default {
  components: {
    PageHero
  },
  metaInfo() {
    return {
      title: this.$context.homepage.title || 'this is the title',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$context.homepage.body || 'this is the description'
        }
      ]
    };
  },
  computed: {
    pageHeroContent() {
      return toPageHero(this.$context.homepage.hero);
    }
  }
};

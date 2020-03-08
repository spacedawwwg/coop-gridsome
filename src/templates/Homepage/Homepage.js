import { toPageHero, toSeoMeta } from '../../mappings';
import PageHero from '../../components/PageHero';

export default {
  components: {
    PageHero
  },
  metaInfo() {
    return toSeoMeta({
      seo: this.$context.seo,
      extend: {
        titleTemplate: '%s'
      }
    });
  },
  computed: {
    pageHeroContent() {
      if (!this.$context.hero) {
        return;
      }
      return toPageHero(this.$context.hero);
    },
    pageHero2Content() {
      if (!this.$context.hero2) {
        return;
      }
      return toPageHero(this.$context.hero2);
    }
  }
};

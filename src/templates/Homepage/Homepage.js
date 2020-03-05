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
      return toPageHero(this.$context.hero);
    }
  }
};

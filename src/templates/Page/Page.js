import { toPageHero, toSeoMeta } from '../../mappings';
import PageHero from '../../components/PageHero';

export default {
  components: {
    PageHero
  },
  metaInfo() {
    return toSeoMeta({
      seo: {
        ...this.$context.seo,
        url: this.$context.fullPath,
      }
    });
  },
  computed: {
    pageHeroContent() {
      if (!this.$context.hero) {
        return;
      }
      return toPageHero(this.$context.hero);
    }
  }
};

const baseUrl = process.env.GRIDSOME_SITE_URL || 'https://www.coop.co.uk';

export default ({ seo, extend }) => ({
  title: seo.title,
  meta: [
    {
      key: 'description',
      name: 'description',
      content: seo.description
    },
    {
      key: 'keywords',
      name: 'keywords',
      content: seo.keywords ? seo.keywords.join(',') : null
    },
    {
      property: 'og:url',
      content: baseUrl + (seo.url ? seo.url : '')
    },
    {
      property: 'og:title',
      content: seo.title
    },
    {
      property: 'og:site_name',
      content: 'Co-op'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: seo.openGraphImage
        ? `https:${seo.openGraphImage.file.url}?w=1200&h=630&fit=crop`
        : null
    },
    {
      property: 'og:description',
      content: seo.description
    }
  ],
  ...extend
});

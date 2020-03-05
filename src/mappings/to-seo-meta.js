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
      content: 'https://www.coop.co.uk'
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
      content: seo.openGraphImage ? seo.openGraphImage.file.url : null
    },
    {
      property: 'og:description',
      content: seo.description
    }
  ],
  ...extend
});

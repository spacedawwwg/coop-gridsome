import toPicture from './to-picture';

export default content => ({
  title: content.title,
  body: content.body,
  cta: {
    label: content.linkText,
    href: content.linkReference.id
  },
  media: toPicture({
    src: content.media,
    sourceSettings: [
      {
        width: 740,
        media: '(min-width: 60em)'
      },
      {
        width: 768,
        media: '(min-width: 48em)'
      },
      {
        width: 375
      }
    ]
  })
});

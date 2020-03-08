import 'core-js/fn/array/flat-map';

export default ({ src, sourceSettings }) => ({
  src: `${src.file.url}?&fm=jpg&q=60`,
  alt: src.title,
  width: src.file.details.image.width,
  height: src.file.details.image.height,
  sources: sourceSettings.flatMap(({ width, media }) => [
    {
      srcset: [
        `${src.file.url}?w=${width}&fm=webp&q=60 1x`,
        `${src.file.url}?w=${width * 2}&fm=webp&q=60 2x`
      ],
      media: media,
      type: 'image/webp'
    },
    {
      srcset: [
        `${src.file.url}?w=${width}&fm=jpg&q=60 1x`,
        `${src.file.url}?w=${width * 2}&fm=jpg&q=60 2x`
      ],
      media: media,
      type: 'image/jpeg'
    }
  ]),
  dataUri: src.file.dataUri
});

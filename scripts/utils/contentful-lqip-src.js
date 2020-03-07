module.exports = contentfulImageUrl => {
  if (/(http(s?)):\/\//gi.test(contentfulImageUrl) === false) {
    contentfulImageUrl = `http:${contentfulImageUrl}`;
  }
  return `${contentfulImageUrl}?fm=jpg`;
};

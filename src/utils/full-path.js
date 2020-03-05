import cloneDeep from 'lodash/cloneDeep';

const parseObjProps = (obj, parse) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      parseObjProps(obj[key], parse);
    } else if (obj.hasOwnProperty(key)) {
      parse(obj[key]);
    }
  }
};

export default ref => {
  const slugParts = [ref.slug];
  if (ref.parentPage) {
    parseObjProps(
      cloneDeep(ref.parentPage),
      slug => slug && slugParts.unshift(slug)
    );
  }
  return `/${slugParts.join('/')}`;
};
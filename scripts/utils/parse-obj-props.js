const parseObjProps = (obj, parse) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      parseObjProps(obj[key], parse);
    } else if (obj.hasOwnProperty(key)) {
      parse(obj[key]);
    }
  }
};

module.exports = parseObjProps;

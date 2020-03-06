const canvas = require('canvas');

const getImageData = async imageUrl => {
  const image = await canvas.loadImage(imageUrl);
  const can = canvas.createCanvas();
  can.width = image.width;
  can.height = image.height;
  const context = can.getContext('2d');
  context.drawImage(image, 0, 0);
  return can.toDataURL();
};

module.exports = getImageData;

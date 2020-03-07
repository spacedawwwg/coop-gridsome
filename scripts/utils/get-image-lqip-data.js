const canvas = require('canvas');

const getImageLqipData = async imageUrl => {
  let image = await canvas.loadImage(imageUrl);
  const maxHeight = 15;
  const maxWidth = 15;
  const ratio = Math.min(1, maxWidth / image.width, maxHeight / image.height);
  const factorWidth = (image.width * ratio) | 0;
  const factorHeight = (image.height * ratio) | 0;
  const can = canvas.createCanvas();
  can.width = factorWidth;
  can.height = factorHeight;
  const ctx = can.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0, factorWidth, factorHeight);
  return can.toDataURL();
};

module.exports = getImageLqipData;

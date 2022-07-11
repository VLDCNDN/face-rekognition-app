/**
 * 
 * @param {String} base64Image 
 * @returns Bytes
 */
module.exports = function (base64Image) {
  let image = base64Image;
  if (base64Image.indexOf(',') > -1) { 
    image = base64Image.split(',')[1]; // need to remove the data://..
  }

  const sourceImage = encodeURIComponent(image);
  const imageBuffer = Buffer.from(decodeURIComponent(sourceImage), 'base64');

  return imageBuffer;

}
/**
 * 
 * @param {Bytes} imageBuffer 
 * @param {Object} BoundingBox
 * @param {double} BoundingBox.Left
 * @param {double} BoundingBox.Top
 * @param {double} BoundingBox.Width
 * @param {double} BoundingBox.Height
 * 
 * @return {String} base64
 */
module.exports = async function(imageBuffer, BoundingBox) {
  const Jimp = require('jimp');

  const imageJimp = await Jimp.read(imageBuffer);

  if(imageJimp) {
    const imageWidth = imageJimp.bitmap.width;
    const imageHeight = imageJimp.bitmap.height;

    const leftCoordinate = BoundingBox.Left * imageWidth;
    const topCoordinate = BoundingBox.Top * imageHeight;
    const faceWidth = BoundingBox.Width * imageWidth;
    const faceHeight = BoundingBox.Height * imageHeight;

    dataResp = await imageJimp.crop(leftCoordinate, topCoordinate, faceWidth, faceHeight).quality(100).getBase64Async(Jimp.MIME_JPEG);
    return dataResp;
  }

  return "";
}
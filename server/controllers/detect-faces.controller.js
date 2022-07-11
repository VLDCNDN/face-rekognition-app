module.exports = async function(req, res, next) {
  const DetectFaces = require('../services/DetectFaces');
  const { image }  = req.body;
  const df = new DetectFaces(image);
  const imagesdetected = await df.detect();
  
  res.send({"data" : imagesdetected});
};
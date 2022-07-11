const { RekognitionClient, DetectFacesCommand } = require("@aws-sdk/client-rekognition");
const ImageConverter = require('../utils/image-converter');
const ImageCropper = require('../utils/image-cropper');

class DetectFaces {
  constructor(image) {
    this.image = ImageConverter(image);
    this.config = {
      region: process.env.AWS_REGION
    }
  }

  async detect() {

    const client = new RekognitionClient(this.config);
    const command = new DetectFacesCommand({
      Image: {
          /* required */
          Bytes: this.image,
      },
      Attributes: ['ALL']
    });

    const response = await client.send(command);
    let data = [];
    const { FaceDetails } = response;

    for(let details of FaceDetails) {
      let BoundingBox = details.BoundingBox;
      let imageCrop = await ImageCropper(this.image, BoundingBox);

      data.push(imageCrop);
    }
    
    return data;
    
  }
}

module.exports = DetectFaces;
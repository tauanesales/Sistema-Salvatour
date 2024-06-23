import fs from 'fs';

export function imageToBase64(imagePath) {
  const imgData = fs.readFileSync(imagePath);
  return imgData.toString('base64');
}

export function base64ToImage(base64String, outputPath) {
  const imgData = Buffer.from(base64String, 'base64');
  fs.writeFileSync(outputPath, imgData);
}
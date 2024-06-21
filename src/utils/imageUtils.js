import fs from 'fs';

export function imageToBase64(imagePath) {
  const imgData = fs.readFileSync(imagePath);
  return imgData.toString('base64');
}


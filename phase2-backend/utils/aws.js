// import AWS from 'aws-sdk';

// // Configure AWS SDK
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();

// // Upload to S3
// export const uploadToS3 = async (data, fileName) => {
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `votes/${fileName}.json`,
//     Body: JSON.stringify(data),
//     ContentType: 'application/json',
//   };

//   try {
//     await s3.upload(params).promise();
//     console.log(`Backup to AWS S3: ${fileName}.json`);
//   } catch (err) {
//     console.error('AWS upload error:', err);
//     throw err; // Re-throw the error for handling in the caller
//   }
// };

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const uploadToS3 = async (data, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `votes/${fileName}.json`,
    Body: JSON.stringify(data),
    ContentType: 'application/json'
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(`Backup to AWS S3: ${fileName}.json`);
  } catch (err) {
    console.error('AWS upload error:', err);
  }
};
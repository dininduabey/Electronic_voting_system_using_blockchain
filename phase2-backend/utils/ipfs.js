// import { create } from 'ipfs-http-client';

// // Connect to Infura IPFS
// const ipfs = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: `Basic ${Buffer.from(
//       `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_API_KEY}`
//     ).toString('base64')}`,
//   },
// });

// // Upload to IPFS
// export const uploadToIPFS = async (data) => {
//   try {
//     const result = await ipfs.add(JSON.stringify(data));
//     console.log(`Backup to IPFS: ${result.path}`);
//     return result.path; // Return the IPFS CID
//   } catch (err) {
//     console.error('IPFS upload error:', err);
//     throw err; // Re-throw the error for handling in the caller
//   }
// };






// import { create } from 'ipfs-http-client';

// // Connect to Infura IPFS
// const ipfs = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   apiPath: '/api/v0',
//   headers: {
//     authorization: `Basic ${Buffer.from(
//       `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_API_KEY}`
//     ).toString('base64')}`
//   }
// });

// // In utils/ipfs.js, after creating the client
// const testIPFSConnection = async () => {
//   try {
//     const version = await ipfs.version();
//     console.log('Connected to IPFS. Version:', version.version);
//   } catch (err) {
//     console.error('IPFS connection failed:', err);
//   }
// };

// testIPFSConnection();

// // Upload to IPFS
// export const uploadToIPFS = async (data) => {
//   try {
//     const result = await ipfs.add(JSON.stringify(data), {
//       timeout: 30000 // 30-second timeout
//     });
//     console.log(`Backup to IPFS: ${result.cid.toString()}`);
//     return result.cid.toString();
//   } catch (err) {
//     console.error('IPFS upload error:', err.message);
//     throw err;
//   }
// };

import { create } from 'ipfs-http-client';

// Connect to Infura IPFS
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_API_KEY}`
    ).toString('base64')}`,
  },
});

// Test IPFS connection
const testIPFSConnection = async () => {
  try {
    const version = await ipfs.version();
    console.log('Connected to IPFS. Version:', version.version);
  } catch (err) {
    console.error('IPFS connection failed:', err);
  }
};

// Upload to IPFS
export const uploadToIPFS = async (data) => {
  try {
    const result = await ipfs.add(JSON.stringify(data));
    console.log(`Backup to IPFS: ${result.path}`);
  } catch (err) {
    console.error('IPFS upload error:', err);
  }
};

// Test connection on startup
testIPFSConnection();
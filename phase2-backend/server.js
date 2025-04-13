import 'dotenv/config';
import express from 'express';
import Web3 from 'web3';
import cors from 'cors';
import { uploadToS3 } from './utils/aws.js';
// import { uploadToIPFS } from './utils/ipfs.js';
import bcrypt from 'bcrypt';
// const crypto = require('crypto');
import crypto from 'crypto'
import { hmacSha256, encrypt } from './utils/encryption.js';
import { toBytes32 } from './utils/stringConverters.js';
import voteRoutes from './src/routes/voteRoutes.js'
import { contractABI } from './src/contract/contractABI.js';


// const secretKey = process.env.SECRET_KEY;
const secretKey = process.env.SECRET_KEY.padEnd(32, '0'); // Pad the key to 32 bytes
//check for secret Key
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}



const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Ganache via WebSocket
const web3 = new Web3(
  new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545')
);

// Function to hash password
async function hashPassword(plainPassword) {
  try {
    // Hash the input using SHA-256
    const hash = crypto.createHash('sha256').update(plainPassword).digest('hex');

    // Ensure the hash is exactly 32 bytes (64 hex characters)
    const truncatedHash = hash.slice(0, 64); // In case you need a specific length

    console.log('Hashed Password:', truncatedHash);
    return truncatedHash;
  } catch (err) {
    console.error(err);
  }
}





// Contract setup


const contractAddress = process.env.CONTRACT_ADDRESS;
const voteContract = new web3.eth.Contract(contractABI, contractAddress);





//routes

app.use("/votes", voteRoutes);


// Event listener with backup functionality
voteContract.events.VoteAdded()
  .on('connected', (subscriptionId) => {
    console.log('Subscribed to events. Subscription ID:', subscriptionId);
  })
  .on('data', async (event) => {
    try {
      console.log('Event Data:', event);

      console.log("cryptographicKey: ", event.returnValues.cryptographicKey);
      console.log("encryptedData: ", event.returnValues.encryptedData);
      console.log("Decodekey: ", event.returnValues.Decodekey);
      
      const { cryptographicKey, encryptedData, Decodekey } = event.returnValues;
      
      // Create backup payload
      const backupData = {
        cryptographicKey,
        encryptedData,
        Decodekey,
        timestamp: Date.now(),
        txHash: event.transactionHash
      };

      // Generate unique filename
      const fileName = `vote_${event.transactionHash}`;

      // Upload to both clouds
      await uploadToS3(backupData, fileName);
      // await uploadToIPFS(backupData);

      console.log(`Backup completed for TX: ${event.transactionHash}`);
    } catch (err) {
      console.error('Backup failed:', err);
    }
  })
  .on('error', (err) => {
    console.error('Event error:', err);
  });




// Start server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
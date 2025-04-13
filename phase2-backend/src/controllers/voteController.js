import { contractABI } from "../contract/contractABI.js";
import Web3 from 'web3';
import { encrypt, decrypt, hmacSha256 } from "../../utils/encryption.js";
import { toBytes32 } from "../../utils/stringConverters.js";

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545')
);
const contractAddress = process.env.CONTRACT_ADDRESS;
const voteContract = new web3.eth.Contract(contractABI, contractAddress);
const secretKey = process.env.SECRET_KEY.padEnd(32, '0'); // Pad the key to 32 bytes
//check for secret Key
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}


//get votes from blockchain
export const GetVotes = async (req, res) => {
    try {
      const voteCount = await voteContract.methods.getVoteCount().call();
  
      let votes = [];
      for (let i = 0; i < voteCount; i++) {
        const vote = await voteContract.methods.votes(i).call();
        votes.push({
          encryptedVote: vote.encryptedVote,
          hashNIC: vote.hashNIC,
          hashFingerPrint: vote.hashFingerPrint
        });
      }
  
      res.status(200).json({ votes });
      return votes;
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


//add votes to blockchain
export const sendVote =  async (req, res) => {
    try {
      const { hashNIC, hashFingerPrint, encryptedVote } = req.body;
      console.log("NIC", hashNIC);
      console.log("FIngerPrint", hashFingerPrint);
      console.log("encryptedVote", encryptedVote);
  
      if (!hashNIC || !hashFingerPrint || !encryptedVote) {
        console.error('Missing data');
        return; // Stop further execution if values are missing
      }
  
      const combinedValues = hashNIC + hashFingerPrint + encryptedVote;
      
      const cryptographicKey = hmacSha256(secretKey, combinedValues);
      console.log("cryptographicKey:", cryptographicKey);

      const encryptedKey = encrypt(combinedValues, secretKey);
      console.log("encryptedKey:", encryptedKey);
  
      const encryptedData = toBytes32(encryptedKey.encryptedData);
      console.log("encryptedData:", encryptedData);
  
      const Decodekey = toBytes32(encryptedKey.iv);
      console.log("Decodekey: ", Decodekey);
  
      const accounts = await web3.eth.getAccounts();
  
      await voteContract.methods
        .addVote(cryptographicKey, encryptedData, Decodekey)
        .send({
          from: accounts[0],
          gas: 500000
        });
  
      res.status(200).json({ message: 'Vote added to blockchain' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
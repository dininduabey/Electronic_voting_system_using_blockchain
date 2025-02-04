const Web3 = require("web3");
require("dotenv").config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.GANACHE_RPC_URL));
const contractABI = require("../blockchain/build/contracts/Voting.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

const votingContract = new web3.eth.Contract(contractABI.abi, contractAddress);

module.exports = { web3, votingContract };

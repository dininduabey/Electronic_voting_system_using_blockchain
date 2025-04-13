export const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": false, "name": "cryptographicKey", "type": "bytes32" },
        { "indexed": false, "name": "encryptedData", "type": "bytes32" },
        { "indexed": false, "name": "Decodekey", "type": "bytes32" }
      ],
      "name": "VoteAdded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        { "internalType": "address", "name": "", "type": "address" }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "name": "votes",
      "outputs": [
        { "internalType": "bytes32", "name": "cryptographicKey", "type": "bytes32" },
        { "internalType": "bytes32", "name": "encryptedData", "type": "bytes32" },
        { "internalType": "bytes32", "name": "Decodekey", "type": "bytes32" }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "_cryptographicKey", "type": "bytes32" },
        { "internalType": "bytes32", "name": "_encryptedData", "type": "bytes32" },
        { "internalType": "bytes32", "name": "_Decodekey", "type": "bytes32" }
      ],
      "name": "addVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVoteCount",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];


const { votingContract, web3 } = require("../config/blockchain");
const { encryptData } = require("../utils/encryption");
const { logBlockchainTransaction } = require("../middleware/blockchainLogger");

// ✅ Function to Cast a Vote & Log Blockchain Transaction
exports.castVote = async (req, res) => {
    try {
        const { nic, fingerprint, candidateId } = req.body;

        // Encrypt vote (Candidate ID) & generate a cryptographic key (NIC + Fingerprint)
        const encryptedVote = encryptData({ candidateId });
        const cryptographicKey = web3.utils.keccak256(nic + fingerprint);

        // Get blockchain account to send transaction
        const accounts = await web3.eth.getAccounts();
        
        // Execute vote transaction on the blockchain
        const tx = await votingContract.methods.castVote(encryptedVote, cryptographicKey)
            .send({ from: accounts[0], gas: 3000000 });

        // ✅ Log blockchain transaction for monitoring
        logBlockchainTransaction(tx.transactionHash, accounts[0]);

        res.status(201).json({ message: "✅ Vote cast successfully", transactionHash: tx.transactionHash });
    } catch (err) {
        res.status(500).json({ message: "❌ Vote casting failed", error: err.message });
    }
};

// ✅ Function to Get Total Vote Count (Election Results)
exports.getVoteCount = async (req, res) => {
    try {
        const voteCount = await votingContract.methods.getVoteCount().call();
        res.json({ totalVotes: voteCount });
    } catch (err) {
        res.status(500).json({ message: "❌ Failed to retrieve vote count", error: err.message });
    }
};

const { votingContract, web3 } = require("../config/blockchain");

exports.preventDoubleVoting = async (req, res, next) => {
    const { nic, fingerprint } = req.body;
    const cryptographicKey = web3.utils.keccak256(nic + fingerprint);

    const hasVoted = await votingContract.methods.hasVoted(cryptographicKey).call();
    if (hasVoted) {
        return res.status(403).json({ message: "❌ Voter has already voted" });
    }
    next();
};

const Voter = require("../models/Voter");
const { encryptData, decryptData } = require("../utils/encryption");
const bcrypt = require("bcrypt");

// Register Voter
exports.registerVoter = async (req, res) => {
    try {
        const { nic, fullName, dob, fingerprint } = req.body;
        const encryptedData = encryptData({ nic, fullName, dob });
        const fingerprintHash = await bcrypt.hash(fingerprint, 10);

        const newVoter = new Voter({ encrypted_data: encryptedData, fingerprint_hash: fingerprintHash });
        await newVoter.save();

        res.status(201).json({ message: "✅ Voter registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// Get All Voters
exports.getVoters = async (req, res) => {
    try {
        const voters = await Voter.find();
        const decryptedVoters = voters.map(voter => decryptData(voter.encrypted_data));

        res.json(decryptedVoters);
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// Update Voter
exports.updateVoter = async (req, res) => {
    try {
        const { voterId } = req.params;
        const { nic, fullName, dob } = req.body;
        const encryptedData = encryptData({ nic, fullName, dob });

        await Voter.findByIdAndUpdate(voterId, { encrypted_data: encryptedData });

        res.json({ message: "✅ Voter updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// Delete Voter
exports.deleteVoter = async (req, res) => {
    try {
        const { voterId } = req.params;
        await Voter.findByIdAndDelete(voterId);
        res.json({ message: "✅ Voter deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

const Candidate = require("../models/Candidate");
const { encryptData, decryptData } = require("../utils/encryption");

// Add Candidate
exports.addCandidate = async (req, res) => {
    try {
        const { fullName, nic, gender, dob, party, symbol_url, photo_url } = req.body;
        const encryptedData = encryptData({ fullName, nic, gender, dob, party });

        const newCandidate = new Candidate({ encrypted_data: encryptedData, symbol_url, photo_url });
        await newCandidate.save();

        res.status(201).json({ message: "✅ Candidate added successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// Get All Candidates
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        const decryptedCandidates = candidates.map(candidate => ({
            ...decryptData(candidate.encrypted_data),
            symbol_url: candidate.symbol_url,
            photo_url: candidate.photo_url
        }));

        res.json(decryptedCandidates);
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// Update Candidate
exports.updateCandidate = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const { fullName, nic, gender, dob, party, symbol_url, photo_url } = req.body;
        const encryptedData = encryptData({ fullName, nic, gender, dob, party });

        await Candidate.findByIdAndUpdate(candidateId, { encrypted_data: encryptedData, symbol_url, photo_url });

        res.json({ message: "✅ Candidate updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// Delete Candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const { candidateId } = req.params;
        await Candidate.findByIdAndDelete(candidateId);
        res.json({ message: "✅ Candidate deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

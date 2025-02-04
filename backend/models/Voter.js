const mongoose = require("mongoose");
const voterSchema = new mongoose.Schema({
    encrypted_data: { type: String, required: true },
    fingerprint_hash: { type: String, required: true, unique: true }
});
module.exports = mongoose.model("Voter", voterSchema);

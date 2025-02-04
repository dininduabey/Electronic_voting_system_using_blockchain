const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema({
    encrypted_data: { type: String, required: true },
    photo_url: { type: String },
    symbol_url: { type: String }
});
module.exports = mongoose.model("Candidate", candidateSchema);
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    nic_hash: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ["Register Candidates", "Register Voters", "Monitoring Results"], required: true }
});
module.exports = mongoose.model("Admin", adminSchema);

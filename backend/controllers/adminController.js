const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Register a New Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { username, nic, password, role } = req.body;
        const hashedNIC = await bcrypt.hash(nic, 10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({ username, nic_hash: hashedNIC, password_hash: hashedPassword, role });
        await admin.save();

        res.status(201).json({ message: "✅ Admin registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

// ✅ Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { username, nic, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin) return res.status(404).json({ message: "❌ Admin not found" });

        const isNICValid = await bcrypt.compare(nic, admin.nic_hash);
        const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

        if (!isNICValid || !isPasswordValid) return res.status(401).json({ message: "❌ Invalid credentials" });

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "❌ Server Error", error: err.message });
    }
};

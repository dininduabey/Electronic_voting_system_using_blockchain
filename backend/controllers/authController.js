const speakeasy = require("speakeasy");
const { sendOTP } = require("../config/email");

const otpStorage = {}; // Temporary OTP storage (use Redis for production)

exports.generateOTP = async (req, res) => {
    const { email } = req.body;
    const otp = speakeasy.totp({ secret: process.env.OTP_SECRET, encoding: "base32" });
    
    otpStorage[email] = otp;
    setTimeout(() => delete otpStorage[email], 5 * 60 * 1000); // Expire after 5 minutes

    await sendOTP(email, otp);
    res.json({ message: "OTP sent successfully" });
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (otpStorage[email] && otpStorage[email] === otp) {
        delete otpStorage[email]; // Remove OTP after use
        res.json({ message: "✅ OTP verified" });
    } else {
        res.status(401).json({ message: "❌ Invalid or expired OTP" });
    }
};

exports.loginAdmin = async (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });
    res.json({ message: "✅ Login successful" });
};
const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const router = express.Router();
const { validateAdminLogin } = require("../middleware/validation");
const { logAdminActivity } = require("../middleware/activityLogger");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/login", validateAdminLogin, loginAdmin);
router.use(logAdminActivity); // Logs every admin action

module.exports = router;
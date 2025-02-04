const { body } = require("express-validator");

exports.validateAdminLogin = [
    body("username").trim().escape(),
    body("nic").trim().escape(),
    body("password").isLength({ min: 6 })
];

exports.validateVoterRegistration = [
    body("nic").trim().escape(),
    body("fullName").trim().escape(),
    body("dob").isDate(),
    body("fingerprint").notEmpty()
];

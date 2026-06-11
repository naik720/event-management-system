const express = require('express');
const router = express.Router();
const { register, login, google, sendOtp, verifyOtpAndReset, debugGetOtp } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.post('/send-otp', sendOtp);
router.post('/verify-otp-reset', verifyOtpAndReset);
router.get('/debug/otp', debugGetOtp);

module.exports = router;

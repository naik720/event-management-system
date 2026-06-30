const express = require('express');
const router = express.Router();
const { register, login, google, sendOtp, verifyOtpAndReset, debugGetOtp, verifyEmail } = require('../controllers/authController');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.post('/send-otp', sendOtp);
router.post('/verify-otp-reset', verifyOtpAndReset);
router.get('/debug/otp', debugGetOtp);

// Handle the token parameter cleanly
router.get('/verify-email/:token', verifyEmail);

// --- TEMPORARY GLOBAL CLEANER ROUTE ---
router.get('/clear-all-test-data', async (req, res) => {
    try {
        const targetEmail = "bhatkeerti473@gmail.com";
        const result = await User.deleteMany({
            email: { $regex: new RegExp("^" + targetEmail.trim(), "i") }
        });
        return res.json({ message: `Successfully cleared out ${result.deletedCount} instance(s) from the database.` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// --- TEMPORARY MASTER RESET ROUTE ---
router.get('/nuke-all-users-database', async (req, res) => {
    try {
        const result = await User.deleteMany({});
        return res.json({ message: `Success! Wiped out all ${result.deletedCount} users from the database.` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
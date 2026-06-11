const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');

const VISUAL_BACKEND_PATH = path.join(__dirname, '../visual-backend-users.json');

function saveUserToVisualBackend(user) {
  let users = [];
  if (fs.existsSync(VISUAL_BACKEND_PATH)) {
    users = JSON.parse(fs.readFileSync(VISUAL_BACKEND_PATH, 'utf-8'));
  }
  users.push(user);
  fs.writeFileSync(VISUAL_BACKEND_PATH, JSON.stringify(users, null, 2));
}

// In-memory OTP store for demo / development (email -> { code, expires })
const OTP_STORE = {};

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getTransporter() {
  // Use env variables for SMTP config
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  });
}

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const otp = generateOtp();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
    OTP_STORE[email.trim().toLowerCase()] = { code: otp, expires };

    const transporter = getTransporter();
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com';

    if (transporter) {
      const info = await transporter.sendMail({
        from,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is: ${otp}. It expires in 10 minutes.`,
        html: `<p>Your verification code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
      });

      // Attempt to get preview URL if available (some transports provide it)
      const previewUrl = nodemailer.getTestMessageUrl(info) || null;
      return res.json({ success: true, message: 'Verification code sent to email', previewUrl });
    }

    // If transporter not configured, fallback to Ethereal test account for development
    try {
      const testAccount = await nodemailer.createTestAccount();
      const etherealTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });

      const info = await etherealTransporter.sendMail({
        from,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is: ${otp}. It expires in 10 minutes.`,
        html: `<p>Your verification code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info) || null;
      return res.json({ success: true, message: 'Verification code sent via test SMTP', previewUrl });
    } catch (err) {
      console.warn('SMTP not configured and Ethereal fallback failed; OTP stored in memory for demo', err);
      return res.json({ success: true, message: 'Verification code generated (SMTP not configured on server).' });
    }
  } catch (err) {
    console.error('sendOtp error', err);
    return res.status(500).json({ success: false, message: 'Failed to send verification code' });
  }
};

exports.verifyOtpAndReset = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) return res.status(400).json({ success: false, message: 'Missing parameters' });

    const key = email.trim().toLowerCase();
    const record = OTP_STORE[key];
    if (!record) return res.status(400).json({ success: false, message: 'No verification code found. Please request a new code.' });
    if (Date.now() > record.expires) {
      delete OTP_STORE[key];
      return res.status(400).json({ success: false, message: 'Verification code expired. Please request a new code.' });
    }
    if (record.code !== String(code)) return res.status(400).json({ success: false, message: 'Invalid verification code.' });

    // find user and update password
    const user = await User.findOne({ email: key });
    if (!user) return res.status(400).json({ success: false, message: 'No user found for this email.' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    delete OTP_STORE[key];

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    console.error('verifyOtpAndReset error', err);
    return res.status(500).json({ success: false, message: 'Failed to verify code' });
  }
};

// Dev-only: retrieve stored OTP for a given email (only when not in production)
exports.debugGetOtp = (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'Not allowed in production' });
  }

  const email = (req.query.email || '').trim().toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: 'email query param required' });

  const record = OTP_STORE[email];
  if (!record) return res.status(404).json({ success: false, message: 'No OTP found' });

  return res.json({ success: true, otp: record.code, expiresAt: record.expires });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Save to visual backend file (without password hash)
    saveUserToVisualBackend({ name, email });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo || null,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.google = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    // 1. Fetch the user's profile information from Google using the frontend access_token
    const googleProfileResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

    if (!googleProfileResponse.ok) {
      return res.status(400).json({ success: false, message: 'Invalid Google access token' });
    }

    const googleUser = await googleProfileResponse.json();
    // googleUser now correctly contains { email, name, picture } of the actual logged-in user!

    // 2. Check if user exists in your MongoDB database
    let user = await User.findOne({ email: googleUser.email });

    // 3. If user doesn't exist, create a new one automatically
    if (!user) {
      user = new User({
        name: googleUser.name || 'Google User',
        email: googleUser.email,
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random fallback password
      });
      await user.save();
      saveUserToVisualBackend({ name: user.name, email: user.email });
    }

    // 4. Generate your local app JWT token
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 5. Send back response matching BOTH 'id' and '_id' layouts to prevent frontend breaking
    res.json({
      success: true,
      token: jwtToken,
      user: {
        _id: user._id, // Added for Mongoose Schema binding compatibility
        id: user._id,
        name: user.name,
        email: user.email,
        photo: googleUser.picture || null,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error.message);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

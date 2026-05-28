const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

const VISUAL_BACKEND_PATH = path.join(__dirname, '../visual-backend-users.json');

function saveUserToVisualBackend(user) {
  let users = [];
  if (fs.existsSync(VISUAL_BACKEND_PATH)) {
    users = JSON.parse(fs.readFileSync(VISUAL_BACKEND_PATH, 'utf-8'));
  }
  users.push(user);
  fs.writeFileSync(VISUAL_BACKEND_PATH, JSON.stringify(users, null, 2));
}

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
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
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
      },
    });
  } catch (error) {
    console.error('Google auth error:', error.message);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

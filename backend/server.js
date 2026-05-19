const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Login API
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "123456"
  ) {

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: "sample_token_123",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Email or Password",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
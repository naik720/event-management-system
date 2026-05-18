const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.json({
      success: true,
      message: "Login Success",
    });
  } else {
    res.json({
      success: false,
      message: "Invalid Credentials",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
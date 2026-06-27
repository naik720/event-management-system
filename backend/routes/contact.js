const express = require("express");

const router = express.Router();

const contactMessages = [];

router.post("/", (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const subject = String(req.body?.subject || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, subject, and message are required.",
    });
  }

  const record = {
    id: `msg_${Date.now()}`,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  contactMessages.unshift(record);

  return res.status(201).json({
    success: true,
    message: "Message sent successfully. We will contact you soon.",
    contactId: record.id,
  });
});

router.get("/debug", (req, res) => {
  res.json(contactMessages);
});

module.exports = router;

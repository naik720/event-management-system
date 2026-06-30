const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

function getTransporter() {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All contact form fields are required.",
      });
    }

    const transporter = getTransporter();
    const recipient =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.EMAIL_USER ||
      process.env.SMTP_USER ||
      "no-reply@example.com";

    if (transporter) {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER,
        to: recipient,
        replyTo: email,
        subject: `Contact form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br />${message.replace(/\n/g, "<br />")}</p>
        `,
      });
    } else {
      console.log("[CONTACT FORM]", { name, email, subject, message });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks for reaching out. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send your message.",
    });
  }
});

module.exports = router;

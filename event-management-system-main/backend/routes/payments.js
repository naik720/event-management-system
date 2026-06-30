const crypto = require("crypto");
const express = require("express");

const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Transaction = require("../models/Transaction");
const { createInvoiceForBooking, markInvoicePaid } = require("../services/billingService");

const router = express.Router();

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(value) || 0);

const getInvoice = async (invoiceId) => {
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    const error = new Error("Invoice not found");
    error.statusCode = 404;
    throw error;
  }
  return invoice;
};

const createRazorpayOrder = async ({ amount, currency, receipt }) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    const error = new Error("Razorpay test keys are not configured on the backend");
    error.statusCode = 400;
    throw error;
  }

  const authToken = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt,
      payment_capture: 1,
    }),
  });

  const order = await response.json();
  if (!response.ok) {
    const error = new Error(order.error?.description || "Unable to create Razorpay order");
    error.statusCode = response.status;
    throw error;
  }

  return { keyId, order };
};

const escapePdfText = (text) => String(text || "").replace(/[()\\]/g, "\\$&");

const formatPdfAmount = (value) => `INR ${Number(value || 0).toFixed(2)}`;

const buildInvoicePdf = (invoice) => {
  const lines = [
    "Event Management System",
    `Invoice: ${invoice.invoiceNumber}`,
    `Receipt: ${invoice.receiptNumber || "Not generated"}`,
    `Client: ${invoice.clientName || "Client"}`,
    `Email: ${invoice.clientEmail || "Not added"}`,
    `Event: ${invoice.eventTitle || "Event booking"}`,
    `Venue: ${invoice.venueName || "Venue"}`,
    `Event Date: ${invoice.eventDate || "Not set"}`,
    `Base Amount: ${formatPdfAmount(invoice.baseAmount)}`,
    `GST (${invoice.taxRate}%): ${formatPdfAmount(invoice.taxAmount)}`,
    `Total: ${formatPdfAmount(invoice.totalAmount)}`,
    `Paid: ${formatPdfAmount(invoice.paidAmount)}`,
    `Status: ${invoice.status}`,
  ];

  const text = lines
    .map((line, index) => `BT /F1 12 Tf 50 ${780 - index * 24} Td (${escapePdfText(line)}) Tj ET`)
    .join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(text)} >>\nstream\n${text}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf);
};

router.get("/", async (req, res) => {
  try {
    const [invoices, payments, transactions] = await Promise.all([
      Invoice.find().sort({ createdAt: -1 }).limit(100),
      Payment.find().sort({ createdAt: -1 }).limit(100),
      Transaction.find().sort({ createdAt: -1 }).limit(100),
    ]);

    res.json({ invoices, payments, transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to load billing records", error: error.message });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [invoices, payments, dailyTransactions, transactions] = await Promise.all([
      Invoice.find(),
      Payment.find().sort({ createdAt: -1 }).limit(20),
      Transaction.find({ createdAt: { $gte: today } }).sort({ createdAt: -1 }),
      Transaction.find().sort({ createdAt: -1 }).limit(50),
    ]);

    const paidRevenue = invoices.reduce((sum, invoice) => sum + (Number(invoice.paidAmount) || 0), 0);
    const pendingAmount = invoices.reduce((sum, invoice) => {
      if (invoice.status === "Paid") return sum;
      return sum + Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount || 0), 0);
    }, 0);

    res.json({
      summary: {
        totalRevenue: paidRevenue,
        pendingAmount,
        invoiceCount: invoices.length,
        paidInvoiceCount: invoices.filter((invoice) => invoice.status === "Paid").length,
        pendingInvoiceCount: invoices.filter((invoice) => invoice.status !== "Paid").length,
        dailyTransactionCount: dailyTransactions.length,
      },
      payments,
      dailyTransactions,
      transactions,
      invoices: invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load billing dashboard", error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const [invoices, payments, transactions] = await Promise.all([
      Invoice.find({ userId }).sort({ createdAt: -1 }),
      Payment.find({ userId }).sort({ createdAt: -1 }),
      Transaction.find({ userId }).sort({ createdAt: -1 }),
    ]);

    res.json({ invoices, payments, transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to load user billing records", error: error.message });
  }
});

router.post("/invoices/generate", async (req, res) => {
  try {
    const invoice = await createInvoiceForBooking(req.body.bookingId, req.body.baseAmount);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: "Failed to generate invoice", error: error.message });
  }
});

router.get("/invoices/:invoiceId/pdf", async (req, res) => {
  try {
    const invoice = await getInvoice(req.params.invoiceId);
    const pdf = buildInvoicePdf(invoice);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${invoice.invoiceNumber}.pdf"`);
    res.send(pdf);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: "Failed to generate invoice PDF", error: error.message });
  }
});

router.post("/razorpay/order", async (req, res) => {
  try {
    const invoice = await getInvoice(req.body.invoiceId);
    const amountDue = Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount || 0), 0);

    if (amountDue <= 0) {
      return res.status(400).json({ message: "Invoice is already paid" });
    }

    const { keyId, order } = await createRazorpayOrder({
      amount: amountDue,
      currency: invoice.currency,
      receipt: invoice.invoiceNumber,
    });

    const payment = await Payment.create({
      invoiceId: invoice._id,
      bookingId: invoice.bookingId,
      userId: invoice.userId,
      amount: amountDue,
      currency: invoice.currency,
      method: "Razorpay",
      status: "Pending",
      razorpayOrderId: order.id,
    });

    await Transaction.create({
      invoiceId: invoice._id,
      paymentId: payment._id,
      bookingId: invoice.bookingId,
      userId: invoice.userId,
      type: "Payment Created",
      amount: amountDue,
      status: "Pending",
      description: `Razorpay order created for ${invoice.invoiceNumber}`,
      metadata: { razorpayOrderId: order.id },
    });

    res.status(201).json({ keyId, order, payment });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: "Failed to create Razorpay order", error: error.message });
  }
});

router.post("/razorpay/verify", async (req, res) => {
  try {
    const { invoiceId, razorpay_order_id, razorpay_payment_id, razorpay_signature, method } = req.body;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return res.status(400).json({ message: "Razorpay key secret is not configured" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    const invoice = await getInvoice(invoiceId);
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, invoiceId: invoice._id });

    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.method = method || "Razorpay";

    if (!isValid) {
      payment.status = "Failed";
      await payment.save();
      await Transaction.create({
        invoiceId: invoice._id,
        paymentId: payment._id,
        bookingId: invoice.bookingId,
        userId: invoice.userId,
        type: "Payment Failed",
        amount: payment.amount,
        status: "Failed",
        description: `Razorpay signature verification failed for ${invoice.invoiceNumber}`,
      });
      return res.status(400).json({ message: "Invalid Razorpay payment signature" });
    }

    const result = await markInvoicePaid({
      invoice,
      payment,
      method: payment.method,
      metadata: { razorpay_order_id, razorpay_payment_id },
    });

    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: "Failed to verify payment", error: error.message });
  }
});

router.post("/cash", async (req, res) => {
  try {
    const invoice = await getInvoice(req.body.invoiceId);
    const amountDue = Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount || 0), 0);

    if (amountDue <= 0) {
      return res.status(400).json({ message: "Invoice is already paid" });
    }

    const payment = await Payment.create({
      invoiceId: invoice._id,
      bookingId: invoice.bookingId,
      userId: invoice.userId,
      amount: amountDue,
      currency: invoice.currency,
      method: "Cash",
      status: "Pending",
      notes: req.body.notes || "",
    });

    const result = await markInvoicePaid({ invoice, payment, method: "Cash" });
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: "Failed to record cash payment", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Failed to load payment", error: error.message });
  }
});

module.exports = router;

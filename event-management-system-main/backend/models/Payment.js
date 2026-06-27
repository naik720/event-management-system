const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    method: {
      type: String,
      enum: ["Cash", "UPI", "Debit/Credit Card", "Net Banking", "Razorpay"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Created", "Pending", "Paid", "Failed"],
      default: "Created",
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    receiptNumber: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);

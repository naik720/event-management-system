import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CreditCard, Download, FileText, ReceiptText, WalletCards } from "lucide-react";

import Sidebar from "../styles/components/Sidebar";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";
import {
  createRazorpayOrder,
  getInvoicePdfUrl,
  getUserBilling,
  recordCashPayment,
  verifyRazorpayPayment,
} from "../services/userApi";
import "../styles/dashboard.css";

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const loadRazorpayCheckout = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Unable to load Razorpay checkout"));
    document.body.appendChild(script);
  });

const Payments = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);
  const userId = currentClient.id || currentClient._id || currentClient.userId || "guest";
  const [billing, setBilling] = useState({ invoices: [], payments: [], transactions: [] });
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvoiceId, setActiveInvoiceId] = useState("");
  const [message, setMessage] = useState("");

  const loadBilling = useCallback(() => {
    setIsLoading(true);
    getUserBilling(userId)
      .then(setBilling)
      .catch(() => setBilling({ invoices: [], payments: [], transactions: [] }))
      .finally(() => setIsLoading(false));
  }, [userId]);

  useEffect(() => {
    loadBilling();
  }, [loadBilling]);

  const totals = useMemo(() => {
    const paid = billing.invoices.reduce((sum, invoice) => sum + (Number(invoice.paidAmount) || 0), 0);
    const pending = billing.invoices.reduce((sum, invoice) => {
      if (invoice.status === "Paid") return sum;
      return sum + Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount || 0), 0);
    }, 0);

    return {
      paid,
      pending,
      receipts: billing.invoices.filter((invoice) => invoice.receiptNumber).length,
    };
  }, [billing.invoices]);

  const handleOnlinePayment = async (invoice) => {
    try {
      setActiveInvoiceId(invoice._id);
      setMessage("");
      await loadRazorpayCheckout();
      const { keyId, order } = await createRazorpayOrder(invoice._id);

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Event Management System",
        description: invoice.eventTitle,
        order_id: order.id,
        prefill: {
          name: clientName,
          email: currentClient.email || invoice.clientEmail || "",
          contact: currentClient.phone || "",
        },
        method: {
          upi: selectedMethod === "UPI",
          card: selectedMethod === "Debit/Credit Card",
          netbanking: selectedMethod === "Net Banking",
        },
        handler: async (response) => {
          await verifyRazorpayPayment({
            invoiceId: invoice._id,
            method: selectedMethod,
            ...response,
          });
          setMessage("Payment successful. Receipt generated.");
          loadBilling();
        },
        theme: {
          color: "#0f766e",
        },
      });

      checkout.open();
    } catch (error) {
      setMessage(error.message || "Payment could not be started.");
    } finally {
      setActiveInvoiceId("");
    }
  };

  const handleCashPayment = async (invoice) => {
    try {
      setActiveInvoiceId(invoice._id);
      await recordCashPayment(invoice._id, "Cash payment recorded from client dashboard");
      setMessage("Cash payment recorded. Receipt generated.");
      loadBilling();
    } catch (error) {
      setMessage(error.message || "Unable to record cash payment.");
    } finally {
      setActiveInvoiceId("");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content client-module-content">
        <section className="profile-title-bar">
          <div>
            <h1>Payments & Billing</h1>
            <p>Client Dashboard &gt; Invoices, payments, and receipts</p>
          </div>
          <button type="button" className="profile-edit-button" onClick={loadBilling}>
            <Download size={16} />
            Refresh
          </button>
        </section>

        <section className="client-detail-strip">
          <article>
            <p>Client Name</p>
            <strong>{clientName}</strong>
          </article>
          <article>
            <p>Contact Information</p>
            <strong>{currentClient.email || "Not added"}</strong>
          </article>
          <article>
            <p>Invoices</p>
            <strong>{billing.invoices.length} records</strong>
          </article>
          <article>
            <p>Total Paid</p>
            <strong>{formatINR(totals.paid)}</strong>
          </article>
        </section>

        {message && <p className="profile-save-message">{message}</p>}

        <section className="booking-stats-grid">
          <article className="booking-stat-card booking-stat-green">
            <span>
              <WalletCards size={22} />
            </span>
            <div>
              <h2>{formatINR(totals.paid)}</h2>
              <h3>Revenue Paid</h3>
              <p>Completed receipts</p>
            </div>
          </article>
          <article className="booking-stat-card booking-stat-orange">
            <span>
              <CreditCard size={22} />
            </span>
            <div>
              <h2>{formatINR(totals.pending)}</h2>
              <h3>Pending Payments</h3>
              <p>Awaiting settlement</p>
            </div>
          </article>
          <article className="booking-stat-card booking-stat-blue">
            <span>
              <ReceiptText size={22} />
            </span>
            <div>
              <h2>{String(totals.receipts).padStart(2, "0")}</h2>
              <h3>Receipts</h3>
              <p>Generated after payment</p>
            </div>
          </article>
        </section>

        <section className="profile-panel">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2>Invoices</h2>
            <label className="text-sm font-semibold text-slate-700">
              Payment method
              <select
                value={selectedMethod}
                onChange={(event) => setSelectedMethod(event.target.value)}
                className="ml-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option>UPI</option>
                <option>Debit/Credit Card</option>
                <option>Net Banking</option>
                <option>Cash</option>
              </select>
            </label>
          </div>

          <div className="module-table billing-table mt-4">
            <div className="module-table-row module-table-head">
              <span>Invoice</span>
              <span>Booking</span>
              <span>GST</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            {isLoading && <p className="booking-empty">Loading invoices...</p>}
            {!isLoading && billing.invoices.length === 0 && <p className="booking-empty">No invoices generated yet.</p>}

            {billing.invoices.map((invoice) => (
              <div className="module-table-row" key={invoice._id}>
                <span>
                  {invoice.invoiceNumber}
                  <small>{invoice.eventTitle}</small>
                </span>
                <span>{String(invoice.bookingId).slice(-8)}</span>
                <span>
                  {formatINR(invoice.taxAmount)}
                  <small>{invoice.taxRate}% GST</small>
                </span>
                <span>{formatINR(invoice.totalAmount)}</span>
                <span className={`module-status ${invoice.status === "Paid" ? "paid" : "pending"}`}>
                  {invoice.status}
                </span>
                <span className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                    onClick={() => window.open(getInvoicePdfUrl(invoice._id), "_blank")}
                  >
                    <FileText size={14} />
                  </button>
                  {invoice.status !== "Paid" && selectedMethod === "Cash" && (
                    <button
                      type="button"
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                      disabled={activeInvoiceId === invoice._id}
                      onClick={() => handleCashPayment(invoice)}
                    >
                      Record Cash
                    </button>
                  )}
                  {invoice.status !== "Paid" && selectedMethod !== "Cash" && (
                    <button
                      type="button"
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                      disabled={activeInvoiceId === invoice._id}
                      onClick={() => handleOnlinePayment(invoice)}
                    >
                      Pay Now
                    </button>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-panel">
          <h2>Payment History</h2>
          <div className="module-table billing-history-table">
            <div className="module-table-row module-table-head">
              <span>Payment ID</span>
              <span>Method</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Receipt</span>
            </div>
            {billing.payments.map((payment) => (
              <div className="module-table-row" key={payment._id}>
                <span>{payment.razorpayPaymentId || payment._id.slice(-8)}</span>
                <span>{payment.method}</span>
                <span>{formatINR(payment.amount)}</span>
                <span className={`module-status ${payment.status === "Paid" ? "paid" : "pending"}`}>{payment.status}</span>
                <span>{payment.receiptNumber || "Pending"}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Payments;

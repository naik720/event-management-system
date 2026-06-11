import React from "react";
import { CreditCard, Download, ReceiptText, WalletCards } from "lucide-react";

import Sidebar from "../styles/components/Sidebar";
import { getClientDisplayName, getCurrentClient } from "../services/clientSession";
import "../styles/dashboard.css";

const paymentRecords = [
  {
    id: "PAY-1028",
    bookingId: "BK-2026-001",
    event: "Music Concert 2026",
    date: "May 25, 2026",
    amount: "$320.00",
    method: "Credit Card",
    status: "Paid",
  },
  {
    id: "PAY-1027",
    bookingId: "BK-2026-002",
    event: "Tech Conference",
    date: "Jun 10, 2026",
    amount: "$450.00",
    method: "UPI",
    status: "Pending",
  },
  {
    id: "PAY-1026",
    bookingId: "BK-2026-003",
    event: "Design Workshop",
    date: "Jun 18, 2026",
    amount: "$180.00",
    method: "Debit Card",
    status: "Paid",
  },
];

const Payments = () => {
  const currentClient = getCurrentClient();
  const clientName = getClientDisplayName(currentClient);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content client-module-content">
        <section className="profile-title-bar">
          <div>
            <h1>Payment Records</h1>
            <p>Client Dashboard &gt; Payment History</p>
          </div>
          <button type="button" className="profile-edit-button">
            <Download size={16} />
            Export Records
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
            <p>Payment Records</p>
            <strong>3 transactions</strong>
          </article>
          <article>
            <p>Total Paid</p>
            <strong>$500.00</strong>
          </article>
        </section>

        <section className="booking-stats-grid">
          <article className="booking-stat-card booking-stat-green">
            <span>
              <WalletCards size={22} />
            </span>
            <div>
              <h2>$500</h2>
              <h3>Paid Amount</h3>
              <p>Completed payment records</p>
            </div>
          </article>
          <article className="booking-stat-card booking-stat-orange">
            <span>
              <CreditCard size={22} />
            </span>
            <div>
              <h2>$450</h2>
              <h3>Pending Amount</h3>
              <p>Awaiting payment confirmation</p>
            </div>
          </article>
          <article className="booking-stat-card booking-stat-blue">
            <span>
              <ReceiptText size={22} />
            </span>
            <div>
              <h2>03</h2>
              <h3>Payment Receipts</h3>
              <p>Linked to booking history</p>
            </div>
          </article>
        </section>

        <section className="profile-panel">
          <h2>Payment History</h2>
          <div className="module-table">
            <div className="module-table-row module-table-head">
              <span>Payment ID</span>
              <span>Booking</span>
              <span>Event</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {paymentRecords.map((record) => (
              <div className="module-table-row" key={record.id}>
                <span>{record.id}</span>
                <span>{record.bookingId}</span>
                <span>{record.event}<small>{record.date} · {record.method}</small></span>
                <span>{record.amount}</span>
                <span className={`module-status ${record.status.toLowerCase()}`}>{record.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Payments;

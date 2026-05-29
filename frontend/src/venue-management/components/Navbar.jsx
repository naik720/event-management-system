import React from "react";
import { Bell, ChevronDown, Menu, Plus, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="venue-topbar">
      <div className="venue-title-row">
        <button type="button" className="venue-icon-button" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <h1>Venue Management</h1>
      </div>

      <div className="venue-search">
        <Search size={16} />
        <input type="search" placeholder="Search venues, bookings, availability..." />
      </div>

      <div className="venue-top-actions">
        <button type="button" className="venue-icon-button notification-dot" aria-label="Notifications">
          <Bell size={18} />
          <span>4</span>
        </button>

        <div className="venue-admin">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
            alt="John Smith"
          />
          <div>
            <p>Welcome back,</p>
            <strong>John Smith</strong>
          </div>
          <ChevronDown size={16} />
        </div>

        <button type="button" className="venue-add-button">
          <Plus size={16} />
          Add New Venue
        </button>
      </div>
    </header>
  );
};

export default Navbar;

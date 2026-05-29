import React from "react";
import { Building2, CalendarCheck2, MapPin, Save, UsersRound, Wrench } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/venueDashboard.css";

const AddVenue = () => {
  return (
    <div className="venue-dashboard">
      <Sidebar />
      <main className="venue-main">
        <Navbar />
        <div className="venue-content">
          <section className="venue-card add-venue-card">
            <div className="venue-card-header">
              <div>
                <h2>Add New Venue</h2>
                <p>Create venue records with type, capacity, location, availability, and maintenance details.</p>
              </div>
            </div>

            <form className="venue-form">
              <label>
                <span>Venue Name</span>
                <div>
                  <Building2 size={16} />
                  <input placeholder="Royal Banquet Hall" required />
                </div>
              </label>

              <label>
                <span>Venue Type</span>
                <div>
                  <Building2 size={16} />
                  <select defaultValue="Banquet Hall">
                    <option>Banquet Hall</option>
                    <option>Conference Hall</option>
                    <option>Outdoor Venue</option>
                    <option>Auditorium</option>
                    <option>Wedding Hall</option>
                  </select>
                </div>
              </label>

              <label>
                <span>Seating Capacity</span>
                <div>
                  <UsersRound size={16} />
                  <input type="number" min="1" placeholder="800" required />
                </div>
              </label>

              <label>
                <span>Availability</span>
                <div>
                  <CalendarCheck2 size={16} />
                  <select defaultValue="Available">
                    <option>Available</option>
                    <option>Booked</option>
                    <option>Under Maintenance</option>
                  </select>
                </div>
              </label>

              <label className="venue-form-wide">
                <span>Location</span>
                <div>
                  <MapPin size={16} />
                  <input placeholder="New York, USA" required />
                </div>
              </label>

              <label className="venue-form-wide">
                <span>Maintenance Notes</span>
                <div>
                  <Wrench size={16} />
                  <input placeholder="Good condition, next inspection due May 30, 2026" />
                </div>
              </label>

              <button type="submit" className="venue-submit-button">
                <Save size={16} />
                Save Venue
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddVenue;

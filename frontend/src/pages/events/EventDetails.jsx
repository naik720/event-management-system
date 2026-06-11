import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventAPI from "../../services/eventApi";
import { ArrowLeft, ArrowRight, MapPin, Clock, Calendar } from "lucide-react";

function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. State values are now kept as actual JavaScript Date objects or null
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: "",
    venueName: "",
    venueAddress: "",
    venueCity: "",
    venueState: "",
    venueZipCode: "",
    venueCapacity: "",
    timezone: "UTC",
  });

  const [milestones, setMilestones] = useState([
    { title: "Venue Selection", dueDate: null, status: "Pending" },
    { title: "Vendor Confirmation", dueDate: null, status: "Pending" },
    { title: "Staff Assignment", dueDate: null, status: "Pending" },
    { title: "Event Execution", dueDate: null, status: "Pending" },
  ]);

  const fetchEventDetails = useCallback(async () => {
    try {
      const response = await eventAPI.getEventDetails(eventId);
      setEvent(response.data.event);
      if (response.data.schedule) {
        setFormData((prev) => ({
          ...prev,
          startDate: response.data.schedule.startDate ? new Date(response.data.schedule.startDate) : null,
          endDate: response.data.schedule.endDate ? new Date(response.data.schedule.endDate) : null,
          startTime: response.data.schedule.startTime || "",
          endTime: response.data.schedule.endTime || "",
          venueName: response.data.schedule.venue?.name || "",
          venueAddress: response.data.schedule.venue?.address || "",
          venueCity: response.data.schedule.venue?.city || "",
          venueState: response.data.schedule.venue?.state || "",
          venueZipCode: response.data.schedule.venue?.zipCode || "",
          venueCapacity: response.data.schedule.venue?.capacity || "",
          timezone: response.data.schedule.timezone || "UTC",
        }));
        if (response.data.schedule.milestones) {
          const formattedMilestones = response.data.schedule.milestones.map(m => ({
            ...m,
            dueDate: m.dueDate ? new Date(m.dueDate) : null
          }));
          setMilestones(formattedMilestones);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch event details");
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateInputValue = (date) => (date ? date.toISOString().slice(0, 10) : "");
  const parseDateInputValue = (value) => (value ? new Date(value) : null);

  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => {
      const updated = { ...prev, [fieldName]: date };

      // Auto-clear invalid combinations
      if (fieldName === "startDate" && updated.endDate && date > updated.endDate) {
        updated.endDate = null;
      }
      if (fieldName === "endDate" && updated.startDate && date < updated.startDate) {
        updated.startDate = null;
      }
      return updated;
    });
  };

  const handleMilestoneChange = (index, value) => {
    const updated = [...milestones];
    updated[index].dueDate = value;
    setMilestones(updated);
  };

  const handleSaveAndContinue = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.venueName
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Manual Form Submission Checks
    if (formData.startDate < today) {
      setError("Start Date cannot be in the past");
      return;
    }

    if (formData.startDate > formData.endDate) {
      setError("End Date cannot be earlier than the Start Date");
      return;
    }

    setLoading(true);
    try {
      await eventAPI.saveEventSchedule({
        eventId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: {
          name: formData.venueName,
          address: formData.venueAddress,
          city: formData.venueCity,
          state: formData.venueState,
          zipCode: formData.venueZipCode,
          capacity: parseInt(formData.venueCapacity) || 0,
        },
        timezone: formData.timezone,
        milestones: milestones.map((m) => ({
          ...m,
          dueDate: m.dueDate ? m.dueDate : undefined,
        })),
      });

      navigate(`/user/event-resources/${eventId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event schedule");
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 global-datepicker-dark">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <h1 className="text-4xl font-bold text-white">Event Details & Schedule</h1>
          </div>
          <p className="text-gray-300 text-center text-lg">
            Set dates, times, venue details, and key milestones for {event.title}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Date & Time Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Date & Time
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formatDateInputValue(formData.startDate)}
                  onChange={(e) => handleDateChange(parseDateInputValue(e.target.value), "startDate")}
                  min={formatDateInputValue(new Date())}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formatDateInputValue(formData.endDate)}
                  onChange={(e) => handleDateChange(parseDateInputValue(e.target.value), "endDate")}
                  min={formatDateInputValue(formData.startDate || new Date())}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>


            </div>
          </div>

          {/* Venue Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              Venue Details
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Venue Name *</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  placeholder="Enter venue name..."
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleInputChange}
                  placeholder="Street address..."
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="venueCity"
                    value={formData.venueCity}
                    onChange={handleInputChange}
                    placeholder="City..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    name="venueState"
                    value={formData.venueState}
                    onChange={handleInputChange}
                    placeholder="State..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Zip Code</label>
                  <input
                    type="text"
                    name="venueZipCode"
                    value={formData.venueZipCode}
                    onChange={handleInputChange}
                    placeholder="Zip code..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Capacity</label>
                  <input
                    type="number"
                    name="venueCapacity"
                    value={formData.venueCapacity}
                    onChange={handleInputChange}
                    placeholder="Max guests..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-slate-800/50 backdrop-blur p-6 rounded-lg border border-slate-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Key Milestones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <h4 className="text-white font-medium mb-3">{milestone.title}</h4>
                <input
                  type="date"
                  value={formatDateInputValue(milestone.dueDate)}
                  onChange={(e) => handleMilestoneChange(index, parseDateInputValue(e.target.value))}
                  min={formatDateInputValue(formData.startDate || new Date())}
                  max={formData.endDate ? formatDateInputValue(formData.endDate) : ""}
                  className="w-full bg-slate-600/50 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate(`/user/create-event`)}
            className="px-8 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-700/50 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleSaveAndContinue}
            disabled={loading}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "Saving..." : "Continue to Resources"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
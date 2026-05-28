import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventAPI from "../../services/eventApi";
import { ArrowRight, Heart, Briefcase, Users, Mic, Music, Image } from "lucide-react";

function EventCategory() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    {
      name: "Wedding",
      icon: Heart,
      description: "Ceremonies, receptions, and celebrations.",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Birthday Party",
      icon: Users,
      description: "Birthdays, reunions, and parties.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Corporate Event",
      icon: Briefcase,
      description: "Conferences, seminars, and networking.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Conference",
      icon: Mic,
      description: "Professional conferences and seminars.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      name: "Concert",
      icon: Music,
      description: "Live music performances and shows.",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Exhibition",
      icon: Image,
      description: "Art shows and exhibitions.",
      color: "from-green-500 to-teal-500",
    },
  ];

  const handleCreateEvent = async () => {
    if (!selectedCategory || !title.trim()) {
      setError("Please select a category and enter an event title");
      return;
    }

    setLoading(true);
    try {
      const response = await eventAPI.createEvent({
        title,
        category: selectedCategory,
        description,
      });

      const eventId = response.data.event._id;
      navigate(`/user/event-details/${eventId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <h1 className="text-4xl font-bold text-white">Select Event Category</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Choose a category to help us tailor your event creation experience.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Event Title Input */}
        <div className="mb-8 bg-slate-800/50 backdrop-blur p-6 rounded-lg border border-slate-700">
          <label className="block text-white font-semibold mb-2">Event Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your event title..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />
        </div>

        {/* Event Description Input */}
        <div className="mb-8 bg-slate-800/50 backdrop-blur p-6 rounded-lg border border-slate-700">
          <label className="block text-white font-semibold mb-2">Event Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your event..."
            rows="3"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                  isSelected
                    ? `border-purple-500 bg-gradient-to-br ${category.color} shadow-lg shadow-purple-500/50`
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-3 rounded-lg ${isSelected ? "bg-white/20" : "bg-slate-700"}`}
                  >
                    <Icon
                      className={`w-6 h-6 ${isSelected ? "text-white" : "text-purple-400"}`}
                    />
                  </div>
                  <h3 className={`font-semibold text-lg ${isSelected ? "text-white" : "text-white"}`}>
                    {category.name}
                  </h3>
                </div>
                <p className={`text-sm ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-700/50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateEvent}
            disabled={loading}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "Creating..." : "Next Step"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Highlight */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="text-purple-400">💡</span> Pro Tip
          </h4>
          <p className="text-gray-300">
            Your event details automatically sync with all team members and resource managers across your
            organization.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventCategory;

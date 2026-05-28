import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventAPI from "../../services/eventApi";
import { ArrowLeft, ArrowRight, Plus, Trash2, Users, Package } from "lucide-react";

function EventResources() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newResource, setNewResource] = useState({
    resourceType: "Staff",
    name: "",
    description: "",
    quantity: 1,
    cost: 0,
    notes: "",
  });

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await eventAPI.getEventDetails(eventId);
      setEvent(response.data.event);
      setResources(response.data.resources || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch event details");
    }
  };

  const handleAddResource = async () => {
    if (!newResource.name.trim()) {
      setError("Please enter resource name");
      return;
    }

    setLoading(true);
    try {
      await eventAPI.addEventResource({
        eventId,
        ...newResource,
      });

      setResources([
        ...resources,
        {
          ...newResource,
          _id: Date.now(),
          status: "Available",
        },
      ]);

      setNewResource({
        resourceType: "Staff",
        name: "",
        description: "",
        quantity: 1,
        cost: 0,
        notes: "",
      });

      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add resource");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await eventAPI.deleteEventResource(resourceId);
      setResources(resources.filter((r) => r._id !== resourceId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete resource");
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      // Update event status to next stage
      await eventAPI.updateEvent(eventId, { status: "Scheduled" });
      navigate(`/user/event-dashboard/${eventId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const totalCost = resources.reduce((sum, r) => sum + (r.cost || 0), 0);

  if (!event) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <h1 className="text-4xl font-bold text-white">Assign Resources & Staff</h1>
          </div>
          <p className="text-gray-300 text-center text-lg">
            Allocate staff, vendors, equipment, and other resources for {event.title}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Add Resource Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-lg border border-slate-700 sticky top-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" />
                Add Resource
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Type</label>
                  <select
                    value={newResource.resourceType}
                    onChange={(e) =>
                      setNewResource({ ...newResource, resourceType: e.target.value })
                    }
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option>Staff</option>
                    <option>Vendor</option>
                    <option>Equipment</option>
                    <option>Catering</option>
                    <option>Venue</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={newResource.name}
                    onChange={(e) =>
                      setNewResource({ ...newResource, name: e.target.value })
                    }
                    placeholder="Resource name..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={newResource.description}
                    onChange={(e) =>
                      setNewResource({ ...newResource, description: e.target.value })
                    }
                    placeholder="Details..."
                    rows="2"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newResource.quantity}
                      onChange={(e) =>
                        setNewResource({
                          ...newResource,
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Cost ($)
                    </label>
                    <input
                      type="number"
                      value={newResource.cost}
                      onChange={(e) =>
                        setNewResource({
                          ...newResource,
                          cost: parseFloat(e.target.value) || 0,
                        })
                      }
                      min="0"
                      step="0.01"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Notes</label>
                  <textarea
                    value={newResource.notes}
                    onChange={(e) =>
                      setNewResource({ ...newResource, notes: e.target.value })
                    }
                    placeholder="Additional notes..."
                    rows="2"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>

                <button
                  onClick={handleAddResource}
                  disabled={loading}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Resource"}
                </button>
              </div>
            </div>
          </div>

          {/* Resources List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-400" />
                  Assigned Resources ({resources.length})
                </h3>

                {resources.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-gray-400">No resources assigned yet</p>
                    <p className="text-sm text-gray-500 mt-1">Add resources using the form on the left</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resources.map((resource) => (
                      <div
                        key={resource._id}
                        className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-slate-500 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-semibold">{resource.name}</h4>
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30">
                                {resource.resourceType}
                              </span>
                            </div>
                            {resource.description && (
                              <p className="text-gray-400 text-sm mb-2">{resource.description}</p>
                            )}
                            <div className="flex gap-4 text-sm text-gray-400">
                              <span>Qty: {resource.quantity}</span>
                              <span>${resource.cost}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-xs ${
                                  resource.status === "Available"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-yellow-500/20 text-yellow-300"
                                }`}
                              >
                                {resource.status}
                              </span>
                            </div>
                            {resource.notes && (
                              <p className="text-gray-500 text-xs mt-2 italic">{resource.notes}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteResource(resource._id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded transition ml-4"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cost Summary */}
              {resources.length > 0 && (
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-semibold">Total Resource Cost</h4>
                    <span className="text-2xl font-bold text-purple-400">${totalCost.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    These are preliminary resource costs. Final costs may vary based on availability and
                    market conditions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate(`/user/event-details/${eventId}`)}
            className="px-8 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-700/50 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleContinue}
            disabled={loading}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "Creating..." : "Complete Setup & View Dashboard"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventResources;

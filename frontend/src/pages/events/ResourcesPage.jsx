import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MapPin,
  Briefcase,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import EventManagementSidebar from "./EventManagementSidebar";

function ResourcesPage() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceType, setResourceType] = useState("all");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser") || localStorage.getItem("user");

    if (!token) {
      navigate("/login?from=event-management");
      return;
    }

    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    // Fetch resources from backend
    fetchResources();
  }, [navigate]);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/events/resources", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResources(data.resources || []);
      }
    } catch (error) {
      // If endpoint doesn't exist, use sample data
      console.log("Using sample resources data");
      setResources([]);
    }
  };

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter((resource) =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (resourceType !== "all") {
      filtered = filtered.filter((resource) => resource.type === resourceType);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, resourceType]);

  const handleAddResource = () => {
    // Navigate to add resource form
    alert("Add Resource feature - to be implemented");
  };

  const handleDeleteResource = async (resourceId) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/events/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setResources(resources.filter((r) => r._id !== resourceId));
        alert("Resource deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete resource:", error);
    }
  };

  // Sample resources if none exist
  const sampleResources = [
    {
      _id: "1",
      name: "Audio Equipment",
      type: "Equipment",
      quantity: 5,
      availability: "Available",
      location: "Warehouse A",
    },
    {
      _id: "2",
      name: "Lighting System",
      type: "Equipment",
      quantity: 3,
      availability: "Available",
      location: "Warehouse A",
    },
    {
      _id: "3",
      name: "Event Coordinator",
      type: "Staff",
      quantity: 2,
      availability: "Booked",
      location: "Office",
    },
  ];

  const displayResources = resources.length > 0 ? filteredResources : sampleResources;

  return (
    <div className="flex h-screen bg-gray-100">
      <EventManagementSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">Resources</h2>
            <p className="text-gray-600 text-sm">Manage event resources, equipment, and staff</p>
          </div>
          <button
            onClick={handleAddResource}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Add Resource
          </button>
        </div>

        <div className="p-8">
          {/* Search and Filter */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="Equipment">Equipment</option>
              <option value="Staff">Staff</option>
              <option value="Venue">Venue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <Briefcase className="text-blue-500" size={32} />
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Total Resources</p>
                  <p className="text-3xl font-bold text-gray-800">{displayResources.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <Users className="text-green-500" size={32} />
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Staff Members</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {displayResources.filter((r) => r.type === "Staff").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <MapPin className="text-orange-500" size={32} />
                <div>
                  <p className="text-gray-600 font-semibold text-sm">Venues</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {displayResources.filter((r) => r.type === "Venue").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Quantity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Availability</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Location</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayResources.map((resource, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 text-gray-800 font-semibold">{resource.name}</td>
                      <td className="py-4 px-4 text-gray-600">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {resource.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{resource.quantity}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            resource.availability === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {resource.availability}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{resource.location}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteResource(resource._id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {displayResources.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-600">No resources found</p>
                  <button
                    onClick={handleAddResource}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold mt-2"
                  >
                    Add your first resource
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;

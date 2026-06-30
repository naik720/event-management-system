import React, { useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Building2,
  CalendarDays,
  ChevronLeft,
  CircleDollarSign,
  CloudUpload,
  MapPin,
  Phone,
  RotateCcw,
  Save,
  Store,
  Users,
  X,
} from "lucide-react";

const facilities = [
  "Parking",
  "Air Conditioning",
  "WiFi",
  "Catering Area",
  "Generator",
  "Stage",
  "Security",
  "Projector",
  "Sound System",
];

const initialForm = {
  venueName: "",
  venueType: "Banquet Hall",
  location: "",
  capacity: "",
  pricePerDay: "",
  contactNumber: "",
  description: "",
  notes: "",
  availability: "Available",
};

const initialFacilities = [
  "Parking",
  "Air Conditioning",
  "WiFi",
  "Catering Area",
];

const initialImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=60",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=60",
];

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "");

const parseResponseBody = async (response) => {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || "Unexpected response from server" };
  }
};

export default function AddVenue() {
  const [form, setForm] = useState(initialForm);
  const [selectedFacilities, setSelectedFacilities] = useState(initialFacilities);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState(initialImages);
  const [dragActive, setDragActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const fileInputRef = useRef(null);

  const stats = useMemo(
    () => [
      { title: "Total Venues", value: "42", icon: Store, iconColor: "text-blue-500", border: "border-blue-500" },
      { title: "Available Venues", value: "18", icon: CalendarDays, iconColor: "text-emerald-500", border: "border-emerald-500" },
      { title: "Booked Venues", value: "22", icon: Building2, iconColor: "text-violet-500", border: "border-violet-500" },
      { title: "Total Revenue (Q3)", value: "$1.48M", icon: CircleDollarSign, iconColor: "text-emerald-500", border: "border-amber-500" },
      { title: "Under Maintenance", value: "3", icon: AlertCircle, iconColor: "text-rose-500", border: "border-rose-500" },
    ],
    []
  );

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const toggleFacility = (item) => {
    setSelectedFacilities((prev) =>
      prev.includes(item) ? prev.filter((facility) => facility !== item) : [...prev, item]
    );
  };

  const uploadImage = async (imageDataUrl) => {
    if (!imageDataUrl?.startsWith("data:")) return imageDataUrl;

    const response = await fetch(`${API_BASE_URL}/api/admin/venues/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageDataUrl }),
    });

    const data = await parseResponseBody(response);
    if (!response.ok) {
      throw new Error(data.message || "Failed to upload image");
    }

    return data.imageUrl;
  };

  const saveVenue = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const savedImages = await Promise.all(images.map(uploadImage));

      const venuePayload = {
        name: form.venueName.trim(),
        type: form.venueType,
        location: form.location.trim(),
        capacity: Number(form.capacity),
        price: Number(form.pricePerDay),
        description: form.description.trim(),
        notes: form.notes.trim(),
        contactNumber: form.contactNumber.trim(),
        status: form.availability || "Available",
        facilities: selectedFacilities,
        images: savedImages,
      };

      const response = await fetch(`${API_BASE_URL}/api/admin/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venuePayload),
      });

      const data = await parseResponseBody(response);
      if (!response.ok) {
        throw new Error(data.message || "Failed to save venue");
      }

      setSaveMessage("Venue saved successfully.");
      handleReset();
    } catch (error) {
      setSaveMessage(error.message || "Failed to save venue.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.venueName) nextErrors.venueName = "Venue name is required";
    if (!form.venueType) nextErrors.venueType = "Venue type is required";
    if (!form.location) nextErrors.location = "Location is required";
    if (!form.capacity) nextErrors.capacity = "Capacity is required";
    if (!form.pricePerDay) nextErrors.pricePerDay = "Price per day is required";
    if (!form.contactNumber) nextErrors.contactNumber = "Contact number is required";
    if (!form.description) nextErrors.description = "Description is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      await saveVenue();
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setSelectedFacilities(initialFacilities);
    setErrors({});
    setImages(initialImages);
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleReset();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const addImageFiles = async (files) => {
    const fileList = Array.from(files);
    const newImages = await Promise.all(fileList.map((file) => readFileAsDataURL(file)));
    setImages((prev) => {
      const allImages = [...prev, ...newImages];
      return allImages.slice(-6);
    });
  };

  const handleFileChange = async (event) => {
    await addImageFiles(event.target.files || []);
    event.target.value = null;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      await addImageFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className={`rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] border-l-4 ${stat.border} p-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{stat.value}</p>
          </div>
          <Icon className={stat.iconColor} size={28} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {stats.map((stat) => <StatCard key={stat.title} stat={stat} />)}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 rounded-3xl bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Venue Information</h3>
            <p className="text-sm text-slate-500">Fill in the details to add a new venue to the system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Venue Name"
              icon={Building2}
              value={form.venueName}
              onChange={(value) => handleChange("venueName", value)}
              error={errors.venueName}
              placeholder="Enter venue name"
            />
            <Field
              label="Venue Type"
              icon={Store}
              value={form.venueType}
              onChange={(value) => handleChange("venueType", value)}
              error={errors.venueType}
              placeholder="Select venue type"
            />
            <Field
              label="Location"
              icon={MapPin}
              value={form.location}
              onChange={(value) => handleChange("location", value)}
              error={errors.location}
              placeholder="Enter city or location"
            />
            <Field
              label="Capacity"
              icon={Users}
              value={form.capacity}
              onChange={(value) => handleChange("capacity", value)}
              error={errors.capacity}
              placeholder="Enter capacity"
              type="number"
            />
            <Field
              label="Price (Per Day)"
              icon={CircleDollarSign}
              value={form.pricePerDay}
              onChange={(value) => handleChange("pricePerDay", value)}
              error={errors.pricePerDay}
              placeholder="Enter price"
              type="number"
            />
            <Field
              label="Contact Number"
              icon={Phone}
              value={form.contactNumber}
              onChange={(value) => handleChange("contactNumber", value)}
              error={errors.contactNumber}
              placeholder="Enter contact number"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={5}
              placeholder="Enter venue description..."
              className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-orange-500 ${
                errors.description ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {errors.description && <p className="mt-2 text-xs font-medium text-rose-600">{errors.description}</p>}
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-4">
                <h4 className="font-bold text-slate-900">Availability Status</h4>
                <p className="text-xs text-slate-500">Select current availability status</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Available", "Booked", "Maintenance"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleChange("availability", status)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      form.availability === status
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-4">
                <h4 className="font-bold text-slate-900">Additional Notes</h4>
                <p className="text-xs text-slate-500">Add any optional information</p>
              </div>
              <textarea
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={4}
                placeholder="Any additional information..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-3xl bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-6">
            <div className="mb-4">
              <h4 className="font-bold text-slate-900">Facilities</h4>
              <p className="text-xs text-slate-500">Select available facilities</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {facilities.map((item) => {
                const active = selectedFacilities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleFacility(item)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      active
                        ? "border-orange-400 bg-orange-50 text-slate-800"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`inline-flex h-5 w-5 items-center justify-center rounded ${active ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                      {active ? "✓" : ""}
                    </span>
                    <span className="truncate">{item}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-6">
            <div className="mb-4">
              <h4 className="font-bold text-slate-900">Upload Images</h4>
              <p className="text-xs text-slate-500">Upload venue images (Max 6 images)</p>
            </div>
            <div
              className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${dragActive ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudUpload className="mx-auto text-blue-500" size={34} />
              <p className="mt-3 text-sm font-semibold text-slate-700">Drag & drop images here</p>
              <p className="text-xs text-slate-500">or</p>
              <button
                type="button"
                className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                onClick={handleUploadClick}
              >
                Choose Images
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.map((src, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl border border-slate-200">
                  <img src={src} alt={`Venue ${index + 1}`} className="h-24 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 rounded-full bg-white p-1 text-rose-500 shadow"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="xl:col-span-3 rounded-3xl bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-4 sm:p-6">
          {saveMessage && (
            <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              {saveMessage}
            </div>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ChevronLeft size={18} />
              Cancel
            </button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw size={18} />
                Reset
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save Venue"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({ label, icon: Icon, value, onChange, placeholder, error, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label} <span className="text-rose-500">*</span></label>
      <div className={`flex items-center rounded-2xl border bg-white px-4 py-3 ${error ? "border-rose-400" : "border-slate-200"}`}>
        <Icon size={18} className="mr-3 text-slate-400" />
        {label === "Venue Type" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700"
          >
            {[
              "Banquet Hall",
              "Wedding Hall",
              "Conference Hall",
              "Auditorium",
              "Outdoor Venue",
              "Party Hall",
              "Resort Venue",
              "Exhibition Hall",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        )}
      </div>
      {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}

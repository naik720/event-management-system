import React, { useState } from "react";
import { CalendarDays, Clock, MapPin, UserCheck } from "lucide-react";

export default function StaffEvents() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock events lists by status
  const eventsData = {
    upcoming: [
      {
        id: 1,
        title: "Wedding Ceremony",
        dateTime: "10 July 2026 | 09:00 AM",
        location: "Grand Palace, Hall A",
        role: "Security Staff",
        status: "Upcoming",
        colorClass: "border-orange-200 text-orange-600 bg-orange-50",
        badgeColor: "bg-orange-50 text-orange-600 border border-orange-200"
      },
      {
        id: 2,
        title: "Corporate Event",
        dateTime: "22 July 2026 | 01:00 PM",
        location: "Taj Convention Center",
        role: "Security Staff",
        status: "Upcoming",
        colorClass: "border-blue-200 text-blue-600 bg-blue-50",
        badgeColor: "bg-blue-50 text-blue-600 border border-blue-200"
      },
      {
        id: 3,
        title: "Birthday Party",
        dateTime: "05 August 2026 | 06:00 PM",
        location: "Dream Land Gardens",
        role: "Security Staff",
        status: "Upcoming",
        colorClass: "border-amber-200 text-amber-600 bg-amber-50",
        badgeColor: "bg-amber-50 text-amber-600 border border-amber-200"
      },
      {
        id: 4,
        title: "Music Concert",
        dateTime: "18 August 2026 | 07:00 PM",
        location: "Stadium Arena",
        role: "Security Staff",
        status: "Upcoming",
        colorClass: "border-purple-200 text-purple-600 bg-purple-50",
        badgeColor: "bg-purple-50 text-purple-600 border border-purple-200"
      }
    ],
    ongoing: [
      {
        id: 5,
        title: "International Tech Summit",
        dateTime: "29 June 2026 | 10:00 AM",
        location: "Convention Hall 3",
        role: "Security Supervisor",
        status: "Ongoing",
        colorClass: "border-emerald-200 text-emerald-600 bg-emerald-50",
        badgeColor: "bg-emerald-50 text-emerald-600 border border-emerald-200 animate-pulse"
      }
    ],
    completed: [
      {
        id: 6,
        title: "Graduation Party",
        dateTime: "15 June 2026 | 03:00 PM",
        location: "Ritz Banquet Hall",
        role: "Security Staff",
        status: "Completed",
        colorClass: "border-slate-200 text-slate-600 bg-slate-50",
        badgeColor: "bg-slate-100 text-slate-600 border border-slate-200"
      },
      {
        id: 7,
        title: "Anniversary Celebration",
        dateTime: "02 June 2026 | 07:00 PM",
        location: "Royal Orchid Lawn",
        role: "Security Staff",
        status: "Completed",
        colorClass: "border-slate-200 text-slate-600 bg-slate-50",
        badgeColor: "bg-slate-100 text-slate-600 border border-slate-200"
      }
    ]
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming Events", count: eventsData.upcoming.length },
    { id: "ongoing", label: "Ongoing Events", count: eventsData.ongoing.length },
    { id: "completed", label: "Completed Events", count: eventsData.completed.length }
  ];

  const currentEvents = eventsData[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-4 px-6 text-sm font-semibold border-b-2 transition-all duration-200 outline-none ${
              activeTab === tab.id
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? "bg-orange-100 text-orange-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid Content */}
      {currentEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Event Visual Identity Card */}
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl shrink-0 flex items-center justify-center border ${event.colorClass}`}>
                    <CalendarDays size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{event.title}</h3>
                    <div className="mt-2 flex flex-col gap-1 text-slate-500 text-xs">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-600">{event.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-500">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 ${event.badgeColor}`}>
                  {event.status}
                </span>
              </div>

              {/* Bottom Allocation Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 flex items-center gap-2">
                  <UserCheck size={14} className="text-slate-400" />
                  Your Role:
                </span>
                <span className="text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                  {event.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 border-dashed">
          <p className="text-sm font-semibold text-slate-500">No events found in this category.</p>
        </div>
      )}
    </div>
  );
}

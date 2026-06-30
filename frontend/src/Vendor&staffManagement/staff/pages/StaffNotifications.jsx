import React, { useState } from "react";
import { Bell, BellRing, Check, ShieldAlert } from "lucide-react";

export default function StaffNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Event Assignment",
      text: "You have been assigned to the Security Staff role for the 'Corporate Event' on 22 July 2026.",
      time: "2 hours ago",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Uniform Policy Update",
      text: "All security staff are required to wear the updated navy blue blazer starting July 1st.",
      time: "1 day ago",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      title: "Schedule Confirmed",
      text: "Your shift schedule for the 'Wedding Ceremony' on 10 July 2026 has been finalized.",
      time: "3 days ago",
      read: true,
      priority: "low"
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleToggleRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Utilities */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl">
            <BellRing size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">
              You have <span className="font-bold text-slate-800">{unreadCount}</span> unread alerts.
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 border border-orange-200 px-3.5 py-2 rounded-xl transition-all"
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggleRead(item.id)}
            className={`border rounded-3xl p-5 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer relative overflow-hidden flex items-start gap-4 ${
              !item.read ? "border-l-4 border-l-orange-500 border-slate-200" : "border-slate-200 opacity-75"
            }`}
          >
            {/* Priority Indicator Badge */}
            <div className={`p-2.5 rounded-xl shrink-0 ${
              item.priority === "high"
                ? "bg-red-50 text-red-500"
                : item.priority === "medium"
                ? "bg-orange-50 text-orange-500"
                : "bg-slate-50 text-slate-400"
            }`}>
              <ShieldAlert size={18} />
            </div>

            {/* Notification Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold text-slate-800 leading-snug">
                  {item.title}
                </h3>
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 leading-relaxed mt-1.5">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

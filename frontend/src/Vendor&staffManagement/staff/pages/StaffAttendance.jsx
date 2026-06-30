import React, { useState } from "react";
import { CheckCircle, XCircle, TrendingUp, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function StaffAttendance() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed, so 5)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Specific attendance configuration for June 2026 to match screenshot
  // 1-indexed days
  const attendanceData = {
    present: [1, 2, 3, 4, 5, 8, 9, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30],
    absent: [10, 27] // Match absent days from design
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Generate calendar days for June 2026
  // June 2026 starts on Monday (1st)
  // Total days = 30
  const totalDays = 30;
  const startDayOffset = 1; // 0 for Sun, 1 for Mon

  const daysGrid = [];
  
  // Fill initial offset
  for (let i = 0; i < startDayOffset; i++) {
    daysGrid.push({ dayNum: null, status: "none" });
  }

  // Fill calendar days
  for (let d = 1; d <= totalDays; d++) {
    let status = "none";
    if (currentMonth === 5 && currentYear === 2026) {
      if (attendanceData.present.includes(d)) {
        status = "present";
      } else if (attendanceData.absent.includes(d)) {
        status = "absent";
      }
    }
    daysGrid.push({ dayNum: d, status });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Present Days</span>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">25</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">This Month</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Absent Days</span>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">2</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">This Month</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50 text-red-600 shrink-0">
            <XCircle size={24} />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">92%</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">This Month</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 shrink-0">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Calendar Widget Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl">
              <Calendar size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {monthNames[currentMonth]} {currentYear}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Days of Week Grid */}
        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, index) => (
            <span
              key={index}
              className="text-xs font-bold text-slate-400 uppercase tracking-wider py-1"
            >
              {dayName}
            </span>
          ))}
        </div>

        {/* Monthly Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center">
          {daysGrid.map((item, index) => {
            let cellClass = "h-11 w-full flex items-center justify-center text-sm font-semibold rounded-full ";
            
            if (item.dayNum === null) {
              return <div key={index} className="h-11" />;
            }

            if (item.status === "present") {
              cellClass += "bg-emerald-500 text-white shadow-md shadow-emerald-500/10";
            } else if (item.status === "absent") {
              cellClass += "bg-red-500 text-white shadow-md shadow-red-500/10";
            } else {
              cellClass += "bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors";
            }

            return (
              <div key={index} className="flex justify-center">
                <div className={cellClass}>
                  {item.dayNum}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendar Legend Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-slate-500">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-slate-500">Absent</span>
          </div>
        </div>
      </div>
    </div>
  );
}

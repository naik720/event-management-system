import React from "react";
import { LayoutGrid, Users, Sparkles } from "lucide-react";

const layouts = [
  { name: "Wedding Layout", capacity: "500 guests", note: "Round tables + stage" },
  { name: "Conference Layout", capacity: "850 guests", note: "Rows + AV front wall" },
  { name: "Classroom Layout", capacity: "320 guests", note: "Tables + breakout lanes" },
  { name: "Theater Layout", capacity: "700 guests", note: "Audience seating + stage" },
];

export default function SeatingArrangements() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        <h2 className="text-2xl font-extrabold text-slate-900">Seating Layout</h2>
        <p className="mt-1 text-sm text-slate-500">Visualize seating patterns, stage placement, VIP zones, and capacity mapping.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="text-orange-500" size={20} />
            <h3 className="font-bold text-slate-900">Available Layout Types</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {layouts.map((layout) => (
              <div key={layout.name} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{layout.name}</p>
                <p className="text-sm text-slate-500 mt-1">{layout.capacity}</p>
                <p className="text-xs text-slate-400 mt-2">{layout.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-orange-500" size={20} />
            <h3 className="font-bold text-slate-900">Stage Position & VIP Area</h3>
          </div>
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <div className="h-72 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <Users className="mx-auto text-slate-400" size={34} />
                <p className="mt-3 font-semibold text-slate-700">Capacity mapping preview</p>
                <p className="text-sm text-slate-500">Stage, VIP, and seating zones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

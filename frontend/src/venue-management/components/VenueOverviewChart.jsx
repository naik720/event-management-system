import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Banquet Hall", value: 8, color: "#7c3aed" },
  { name: "Conference Hall", value: 6, color: "#3b82f6" },
  { name: "Outdoor Venue", value: 5, color: "#22c55e" },
  { name: "Auditorium", value: 3, color: "#f97316" },
  { name: "Wedding Hall", value: 3, color: "#fb7185" },
];

const VenueOverviewChart = () => {
  return (
    <section className="venue-card overview-card">
      <h2>Venue Overview</h2>
      <div className="venue-overview-body">
        <div className="venue-chart-wrap">
          <ResponsiveContainer width="100%" height={176}>
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={48} outerRadius={76} stroke="none">
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-total">
            <strong>25</strong>
            <span>Total Venues</span>
          </div>
        </div>

        <div className="venue-legend">
          {data.map((item) => (
            <div key={item.name}>
              <span style={{ background: item.color }}></span>
              <p>{item.name}</p>
              <strong>{item.value} ({Math.round((item.value / 25) * 100)}%)</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueOverviewChart;

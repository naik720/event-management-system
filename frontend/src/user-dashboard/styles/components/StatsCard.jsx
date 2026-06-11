import React from "react";

const StatsCard = ({ icon: Icon, number, title, tone = "orange" }) => {
  return (
    <div className={`stats-card stats-card-${tone}`}>
      <div className="stats-icon">
        {Icon && <Icon size={20} />}
      </div>

      <div>
        <h2>{number}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;

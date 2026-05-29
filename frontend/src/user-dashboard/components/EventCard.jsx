import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";

const EventCard = ({ id, image, title, date, location, compact = false, tag }) => {
  const navigate = useNavigate();
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (id) navigate(`/client/event/${id}`);
  };
  return (
    <div className={compact ? "event-card event-card-compact" : "event-card"}>
      <img src={image} alt={title} />

      <div className="event-card-content">
        <div>
          <h3>{title}</h3>

          <div className="event-meta">
            <span>
              <CalendarDays size={14} />
              {date}
            </span>

            <span>
              <MapPin size={14} />
              {location}
            </span>
          </div>
        </div>

        {tag && <span className="event-tag">{tag}</span>}
        {id && (
          <button className="details-button" onClick={handleViewDetails} style={{marginTop:12}}>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;

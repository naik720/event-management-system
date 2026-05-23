import React from "react";
import { CalendarDays, MapPin } from "lucide-react";

const EventCard = ({ image, title, date, location, compact = false, tag }) => {
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
      </div>
    </div>
  );
};

export default EventCard;

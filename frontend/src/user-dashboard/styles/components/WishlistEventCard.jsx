import React from "react";
import { CalendarDays, Clock, Heart, MapPin, Trash2 } from "lucide-react";

const getDateParts = (dateText) => {
  const [month = "", day = ""] = dateText.split(" ");
  return {
    day: day.replace(",", "").padStart(2, "0"),
    month: month.slice(0, 3).toUpperCase(),
  };
};

const WishlistEventCard = ({ event, onRemove }) => {
  const { day, month } = getDateParts(event.date);

  return (
    <article className="wishlist-event-card">
      <div className="wishlist-image-wrap">
        <img src={event.image} alt={event.title} />
        <button type="button" className="wishlist-heart" aria-label={`Saved ${event.title}`}>
          <Heart size={18} fill="currentColor" />
        </button>
        <div className="wishlist-date-badge">
          <strong>{day}</strong>
          <span>{month}</span>
        </div>
      </div>

      <div className="wishlist-event-body">
        <h3>{event.title}</h3>

        <div className="wishlist-meta">
          <span>
            <MapPin size={13} />
            {event.location}
          </span>
          <span>
            <Clock size={13} />
            {event.time}
          </span>
          <span>
            <CalendarDays size={13} />
            {event.status}
          </span>
        </div>

        <div className="wishlist-card-footer">
          <strong>{event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`}</strong>
          <button type="button" className="details-button">
            View Details
          </button>
          <button
            type="button"
            className="wishlist-remove"
            onClick={() => onRemove(event.id)}
            aria-label={`Remove ${event.title} from wishlist`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default WishlistEventCard;

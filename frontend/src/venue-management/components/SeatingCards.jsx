import React from "react";
import { Armchair, Grid2X2, UsersRound } from "lucide-react";

const cards = [
  { title: "Theatre Style", value: "1,200 seats", icon: Armchair },
  { title: "Banquet Style", value: "800 seats", icon: UsersRound },
  { title: "Classroom Style", value: "640 seats", icon: Grid2X2 },
];

const SeatingCards = () => {
  return (
    <section className="venue-card seating-card">
      <div className="venue-card-header">
        <h2>Seating Arrangements</h2>
        <button type="button">View All</button>
      </div>
      <div className="seating-list">
        {cards.map(({ title, value, icon: Icon }) => (
          <article key={title}>
            <Icon size={20} />
            <div>
              <strong>{title}</strong>
              <p>{value}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SeatingCards;

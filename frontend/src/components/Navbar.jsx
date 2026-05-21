import React from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const location = useLocation();

  // Smooth scroll handler
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6 text-white">
      {/* Left: Logo */}
      <h1 className="text-3xl font-bold text-pink-500">EVENT</h1>

      {/* Center: Menu */}
      <ul className="flex gap-8 text-lg">
        <li>
          {location.pathname === "/" ? (
            <span className="cursor-default text-pink-300">Home</span>
          ) : (
            <Link to="/">Home</Link>
          )}
        </li>
        <li>
          <a
            href="#events"
            onClick={e => handleScroll(e, "events")}
          >
            Events
          </a>
        </li>
        <li>
          <a
            href="#categories"
            onClick={e => handleScroll(e, "categories")}
          >
            Categories
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={e => handleScroll(e, "about")}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={e => handleScroll(e, "contact")}
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Right: Login button */}
      <div>
        <Link to="/login">
          <button className="bg-pink-500 px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
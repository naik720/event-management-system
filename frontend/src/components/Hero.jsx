import React from "react";

function Hero() {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <nav className="relative z-10 flex justify-between items-center px-10 py-6 text-white">
        <h1 className="text-3xl font-bold text-pink-500">
          EVENT
        </h1>

        <ul className="flex gap-8 text-lg">
          <li>Home</li>
          <li>Events</li>
          <li>Categories</li>
          <li>About</li>
          <li>Contact</li>        </ul>

        <button className="bg-pink-500 px-6 py-2 rounded-full">
          Sign Up
        </button>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center h-[80%] text-center text-white px-4">
        <h1 className="text-6xl font-extrabold max-w-4xl leading-tight">
          CREATE EVENTS AND START SELLING TICKETS
        </h1>

        <p className="mt-6 text-xl max-w-2xl text-gray-200">
          Discover amazing events, book tickets and create unforgettable memories.
        </p>

        <button className="mt-8 bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full text-xl font-semibold">
          CREATE AN EVENT
        </button>
      </div>
    </div>
  );
}
export default Hero;
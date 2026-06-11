import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Events Section */}
      <section id="events" className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">
            Popular Events
          </h1>
          <Events />
        </div>
      </section>


      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white px-5">
        <h1 className="text-5xl font-bold text-center mb-16 text-gray-800">
          Browse Categories
        </h1>
        <Categories />
      </section>

      {/* Footer */}
      <Footer />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 px-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">About Us</h1>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to our Event Management System, where planning and organizing events becomes simple and efficient. From booking venues to managing clients, schedules, and payments, everything is available in one place. Whether it's a wedding, birthday, conference, or corporate event, our platform helps make every event smooth and memorable.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-gray-800">Contact Event Management</h1>
          <p className="text-lg text-gray-600 mb-4">For event inquiries or support, contact us:</p>
          <div className="text-2xl font-semibold text-pink-500 mb-2">Phone: 8095146883, 9480106621</div>
          <div className="text-2xl font-semibold text-pink-500">Email: naikashwitha@gmail.com, keerti12@gmail.com</div>
        </div>
      </section>

    </div>
  );
}

export default Home;

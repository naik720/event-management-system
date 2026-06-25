import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    // Check if the user is authenticated
    if (loggedInUser && token) {
      // Directly go to the event management dashboard
      navigate('/user/event-management/dashboard');
    } else {
      // Redirect to login page if unauthenticated
      navigate('/login?from=event-management');
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/home-background.png')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-slate-950/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-4 py-2 text-sm font-semibold text-pink-200 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1H4zM4 11a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H4zM10 3a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM10 11a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2zM16 3a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zM16 11a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2z" />
              </svg>
              24/7 Booking, Secure Payments
            </span>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Plan, Manage & Create Unforgettable Events
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200 max-w-2xl">
              A complete event management platform to organize events, manage venues, coordinate teams, and deliver memorable experiences.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => navigate("/home#events")}
                className="inline-flex items-center justify-center rounded-full bg-pink-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-pink-400"
              >
                Explore Events
              </button>
              <button
                onClick={handleCreateEvent}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20"
              >
                Create Event
              </button>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Easy Booking", icon: "💼" },
                { title: "Secure Payments", icon: "🔒" },
                { title: "24/7 Support", icon: "🛎️" },
                { title: "Powerful Dashboard", icon: "📊" },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
                  <div className="text-3xl">{item.icon}</div>
                  <p className="mt-3 text-sm font-semibold text-slate-100">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
              alt="Event celebration"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-8 text-white">
              <div className="text-sm uppercase tracking-[0.35em] text-pink-300">Featured</div>
              <h2 className="mt-2 text-3xl font-bold">Exclusive event experiences for every occasion</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const upcomingEvents = [
  {
    title: "Ragu Dixit Music Concert",
    place: "Kapu, Udupi",
    time: "8:00 PM",
    price: "1,299",
    badge: "25 July",
    gradient: "from-fuchsia-500 via-violet-500 to-indigo-600",
    image: "/home/raguDixitMusic.png",
  },
  {
    title: "Business Conference",
    place: "Mangalore, India",
    time: "10:00 AM",
    price: "899",
    badge: "05 July",
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    image: "/home/businessconference.png",
  },
  {
    title: "Wedding Showcase",
    place: "Palace Garden, Udupi",
    time: "11:00 AM",
    price: "499",
    badge: "12 July",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    image: "/home/weddingshowcase.png",
  },
  {
    title: "Amani Ramani Hall",
    place: "Udupi, India",
    time: "5:00 PM",
    price: "699",
    badge: "20 July",
    gradient: "from-emerald-400 via-lime-500 to-green-600",
    image: "/home/Amaniramani-hall.png",
  },
];

const categories = [
  {
    title: "Wedding Events",
    description: "Make your special day unforgettable with complete planning.",
    count: "120+ Events",
    accent: "bg-pink-500",
    image: "/home/weddingimg01.jpg",
  },
  {
    title: "Birthday Parties",
    description: "Celebrate birthdays with unique themes and memorable moments.",
    count: "95+ Events",
    accent: "bg-blue-500",
    image: "/home/Birthday.png",
  },
  {
    title: "Corporate Events",
    description: "Professional events for meetings, conferences and gatherings.",
    count: "150+ Events",
    accent: "bg-emerald-500",
    image: "/home/coporateevent.png",
  },
  {
    title: "Concerts & Shows",
    description: "Enjoy live concerts, music shows and entertainment events.",
    count: "110+ Events",
    accent: "bg-violet-500",
    image: "/home/concert.png",
  },
  {
    title: "Exhibitions",
    description: "Explore trade shows, exhibitions and product launches.",
    count: "80+ Events",
    accent: "bg-amber-500",
    image: "/home/exibution.png",
  },
];

const platformFeatures = [
  "Easy Event Management",
  "Secure & Reliable",
  "Real-time Analytics",
  "Vendor Management",
  "24/7 Customer Support",
  "Seamless Experience",
];

const heroHighlights = ["Easy Booking", "Secure Payments", "24/7 Support", "Powerful Dashboard"];

const stats = [
  ["500+", "Events Managed"],
  ["100+", "Venues Available"],
  ["200+", "Vendors"],
  ["50K+", "Happy Clients"],
];

const contactDetails = [
  ["Phone", "+91 98765 43210"],
  ["Email", "info@eventsystem.com"],
  ["Office", "123 Event Street, City, Country - 400001"],
];

const socialLinks = ["f", "ig", "x", "in", "yt"];

const footerLinks = [
  ["Home", "home"],
  ["Events", "events"],
  ["Categories", "categories"],
  ["About Us", "about"],
  ["Contact Us", "contact"],
];

const navLinks = [
  ["Home", "home"],
  ["Events", "events"],
  ["Categories", "categories"],
  ["About", "about"],
  ["Contact", "contact"],
];

const initialContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Home() {
  const location = useLocation();
  const aboutVideoRef = useRef(null);
  const [contactForm, setContactForm] = useState(initialContactForm);
  const [contactStatus, setContactStatus] = useState("");
  const [contactError, setContactError] = useState("");
  const [sending, setSending] = useState(false);
  const [aboutVideoPlaying, setAboutVideoPlaying] = useState(false);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      requestAnimationFrame(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.hash]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const handleAboutVideoToggle = async () => {
    const video = aboutVideoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setAboutVideoPlaying(true);
      } catch (error) {
        setAboutVideoPlaying(false);
      }
      return;
    }

    video.pause();
    setAboutVideoPlaying(false);
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
    setContactError("");
    setContactStatus("");
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setContactError("");
    setContactStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send your message.");
      }

      setContactStatus(data.message || "Message sent successfully. We will get back to you soon.");
      setContactForm(initialContactForm);
    } catch (error) {
      setContactError(error.message || "Unable to send message right now.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="home" className="min-h-screen bg-[#f5f1ec] text-slate-950">
      <section className="relative min-h-screen overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <img src="/home/home-background.png" alt="Decorated event venue" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.22),transparent_26%),radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_28%)]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1450px] flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <Link to="/home" className="flex items-center gap-3 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-pink-400/40 bg-pink-500/15 text-pink-400 shadow-[0_0_35px_rgba(236,72,153,0.18)]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.9]">
                  <path d="M4 8h16M7 4v4M17 4v4M5 8l1 11h12l1-11" />
                  <path d="M10 12l2 2 3-3" />
                </svg>
              </span>
              <div>
                <p className="text-lg font-black uppercase tracking-[0.18em] text-pink-400">Event</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-white/80">
                  Management System
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-3 lg:gap-8">
              {navLinks.map(([label, id]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="group relative py-1 text-sm font-semibold text-white/85 transition hover:text-white"
                >
                  {label}
                  <span className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-0 rounded-full bg-pink-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <Link
              to="/login"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5 hover:bg-pink-400"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-none stroke-current stroke-[1.9]">
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H4" />
                <path d="M20 4v16" />
              </svg>
              Login
            </Link>
          </header>

          <div className="mt-14 grid flex-1 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/78 backdrop-blur-md">
                Premium event planning platform
              </div>
              <h1 className="max-w-2xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="block text-white">Plan, Manage and Create</span>
                <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
                  Unforgettable Events
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                A complete event management platform to organize events, manage venues, coordinate teams, and
                deliver memorable experiences.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("events")}
                  className="rounded-xl bg-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5 hover:bg-pink-400"
                >
                  Explore Events
                </button>
                <Link
                  to="/login"
                  className="rounded-xl border border-white/22 bg-white/6 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Create Event
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-4 py-2 text-sm text-white/82 backdrop-blur-md"
                  >
                    <span className="h-2 w-2 rounded-full bg-pink-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <div className="relative min-h-[28rem]">
                  <img src="/home/home-background.png" alt="Event venue preview" className="h-full min-h-[28rem] w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.5)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 p-5 backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {stats.map(([value, label]) => (
                        <div key={label} className="text-center">
                          <div className="text-2xl font-black sm:text-3xl">{value}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/65">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="scroll-mt-24 border-t border-black/5 bg-[#fbf8f4] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-pink-500">Upcoming</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none text-slate-950">Events</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
              Discover amazing events happening around you. Book your tickets and be a part of unforgettable
              moments.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 inline-flex rounded-xl bg-pink-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-400"
            >
              View All Events
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {upcomingEvents.map((event) => (
              <article
                key={event.title}
                className="group overflow-hidden rounded-[1.7rem] border border-black/6 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-35`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.45)_100%)]" />
                  <div className="absolute left-4 top-4 z-10 inline-block rounded-2xl bg-white px-3 py-2 text-center text-pink-500 shadow-lg">
                    <div className="text-xl font-black leading-none">{event.badge.split(" ")[0]}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em]">{event.badge.split(" ")[1]}</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-950">{event.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{event.place}</p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Time</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{event.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Price</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">₹{event.price}</p>
                    </div>
                  </div>
                  <button className="mt-5 w-full rounded-xl bg-pink-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-pink-400">
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 border-t border-black/5 bg-[#f7f2ed] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[0.28fr_0.72fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-pink-500">Browse</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none text-slate-950">Categories</h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-600">
              Choose from a variety of event categories and find the perfect event that matches your interest.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="mt-8 inline-flex rounded-xl bg-pink-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-400"
            >
              View All Categories
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-[1.5rem] border border-black/6 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={category.image} alt={category.title} className="h-full w-full object-cover" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent ${category.accent} opacity-25 mix-blend-multiply`}
                  />
                  <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/92 text-pink-500 shadow-lg">
                    <span className="text-sm font-black">E</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-950">{category.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {category.count}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-black/5 bg-[#fbf8f4] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-pink-500">About Us</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none text-slate-950">About Our Platform</h2>
            <p className="mt-6 text-sm leading-7 text-slate-600">
              Our Event Management System is designed to simplify the way events are planned, managed and executed.
              From small gatherings to grand celebrations, we provide all the tools you need.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {platformFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pink-500/12 text-pink-500">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
                      <path d="M12 3l2.9 5.9L21 10l-4.5 4.4L17.6 21 12 18l-5.6 3 1.1-6.6L3 10l6.1-1.1L12 3z" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-slate-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-black/6 bg-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
            <div className="relative">
              <video
                ref={aboutVideoRef}
                className="h-[24rem] w-full object-cover sm:h-[30rem]"
                src="/home/about-video.mp4.mp4"
                muted
                playsInline
                loop
                controls
                preload="metadata"
                poster="/home/home-background.png"
                aria-label="About our platform video"
                onPlay={() => setAboutVideoPlaying(true)}
                onPause={() => setAboutVideoPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
              {!aboutVideoPlaying && (
                <button
                  type="button"
                  onClick={handleAboutVideoToggle}
                  className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white/35 bg-pink-500/95 text-white shadow-[0_0_45px_rgba(236,72,153,0.4)] transition hover:scale-105"
                  aria-label="Play about platform video"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px bg-white/10 text-white sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="bg-black/45 p-5 text-center backdrop-blur-md">
                    <div className="text-3xl font-black">{value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/68">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-black/5 bg-[#f7f2ed] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-8 xl:grid-cols-[0.28fr_0.48fr_0.24fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-pink-500">Get in Touch</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none text-slate-950">Contact Us</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Have questions or want to create an event? We are here to help you. Reach out to us anytime.
            </p>

            <div className="mt-8 space-y-4">
              {contactDetails.map(([label, value]) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pink-500/12 text-pink-500">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
                      <path d="M12 21s7-5.8 7-11a7 7 0 10-14 0c0 5.2 7 11 7 11z" />
                      <path d="M12 10.5a2 2 0 100-4 2 2 0 010 4z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-pink-500">{label}</p>
                    <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:bg-white"
              />
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="Your Email"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:bg-white"
              />
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                placeholder="Subject"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:bg-white"
              />
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="Message"
                rows={6}
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-pink-400 focus:bg-white"
              />
            </div>

            {contactStatus && (
              <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {contactStatus}
              </p>
            )}

            {contactError && (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {contactError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-5 rounded-xl bg-pink-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-bold text-slate-950">Our Office</h3>
              <div className="mt-4 overflow-hidden rounded-2xl bg-slate-100">
                <div className="grid h-56 place-items-center bg-[radial-gradient(circle_at_center,#e2e8f0_0%,#f8fafc_40%,#e5e7eb_100%)]">
                  <div className="text-center">
                    <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/30">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M12 2C8.1 2 5 5.1 5 9c0 4.8 7 13 7 13s7-8.2 7-13c0-3.9-3.1-7-7-7zm0 9.3a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Map preview</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <h3 className="text-lg font-bold text-slate-950">Follow Us</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <span
                    key={item}
                    className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#07101d] px-5 py-12 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-10 lg:grid-cols-[1fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link to="/home" className="flex items-center gap-3 text-white">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-pink-400/40 bg-pink-500/15 text-pink-400">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.9]">
                  <path d="M4 8h16M7 4v4M17 4v4M5 8l1 11h12l1-11" />
                  <path d="M10 12l2 2 3-3" />
                </svg>
              </span>
              <div>
                <p className="text-lg font-black uppercase tracking-[0.18em] text-pink-400">Event</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-white/70">
                  Management System
                </p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Plan, organize, manage, and celebrate events with our complete event management platform.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.28em] text-white/80">Quick Links</h4>
            <div className="mt-5 space-y-3 text-sm text-white/65">
              {footerLinks.map(([label, id]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="block text-left transition hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.28em] text-white/80">Services</h4>
            <div className="mt-5 space-y-3 text-sm text-white/65">
              {[
                "Event Planning",
                "Venue Management",
                "Vendor Management",
                "Payment Management",
                "Staff Management",
              ].map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.28em] text-white/80">Contact Us</h4>
            <div className="mt-5 space-y-3 text-sm text-white/65">
              <div>+91 98765 43210</div>
              <div>info@eventsystem.com</div>
              <div>123 Event Street, City, Country - 400001</div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1450px] flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2024 Event Management System. All rights reserved.</p>
          <button type="button" onClick={() => scrollToSection("home")} className="inline-flex w-fit rounded-full border border-white/10 px-4 py-2">
            Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Home;

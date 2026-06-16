import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Share2,
  Star,
  Users,
  WandSparkles,
  CheckCircle2,
  UtensilsCrossed,
  LayoutPanelLeft,
  Camera,
  Music4,
  Armchair,
  PartyPopper,
  ShieldCheck,
} from "lucide-react";
import { DEFAULT_EVENT_IMAGE, handleImageError } from "../../user-dashboard/styles/components/imageFallback";

const eventCatalog = [
  {
    id: "1",
    title: "Wedding Celebration",
    location: "Udupi",
    rating: "4.8/5",
    reviewCount: 124,
    guests: "Up to 500 Guests",
    duration: "Full Day",
    startingPrice: "₹2,00,000",
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
      "https://images.unsplash.com/photo-1523438097201-512ae7d59bf9?w=600",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
    ],
    about:
      "Our complete wedding planning package takes care of every detail to make your big day magical and stress-free. From stunning decorations and delicious catering to professional photography, music, and guest management, we create unforgettable memories for you and your loved ones.",
    includedServices: [
      { label: "Catering", icon: UtensilsCrossed },
      { label: "Stage Decoration", icon: LayoutPanelLeft },
      { label: "Photography", icon: Camera },
      { label: "DJ & Lighting", icon: Music4 },
      { label: "Seating Arrangement", icon: Armchair },
      { label: "Guest Management", icon: Users },
    ],
    quickInfo: [
      { label: "Location", value: "Udupi", icon: MapPin },
      { label: "Best Season", value: "Oct - Mar", icon: CalendarDays },
      { label: "Notice Period", value: "15 Days", icon: Clock3 },
      { label: "Payment Terms", value: "50% Advance", icon: ShieldCheck },
      { label: "Cancellation Policy", value: "As per terms & conditions", icon: CheckCircle2 },
    ],
  },
  {
    id: "2",
    title: "Birthday Party",
    location: "Udupi",
    rating: "4.6/5",
    reviewCount: 91,
    guests: "Up to 100 Guests",
    duration: "Half Day",
    startingPrice: "₹50,000",
    heroImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
    ],
    about:
      "A cheerful birthday celebration setup with themed decor, music, catering, and seating that keeps guests engaged and the host relaxed.",
    includedServices: [
      { label: "Theme Decor", icon: PartyPopper },
      { label: "Cake Setup", icon: UtensilsCrossed },
      { label: "Photography", icon: Camera },
      { label: "Music", icon: Music4 },
      { label: "Kids Seating", icon: Armchair },
      { label: "Guest Support", icon: Users },
    ],
    quickInfo: [
      { label: "Location", value: "Udupi", icon: MapPin },
      { label: "Best Season", value: "Year Round", icon: CalendarDays },
      { label: "Notice Period", value: "7 Days", icon: Clock3 },
      { label: "Payment Terms", value: "30% Advance", icon: ShieldCheck },
      { label: "Cancellation Policy", value: "Flexible within 48 hours", icon: CheckCircle2 },
    ],
  },
  {
    id: "3",
    title: "Corporate Event",
    location: "Udupi",
    rating: "4.7/5",
    reviewCount: 86,
    guests: "Up to 300 Guests",
    duration: "Full Day",
    startingPrice: "₹1,50,000",
    heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
    ],
    about:
      "Professional corporate event support with conference setup, stage planning, AV support, and guest handling for polished business gatherings.",
    includedServices: [
      { label: "Stage Setup", icon: LayoutPanelLeft },
      { label: "AV Support", icon: Music4 },
      { label: "Seating", icon: Armchair },
      { label: "Catering", icon: UtensilsCrossed },
      { label: "Photography", icon: Camera },
      { label: "Guest Coordination", icon: Users },
    ],
    quickInfo: [
      { label: "Location", value: "Udupi", icon: MapPin },
      { label: "Best Season", value: "All Year", icon: CalendarDays },
      { label: "Notice Period", value: "10 Days", icon: Clock3 },
      { label: "Payment Terms", value: "50% Advance", icon: ShieldCheck },
      { label: "Cancellation Policy", value: "As per terms & conditions", icon: CheckCircle2 },
    ],
  },
];

const sidebarItems = [
  { label: "Dashboard", href: "/user/dashboard", icon: Menu },
  { label: "Browse Events", href: "/user/browse-events", icon: PartyPopper, active: true },
  { label: "My Bookings", href: "/user/my-bookings", icon: CheckCircle2 },
  { label: "Messages", href: "/user/help-support", icon: MessageCircle },
  { label: "Profile", href: "/user/profile", icon: Users },
  { label: "Settings", href: "/user/settings", icon: WandSparkles },
];

const formatEvent = (event) => {
  if (!event) return eventCatalog[0];
  return {
    ...eventCatalog[0],
    ...event,
    id: String(event.id || eventCatalog[0].id),
    rating: event.rating || eventCatalog[0].rating,
    reviewCount: event.reviewCount || eventCatalog[0].reviewCount,
    guests: event.guests ? `Up to ${event.guests} Guests` : eventCatalog[0].guests,
    startingPrice: event.price || eventCatalog[0].startingPrice,
    heroImage: event.image || eventCatalog[0].heroImage,
    about: event.description
      ? `${event.description}. ${eventCatalog[0].about}`
      : eventCatalog[0].about,
  };
};

export default function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const location = useLocation();

  const event = useMemo(() => {
    const stateEvent = location.state?.event;
    const catalogEvent = eventCatalog.find((item) => item.id === String(eventId));
    return formatEvent(stateEvent || catalogEvent);
  }, [eventId, location.state]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-800 bg-[#081634] text-white lg:block">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 px-5 py-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 font-bold shadow-lg shadow-blue-900/30">
                EMS
              </div>
              <div>
                <p className="text-xl font-extrabold leading-none">EMS</p>
                <p className="text-xs text-blue-100/70">Event Management System</p>
              </div>
            </div>

            <nav className="flex-1 px-3 pb-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => navigate(item.href)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        item.active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-blue-100/80 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="px-4 pb-6">
              <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-lg font-bold">
                    ?
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Need Help?</p>
                    <p className="text-xs text-blue-100/70">We’re here to help you</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <button
                  type="button"
                  onClick={() => navigate("/user/browse-events")}
                  className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-800"
                >
                  <ChevronLeft size={16} />
                  Back to Events
                </button>
                <span className="hidden sm:inline">/</span>
                <span className="hidden font-medium text-slate-700 sm:inline">Browse Events</span>
                <span className="hidden sm:inline">/</span>
                <span className="hidden font-medium text-slate-700 sm:inline">{event.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
                >
                  <Bell size={18} />
                </button>
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <img
                    src={DEFAULT_EVENT_IMAGE}
                    alt="User"
                    className="h-9 w-9 rounded-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold leading-none">Hi, John Doe</p>
                    <p className="text-xs text-slate-500">Client</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="min-w-0">
                <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-semibold text-blue-700">Browse Events</span>
                  <span>/</span>
                  <span className="font-medium text-slate-700">{event.title}</span>
                </div>

                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{event.title}</h1>
                    <div className="mt-2 flex items-center gap-2 text-slate-600">
                      <MapPin size={16} className="text-slate-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    {event.rating}
                    <span className="text-slate-500">({event.reviewCount} Reviews)</span>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                  <div className="relative">
                    <img
                      src={event.heroImage || DEFAULT_EVENT_IMAGE}
                      alt={event.title}
                      className="h-[420px] w-full object-cover"
                      onError={handleImageError}
                    />
                    <button
                      type="button"
                      className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-slate-700 shadow-lg"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-slate-700 shadow-lg"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-5">
                    {event.gallery.map((image, index) => (
                      <button
                        key={`${event.id}-gallery-${index}`}
                        type="button"
                        className={`relative overflow-hidden rounded-2xl border-2 ${index === 0 ? "border-blue-600" : "border-transparent"}`}
                      >
                        <img
                          src={image || DEFAULT_EVENT_IMAGE}
                          alt={`${event.title} ${index + 1}`}
                          className="h-24 w-full object-cover"
                          onError={handleImageError}
                        />
                        {index === 4 && (
                          <div className="absolute inset-0 grid place-items-center bg-slate-900/45 text-lg font-bold text-white">
                            +12
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">About This Event</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">{event.about}</p>
                </section>

                <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">Included Services</h2>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                    {event.includedServices.map((service) => {
                      const Icon = service.icon;
                      return (
                        <div
                          key={service.label}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm"
                        >
                          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-blue-700 shadow-sm">
                            <Icon size={22} />
                          </div>
                          <p className="mt-3 text-sm font-semibold text-slate-700">{service.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">Event Overview</h2>
                  <div className="mt-4 divide-y divide-slate-200">
                    <InfoRow label="Capacity" value={event.guests} />
                    <InfoRow label="Duration" value={event.duration} />
                    <InfoRow label="Starting Price" value={event.startingPrice} highlighted />
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/client/event-request")}
                    className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600"
                  >
                    Request This Event
                  </button>

                  <button
                    type="button"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Share2 size={16} />
                    Share Event
                  </button>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-950">Quick Info</h2>
                  <div className="mt-4 space-y-1">
                    {event.quickInfo.map((row) => {
                      const Icon = row.icon;
                      return (
                        <div key={row.label} className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-b-0">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Icon size={16} className="text-slate-500" />
                            <span>{row.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-900">{row.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-center">
                    <p className="text-sm text-slate-600">Have questions? Contact our support team.</p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Contact Support
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={DEFAULT_EVENT_IMAGE}
                      alt="Support"
                      className="h-14 w-14 rounded-2xl object-cover"
                      onError={handleImageError}
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-950">Need Help?</h3>
                      <p className="text-sm text-slate-500">We’re here to help you plan better.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      <Phone size={16} />
                      Call
                    </button>
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <MessageCircle size={16} />
                      Chat
                    </button>
                  </div>
                </section>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlighted = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${highlighted ? "text-orange-600" : "text-slate-900"}`}>{value}</span>
    </div>
  );
}

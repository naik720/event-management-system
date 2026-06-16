import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleCheckBig,
  Clock3,
  Home,
  LogOut,
  Menu,
  PanelLeft,
  UserCircle2,
  Users,
} from "lucide-react";

const topCards = [
  { label: "Assigned Events", value: "5", helper: "Total Events", tone: "blue", icon: CalendarDays },
  { label: "Today's Tasks", value: "3", helper: "Tasks Today", tone: "amber", icon: Clock3 },
  { label: "Completed Tasks", value: "12", helper: "Tasks Completed", tone: "green", icon: CheckCircle2 },
  { label: "Attendance Status", value: "Present", helper: "Today", tone: "violet", icon: CircleCheckBig },
];

const assignedEvents = [
  { event: "Wedding", venue: "Grand Palace", date: "20 Jun", status: "Upcoming" },
  { event: "Birthday", venue: "Dream Land", date: "22 Jun", status: "Upcoming" },
  { event: "Corporate", venue: "Taj Convention Center", date: "25 Jun", status: "Upcoming" },
];

const tasks = [
  { task: "Decoration Setup", event: "Wedding", deadline: "9 AM", status: "Pending" },
  { task: "Guest Coordination", event: "Birthday", deadline: "1 PM", status: "Completed" },
  { task: "Venue Check", event: "Corporate", deadline: "4 PM", status: "Pending" },
];

const taskProgress = {
  total: 12,
  completed: 7,
  pending: 5,
  overdue: 0,
};

const taskProgressItems = [
  {
    label: "Completed",
    value: taskProgress.completed,
    total: taskProgress.total,
    colorClass: "bg-emerald-500",
    trackClass: "bg-emerald-100",
  },
  {
    label: "Pending",
    value: taskProgress.pending,
    total: taskProgress.total,
    colorClass: "bg-amber-500",
    trackClass: "bg-amber-100",
  },
  {
    label: "Overdue",
    value: taskProgress.overdue,
    total: taskProgress.total,
    colorClass: "bg-red-500",
    trackClass: "bg-red-100",
  },
];

const attendanceSummary = [
  { label: "Present Days", value: "22" },
  { label: "Absent Days", value: "2" },
  { label: "Leave Days", value: "1" },
];

const sidebarItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "My Events", icon: CalendarDays },
  { label: "My Tasks", icon: Users },
  { label: "Attendance", icon: Clock3 },
  { label: "Shift Schedule", icon: PanelLeft },
  { label: "Profile", icon: UserCircle2 },
];

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const completedSweep = (taskProgress.completed / taskProgress.total) * 360;
  const pendingSweep = ((taskProgress.completed + taskProgress.pending) / taskProgress.total) * 360;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside
          className={`border-r border-slate-800 bg-[#0b1e3d] text-white transition-all duration-300 ${
            sidebarOpen ? "lg:w-[280px]" : "lg:w-[88px]"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-5">
              <div className={`${sidebarOpen ? "block" : "hidden lg:block"}`}>
                <p className="text-2xl font-extrabold tracking-tight">EMS</p>
                <p className="text-sm text-blue-100/80">Staff Management</p>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Toggle sidebar"
              >
                <Menu size={18} />
              </button>
            </div>

            <div className="px-5 pb-6">
              <div className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5">
                    <div className="grid h-full w-full place-items-center rounded-full bg-slate-900 text-xl font-bold">RS</div>
                  </div>
                  <div className={`${sidebarOpen ? "block" : "hidden lg:block"}`}>
                    <p className="text-lg font-semibold">Rahul Sharma</p>
                    <p className="text-sm text-blue-100/80">Event Manager</p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Online
                    </div>
                  </div>
                </div>
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
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        item.active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" : "text-blue-100/80 hover:bg-white/8 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      {sidebarOpen && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="px-3 pb-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl bg-white/8 px-4 py-3 text-left text-sm font-semibold text-orange-300 transition hover:bg-white/10"
              >
                <LogOut size={18} />
                {sidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Staff Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">Welcome back, Rahul! Here&apos;s an overview of your work.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 md:flex md:items-center md:gap-2">
                  <CalendarDays size={16} className="text-blue-600" />
                  Monday, June 15, 2026
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Bell size={18} />
                </button>
              </div>
            </div>
          </header>

          <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {topCards.map((card) => {
                const Icon = card.icon;
                const toneClass =
                  card.tone === "blue"
                    ? "from-blue-50 to-white text-blue-600"
                    : card.tone === "amber"
                    ? "from-amber-50 to-white text-amber-600"
                    : card.tone === "green"
                    ? "from-emerald-50 to-white text-emerald-600"
                    : "from-violet-50 to-white text-violet-600";

                return (
                  <article
                    key={card.label}
                    className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${toneClass} p-5 shadow-sm`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                        <p className="mt-3 text-4xl font-extrabold text-slate-950">{card.value}</p>
                        <p className="mt-2 text-sm text-slate-500">{card.helper}</p>
                      </div>
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm">
                        <Icon size={28} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">My Assigned Events</h2>
                    <p className="text-sm text-slate-500">Upcoming work allocated to you</p>
                  </div>
                  <button type="button" className="text-sm font-semibold text-blue-600">
                    View All
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-3">Event</th>
                        <th className="px-4 py-3">Venue</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {assignedEvents.map((row) => (
                        <tr key={row.event}>
                          <td className="px-4 py-4 font-semibold text-slate-900">{row.event}</td>
                          <td className="px-4 py-4 text-slate-600">{row.venue}</td>
                          <td className="px-4 py-4 text-slate-600">{row.date}</td>
                          <td className="px-4 py-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">My Tasks</h2>
                    <p className="text-sm text-slate-500">Track work for today</p>
                  </div>
                  <button type="button" className="text-sm font-semibold text-blue-600">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.task} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{task.task}</p>
                        <p className="text-sm text-slate-500">{task.event}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-700">{task.deadline}</p>
                        <span
                          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">Attendance Summary</h2>
                <p className="mt-1 text-sm text-slate-500">Recent attendance overview</p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {attendanceSummary.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="mt-2 text-3xl font-extrabold text-slate-950">{item.value}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">Profile</h2>
                <p className="mt-1 text-sm text-slate-500">Employee snapshot</p>
                <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-lg font-bold text-white">
                    RS
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Rahul Sharma</p>
                    <p className="text-sm text-slate-500">rahul@gmail.com</p>
                    <p className="text-sm text-slate-500">Event Manager</p>
                  </div>
                </div>
              </article>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-1">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-950">Task Progress</h2>
                  <p className="mt-1 text-sm text-slate-500">A quick breakdown of your assigned work</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div
                      className="grid h-40 w-40 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(#16a34a 0deg ${completedSweep}deg, #f59e0b ${completedSweep}deg ${pendingSweep}deg, #ef4444 ${pendingSweep}deg 360deg)`,
                      }}
                    >
                      <div className="grid h-[118px] w-[118px] place-items-center rounded-full bg-white text-center shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
                        <div>
                          <p className="text-4xl font-extrabold text-slate-950">{taskProgress.total}</p>
                          <p className="mt-1 text-sm text-slate-500">Total Tasks</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 text-sm">
                      {taskProgressItems.map((item) => {
                        const percent = taskProgress.total ? Math.round((item.value / item.total) * 100) : 0;
                        return (
                          <div key={item.label} className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 rounded-sm ${item.colorClass}`} />
                            <span className="w-20 font-medium text-slate-600">{item.label}</span>
                            <span className="text-slate-500">
                              {item.value} ({percent}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {taskProgressItems.map((item) => {
                      const percent = taskProgress.total ? Math.round((item.value / item.total) * 100) : 0;

                      return (
                        <div key={item.label}>
                          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                            <span className="font-semibold text-slate-800">{item.label}</span>
                            <span className="font-medium text-slate-500">
                              {item.value} / {item.total} ({percent}%)
                            </span>
                          </div>
                          <div className={`h-2 w-full overflow-hidden rounded-full ${item.trackClass}`}>
                            <div
                              className={`h-full rounded-full ${item.colorClass}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

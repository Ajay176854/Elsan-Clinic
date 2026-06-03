import { Users, UserRound, Calendar, FileText, MessageSquare, LayoutDashboard, Settings, LogOut, Video } from "lucide-react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import { DoctorsManagement, StaffManagement, PatientManagement, AppointmentManagement, PrescriptionEngine, SettingsPage } from "./components/DashboardPages";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Doctors", href: "/dashboard/doctors", icon: UserRound },
  { name: "Staff", href: "/dashboard/staff", icon: Users },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Telemedicine", href: "/dashboard/telemedicine", icon: Video },
  { name: "Prescriptions", href: "/dashboard/prescriptions", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Dashboard() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-slate-50 font-sans">
      {/* Sidebar */}
      <div className="hidden border-r bg-white md:block w-64 lg:w-72 shadow-sm">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <span className="text-blue-600">Elsan</span> Clinic
            </Link>
          </div>
          <div className="flex-1 py-4">
            <nav className="grid items-start px-4 text-sm font-medium gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                    location.pathname === item.href 
                      ? "bg-blue-50 text-blue-700 font-semibold" 
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-500 transition-all hover:text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/doctors" element={<DoctorsManagement />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/appointments" element={<AppointmentManagement />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/telemedicine" element={<PlaceholderPage title="Telemedicine Room" />} />
          <Route path="/prescriptions" element={<PrescriptionEngine />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">Welcome back! Here's what's happening at Elsan Clinic today.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Patients", value: "12,345", icon: Users, trend: "+12%", color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Today's Appointments", value: "42", icon: Calendar, trend: "Same", color: "text-orange-600", bg: "bg-orange-50" },
          { title: "Prescriptions Issued", value: "8,234", icon: FileText, trend: "+5%", color: "text-teal-600", bg: "bg-teal-50" },
          { title: "WhatsApp Deliveries", value: "99.8%", icon: MessageSquare, trend: "Stable", color: "text-green-600", bg: "bg-green-50" },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              <p className="text-xs font-medium text-slate-500 mt-1">
                <span className="text-emerald-600">{stat.trend}</span> from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center min-h-[300px]">
           <p className="text-slate-500 flex items-center gap-2"><ActivitySquare className="h-5 w-5" /> Patient Growth Chart (Vite Version)</p>
        </div>
        
        <div className="lg:col-span-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Today's Schedule</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {i + 8}:00
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Patient Consultation</p>
                  <p className="text-xs text-slate-500">Dr. Sarah Smith</p>
                </div>
                <div className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded">
                  Confirmed
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500">This module is being migrated to the new Vite architecture.</p>
    </div>
  );
}

// Temporary icon component for missing ActivitySquare in lucide-react early versions
function ActivitySquare(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M17 12h-2l-2 5-2-10-2 5H7" />
    </svg>
  )
}

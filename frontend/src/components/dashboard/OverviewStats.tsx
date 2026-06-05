import { Users, Calendar, FileText, MessageSquare } from "lucide-react";

export default function OverviewStats() {
  const stats = [
    { title: "Total Patients", value: "12,345", icon: Users, trend: "+12%", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Today's Appointments", value: "42", icon: Calendar, trend: "Same", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Prescriptions Issued", value: "8,234", icon: FileText, trend: "+5%", color: "text-teal-600", bg: "bg-teal-50" },
    { title: "WhatsApp Deliveries", value: "99.8%", icon: MessageSquare, trend: "Stable", color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
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
  );
}

import { Users, UserCog, Calendar, Activity, FileText, MessageCircle, DollarSign, Stethoscope } from "lucide-react";
import { usePatients, useDoctors } from "../../hooks";

export default function OverviewStats() {
  const { data: patients = [] } = usePatients();
  const { data: doctors = [] } = useDoctors();

  const stats = [
    { title: "Total Patients", value: patients.length.toString(), icon: Users, trend: "+12%", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Doctors", value: doctors.length.toString(), icon: Stethoscope, trend: "Stable", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Total Receptionists", value: "3", icon: UserCog, trend: "Stable", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Today's Appointments", value: "18", icon: Calendar, trend: "+2", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Today's Visits", value: "15", icon: Activity, trend: "+5", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Total Prescriptions", value: "1,245", icon: FileText, trend: "+45", color: "text-teal-600", bg: "bg-teal-50" },
    { title: "WhatsApp Sent Today", value: "42", icon: MessageCircle, trend: "+12", color: "text-green-600", bg: "bg-green-50" },
    { title: "Revenue (Monthly)", value: "₹ 1.2L", icon: DollarSign, trend: "Future", color: "text-slate-600", bg: "bg-slate-100" },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
            <p className="text-xs font-medium text-slate-500 mt-2">
              <span className={stat.trend.includes('+') ? 'text-emerald-600' : 'text-slate-500'}>{stat.trend}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

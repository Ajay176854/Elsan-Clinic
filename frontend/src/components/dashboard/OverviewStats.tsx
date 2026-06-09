import { Users, UserCog, Calendar, Activity, FileText, MessageCircle, Stethoscope, Loader2 } from "lucide-react";
import { useDashboardOverview } from "../../hooks/use-dashboard";

export default function OverviewStats() {
  const { data: overview, isLoading } = useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const stats = [
    { title: "Total Patients", value: overview?.total_patients?.toString() || "0", icon: Users, trend: "Active", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Doctors", value: overview?.total_doctors?.toString() || "0", icon: Stethoscope, trend: "Active", color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Total Receptionists", value: overview?.total_staff?.toString() || "0", icon: UserCog, trend: "Active", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Today's Appointments", value: overview?.todays_appointments?.toString() || "0", icon: Calendar, trend: "Today", color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Today's Visits", value: overview?.total_visits?.toString() || "0", icon: Activity, trend: "Today", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Total Prescriptions", value: overview?.total_prescriptions?.toString() || "0", icon: FileText, trend: "Issued", color: "text-teal-600", bg: "bg-teal-50" },
    { title: "WhatsApp Sent", value: overview?.whatsapp_deliveries?.toString() || "0", icon: MessageCircle, trend: "Delivered", color: "text-green-600", bg: "bg-green-50" },
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
              <span className={stat.trend === 'Today' || stat.trend === 'Active' ? 'text-emerald-600' : 'text-slate-500'}>{stat.trend}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

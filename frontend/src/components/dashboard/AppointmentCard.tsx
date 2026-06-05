import { Phone, Loader2 } from "lucide-react";
import { useAppointments } from "../../hooks";

export default function AppointmentCard() {
  const { data: appointments = [], isLoading } = useAppointments();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Appointments (Reception)</h2>
        <div className="flex gap-2 text-sm">
          <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">Today</button>
          <button className="text-slate-600 px-4 py-2 hover:bg-slate-100 rounded-lg font-semibold">Upcoming</button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-2 p-8 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/>Loading Appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="col-span-2 p-8 text-center text-slate-500 border border-slate-200 rounded-xl bg-white">No appointments scheduled for today.</div>
        ) : appointments.map((appt: any, i: number) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 text-orange-700 font-bold p-3 rounded-lg text-center leading-tight">
                {appt.appointment_time?.split(':')[0] || '10'}<br/><span className="text-xs">{Number(appt.appointment_time?.split(':')[0]) >= 12 ? 'PM' : 'AM'}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Patient ID: {appt.patient_id?.substring(0,8)}</h4>
                <p className="text-sm text-slate-500 flex items-center gap-1"><Phone size={14}/> +91 9988776655</p>
              </div>
            </div>
            <button className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded text-sm font-semibold hover:bg-slate-200">Mark Arrived</button>
          </div>
        ))}
      </div>
    </div>
  );
}

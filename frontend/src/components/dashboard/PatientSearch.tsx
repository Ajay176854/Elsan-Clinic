import { Plus, Search, Loader2 } from "lucide-react";
import { usePatients } from "../../hooks";

export default function PatientSearch() {
  const { data: patients = [], isLoading } = usePatients();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Patient Database</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition">
          <Plus size={18} /> Register Patient
        </button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Search by name, phone or ID..." className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/>Loading Patients...</div>
        ) : patients.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No patients registered yet. Enter a search term or add a patient.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Patient Code</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-blue-600">{p.patient_code}</td>
                  <td className="p-4 font-medium text-slate-800">{p.full_name}</td>
                  <td className="p-4 text-slate-600">{p.phone}</td>
                  <td className="p-4 text-blue-600 font-medium cursor-pointer hover:underline">View History</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

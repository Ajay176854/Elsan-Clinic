import { Plus, Loader2 } from "lucide-react";
import { useDoctors } from "../../hooks";

export default function DoctorsTable() {
  const { data: doctors = [], isLoading } = useDoctors();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Doctors Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={18} /> Add Doctor
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Specialization</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/>Loading Doctors...</td></tr>
            ) : doctors.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No doctors registered yet.</td></tr>
            ) : doctors.map((d: any, i: number) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{d.full_name || d.name}</td>
                <td className="p-4 text-slate-600">{d.specialization || d.spec}</td>
                <td className="p-4 text-slate-600">{d.phone}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${d.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{d.is_active !== false ? 'Active' : 'Inactive'}</span></td>
                <td className="p-4 text-blue-600 font-medium cursor-pointer hover:underline">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

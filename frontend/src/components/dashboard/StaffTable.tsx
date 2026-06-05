import { Plus } from "lucide-react";

export default function StaffTable() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Staff & Reception</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={18} /> Add Staff
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Shift</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-medium text-slate-800">Priya Sharma</td>
              <td className="p-4 text-slate-600">Head Receptionist</td>
              <td className="p-4 text-slate-600">Morning</td>
              <td className="p-4 text-blue-600 font-medium cursor-pointer hover:underline">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

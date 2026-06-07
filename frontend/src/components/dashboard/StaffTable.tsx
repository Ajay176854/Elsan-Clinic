import { Plus, UserCog, Edit, Lock, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export default function StaffTable() {
  const staffMembers = [
    { name: "Priya Sharma", role: "Head Receptionist", shift: "Morning", status: "Active" },
    { name: "Rahul Patel", role: "Admin", shift: "Flexible", status: "Active" },
    { name: "Sneha Gupta", role: "Nurse", shift: "Evening", status: "Inactive" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Staff Management</h2>
          <p className="text-slate-500 mt-1">Manage Doctors, Receptionists, Admins and roles.</p>
        </div>
        <Button className="bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Create Staff
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Button variant="outline" className="bg-white">All Staff</Button>
        <Button variant="outline" className="bg-white">Doctors</Button>
        <Button variant="outline" className="bg-white">Receptionists</Button>
        <Button variant="outline" className="bg-white">Admins</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Shift/Hours</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staffMembers.map((staff, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{staff.name}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                    {staff.role}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{staff.shift}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {staff.status}
                  </span>
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" title="Edit Staff">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-orange-600" title="Reset Password">
                    <Lock size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900" title="Assign Roles">
                    <UserCog size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

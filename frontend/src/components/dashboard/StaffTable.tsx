import { useState, useMemo } from "react";
import { Plus, UserCog, Edit, Lock, MoreHorizontal, Loader2, Power, PowerOff } from "lucide-react";
import { Button } from "../ui/button";
import { useStaff, useActivateStaff, useDeactivateStaff, useResetStaffPassword, useUser } from "../../hooks";
import { StaffFormModal } from "./StaffFormModal";
import { PasswordResetModal } from "./PasswordResetModal";
import type { StaffApiResponse } from "../../types/staff.types";

export default function StaffTable() {
  const { data: staffMembers = [], isLoading } = useStaff();
  const { mutateAsync: activateStaff, isPending: isActivating } = useActivateStaff();
  const { mutateAsync: deactivateStaff, isPending: isDeactivating } = useDeactivateStaff();
  const { mutateAsync: resetPassword, isPending: isResetting } = useResetStaffPassword();

  const { data: user } = useUser();
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'DIRECTOR';

  const [activeFilter, setActiveFilter] = useState<string>("All Staff");
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [staffForForm, setStaffForForm] = useState<StaffApiResponse | null>(null);
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [staffForPassword, setStaffForPassword] = useState<StaffApiResponse | null>(null);
  const [statusProcessingId, setStatusProcessingId] = useState<string | null>(null);

  const filteredStaff = useMemo(() => {
    if (activeFilter === "All Staff") return staffMembers;
    if (activeFilter === "Nurses") return staffMembers.filter((s: StaffApiResponse) => s.role === 'NURSE');
    if (activeFilter === "Receptionists") return staffMembers.filter((s: StaffApiResponse) => s.role === 'RECEPTIONIST');
    if (activeFilter === "Admins") return staffMembers.filter((s: StaffApiResponse) => ['SUPER_ADMIN', 'DIRECTOR'].includes(s.role));
    return staffMembers;
  }, [staffMembers, activeFilter]);

  const handleAddClick = () => {
    setStaffForForm(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (staff: StaffApiResponse) => {
    setStaffForForm(staff);
    setIsFormModalOpen(true);
  };

  const handleResetPasswordClick = (staff: StaffApiResponse) => {
    setStaffForPassword(staff);
    setIsPasswordModalOpen(true);
  };

  const handleResetPasswordSubmit = async (adminPass: string, newPass: string) => {
    if (!staffForPassword) return;
    await resetPassword({ id: staffForPassword.id, admin_password: adminPass, new_password: newPass });
    alert("Password reset successfully!");
    setIsPasswordModalOpen(false);
  };

  const handleToggleStatus = async (staff: StaffApiResponse) => {
    setStatusProcessingId(staff.id);
    try {
      if (staff.is_active) {
        await deactivateStaff(staff.id);
      } else {
        await activateStaff(staff.id);
      }
    } catch (err: any) {
      alert("Failed to change status: " + (err.response?.data?.detail || err.message));
    } finally {
      setStatusProcessingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Staff Management</h2>
          <p className="text-slate-500 mt-1">Manage Nurses, Receptionists, Admins and roles.</p>
        </div>
        <Button onClick={handleAddClick} className="bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 shadow-md">
          <Plus size={18} /> Create Staff
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        {["All Staff", "Nurses", "Receptionists", "Admins"].map(filter => (
          <Button 
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"} 
            className={activeFilter === filter ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-slate-600 hover:bg-slate-50"}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  <Loader2 className="animate-spin inline mr-2 text-blue-600" />
                  Loading Staff...
                </td>
              </tr>
            ) : filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No staff members found.
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff: StaffApiResponse) => (
                <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{staff.full_name}</td>
                  <td className="p-4 text-slate-600">
                    <div className="text-sm">{staff.email}</div>
                    <div className="text-xs text-slate-500">{staff.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      {staff.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${staff.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {staff.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50" title="Edit Staff" onClick={() => handleEditClick(staff)}>
                      <Edit size={16} />
                    </Button>
                    {isAdmin && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-orange-600 hover:bg-orange-50" title="Reset Password" onClick={() => handleResetPasswordClick(staff)}>
                        <Lock size={16} />
                      </Button>
                    )}
                    {isAdmin && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 ${staff.is_active ? 'text-slate-500 hover:text-red-600 hover:bg-red-50' : 'text-slate-500 hover:text-green-600 hover:bg-green-50'}`} 
                        title={staff.is_active ? "Deactivate" : "Activate"}
                        onClick={() => handleToggleStatus(staff)}
                        disabled={statusProcessingId === staff.id}
                      >
                        {statusProcessingId === staff.id ? <Loader2 size={16} className="animate-spin" /> : (staff.is_active ? <PowerOff size={16} /> : <Power size={16} />)}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <StaffFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        staff={staffForForm}
      />

      <PasswordResetModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handleResetPasswordSubmit}
        isLoading={isResetting}
      />
    </div>
  );
}

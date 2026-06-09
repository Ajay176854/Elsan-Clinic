import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateStaff, useUpdateStaff } from "../../hooks";
import type { StaffApiResponse, StaffCreateRequest, StaffUpdateRequest } from "../../types/staff.types";

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff?: StaffApiResponse | null;
}

export function StaffFormModal({ isOpen, onClose, staff }: StaffFormModalProps) {
  const isEditing = !!staff;
  
  const { mutateAsync: createStaff, isPending: isCreating } = useCreateStaff();
  const { mutateAsync: updateStaff, isPending: isUpdating } = useUpdateStaff();

  const isSubmitting = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "RECEPTIONIST",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (staff) {
      setFormData({
        full_name: staff.full_name,
        email: staff.email,
        phone: staff.phone,
        role: staff.role,
        password: "", // Password is not returned and shouldn't be edited here
      });
    } else {
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        role: "RECEPTIONIST",
        password: "",
      });
    }
    setError(null);
  }, [staff, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditing) {
        const updateData: StaffUpdateRequest = {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
        };
        await updateStaff({ id: staff.id, data: updateData });
      } else {
        const createData: StaffCreateRequest = {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        };
        await createStaff(createData);
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred.");
    }
  };

  const allowedRoles = ["RECEPTIONIST", "NURSE"];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Edit Staff Profile" : "Create New Staff"}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-1 rounded-full hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input 
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Initial Password</label>
              <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
                minLength={8}
                placeholder="Minimum 8 characters"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white disabled:bg-slate-50 disabled:text-slate-500"
              required
              disabled={isEditing}
            >
              {allowedRoles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
              {isEditing && !allowedRoles.includes(formData.role) && (
                <option value={formData.role}>{formData.role}</option>
              )}
            </select>
            {isEditing && (
              <p className="text-xs text-slate-500 mt-1">Role cannot be changed after creation.</p>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? "Saving..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Save Changes" : "Create Staff"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

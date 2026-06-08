import { useState, useRef } from "react";
import { Plus, User, FileText, Calendar, Loader2, Upload, Trash2, Camera, X } from "lucide-react";
import { useDoctors, useUploadSignature, useDeleteSignature, useDoctorStats, useResetDoctorPassword, useUser, useUploadProfilePic, useDeleteProfilePic } from "../../hooks";
import { Button } from "../ui/button";
import { DoctorFormModal } from "./DoctorFormModal";
import { PasswordResetModal } from "./PasswordResetModal";
import type { DoctorApiResponse } from "../../types/doctor.types";

export default function DoctorsTable() {
  const { data: doctors = [], isLoading } = useDoctors();
  const { mutateAsync: uploadSignature, isPending: isUploading } = useUploadSignature();
  const { mutateAsync: deleteSignature, isPending: isDeleting } = useDeleteSignature();
  const { mutateAsync: uploadProfilePic, isPending: isUploadingProfile } = useUploadProfilePic();
  const { mutateAsync: deleteProfilePic, isPending: isDeletingProfile } = useDeleteProfilePic();

  const { data: user } = useUser();
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'DIRECTOR';

  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const { data: doctorStats, isLoading: isLoadingStats } = useDoctorStats(selectedDoctorId);
  const { mutateAsync: resetPassword, isPending: isResetting } = useResetDoctorPassword();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [doctorForForm, setDoctorForForm] = useState<DoctorApiResponse | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePicInputRef = useRef<HTMLInputElement>(null);

  const selectedDoctor = doctors.find((d: any) => d.id === selectedDoctorId);

  const handleEditClick = (doc: DoctorApiResponse) => {
    setDoctorForForm(doc);
    setIsFormModalOpen(true);
  };

  const handleAddClick = () => {
    setDoctorForForm(null);
    setIsFormModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedDoctorId) {
      try {
        await uploadSignature({ id: selectedDoctorId, file: e.target.files[0] });
      } catch (err) {
        console.error("Signature upload failed", err);
      }
    }
  };

  const handleDeleteSignature = async () => {
    if (selectedDoctorId) {
      try {
        await deleteSignature(selectedDoctorId);
      } catch (err) {
        console.error("Signature deletion failed", err);
      }
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedDoctorId) {
      try {
        await uploadProfilePic({ id: selectedDoctorId, file: e.target.files[0] });
      } catch (err) {
        console.error("Profile pic upload failed", err);
      }
    }
  };

  const handleDeleteProfilePic = async () => {
    if (selectedDoctorId) {
      try {
        await deleteProfilePic(selectedDoctorId);
      } catch (err) {
        console.error("Profile pic deletion failed", err);
      }
    }
  };

  const handleResetPasswordSubmit = async (adminPass: string, newPass: string) => {
    if (!selectedDoctorId) return;
    await resetPassword({ id: selectedDoctorId, admin_password: adminPass, new_password: newPass });
    alert("Password reset successfully!");
    setIsPasswordModalOpen(false);
  };

  if (selectedDoctor) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Doctor Profile</h2>
          <Button variant="outline" onClick={() => setSelectedDoctorId(null)} className="border-slate-200 text-slate-700 hover:bg-slate-50">Back to List</Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center">
            <div className="relative group w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full flex items-center justify-center bg-slate-100 overflow-hidden border-2 border-slate-200 shadow-sm">
                {selectedDoctor.profile_pic_url ? (
                  <img src={selectedDoctor.profile_pic_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-400" />
                )}
              </div>
              
              {/* Overlay for uploading */}
              <div 
                className={`absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isUploadingProfile || isDeletingProfile ? 'opacity-100' : ''}`}
                onClick={() => !isUploadingProfile && !isDeletingProfile && profilePicInputRef.current?.click()}
              >
                {isUploadingProfile ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Delete button (if profile pic exists) */}
              {selectedDoctor.profile_pic_url && !isUploadingProfile && !isDeletingProfile && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteProfilePic(); }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                  title="Remove Profile Picture"
                >
                  {isDeletingProfile ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                </button>
              )}
              
              <input 
                type="file" 
                ref={profilePicInputRef} 
                onChange={handleProfilePicChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{selectedDoctor.full_name || selectedDoctor.name}</h3>
            <p className="text-slate-500 font-medium">{selectedDoctor.qualification || 'MBBS, MD'}</p>
            <span className="mt-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold">{selectedDoctor.specialization || selectedDoctor.spec}</span>
            <div className="mt-6 w-full space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Experience</span>
                <span className="font-medium text-slate-800">{selectedDoctor.experience_years !== undefined ? `${selectedDoctor.experience_years} Years` : '10 Years'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Consultation Fee</span>
                <span className="font-medium text-slate-800">₹{selectedDoctor.consultation_fee !== undefined ? selectedDoctor.consultation_fee : '500'}</span>
              </div>
            </div>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleEditClick(selectedDoctor)}>Edit Profile</Button>
            {isAdmin && (
              <Button 
                variant="outline"
                className="w-full mt-3 border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Reset Password
              </Button>
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><User size={16}/> Patients Today</div>
                <div className="text-2xl font-bold text-slate-800">
                  {isLoadingStats ? <Loader2 className="w-6 h-6 animate-spin text-slate-300" /> : doctorStats?.patients_today || 0}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><Calendar size={16}/> Appointments</div>
                <div className="text-2xl font-bold text-slate-800">
                  {isLoadingStats ? <Loader2 className="w-6 h-6 animate-spin text-slate-300" /> : doctorStats?.total_appointments || 0}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><FileText size={16}/> Prescriptions</div>
                <div className="text-2xl font-bold text-slate-800">
                  {isLoadingStats ? <Loader2 className="w-6 h-6 animate-spin text-slate-300" /> : doctorStats?.total_prescriptions || 0}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2">Schedule & Availability</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Working Days</p>
                  <p className="font-medium text-slate-800">Mon, Tue, Wed, Thu, Fri, Sat</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Available Slots</p>
                  <p className="font-medium text-slate-800">{selectedDoctor.consultation_timings || '10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2">Digital Signature</h3>
              {selectedDoctor.signature_url ? (
                <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-slate-50">
                  <div className="relative border bg-white rounded-lg p-2 max-w-[250px] max-h-[120px] overflow-hidden flex items-center justify-center">
                    <img 
                      src={selectedDoctor.signature_url} 
                      alt="Doctor Signature" 
                      className="object-contain max-w-full max-h-[100px]"
                    />
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteSignature}
                    disabled={isDeleting}
                    className="flex items-center gap-2"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Remove Signature
                  </Button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                  ) : (
                    <Upload size={32} className="text-slate-400 mb-2" />
                  )}
                  <span className="font-medium">Upload Signature Image</span>
                  <span className="text-xs mt-1">PNG or JPG (max 2MB)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DoctorFormModal 
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          doctor={doctorForForm}
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Doctors Management</h2>
          <p className="text-slate-500 mt-1">Manage doctor profiles, schedules, and signatures.</p>
        </div>
        <Button onClick={handleAddClick} className="bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 shadow-md">
          <Plus size={18} /> Add Doctor
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Specialization</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  <Loader2 className="animate-spin inline mr-2 text-blue-600" />
                  Loading Doctors...
                </td>
              </tr>
            ) : doctors.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No doctors registered yet.
                </td>
              </tr>
            ) : (
              doctors.map((d: any, i: number) => (
                <tr key={d.id || i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{d.full_name || d.name}</td>
                  <td className="p-4 text-slate-600">{d.specialization || d.spec}</td>
                  <td className="p-4 text-slate-600">{d.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${d.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {d.is_active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" className="text-blue-600 font-medium hover:bg-blue-50" onClick={() => setSelectedDoctorId(d.id)}>
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DoctorFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        doctor={doctorForForm}
      />
    </div>
  );
}

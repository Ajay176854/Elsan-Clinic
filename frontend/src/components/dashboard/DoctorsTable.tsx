import { useState } from "react";
import { Plus, User, FileText, Calendar, Loader2 } from "lucide-react";
import { useDoctors } from "../../hooks";
import { Button } from "../ui/button";

export default function DoctorsTable() {
  const { data: doctors = [], isLoading } = useDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  if (selectedDoctor) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Doctor Profile</h2>
          <Button variant="outline" onClick={() => setSelectedDoctor(null)}>Back to List</Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <User size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{selectedDoctor.full_name || selectedDoctor.name}</h3>
            <p className="text-slate-500 font-medium">{selectedDoctor.qualification || 'MBBS, MD'}</p>
            <span className="mt-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold">{selectedDoctor.specialization || selectedDoctor.spec}</span>
            <div className="mt-6 w-full space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Experience</span>
                <span className="font-medium text-slate-800">{selectedDoctor.experience || '10 Years'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Consultation Fee</span>
                <span className="font-medium text-slate-800">₹{selectedDoctor.consultation_fee || '500'}</span>
              </div>
            </div>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><User size={16}/> Patients Today</div>
                <div className="text-2xl font-bold text-slate-800">15</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><Calendar size={16}/> Appointments</div>
                <div className="text-2xl font-bold text-slate-800">18</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 text-slate-500 mb-2"><FileText size={16}/> Prescriptions</div>
                <div className="text-2xl font-bold text-slate-800">12</div>
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
                  <p className="font-medium text-slate-800">10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 border-b pb-2">Digital Signature</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition">
                <span className="font-medium">Upload Signature Image</span>
                <span className="text-xs mt-1">PNG or JPG (max 2MB)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Doctors Management</h2>
          <p className="text-slate-500 mt-1">Manage doctor profiles, schedules, and signatures.</p>
        </div>
        <Button className="bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Add Doctor
        </Button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
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
              <tr><td colSpan={5} className="p-8 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/>Loading Doctors...</td></tr>
            ) : doctors.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No doctors registered yet.</td></tr>
            ) : doctors.map((d: any, i: number) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{d.full_name || d.name}</td>
                <td className="p-4 text-slate-600">{d.specialization || d.spec}</td>
                <td className="p-4 text-slate-600">{d.phone}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${d.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{d.is_active !== false ? 'Active' : 'Inactive'}</span></td>
                <td className="p-4 text-right">
                  <Button variant="ghost" className="text-blue-600 font-medium hover:bg-blue-50" onClick={() => setSelectedDoctor(d)}>View Profile</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

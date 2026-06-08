import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCreateDoctor, useUpdateDoctor } from "../../hooks";
import { Loader2 } from "lucide-react";
import type { DoctorApiResponse } from "../../types/doctor.types";

interface DoctorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor?: DoctorApiResponse | null;
  onSuccess?: (updatedDoctor: any) => void;
}

export function DoctorFormModal({ isOpen, onClose, doctor, onSuccess }: DoctorFormModalProps) {
  const { mutateAsync: createDoctor, isPending: isCreating } = useCreateDoctor();
  const { mutateAsync: updateDoctor, isPending: isUpdating } = useUpdateDoctor();
  const isPending = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
    qualification: '',
    experience_years: 0,
    consultation_fee: 0,
    consultation_timings: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (doctor) {
      setFormData({
        full_name: doctor.full_name || doctor.name || '',
        email: doctor.email || '',
        phone: doctor.phone || '',
        password: '', // not editable/visible
        specialization: doctor.specialization || doctor.spec || '',
        qualification: doctor.qualification || '',
        experience_years: doctor.experience_years || 0,
        consultation_fee: doctor.consultation_fee || 0,
        consultation_timings: doctor.consultation_timings || '',
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        specialization: '',
        qualification: '',
        experience_years: 0,
        consultation_fee: 0,
        consultation_timings: '',
      });
    }
    setErrorMsg('');
  }, [doctor, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (doctor) {
        // Edit mode
        const payload: Record<string, any> = {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          specialization: formData.specialization,
          qualification: formData.qualification,
          experience_years: formData.experience_years,
          consultation_fee: formData.consultation_fee,
          consultation_timings: formData.consultation_timings || undefined,
        };
        const updated = await updateDoctor({ id: doctor.id, data: payload });
        if (onSuccess) onSuccess(updated);
        onClose();
      } else {
        // Add mode
        if (!formData.password) {
          setErrorMsg('Password is required when adding a new doctor.');
          return;
        }
        const payload = {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          specialization: formData.specialization,
          qualification: formData.qualification,
          experience_years: formData.experience_years,
          consultation_fee: formData.consultation_fee,
          consultation_timings: formData.consultation_timings || undefined,
        };
        await createDoctor(payload);
        onClose();
      }
    } catch (error: any) {
      console.error("Failed to save doctor details:", error);
      setErrorMsg(error.response?.data?.detail || "An error occurred while saving. Please check the inputs.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-0">
        <DialogHeader className="bg-slate-50 border-b border-slate-100 p-6">
          <DialogTitle className="text-xl font-bold text-slate-800">
            {doctor ? 'Edit Doctor Profile' : 'Register New Doctor'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-100">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name" className="text-slate-700 font-medium">Full Name *</Label>
              <Input
                id="full_name"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Dr. Name"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@elsanclinic.com"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-slate-700 font-medium">Contact Number *</Label>
              <Input
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91XXXXXXXXXX"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
            {!doctor && (
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="specialization" className="text-slate-700 font-medium">Specialization *</Label>
              <Input
                id="specialization"
                name="specialization"
                required
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. Pediatrics, Cardiology"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qualification" className="text-slate-700 font-medium">Qualification *</Label>
              <Input
                id="qualification"
                name="qualification"
                required
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. MBBS, MD"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="experience_years" className="text-slate-700 font-medium">Years of Experience *</Label>
              <Input
                id="experience_years"
                name="experience_years"
                type="number"
                min="0"
                required
                value={formData.experience_years}
                onChange={handleChange}
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="consultation_fee" className="text-slate-700 font-medium">Consultation Fee (₹) *</Label>
              <Input
                id="consultation_fee"
                name="consultation_fee"
                type="number"
                min="0"
                required
                value={formData.consultation_fee}
                onChange={handleChange}
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="consultation_timings" className="text-slate-700 font-medium">Consultation Timings</Label>
            <Input
              id="consultation_timings"
              name="consultation_timings"
              value={formData.consultation_timings}
              onChange={handleChange}
              placeholder="e.g. Mon-Sat: 10:00 AM - 02:00 PM"
              className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
            />
          </div>

          <DialogFooter className="bg-slate-50 border-t border-slate-100 p-6 flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending} className="border-slate-200 hover:bg-slate-100 text-slate-700">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {doctor ? 'Save Changes' : 'Register Doctor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

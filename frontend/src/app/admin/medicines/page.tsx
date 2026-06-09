"use client";
import React, { useState, useRef, useMemo } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Search, Upload, Plus, Edit, Trash2, FileSpreadsheet, Loader2 } from "lucide-react";
import { useMedicines, useUploadMedicines, useDeleteMedicine } from "../../../hooks";
import { MedicineFormModal } from "../../../components/dashboard/MedicineFormModal";
import type { MedicineApiResponse } from "../../../types/medicine.types";

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: medicines = [], isLoading } = useMedicines();
  const { mutateAsync: uploadMedicines, isPending: isUploading } = useUploadMedicines();
  const { mutateAsync: deleteMedicine, isPending: isDeleting } = useDeleteMedicine();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [medicineForForm, setMedicineForForm] = useState<MedicineApiResponse | null>(null);

  const csvInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'excel') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await uploadMedicines(file);
      alert(`Successfully uploaded! Added: ${res.medicines_added || 0}, Updated: ${res.medicines_updated || 0}`);
    } catch (error: any) {
      alert("Failed to upload file: " + (error.response?.data?.detail || error.message));
    } finally {
      if (type === 'csv' && csvInputRef.current) csvInputRef.current.value = '';
      if (type === 'excel' && excelInputRef.current) excelInputRef.current.value = '';
    }
  };

  const dynamicColumns = useMemo(() => {
    const cols = new Set<string>();
    medicines.forEach(m => {
      if (m.dynamic_fields) {
        Object.keys(m.dynamic_fields).forEach(k => cols.add(k));
      }
    });
    return Array.from(cols).sort();
  }, [medicines]);

  const filteredMedicines = useMemo(() => {
    if (!searchQuery) return medicines;
    const lowerQ = searchQuery.toLowerCase();
    return medicines.filter(m => 
      m.name.toLowerCase().includes(lowerQ) || 
      m.generic_name?.toLowerCase().includes(lowerQ) ||
      (m.dynamic_fields && Object.values(m.dynamic_fields).some(v => String(v).toLowerCase().includes(lowerQ)))
    );
  }, [medicines, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Medicine Master</h1>
          <p className="text-muted-foreground mt-2">Manage clinic medicines, upload inventory, and control stock.</p>
        </div>
        <div className="flex gap-2">
          <input type="file" ref={excelInputRef} className="hidden" accept=".xlsx" onChange={(e) => handleFileUpload(e, 'excel')} />
          <Button 
            variant="outline" 
            className="bg-white flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
            onClick={() => excelInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="animate-spin" size={16}/> : <FileSpreadsheet size={16} />} 
            Upload Excel
          </Button>

          <input type="file" ref={csvInputRef} className="hidden" accept=".csv" onChange={(e) => handleFileUpload(e, 'csv')} />
          <Button 
            variant="outline" 
            className="bg-white flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => csvInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16} />} 
            Upload CSV
          </Button>

          <Button 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            onClick={() => { setMedicineForForm(null); setIsFormModalOpen(true); }}
          >
            <Plus size={16} /> Add Medicine
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search medicines by name, generic name, or dynamic fields..." 
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Medicine Name</th>
                <th className="p-4 font-semibold">Generic Name</th>
                {dynamicColumns.map(col => (
                  <th key={col} className="p-4 font-semibold capitalize">{col.replace(/_/g, ' ')}</th>
                ))}
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={10} className="p-8 text-center text-slate-500"><Loader2 className="animate-spin mx-auto"/></td></tr>
              ) : filteredMedicines.length === 0 ? (
                 <tr><td colSpan={10} className="p-8 text-center text-slate-500">No medicines found in the inventory.</td></tr>
              ) : (
                filteredMedicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{med.name}</td>
                    <td className="p-4 text-slate-600">{med.generic_name || '-'}</td>
                    {dynamicColumns.map(col => (
                      <td key={col} className="p-4 text-slate-600">
                        {med.dynamic_fields && med.dynamic_fields[col] !== undefined ? String(med.dynamic_fields[col]) : '-'}
                      </td>
                    ))}
                    <td className="p-4 flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-500 hover:text-blue-600" 
                        title="Edit Medicine"
                        onClick={() => { setMedicineForForm(med); setIsFormModalOpen(true); }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-500 hover:text-red-600" 
                        title="Delete Medicine"
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this medicine?")) {
                            await deleteMedicine(med.id);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MedicineFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        medicine={medicineForForm}
      />
    </div>
  );
}

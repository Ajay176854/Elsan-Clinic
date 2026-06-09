import { useState, useEffect } from "react";
import { X, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateMedicine, useUpdateMedicine } from "../../hooks";
import type { MedicineApiResponse } from "../../types/medicine.types";

interface MedicineFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine?: MedicineApiResponse | null;
}

export function MedicineFormModal({ isOpen, onClose, medicine }: MedicineFormModalProps) {
  const isEditing = !!medicine;
  
  const { mutateAsync: createMedicine, isPending: isCreating } = useCreateMedicine();
  const { mutateAsync: updateMedicine, isPending: isUpdating } = useUpdateMedicine();

  const isSubmitting = isCreating || isUpdating;

  const [formData, setFormData] = useState({
    name: "",
    generic_name: "",
    default_dosage: "",
    default_frequency: "",
    default_instructions: "",
  });

  const [dynamicFields, setDynamicFields] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (medicine) {
        setFormData({
          name: medicine.name || "",
          generic_name: medicine.generic_name || "",
          default_dosage: medicine.default_dosage || "",
          default_frequency: medicine.default_frequency || "",
          default_instructions: medicine.default_instructions || "",
        });
        
        if (medicine.dynamic_fields) {
          const fields = Object.entries(medicine.dynamic_fields).map(([k, v]) => ({ key: k, value: String(v) }));
          setDynamicFields(fields);
        } else {
          setDynamicFields([]);
        }
      } else {
        setFormData({
          name: "",
          generic_name: "",
          default_dosage: "",
          default_frequency: "",
          default_instructions: "",
        });
        setDynamicFields([]);
      }
    }
  }, [isOpen, medicine]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedDynamicFields = dynamicFields.reduce((acc, field) => {
      if (field.key.trim()) {
        acc[field.key.trim()] = field.value.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    try {
      if (isEditing && medicine) {
        await updateMedicine({ 
          id: medicine.id, 
          data: { ...formData, dynamic_fields: formattedDynamicFields } 
        });
      } else {
        await createMedicine({ ...formData, dynamic_fields: formattedDynamicFields });
      }
      onClose();
    } catch (err: any) {
      alert("Failed to save medicine: " + (err.response?.data?.detail || err.message));
    }
  };

  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { key: "", value: "" }]);
  };

  const updateDynamicField = (index: number, field: 'key' | 'value', val: string) => {
    const newFields = [...dynamicFields];
    newFields[index][field] = val;
    setDynamicFields(newFields);
  };

  const removeDynamicField = (index: number) => {
    const newFields = [...dynamicFields];
    newFields.splice(index, 1);
    setDynamicFields(newFields);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b px-6 py-4 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Edit Medicine" : "Add New Medicine"}
          </h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="col-span-1 md:col-span-2 space-y-1">
              <label className="text-sm font-medium text-slate-700">Medicine Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                placeholder="e.g. Paracetamol 500mg"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Generic Name / Composition</label>
              <input
                type="text"
                value={formData.generic_name}
                onChange={(e) => setFormData({ ...formData, generic_name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                placeholder="e.g. Acetaminophen"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Default Dosage</label>
              <input
                type="text"
                value={formData.default_dosage}
                onChange={(e) => setFormData({ ...formData, default_dosage: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                placeholder="e.g. 1 Tablet"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Default Frequency</label>
              <input
                type="text"
                value={formData.default_frequency}
                onChange={(e) => setFormData({ ...formData, default_frequency: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                placeholder="e.g. Twice a day"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Instructions</label>
              <input
                type="text"
                value={formData.default_instructions}
                onChange={(e) => setFormData({ ...formData, default_instructions: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                placeholder="e.g. After food"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800">Dynamic Fields (From CSV/Excel)</h3>
              <Button type="button" variant="outline" size="sm" onClick={addDynamicField} className="h-8 text-xs flex items-center gap-1">
                <Plus size={14} /> Add Field
              </Button>
            </div>
            
            {dynamicFields.length === 0 ? (
              <p className="text-sm text-slate-500 italic text-center py-4 bg-slate-50 rounded border border-dashed">
                No dynamic fields. Add custom attributes like Type, Price, or Stock here.
              </p>
            ) : (
              <div className="space-y-2">
                {dynamicFields.map((field, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={field.key}
                      onChange={(e) => updateDynamicField(idx, 'key', e.target.value)}
                      placeholder="Field Name (e.g. Stock)"
                      className="w-1/3 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateDynamicField(idx, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeDynamicField(idx)} className="h-8 w-8 text-slate-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="border-t p-4 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              isEditing ? "Save Changes" : "Create Medicine"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

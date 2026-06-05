import { FileText, Plus } from "lucide-react";

export default function PrescriptionForm() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Digital Prescription Editor</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition">
          <FileText size={18} /> Generate PDF & Send
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-700 border-b pb-2">Patient Vitals</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Symptoms (e.g. Fever, Cough)" className="border p-2 rounded" />
              <input type="text" placeholder="Diagnosis" className="border p-2 rounded" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-700 border-b pb-2 flex justify-between items-center">
              Medicines <button className="text-blue-600 text-sm flex items-center gap-1"><Plus size={14}/> Add Row</button>
            </h3>
            <div className="flex gap-2 items-center text-sm font-medium text-slate-600">
              <span className="flex-1">Medicine Name</span>
              <span className="w-16 text-center">M</span>
              <span className="w-16 text-center">A</span>
              <span className="w-16 text-center">N</span>
              <span className="w-20">Days</span>
            </div>
            <div className="flex gap-2">
              <input type="text" value="Paracetamol 650mg" readOnly className="flex-1 border p-2 rounded bg-slate-50" />
              <input type="number" value="1" readOnly className="w-16 border p-2 rounded text-center bg-slate-50" />
              <input type="number" value="0" readOnly className="w-16 border p-2 rounded text-center bg-slate-50" />
              <input type="number" value="1" readOnly className="w-16 border p-2 rounded text-center bg-slate-50" />
              <input type="number" value="5" readOnly className="w-20 border p-2 rounded text-center bg-slate-50" />
            </div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl text-white flex flex-col items-center justify-center text-center space-y-4">
          <FileText size={48} className="text-slate-400" />
          <h3 className="text-xl font-bold">PDF Preview</h3>
          <p className="text-sm text-slate-400">Complete the form to generate the Cloudinary hosted PDF and trigger the WhatsApp API.</p>
        </div>
      </div>
    </div>
  );
}

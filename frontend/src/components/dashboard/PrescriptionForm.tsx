import { FileText, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PrescriptionForm() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Digital Prescription Editor</h2>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <FileText className="mr-2 h-4 w-4" /> Generate PDF & Send
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader className="border-b pb-4 mb-4">
              <CardTitle className="text-lg">Patient Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Symptoms (e.g. Fever, Cough)" />
                <Input placeholder="Diagnosis" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b pb-4 mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg mt-1.5">Medicines</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 h-8">
                <Plus className="mr-1 h-4 w-4" /> Add Row
              </Button>
            </CardHeader>
            <CardContent>
            <div className="flex gap-2 items-center text-sm font-medium text-slate-600">
              <span className="flex-1">Medicine Name</span>
              <span className="w-16 text-center">M</span>
              <span className="w-16 text-center">A</span>
              <span className="w-16 text-center">N</span>
              <span className="w-20">Days</span>
            </div>
            <div className="flex gap-2">
              <Input value="Paracetamol 650mg" readOnly className="flex-1 bg-slate-50" />
              <Input type="number" value="1" readOnly className="w-16 text-center bg-slate-50" />
              <Input type="number" value="0" readOnly className="w-16 text-center bg-slate-50" />
              <Input type="number" value="1" readOnly className="w-16 text-center bg-slate-50" />
              <Input type="number" value="5" readOnly className="w-20 text-center bg-slate-50" />
            </div>
            </CardContent>
          </Card>
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

import { Plus, Search, Loader2 } from "lucide-react";
import { usePatients } from "../../hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function PatientSearch() {
  const { data: patients = [], isLoading } = usePatients();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Patient Database</h2>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" /> Register Patient
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input placeholder="Search by name, phone or ID..." className="pl-10 h-11 bg-white" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/>Loading Patients...</div>
        ) : patients.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No patients registered yet. Enter a search term or add a patient.</div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Patient Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-blue-600">{p.patient_code}</TableCell>
                  <TableCell className="font-medium text-slate-800">{p.full_name}</TableCell>
                  <TableCell className="text-slate-600">{p.phone}</TableCell>
                  <TableCell className="text-blue-600 font-medium cursor-pointer hover:underline">View History</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

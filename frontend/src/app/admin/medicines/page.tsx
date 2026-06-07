"use client";
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Search, Upload, Plus, Edit, Trash2, FileSpreadsheet } from "lucide-react";

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockMedicines = [
    { id: 1, name: "Paracetamol 500mg", type: "Tablet", stock: 1500, price: "₹2.50" },
    { id: 2, name: "Amoxicillin 250mg", type: "Capsule", stock: 800, price: "₹5.00" },
    { id: 3, name: "Cough Syrup SF", type: "Syrup", stock: 120, price: "₹85.00" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Medicine Master</h1>
          <p className="text-muted-foreground mt-2">Manage clinic medicines, upload inventory, and control stock.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50">
            <FileSpreadsheet size={16} /> Upload Excel
          </Button>
          <Button variant="outline" className="bg-white flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
            <Upload size={16} /> Upload CSV
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
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
              placeholder="Search medicines by name or type..." 
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-semibold">Medicine Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Unit Price</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockMedicines.map((med) => (
              <tr key={med.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">{med.name}</td>
                <td className="p-4 text-slate-600">{med.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${med.stock < 200 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                    {med.stock} Units
                  </span>
                </td>
                <td className="p-4 text-slate-600">{med.price}</td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" title="Edit Medicine">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600" title="Delete Medicine">
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

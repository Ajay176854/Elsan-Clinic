"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus, CheckCircle2, ShieldAlert } from "lucide-react";

export default function PermissionsPage() {
  const roles = [
    { name: "Super Admin", users: 1, permissions: "All Access" },
    { name: "Doctor", users: 8, permissions: "Appointments, Prescriptions, Telemed" },
    { name: "Head Receptionist", users: 2, permissions: "Patients, Appointments, Staff View" },
    { name: "Nurse", users: 5, permissions: "Inpatients, Vitals, Appointments View" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Permissions System</h1>
          <p className="text-muted-foreground mt-2">Manage roles, permissions, and access controls for the platform.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-lg font-bold text-slate-800">Roles</CardTitle>
            </CardHeader>
            <div className="flex flex-col">
              {roles.map((role, i) => (
                <div key={i} className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 ${i === 0 ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}>
                  <h4 className={`font-bold ${i === 0 ? 'text-blue-700' : 'text-slate-800'}`}>{role.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{role.users} Users assigned</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">Super Admin <ShieldAlert size={18} className="text-blue-600"/></CardTitle>
                <p className="text-sm text-slate-500 mt-1">Full system access and configuration.</p>
              </div>
              <Button variant="outline">Edit Role</Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-700 border-b pb-2">Core Modules</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Dashboard Overview</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Patient Management</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Appointments</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Prescriptions</div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-700 border-b pb-2">Administration</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Doctor Management</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Staff Management</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Clinic Settings</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> WhatsApp Settings</div>
                  <div className="flex items-center gap-2 text-sm text-slate-700"><CheckCircle2 size={16} className="text-green-500"/> Audit Logs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

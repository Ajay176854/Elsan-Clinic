"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Users, UserCheck, Calendar, Activity, TrendingUp, BarChart3, PieChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">View statistics for patients, doctors, appointments, and revenue.</p>
        </div>
        <select className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-2">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Users className="text-blue-600"/> Patient Reports</h2>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Daily Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-green-600 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> +12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Monthly Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,204</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex justify-between">Demographics <PieChart size={14}/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Male</span> <span className="font-medium">55%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Female</span> <span className="font-medium">45%</span></div>
              <div className="flex justify-between mt-2 pt-2 border-t"><span className="text-slate-500">Avg Age</span> <span className="font-medium">34 yrs</span></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><UserCheck className="text-emerald-600"/> Doctor Reports</h2>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Prescriptions Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">790</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex justify-between">Followups <Activity size={14}/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Scheduled</span> <span className="font-medium">120</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Completed</span> <span className="font-medium">95</span></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar className="text-orange-600"/> Appointment Reports</h2>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Booked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,450</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">1,280</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex justify-between">Cancelled <BarChart3 size={14}/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="text-2xl font-bold text-red-600">170</div>
              <p className="text-xs text-slate-500 mt-1">11.7% cancellation rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

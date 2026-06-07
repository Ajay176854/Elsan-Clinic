"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { CheckCircle2, XCircle, Send, Check, CheckCheck, AlertCircle } from "lucide-react";

export default function WhatsAppPage() {
  const logs = [
    { id: 1, to: "+91 9876543210", type: "Prescription PDF", status: "Read", time: "10:30 AM" },
    { id: 2, to: "+91 8765432109", type: "Appointment Confirmation", status: "Delivered", time: "10:15 AM" },
    { id: 3, to: "+91 7654321098", type: "Welcome Message", status: "Sent", time: "09:45 AM" },
    { id: 4, to: "+91 6543210987", type: "Prescription PDF", status: "Failed", time: "09:30 AM" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Sent": return <Send size={14} className="text-slate-400" />;
      case "Delivered": return <Check size={14} className="text-slate-400" />;
      case "Read": return <CheckCheck size={14} className="text-blue-500" />;
      case "Failed": return <AlertCircle size={14} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">WhatsApp Management</h1>
          <p className="text-muted-foreground mt-2">Manage Meta API settings, view message logs, and monitor delivery status.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Test Connection</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">API Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta App ID</Label>
              <Input type="text" defaultValue="123456789012345" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number ID</Label>
              <Input type="text" defaultValue="109876543210987" />
            </div>
            <div className="space-y-2">
              <Label>System User Access Token</Label>
              <Input type="password" defaultValue="EAABw..." />
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mt-4">
              <h4 className="font-semibold text-sm mb-2">Webhook Status</h4>
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle2 size={16} /> Active and Receiving
              </div>
            </div>
            <Button className="w-full bg-slate-900 hover:bg-slate-800 mt-4">Save Configuration</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Message Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="p-3 font-semibold">Time</th>
                    <th className="p-3 font-semibold">Recipient</th>
                    <th className="p-3 font-semibold">Message Type</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-500">{log.time}</td>
                      <td className="p-3 font-medium text-slate-800">{log.to}</td>
                      <td className="p-3 text-slate-600">{log.type}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 font-medium">
                          {getStatusIcon(log.status)}
                          <span className={log.status === 'Failed' ? 'text-red-600' : 'text-slate-700'}>{log.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your clinic's public profile and contact information.</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Clinic Name</Label>
              <Input type="text" defaultValue="Elsan Clinic" />
            </div>
            <div className="space-y-2">
              <Label>Logo Upload</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" defaultValue="contact@elsanclinic.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input type="tel" defaultValue="+1 234 567 890" />
            </div>
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input type="url" defaultValue="https://elsanclinic.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Location & Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Physical Address</Label>
              <Textarea defaultValue="123 Health Ave, Medical District, City, Country" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <Input type="text" placeholder="https://www.google.com/maps/embed?..." />
            </div>
            <div className="space-y-2">
              <Label>Working Hours</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="text" placeholder="Mon-Fri: 9 AM - 8 PM" defaultValue="Mon-Fri: 9 AM - 8 PM" />
                <Input type="text" placeholder="Sat-Sun: 10 AM - 4 PM" defaultValue="Sat-Sun: 10 AM - 4 PM" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

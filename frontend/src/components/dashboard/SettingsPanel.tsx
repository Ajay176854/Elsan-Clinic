import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useSettings } from '../../hooks';
import { ClinicSettingsUpdate } from '../../types';
import { Loader2 } from 'lucide-react';

export default function SettingsPanel() {
  const { settings, isLoading, updateSettings, isUpdating, uploadLogo, isUploading } = useSettings();
  
  const { register, handleSubmit, reset } = useForm<ClinicSettingsUpdate>({
    defaultValues: {
      clinic_name: '',
      email: '',
      phone: '',
      website: '',
      physical_address: '',
      google_maps_url: '',
      working_hours_mon_fri: '',
      working_hours_sat_sun: ''
    }
  });

  useEffect(() => {
    if (settings) {
      reset({
        clinic_name: settings.clinic_name,
        email: settings.email,
        phone: settings.phone,
        website: settings.website,
        physical_address: settings.physical_address,
        google_maps_url: settings.google_maps_url || '',
        working_hours_mon_fri: settings.working_hours_mon_fri,
        working_hours_sat_sun: settings.working_hours_sat_sun
      });
    }
  }, [settings, reset]);

  const onSubmit = (data: ClinicSettingsUpdate) => {
    updateSettings(data);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadLogo(e.target.files[0]);
    }
  };

  if (isLoading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your clinic's public profile and contact information.</p>
        </div>
        <Button type="submit" disabled={isUpdating} className="bg-slate-900 hover:bg-slate-800">
          {isUpdating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Clinic Name</Label>
              <Input type="text" {...register('clinic_name')} />
            </div>
            <div className="space-y-2">
              <Label>Logo Upload</Label>
              <div className="flex items-center gap-4">
                {settings?.logo_url && (
                  <img src={settings.logo_url} alt="Logo" className="w-10 h-10 object-contain rounded border" />
                )}
                <Input type="file" accept="image/*" onChange={handleLogoUpload} disabled={isUploading} />
                {isUploading && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input type="tel" {...register('phone')} />
            </div>
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input type="url" {...register('website')} />
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
              <Textarea {...register('physical_address')} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <Input type="text" placeholder="https://www.google.com/maps/embed?..." {...register('google_maps_url')} />
            </div>
            <div className="space-y-2">
              <Label>Working Hours</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="text" placeholder="Mon-Fri: 9 AM - 8 PM" {...register('working_hours_mon_fri')} />
                <Input type="text" placeholder="Sat-Sun: 10 AM - 4 PM" {...register('working_hours_sat_sun')} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

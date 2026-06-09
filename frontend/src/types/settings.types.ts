export interface ClinicSettings {
  id: number;
  clinic_name: string;
  logo_url?: string;
  email: string;
  phone: string;
  website: string;
  physical_address: string;
  google_maps_url?: string;
  working_hours_mon_fri: string;
  working_hours_sat_sun: string;
}

export type ClinicSettingsUpdate = Omit<ClinicSettings, 'id' | 'logo_url'>;

export type ViewState = 'home' | 'about' | 'services' | 'doctors' | 'health-library' | 'contact' | 'prohealth' | 'nri' | 'book' | 'doctor-portal' | 'admin-portal' | 'ai-tools';

export interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface ProHealthPackage {
  id: string;
  title: string;
  price: string;
  features: string[];
}

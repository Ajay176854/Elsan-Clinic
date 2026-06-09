export interface MedicineApiResponse {
  id: string;
  name: string;
  generic_name?: string | null;
  default_dosage?: string | null;
  default_frequency?: string | null;
  default_instructions?: string | null;
  dynamic_fields?: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
}

export interface MedicineCreateRequest {
  name: string;
  generic_name?: string;
  default_dosage?: string;
  default_frequency?: string;
  default_instructions?: string;
  dynamic_fields?: Record<string, any>;
  is_active?: boolean;
}

export interface MedicineUpdateRequest {
  name?: string;
  generic_name?: string;
  default_dosage?: string;
  default_frequency?: string;
  default_instructions?: string;
  dynamic_fields?: Record<string, any>;
  is_active?: boolean;
}

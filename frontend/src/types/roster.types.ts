export enum ShiftType {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
  FULL_DAY = "FULL_DAY"
}

export interface Roster {
  id: string;
  user_id: string;
  date: string;
  shift_type: ShiftType;
  start_time: string;
  end_time: string;
  notes?: string;
  created_by_id?: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_role?: string;
}

export interface RosterCreate {
  user_id: string;
  date: string;
  shift_type: ShiftType;
  start_time: string;
  end_time: string;
  notes?: string;
}

export interface RosterUpdate {
  shift_type?: ShiftType;
  start_time?: string;
  end_time?: string;
  notes?: string;
}

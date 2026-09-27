export type BloodGroup = 'A' | 'B' | 'AB' | 'O';
export type Rhesus = '+' | '-';
export type BloodComponent = 'WB' | 'PRC' | 'TC' | 'FFP'; // Whole Blood, Packed Red Cells, Thrombocyte Concentrate, Fresh Frozen Plasma
export type RequestStatus = 'aktif' | 'terpenuhi' | 'selesai';
export type UrgencyLevel = 'kritis' | 'tinggi' | 'sedang' | 'rutin';

export interface BloodStock {
  id: number;
  health_facility_id: number;
  blood_group: BloodGroup;
  rhesus: Rhesus;
  component: BloodComponent;
  bags_available: number;
  updated_at: string;
}

export interface HealthFacility {
  id: number;
  name: string;
  type: 'RSUD' | 'RS Swasta' | 'UDD PMI' | 'Posko Keliling' | 'Klinik';
  address: string;
  city: string;
  phone: string;
  lat: number;
  lng: number;
  distance_km?: number;
  is_24_hours: boolean;
  blood_stocks?: Record<string, number>;
}

export interface BloodRequest {
  id: number;
  patient_name: string;
  patient_age: number;
  diagnosis: string;
  health_facility_id: number;
  health_facility_name: string;
  city?: string;
  location_detail: string;
  blood_group: BloodGroup;
  rhesus: Rhesus;
  component: BloodComponent;
  bags_needed: number;
  bags_fulfilled: number;
  status: RequestStatus;
  urgency: UrgencyLevel;
  urgency_badge: string;
  case_badge: string;
  deadline_text: string;
  doctor_in_charge: string;
  contact_person: string;
  notes?: string;
  created_at: string;
}

export interface Donor {
  id: number;
  user_id: number;
  full_name: string;
  volunteer_id: string;
  blood_group: BloodGroup;
  rhesus: Rhesus;
  total_donations: number;
  total_volume_ml: number;
  lives_saved_estimate: number;
  last_donation_date: string;
  next_eligible_date: string;
  days_until_next: number;
  current_points: number;
  badge_tier: string;
  avatar_url: string;
  is_active: boolean;
}

export interface DonationSchedule {
  id: number;
  health_facility_id: number;
  title: string;
  location_name: string;
  address: string;
  date: string;
  start_time: string;
  end_time: string;
  target_bags: number;
  collected_bags: number;
  type: 'UDD Siaga' | 'Bus Keliling' | 'Instansi/Kampus';
  status: 'buka' | 'penuh' | 'selesai';
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  sip_number: string;
  avatar_url: string;
  experience_years: number;
  rating: number;
  is_online: boolean;
  consultation_fee: number;
}

export interface Consultation {
  id: number;
  doctor_id: number;
  doctor_name: string;
  doctor_specialty: string;
  user_name: string;
  topic: string;
  status: 'aktif' | 'menunggu' | 'selesai';
  last_message: string;
  created_at: string;
}

export interface Screening {
  id: number;
  user_id: number;
  donor_name: string;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  hemoglobin_level: number;
  body_weight_kg: number;
  sleep_hours: number;
  is_healthy: boolean;
  status: 'fit' | 'unfit';
  valid_until: string;
  qr_code_token: string;
  created_at: string;
}

export interface LabResult {
  id: number;
  donor_id: number;
  date: string;
  facility_name: string;
  blood_group: string;
  hemoglobin: number;
  blood_pressure: string;
  hiv_screening: 'Non-Reaktif' | 'Reaktif';
  hepatitis_b: 'Non-Reaktif' | 'Reaktif';
  hepatitis_c: 'Non-Reaktif' | 'Reaktif';
  syphilis: 'Non-Reaktif' | 'Reaktif';
  satusehat_verified: boolean;
  notes: string;
}

export interface Reward {
  id: number;
  title: string;
  category: string;
  description: string;
  points_required: number;
  partner_name: string;
  partner_logo?: string;
  stock: number;
  discount_badge?: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  read_time: string;
  author: string;
  reviewed_by: string;
  date: string;
  excerpt: string;
  content: string;
  image_url: string;
}

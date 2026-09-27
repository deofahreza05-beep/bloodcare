import { relations } from 'drizzle-orm';
import { 
  pgTable, 
  serial, 
  text, 
  integer, 
  boolean, 
  doublePrecision, 
  timestamp 
} from 'drizzle-orm/pg-core';

// 1. Users Table (Linked to Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  fullName: text('full_name'),
  role: text('role').default('donor').notNull(), // 'donor', 'admin', 'doctor', 'hospital'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Health Facilities (Rumah Sakit & UDD PMI)
export const healthFacilities = pgTable('health_facilities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'RSUD', 'RS Swasta', 'UDD PMI', etc.
  address: text('address').notNull(),
  city: text('city').notNull(),
  phone: text('phone').notNull(),
  lat: doublePrecision('lat').notNull(),
  lng: doublePrecision('lng').notNull(),
  is24Hours: boolean('is_24_hours').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Blood Stocks
export const bloodStocks = pgTable('blood_stocks', {
  id: serial('id').primaryKey(),
  healthFacilityId: integer('health_facility_id')
    .references(() => healthFacilities.id)
    .notNull(),
  bloodGroup: text('blood_group').notNull(), // 'A', 'B', 'AB', 'O'
  rhesus: text('rhesus').notNull(), // '+', '-'
  component: text('component').notNull(), // 'WB', 'PRC', 'TC', 'FFP'
  bagsAvailable: integer('bags_available').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 4. Blood Requests (Pasien Kritis & Darurat)
export const bloodRequests = pgTable('blood_requests', {
  id: serial('id').primaryKey(),
  patientName: text('patient_name').notNull(),
  patientAge: integer('patient_age').notNull(),
  diagnosis: text('diagnosis').notNull(),
  healthFacilityId: integer('health_facility_id')
    .references(() => healthFacilities.id)
    .notNull(),
  healthFacilityName: text('health_facility_name').notNull(),
  city: text('city').default('Pekanbaru').notNull(),
  locationDetail: text('location_detail').notNull(),
  bloodGroup: text('blood_group').notNull(), // 'A', 'B', 'AB', 'O'
  rhesus: text('rhesus').notNull(), // '+', '-'
  component: text('component').notNull(), // 'WB', 'PRC', 'TC', 'FFP'
  bagsNeeded: integer('bags_needed').notNull(),
  bagsFulfilled: integer('bags_fulfilled').default(0).notNull(),
  status: text('status').default('aktif').notNull(), // 'aktif', 'terpenuhi', 'selesai'
  urgency: text('urgency').default('kritis').notNull(), // 'kritis', 'tinggi', 'sedang', 'rutin'
  urgencyBadge: text('urgency_badge').default('Kritis Segera').notNull(),
  caseBadge: text('case_badge').default('IGD Darurat').notNull(),
  deadlineText: text('deadline_text').default('Sangat Mendesak (< 4 Jam)').notNull(),
  doctorInCharge: text('doctor_in_charge').notNull(),
  contactPerson: text('contact_person').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 5. Donors (Relawan Pendonor)
export const donors = pgTable('donors', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  fullName: text('full_name').notNull(),
  volunteerId: text('volunteer_id').notNull().unique(),
  bloodGroup: text('blood_group').notNull(),
  rhesus: text('rhesus').notNull(),
  totalDonations: integer('total_donations').default(0).notNull(),
  totalVolumeMl: integer('total_volume_ml').default(0).notNull(),
  livesSavedEstimate: integer('lives_saved_estimate').default(0).notNull(),
  lastDonationDate: text('last_donation_date').default('2024-01-01').notNull(),
  nextEligibleDate: text('next_eligible_date').default('2024-04-01').notNull(),
  daysUntilNext: integer('days_until_next').default(0).notNull(),
  currentPoints: integer('current_points').default(100).notNull(),
  badgeTier: text('badge_tier').default('Silver Donor').notNull(),
  avatarUrl: text('avatar_url').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 6. Donation Schedules (Bus Keliling / Jadwal Donor)
export const donationSchedules = pgTable('donation_schedules', {
  id: serial('id').primaryKey(),
  healthFacilityId: integer('health_facility_id')
    .references(() => healthFacilities.id)
    .notNull(),
  title: text('title').notNull(),
  locationName: text('location_name').notNull(),
  address: text('address').notNull(),
  date: text('date').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  targetBags: integer('target_bags').notNull(),
  collectedBags: integer('collected_bags').default(0).notNull(),
  type: text('type').default('Bus Keliling').notNull(),
  status: text('status').default('buka').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relational Definitions
export const healthFacilitiesRelations = relations(healthFacilities, ({ many }) => ({
  bloodStocks: many(bloodStocks),
  bloodRequests: many(bloodRequests),
  schedules: many(donationSchedules),
}));

export const bloodStocksRelations = relations(bloodStocks, ({ one }) => ({
  facility: one(healthFacilities, {
    fields: [bloodStocks.healthFacilityId],
    references: [healthFacilities.id],
  }),
}));

export const bloodRequestsRelations = relations(bloodRequests, ({ one }) => ({
  facility: one(healthFacilities, {
    fields: [bloodRequests.healthFacilityId],
    references: [healthFacilities.id],
  }),
}));

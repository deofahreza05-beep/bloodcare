-- =================================================================
-- SKRIP SQL LENGKAP BLOODCARE UNTUK PHPMYADMIN (MySQL / MariaDB)
-- Database: bloodcare_db
-- =================================================================

CREATE DATABASE IF NOT EXISTS `bloodcare_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bloodcare_db`;

-- 1. TABEL FASILITAS KESEHATAN (health_facilities)
CREATE TABLE IF NOT EXISTS `health_facilities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'RSUD',
  `address` TEXT NOT NULL,
  `city` VARCHAR(100) NOT NULL DEFAULT 'Pekanbaru',
  `province` VARCHAR(100) NOT NULL DEFAULT 'Riau',
  `phone` VARCHAR(50) NOT NULL,
  `location_coordinates` VARCHAR(100) DEFAULT NULL,
  `lat` DOUBLE DEFAULT 0.5071,
  `lng` DOUBLE DEFAULT 101.4478,
  `is_24_hours` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. TABEL STOK DARAH (blood_stocks)
CREATE TABLE IF NOT EXISTS `blood_stocks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `health_facility_id` INT NOT NULL,
  `blood_group` VARCHAR(5) NOT NULL,
  `rhesus` VARCHAR(5) NOT NULL DEFAULT '+',
  `component` VARCHAR(20) NOT NULL DEFAULT 'PRC',
  `bags_available` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `fk_stocks_facility` (`health_facility_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TABEL PERMINTAAN BUTUH DARAH (blood_requests)
CREATE TABLE IF NOT EXISTS `blood_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `patient_name` VARCHAR(255) NOT NULL,
  `patient_age` INT DEFAULT 30,
  `diagnosis` TEXT NOT NULL,
  `health_facility_id` INT DEFAULT 1,
  `health_facility_name` VARCHAR(255) DEFAULT 'RSUD Arifin Achmad',
  `city` VARCHAR(100) DEFAULT 'Pekanbaru, Riau',
  `location_detail` TEXT DEFAULT NULL,
  `blood_group` VARCHAR(5) NOT NULL,
  `rhesus` VARCHAR(5) DEFAULT '+',
  `component` VARCHAR(20) DEFAULT 'PRC',
  `bags_needed` INT NOT NULL DEFAULT 1,
  `bags_fulfilled` INT DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'aktif',
  `urgency` VARCHAR(50) DEFAULT 'kritis',
  `urgency_badge` VARCHAR(100) DEFAULT 'BUTUH SEGERA',
  `case_badge` VARCHAR(100) DEFAULT 'IGD Darurat',
  `deadline_text` VARCHAR(100) DEFAULT 'Hari Ini',
  `doctor_in_charge` VARCHAR(255) DEFAULT 'Dokter Jaga',
  `contact_person` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(100) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `hospital` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABEL RELAWAN PENDONOR (donors)
CREATE TABLE IF NOT EXISTS `donors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT DEFAULT 1,
  `full_name` VARCHAR(255) NOT NULL,
  `volunteer_id` VARCHAR(50) NOT NULL,
  `blood_group` VARCHAR(5) NOT NULL,
  `rhesus` VARCHAR(5) DEFAULT '+',
  `total_donations` INT DEFAULT 0,
  `total_volume_ml` INT DEFAULT 0,
  `lives_saved_estimate` INT DEFAULT 0,
  `last_donation_date` VARCHAR(50) DEFAULT NULL,
  `next_eligible_date` VARCHAR(50) DEFAULT NULL,
  `days_until_next` INT DEFAULT 0,
  `current_points` INT DEFAULT 100,
  `badge_tier` VARCHAR(50) DEFAULT 'Silver Donor',
  `avatar_url` TEXT DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. TABEL JADWAL DONOR & BUS KELILING (donation_schedules)
CREATE TABLE IF NOT EXISTS `donation_schedules` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `health_facility_id` INT DEFAULT 1,
  `title` VARCHAR(255) NOT NULL,
  `location_name` VARCHAR(255) NOT NULL,
  `address` TEXT NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `start_time` VARCHAR(20) NOT NULL,
  `end_time` VARCHAR(20) NOT NULL,
  `target_bags` INT NOT NULL DEFAULT 50,
  `collected_bags` INT DEFAULT 0,
  `type` VARCHAR(50) DEFAULT 'Bus Keliling',
  `status` VARCHAR(50) DEFAULT 'buka',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =================================================================
-- DATA AWAL (SEED DATA)
-- =================================================================

-- Insert Faskes
INSERT IGNORE INTO `health_facilities` (`id`, `name`, `type`, `address`, `city`, `province`, `phone`) VALUES
(1, 'RSUD Arifin Achmad', 'RSUD Rujukan', 'Jl. Diponegoro No. 2, Pekanbaru', 'Pekanbaru', 'Riau', '0761-21618'),
(2, 'UDD PMI Kota Pekanbaru', 'Bank Darah PMI', 'Jl. Sam Ratulangi No. 12', 'Pekanbaru', 'Riau', '0761-23577'),
(3, 'RS Awal Bros Sudirman', 'RS Swasta', 'Jl. Jend. Sudirman No. 117', 'Pekanbaru', 'Riau', '0761-47333'),
(4, 'RS Prima Pekanbaru', 'RS Swasta', 'Jl. Bima No. 1, Nangka', 'Pekanbaru', 'Riau', '0761-8419007');

-- Insert Initial Stocks
INSERT IGNORE INTO `blood_stocks` (`health_facility_id`, `blood_group`, `rhesus`, `component`, `bags_available`) VALUES
(1, 'A', '+', 'PRC', 35),
(1, 'B', '+', 'PRC', 42),
(1, 'AB', '+', 'PRC', 15),
(1, 'O', '+', 'PRC', 8),
(1, 'A', '-', 'PRC', 3),
(1, 'B', '-', 'PRC', 2),
(1, 'AB', '-', 'PRC', 1),
(1, 'O', '-', 'PRC', 2),
(2, 'A', '+', 'PRC', 50),
(2, 'B', '+', 'PRC', 60),
(2, 'AB', '+', 'PRC', 20),
(2, 'O', '+', 'PRC', 35);

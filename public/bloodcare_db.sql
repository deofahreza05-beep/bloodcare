-- ========================================================
-- BloodCare Pekanbaru Database Dump (MySQL / Laragon)
-- Database: bloodcare_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bloodcare_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bloodcare_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Table: users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('donor','faskes_admin','super_admin') NOT NULL DEFAULT 'donor',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Table: health_facilities
DROP TABLE IF EXISTS `health_facilities`;
CREATE TABLE `health_facilities` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` enum('RSUD','RS Swasta','UDD PMI','Posko Keliling','Klinik') NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL DEFAULT 'Pekanbaru',
  `phone` varchar(50) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lng` decimal(11,8) NOT NULL,
  `is_24_hours` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Table: blood_stocks
DROP TABLE IF EXISTS `blood_stocks`;
CREATE TABLE `blood_stocks` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `health_facility_id` bigint(20) UNSIGNED NOT NULL,
  `blood_group` enum('A','B','AB','O') NOT NULL,
  `rhesus` enum('+','-') NOT NULL DEFAULT '+',
  `component` enum('WB','PRC','TC','FFP') NOT NULL DEFAULT 'PRC',
  `bags_available` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_stocks_facility` (`health_facility_id`),
  CONSTRAINT `fk_stocks_facility` FOREIGN KEY (`health_facility_id`) REFERENCES `health_facilities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Table: blood_requests
DROP TABLE IF EXISTS `blood_requests`;
CREATE TABLE `blood_requests` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `health_facility_id` bigint(20) UNSIGNED NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `patient_age` tinyint(3) UNSIGNED NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `location_detail` varchar(255) NOT NULL,
  `blood_group` enum('A','B','AB','O') NOT NULL,
  `rhesus` enum('+','-') NOT NULL DEFAULT '+',
  `component` enum('WB','PRC','TC','FFP') NOT NULL DEFAULT 'PRC',
  `bags_needed` int(10) UNSIGNED NOT NULL,
  `bags_fulfilled` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `status` enum('aktif','terpenuhi','selesai') NOT NULL DEFAULT 'aktif',
  `urgency` enum('kritis','tinggi','sedang','rutin') NOT NULL DEFAULT 'kritis',
  `urgency_badge` varchar(100) DEFAULT 'Kritis Segera',
  `case_badge` varchar(100) DEFAULT 'IGD Darurat',
  `deadline_text` varchar(150) NOT NULL,
  `doctor_in_charge` varchar(255) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_requests_facility` (`health_facility_id`),
  CONSTRAINT `fk_requests_facility` FOREIGN KEY (`health_facility_id`) REFERENCES `health_facilities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Table: donors
DROP TABLE IF EXISTS `donors`;
CREATE TABLE `donors` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `volunteer_id` varchar(50) NOT NULL UNIQUE,
  `full_name` varchar(255) NOT NULL,
  `blood_group` enum('A','B','AB','O') NOT NULL,
  `rhesus` enum('+','-') NOT NULL DEFAULT '+',
  `total_donations` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `total_volume_ml` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `lives_saved_estimate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `last_donation_date` date DEFAULT NULL,
  `next_eligible_date` date DEFAULT NULL,
  `current_points` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `badge_tier` varchar(100) NOT NULL DEFAULT 'Relawan Siaga',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Table: donation_schedules
DROP TABLE IF EXISTS `donation_schedules`;
CREATE TABLE `donation_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `health_facility_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `date_text` varchar(100) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `target_bags` int(10) UNSIGNED NOT NULL DEFAULT 50,
  `collected_bags` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `type` enum('Bus Keliling','Posko PMI','Kantor/Kampus') NOT NULL DEFAULT 'Bus Keliling',
  `status` enum('buka','penuh','selesai') NOT NULL DEFAULT 'buka',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_schedules_facility` (`health_facility_id`),
  CONSTRAINT `fk_schedules_facility` FOREIGN KEY (`health_facility_id`) REFERENCES `health_facilities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- DATA SEEDER AWAL (Faskes, Pasien, Stok, Relawan)
-- ========================================================

INSERT INTO `health_facilities` (`id`, `name`, `type`, `address`, `city`, `phone`, `lat`, `lng`, `is_24_hours`) VALUES
(1, 'UDD PMI Kota Pekanbaru', 'UDD PMI', 'Jl. Diponegoro No. 15, Sukamulia, Kec. Sail', 'Pekanbaru', '(0761) 23456', 0.52840000, 101.44890000, 1),
(2, 'RSUD Arifin Achmad Prov. Riau', 'RSUD', 'Jl. Diponegoro No. 2, Sumahilang, Kec. Pekanbaru Kota', 'Pekanbaru', '(0761) 855523', 0.52710000, 101.45030000, 1),
(3, 'RS Awal Bros Sudirman', 'RS Swasta', 'Jl. Jend. Sudirman No. 117, Tengkerang Sel., Kec. Bukit Raya', 'Pekanbaru', '(0761) 47333', 0.50120000, 101.45450000, 1),
(4, 'RS Santa Maria Pekanbaru', 'RS Swasta', 'Jl. Jend. A. Yani No. 68, Pulau Karam, Kec. Sukajadi', 'Pekanbaru', '(0761) 22213', 0.53420000, 101.44180000, 1),
(5, 'RS Eka Hospital Pekanbaru', 'RS Swasta', 'Jl. Soekarno-Hatta Km 6.5, Marpoyan Damai', 'Pekanbaru', '(0761) 6989999', 0.47920000, 101.41720000, 1);

INSERT INTO `blood_stocks` (`health_facility_id`, `blood_group`, `rhesus`, `component`, `bags_available`) VALUES
(1, 'A', '+', 'PRC', 42),
(1, 'B', '+', 'PRC', 28),
(1, 'O', '+', 'PRC', 15),
(1, 'AB', '+', 'PRC', 6),
(2, 'A', '+', 'PRC', 18),
(2, 'B', '+', 'PRC', 12),
(2, 'O', '+', 'PRC', 5),
(2, 'AB', '+', 'PRC', 2),
(3, 'O', '+', 'PRC', 8),
(3, 'B', '+', 'WB', 6);

INSERT INTO `blood_requests` (`id`, `health_facility_id`, `patient_name`, `patient_age`, `diagnosis`, `location_detail`, `blood_group`, `rhesus`, `component`, `bags_needed`, `bags_fulfilled`, `status`, `urgency`, `urgency_badge`, `case_badge`, `deadline_text`, `doctor_in_charge`, `contact_person`, `notes`) VALUES
(1, 2, 'Ny. Siti Rahmawati', 34, 'Perdarahan Post-Partum (Melahirkan)', 'Ruang Bersalin / VK Lt. 2', 'O', '+', 'PRC', 4, 1, 'aktif', 'kritis', 'Kritis Segera', 'Melahirkan Kembar', 'Sisa < 3 Jam', 'dr. Hendra Sp.OG', 'Bpk. Dani (0812-7654-3210)', 'Ibu kehilangan banyak darah saat persalinan kembar'),
(2, 3, 'Tn. Bambang Sutrisno', 45, 'Korban Kecelakaan Tol Pekanbaru-Dumai', 'ICU Bed 04', 'B', '+', 'WB', 3, 2, 'aktif', 'kritis', 'Kritis Segera', 'Kecelakaan Lalu Lintas', 'Sebelum Pkl 16:00 WIB', 'dr. Suryo Sp.B', 'Kevin (0852-6543-8901)', 'Operasi darurat fraktur terbuka'),
(3, 2, 'Ananda Rizky Pratama', 8, 'Thalassemia Mayor Rutin Bulanan', 'Poli Rawat Siang Anak', 'A', '+', 'PRC', 2, 0, 'aktif', 'tinggi', 'Tinggi Mendesak', 'Thalassemia Anak', 'Dibutuhkan Besok Pagi', 'dr. Nurul Sp.A', 'Ibu Ratna (0821-9876-5432)', 'Kadar Hb anak drop ke 6.2 g/dL');

INSERT INTO `donors` (`volunteer_id`, `full_name`, `blood_group`, `rhesus`, `total_donations`, `total_volume_ml`, `lives_saved_estimate`, `last_donation_date`, `next_eligible_date`, `current_points`, `badge_tier`, `is_active`) VALUES
('PMI-PKU-2024-001', 'dr. Adi Putra, Sp.PD', 'O', '+', 18, 6300, 54, '2024-01-10', '2024-03-10', 1250, 'Gold Donor', 1),
('PMI-PKU-2024-002', 'Rahmat Hidayat', 'A', '+', 7, 2450, 21, '2023-11-20', '2024-01-20', 450, 'Silver Donor', 1);

INSERT INTO `donation_schedules` (`health_facility_id`, `title`, `location_name`, `address`, `date_text`, `start_time`, `end_time`, `target_bags`, `collected_bags`, `type`, `status`) VALUES
(1, 'Aksi Kemanusiaan PMI di Mall SKA', 'Mall SKA Pekanbaru', 'Lantai 1 Atrium Utama Mall SKA', 'Sabtu, 28 September 2024', '10:00:00', '16:00:00', 80, 52, 'Bus Keliling', 'buka'),
(1, 'Donor Darah Kampus UNRI', 'Gedung Rektorat UNRI', 'Kampus Bina Widya Km 12.5', 'Senin, 30 September 2024', '09:00:00', '15:00:00', 120, 30, 'Kantor/Kampus', 'buka');

SET FOREIGN_KEY_CHECKS = 1;

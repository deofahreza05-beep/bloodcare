# BloodCare — Sistem Informasi Donor Darah & Layanan Medis
**Laravel 11 + MySQL + Laragon**

---

## Persiapan Lingkungan di Laragon & VS Code

1. **Jalankan Laragon**:
   - Pastikan **Apache** dan **MySQL** berstatus **Running** (klik tombol *Start All*).
   - Pastikan PHP 8.2+ aktif (`php -v`).

2. **Buat Database MySQL**:
   - Buka **HeidiSQL** (bawaan Laragon) atau akses `http://localhost/phpmyadmin`.
   - Buat database baru bernama: `bloodcare_db` dengan charset `utf8mb4_unicode_ci`.

3. **Instalasi Dependensi**:
   - Buka terminal di folder project `C:\laragon\www\bloodcare`:
     ```bash
     composer install
     npm install
     ```

4. **Konfigurasi Environment (.env)**:
   - Salin file `.env.example` menjadi `.env`:
     ```bash
     cp .env.example .env
     php artisan key:generate
     ```
   - Pastikan konfigurasi database di `.env`:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=bloodcare_db
     DB_USERNAME=root
     DB_PASSWORD=
     ```

5. **Jalankan Migrasi & Data Seeder**:
   ```bash
   php artisan migrate:fresh --seed
   ```

6. **Jalankan Aplikasi**:
   - Akses via Virtual Host Laragon: **http://bloodcare.test**
   - Atau via terminal VS Code:
     ```bash
     php artisan serve
     ```
     Buka di browser: **http://127.0.0.1:8000**

---

## Akun Login Bawaan (Seeder)
- **Admin**:
  - Email: `admin@bloodcare.id`
  - Password: `password123`
- **Relawan / Dokter (dr. Adi Putra)**:
  - Email: `adi.putra@bloodcare.id`
  - Password: `password123`

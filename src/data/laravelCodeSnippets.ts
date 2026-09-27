export interface LaravelFile {
  path: string;
  category: 'Migration' | 'Model' | 'Controller' | 'Route' | 'Seeder' | 'Config' | 'Guide';
  content: string;
}

export const laragonSetupGuide = `# Panduan Lengkap Instalasi BloodCare di Laragon (VS Code + MySQL)

## 1. Persiapan Lingkungan di Laragon
1. Buka aplikasi **Laragon** di Windows Anda.
2. Pastikan layanan **Apache** (atau Nginx) dan **MySQL** dalam status **Running (Start All)**.
3. Buka Terminal Laragon (klik kanan di jendela Laragon > **Laragon > Terminal** atau tekan tombol **Terminal**).
4. Pastikan PHP versi 8.2 atau 8.3 aktif:
   \`\`\`bash
   php -v
   composer -v
   \`\`\`

## 2. Membuat Database MySQL
1. Buka database tool bawaan Laragon (**HeidiSQL** atau buka browser ke \`http://localhost/phpmyadmin\`).
2. Buat database baru bernama \`bloodcare_db\` dengan collation \`utf8mb4_unicode_ci\`:
   \`\`\`sql
   CREATE DATABASE bloodcare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   \`\`\`

## 3. Struktur Project di C:\\laragon\\www\\bloodcare
Di terminal Laragon:
\`\`\`bash
cd C:\\laragon\\www
# Anda dapat clone / extract project BloodCare ke folder ini
cd bloodcare
composer install
npm install
\`\`\`

## 4. Konfigurasi .env
Salin file \`.env.example\` menjadi \`.env\`:
\`\`\`bash
cp .env.example .env
php artisan key:generate
\`\`\`
Sesuaikan pengaturan database di file \`.env\`:
\`\`\`env
APP_NAME=BloodCare
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_TIMEZONE=Asia/Jakarta
APP_URL=http://bloodcare.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bloodcare_db
DB_USERNAME=root
DB_PASSWORD=
\`\`\`

## 5. Menjalankan Migrasi & Seeder
Jalankan migrasi database dan pengisian data awal (seeder) agar tampilan langsung terisi data persis seperti referensi:
\`\`\`bash
php artisan migrate:fresh --seed
\`\`\`

## 6. Menjalankan Server & Virtual Host Laragon
- Laragon secara otomatis membuat virtual host di: **http://bloodcare.test**
- Atau Anda dapat menjalankan development server melalui VS Code:
  \`\`\`bash
  php artisan serve
  \`\`\`
  Akses di browser: **http://127.0.0.1:8000**

## 7. Login Akun Default
- **Admin**:
  - Email: \`admin@bloodcare.id\`
  - Password: \`password123\`
- **Dokter / Relawan (dr. Adi Putra)**:
  - Email: \`adi.putra@bloodcare.id\`
  - Password: \`password123\`
`;

export const laravelFiles: LaravelFile[] = [
  {
    path: '.env.example',
    category: 'Config',
    content: `APP_NAME=BloodCare
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=Asia/Jakarta
APP_URL=http://bloodcare.test

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bloodcare_db
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
CACHE_STORE=database

VITE_APP_NAME="\${APP_NAME}"
`,
  },
  {
    path: 'database/migrations/2024_01_01_000001_create_locations_and_facilities_table.php',
    category: 'Migration',
    content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city')->default('Pekanbaru');
            $table->string('province')->default('Riau');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->timestamps();
        });

        Schema::create('health_facilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->string('name');
            $table->enum('type', ['RSUD', 'RS Swasta', 'UDD PMI', 'Posko Keliling', 'Klinik']);
            $table->text('address');
            $table->string('city')->default('Pekanbaru, Riau');
            $table->string('phone', 30);
            $table->decimal('lat', 10, 7);
            $table->decimal('lng', 10, 7);
            $table->boolean('is_24_hours')->default(true);
            $table->timestamps();
        });

        Schema::create('blood_stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('health_facility_id')->constrained('health_facilities')->cascadeOnDelete();
            $table->enum('blood_group', ['A', 'B', 'AB', 'O']);
            $table->enum('rhesus', ['+', '-'])->default('+');
            $table->enum('component', ['WB', 'PRC', 'TC', 'FFP'])->default('PRC');
            $table->unsignedInteger('bags_available')->default(0);
            $table->timestamps();

            $table->index(['health_facility_id', 'blood_group', 'rhesus']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blood_stocks');
        Schema::dropIfExists('health_facilities');
        Schema::dropIfExists('locations');
    }
};
`,
  },
  {
    path: 'database/migrations/2024_01_01_000002_create_donors_and_requests_table.php',
    category: 'Migration',
    content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('volunteer_id')->unique();
            $table->string('full_name');
            $table->enum('blood_group', ['A', 'B', 'AB', 'O']);
            $table->enum('rhesus', ['+', '-'])->default('+');
            $table->unsignedInteger('total_donations')->default(0);
            $table->unsignedInteger('total_volume_ml')->default(0);
            $table->unsignedInteger('lives_saved_estimate')->default(0);
            $table->date('last_donation_date')->nullable();
            $table->date('next_eligible_date')->nullable();
            $table->unsignedInteger('current_points')->default(0);
            $table->string('badge_tier')->default('Relawan Aktif');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['blood_group', 'rhesus']);
        });

        Schema::create('blood_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('health_facility_id')->constrained('health_facilities')->cascadeOnDelete();
            $table->string('patient_name');
            $table->unsignedTinyInteger('patient_age');
            $table->string('diagnosis');
            $table->string('location_detail')->comment('e.g. Gedung Bedah Sentral Lt. 3');
            $table->enum('blood_group', ['A', 'B', 'AB', 'O']);
            $table->enum('rhesus', ['+', '-'])->default('+');
            $table->enum('component', ['WB', 'PRC', 'TC', 'FFP'])->default('PRC');
            $table->unsignedInteger('bags_needed');
            $table->unsignedInteger('bags_fulfilled')->default(0);
            $table->enum('status', ['aktif', 'terpenuhi', 'selesai'])->default('aktif');
            $table->enum('urgency', ['kritis', 'tinggi', 'sedang', 'rutin'])->default('kritis');
            $table->string('urgency_badge')->nullable();
            $table->string('case_badge')->nullable();
            $table->string('deadline_text');
            $table->string('doctor_in_charge');
            $table->string('contact_person');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['status', 'blood_group', 'rhesus']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blood_requests');
        Schema::dropIfExists('donors');
    }
};
`,
  },
  {
    path: 'database/migrations/2024_01_01_000003_create_schedules_screenings_rewards_table.php',
    category: 'Migration',
    content: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donation_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('health_facility_id')->constrained('health_facilities')->cascadeOnDelete();
            $table->string('title');
            $table->string('location_name');
            $table->text('address');
            $table->string('date_text');
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedInteger('target_bags')->default(50);
            $table->unsignedInteger('collected_bags')->default(0);
            $table->enum('type', ['UDD Siaga', 'Bus Keliling', 'Instansi/Kampus'])->default('Bus Keliling');
            $table->enum('status', ['buka', 'penuh', 'selesai'])->default('buka');
            $table->timestamps();
        });

        Schema::create('screenings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donor_id')->nullable()->constrained('donors')->nullOnDelete();
            $table->string('donor_name');
            $table->unsignedSmallInteger('blood_pressure_systolic');
            $table->unsignedSmallInteger('blood_pressure_diastolic');
            $table->decimal('hemoglobin_level', 4, 1);
            $table->decimal('body_weight_kg', 4, 1);
            $table->unsignedTinyInteger('sleep_hours');
            $table->enum('status', ['fit', 'unfit'])->default('fit');
            $table->timestamp('valid_until');
            $table->string('qr_code_token')->unique();
            $table->timestamps();
        });

        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->text('description');
            $table->unsignedInteger('points_required');
            $table->string('partner_name');
            $table->unsignedInteger('stock')->default(100);
            $table->string('discount_badge')->nullable();
            $table->timestamps();
        });

        Schema::create('donor_points', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donor_id')->constrained('donors')->cascadeOnDelete();
            $table->foreignId('reward_id')->nullable()->constrained('rewards')->nullOnDelete();
            $table->integer('points');
            $table->enum('type', ['earned', 'redeemed']);
            $table->string('description');
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('read_time');
            $table->string('author');
            $table->string('reviewed_by');
            $table->text('excerpt');
            $table->longText('content');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
        Schema::dropIfExists('donor_points');
        Schema::dropIfExists('rewards');
        Schema::dropIfExists('screenings');
        Schema::dropIfExists('donation_schedules');
    }
};
`,
  },
  {
    path: 'app/Models/BloodRequest.php',
    category: 'Model',
    content: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class BloodRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'health_facility_id',
        'patient_name',
        'patient_age',
        'diagnosis',
        'location_detail',
        'blood_group',
        'rhesus',
        'component',
        'bags_needed',
        'bags_fulfilled',
        'status',
        'urgency',
        'urgency_badge',
        'case_badge',
        'deadline_text',
        'doctor_in_charge',
        'contact_person',
        'notes',
    ];

    public function healthFacility(): BelongsTo
    {
        return $this->belongsTo(HealthFacility::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'aktif');
    }

    public function scopeFilterBlood($query, $bloodGroup = null, $rhesus = null)
    {
        if ($bloodGroup && $bloodGroup !== 'Semua') {
            $query->where('blood_group', $bloodGroup);
        }
        if ($rhesus) {
            $query->where('rhesus', $rhesus);
        }
        return $query;
    }
}
`,
  },
  {
    path: 'app/Http/Controllers/BloodRequestController.php',
    category: 'Controller',
    content: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\BloodRequest;
use App\\Models\\HealthFacility;
use Illuminate\\Http\\Request;

class BloodRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = BloodRequest::with('healthFacility')->latest();

        if ($request->filled('blood_group') && $request->blood_group !== 'Semua') {
            $query->where('blood_group', $request->blood_group);
        }

        if ($request->filled('rhesus')) {
            $query->where('rhesus', $request->rhesus);
        }

        if ($request->filled('component')) {
            $query->where('component', $request->component);
        }

        $requests = $query->paginate(10);
        return view('blood_requests.index', compact('requests'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'patient_age' => 'required|integer|min:0|max:120',
            'diagnosis' => 'required|string|max:255',
            'health_facility_id' => 'required|exists:health_facilities,id',
            'location_detail' => 'required|string|max:255',
            'blood_group' => 'required|in:A,B,AB,O',
            'rhesus' => 'required|in:+,-',
            'component' => 'required|in:WB,PRC,TC,FFP',
            'bags_needed' => 'required|integer|min:1',
            'urgency' => 'required|in:kritis,tinggi,sedang,rutin',
            'deadline_text' => 'required|string',
            'doctor_in_charge' => 'required|string',
            'contact_person' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $bloodRequest = BloodRequest::create($validated);

        return redirect()->back()->with('success', 'Permintaan darah darurat berhasil diterbitkan.');
    }

    public function pledgeDonation(Request $request, BloodRequest $bloodRequest)
    {
        $request->validate([
            'bags_pledged' => 'required|integer|min:1',
        ]);

        $newFulfilled = $bloodRequest->bags_fulfilled + $request->bags_pledged;
        $status = $newFulfilled >= $bloodRequest->bags_needed ? 'terpenuhi' : 'aktif';

        $bloodRequest->update([
            'bags_fulfilled' => $newFulfilled,
            'status' => $status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih atas bantuan donor Anda!',
            'data' => $bloodRequest,
        ]);
    }
}
`,
  },
  {
    path: 'app/Http/Controllers/Admin/DashboardController.php',
    category: 'Controller',
    content: `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\BloodRequest;
use App\\Models\\BloodStock;
use App\\Models\\Donor;
use App\\Models\\HealthFacility;
use App\\Models\\DonationSchedule;
use Illuminate\\Http\\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_requests' => BloodRequest::count(),
            'active_requests' => BloodRequest::where('status', 'aktif')->count(),
            'fulfilled_requests' => BloodRequest::where('status', 'terpenuhi')->count(),
            'total_donors' => Donor::count(),
            'total_facilities' => HealthFacility::count(),
            'total_stock_bags' => BloodStock::sum('bags_available'),
        ];

        $recentRequests = BloodRequest::with('healthFacility')->latest()->take(5)->get();
        $bloodStocks = BloodStock::with('healthFacility')->get();

        return view('admin.dashboard', compact('stats', 'recentRequests', 'bloodStocks'));
    }

    public function updateRequestStatus(Request $request, BloodRequest $bloodRequest)
    {
        $request->validate([
            'status' => 'required|in:aktif,terpenuhi,selesai',
        ]);

        $bloodRequest->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Status permintaan berhasil diperbarui.');
    }
}
`,
  },
  {
    path: 'routes/web.php',
    category: 'Route',
    content: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\HomeController;
use App\\Http\\Controllers\\BloodRequestController;
use App\\Http\\Controllers\\DonorController;
use App\\Http\\Controllers\\FacilityController;
use App\\Http\\Controllers\\ScheduleController;
use App\\Http\\Controllers\\ScreeningController;
use App\\Http\\Controllers\\RewardController;
use App\\Http\\Controllers\\ArticleController;
use App\\Http\\Controllers\\Admin\\DashboardController as AdminDashboardController;

// Public BloodCare Ecosystem Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/requests', [BloodRequestController::class, 'index'])->name('requests.index');
Route::post('/requests', [BloodRequestController::class, 'store'])->name('requests.store');
Route::post('/requests/{bloodRequest}/pledge', [BloodRequestController::class, 'pledgeDonation'])->name('requests.pledge');

// Donor & Schedules
Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedules.index');
Route::post('/schedules/booking', [ScheduleController::class, 'book'])->name('schedules.book');
Route::get('/facilities', [FacilityController::class, 'index'])->name('facilities.index');

// Self-Screening (Fast-Pass QR)
Route::get('/screening', [ScreeningController::class, 'create'])->name('screening.create');
Route::post('/screening', [ScreeningController::class, 'store'])->name('screening.store');

// Rewards & Points
Route::get('/rewards', [RewardController::class, 'index'])->name('rewards.index');
Route::post('/rewards/{reward}/redeem', [RewardController::class, 'redeem'])->name('rewards.redeem');

// Education Articles
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

// Admin Authentication & CRUD Dashboard
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::patch('/requests/{bloodRequest}/status', [AdminDashboardController::class, 'updateRequestStatus'])->name('requests.status');
    Route::resource('facilities', FacilityController::class);
    Route::resource('stocks', FacilityController::class);
    Route::resource('donors', DonorController::class);
    Route::resource('schedules', ScheduleController::class);
});

require __DIR__.'/auth.php';
`,
  },
  {
    path: 'database/seeders/DatabaseSeeder.php',
    category: 'Seeder',
    content: `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use App\\Models\\User;
use App\\Models\\HealthFacility;
use App\\Models\\BloodStock;
use App\\Models\\Donor;
use App\\Models\\BloodRequest;
use App\\Models\\DonationSchedule;
use App\\Models\\Reward;
use App\\Models\\Article;
use Illuminate\\Support\\Facades\\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        $admin = User::create([
            'name' => 'Administrator BloodCare',
            'email' => 'admin@bloodcare.id',
            'password' => Hash::make('password123'),
        ]);

        // 2. Doctor / Volunteer User (dr. Adi Putra)
        $doctorUser = User::create([
            'name' => 'dr. Adi Putra, M.Biomed',
            'email' => 'adi.putra@bloodcare.id',
            'password' => Hash::make('password123'),
        ]);

        // 3. Faskes RSUD Arifin Achmad
        $rsud = HealthFacility::create([
            'name' => 'RSUD Arifin Achmad Pekanbaru',
            'type' => 'RSUD',
            'address' => 'Jl. Diponegoro No.2, Sumahilang, Pekanbaru',
            'city' => 'Pekanbaru, Riau',
            'phone' => '(0761) 21618',
            'lat' => 0.5283,
            'lng' => 101.4475,
            'is_24_hours' => true,
        ]);

        // 4. UDD PMI Pekanbaru
        $udd = HealthFacility::create([
            'name' => 'UDD PMI Kota Pekanbaru',
            'type' => 'UDD PMI',
            'address' => 'Jl. Diponegoro No.15, Simpang Empat, Pekanbaru',
            'city' => 'Pekanbaru, Riau',
            'phone' => '(0761) 23535',
            'lat' => 0.5249,
            'lng' => 101.4502,
            'is_24_hours' => true,
        ]);

        // 5. RS Eka Hospital
        $eka = HealthFacility::create([
            'name' => 'RS Eka Hospital Pekanbaru',
            'type' => 'RS Swasta',
            'address' => 'Jl. Ir. Soekarno-Hatta Km 6.5, Pekanbaru',
            'city' => 'Pekanbaru, Riau',
            'phone' => '(0761) 6989999',
            'lat' => 0.4721,
            'lng' => 101.4194,
            'is_24_hours' => true,
        ]);

        // 6. Blood Stocks
        $groups = ['A', 'B', 'AB', 'O'];
        foreach ($groups as $g) {
            BloodStock::create([
                'health_facility_id' => $udd->id,
                'blood_group' => $g,
                'rhesus' => '+',
                'component' => 'PRC',
                'bags_available' => rand(15, 45),
            ]);
        }

        // 7. Donor Profile (dr. Adi Putra)
        Donor::create([
            'user_id' => $doctorUser->id,
            'volunteer_id' => '#PMI-ID-994821',
            'full_name' => 'dr. Adi Putra, M.Biomed',
            'blood_group' => 'O',
            'rhesus' => '+',
            'total_donations' => 8,
            'total_volume_ml' => 4000,
            'lives_saved_estimate' => 24,
            'last_donation_date' => '2025-08-16',
            'next_eligible_date' => '2025-11-14',
            'current_points' => 1250,
            'badge_tier' => 'Gold Volunteer',
            'is_active' => true,
        ]);

        // 8. Blood Requests (matching screen.png)
        BloodRequest::create([
            'health_facility_id' => $rsud->id,
            'patient_name' => 'Ny. Siti Rahma',
            'patient_age' => 34,
            'diagnosis' => 'Pasca Operasi Caesar Darurat',
            'location_detail' => 'Gedung Bedah Sentral Lt. 3',
            'blood_group' => 'O',
            'rhesus' => '+',
            'component' => 'PRC',
            'bags_needed' => 3,
            'bags_fulfilled' => 1,
            'status' => 'aktif',
            'urgency' => 'kritis',
            'urgency_badge' => 'BUTUH SEGERA (Sisa 3 Jam)',
            'case_badge' => 'ICU Bed #4 • Kasus Bedah',
            'deadline_text' => 'Hari ini, 18:30 WIB',
            'doctor_in_charge' => 'dr. Hendra, Sp.OG',
            'contact_person' => '0812-3456-7890',
            'notes' => 'Pasca operasi caesar dengan perdarahan masif.',
        ]);

        BloodRequest::create([
            'health_facility_id' => $eka->id,
            'patient_name' => 'Tn. Budi Pratama',
            'patient_age' => 42,
            'diagnosis' => 'Demam Berdarah Dengue (DBD Grade 3)',
            'location_detail' => 'Gedung Lavender Lt. 2 Ruang 208',
            'blood_group' => 'B',
            'rhesus' => '+',
            'component' => 'TC',
            'bags_needed' => 4,
            'bags_fulfilled' => 2,
            'status' => 'aktif',
            'urgency' => 'tinggi',
            'urgency_badge' => 'PRIORITAS TINGGI',
            'case_badge' => 'Rawat Inap Penyakit Dalam',
            'deadline_text' => 'Besok, 09:00 WIB',
            'doctor_in_charge' => 'dr. Ratna, Sp.PD',
            'contact_person' => '0813-8899-2211',
            'notes' => 'Trombosit kritis 18.000 /µL.',
        ]);

        // 9. Rewards
        Reward::create([
            'title' => 'Paket Sangobion & Vitamin Fe',
            'category' => 'Suplemen & Obat',
            'description' => '30 Kapsul pemulihan pasca donor',
            'points_required' => 450,
            'partner_name' => 'Mitra Farmasi PMI',
            'stock' => 100,
        ]);
        Reward::create([
            'title' => 'Voucher Apotek Kimia Farma',
            'category' => 'Voucher Medis',
            'description' => 'Potongan belanja medis Rp50.000',
            'points_required' => 600,
            'partner_name' => 'Kimia Farma',
            'stock' => 50,
        ]);
        Reward::create([
            'title' => 'Diskon Lab Darah Prodia 30%',
            'category' => 'Pemeriksaan Lab',
            'description' => 'Paket Hematologi Lengkap & Ferritin',
            'points_required' => 800,
            'partner_name' => 'Prodia',
            'stock' => 30,
        ]);
    }
}
`,
  },
];

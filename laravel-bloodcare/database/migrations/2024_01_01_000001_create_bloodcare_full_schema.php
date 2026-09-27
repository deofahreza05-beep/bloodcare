<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Locations
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city')->default('Pekanbaru');
            $table->string('province')->default('Riau');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->timestamps();
        });

        // 2. Health Facilities / PMI Centers
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

        // 3. Blood Stocks
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

        // 4. Donors
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

        // 5. Blood Requests
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

        // 6. Schedules
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

        // 7. Doctors & Consultations
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('specialty');
            $table->string('hospital');
            $table->string('sip_number')->unique();
            $table->string('avatar_url')->nullable();
            $table->unsignedTinyInteger('experience_years')->default(5);
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->boolean('is_online')->default(true);
            $table->timestamps();
        });

        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('doctors')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('topic');
            $table->enum('status', ['aktif', 'menunggu', 'selesai'])->default('aktif');
            $table->text('last_message')->nullable();
            $table->timestamps();
        });

        // 8. Screenings & Lab Results
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

        Schema::create('lab_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donor_id')->constrained('donors')->cascadeOnDelete();
            $table->date('date');
            $table->string('facility_name');
            $table->string('blood_group');
            $table->decimal('hemoglobin', 4, 1);
            $table->string('blood_pressure');
            $table->enum('hiv_screening', ['Non-Reaktif', 'Reaktif'])->default('Non-Reaktif');
            $table->enum('hepatitis_b', ['Non-Reaktif', 'Reaktif'])->default('Non-Reaktif');
            $table->enum('hepatitis_c', ['Non-Reaktif', 'Reaktif'])->default('Non-Reaktif');
            $table->enum('syphilis', ['Non-Reaktif', 'Reaktif'])->default('Non-Reaktif');
            $table->boolean('satusehat_verified')->default(true);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 9. Rewards & Donor Points
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

        // 10. Articles
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
        Schema::dropIfExists('lab_results');
        Schema::dropIfExists('screenings');
        Schema::dropIfExists('consultations');
        Schema::dropIfExists('doctors');
        Schema::dropIfExists('donation_schedules');
        Schema::dropIfExists('blood_requests');
        Schema::dropIfExists('donors');
        Schema::dropIfExists('blood_stocks');
        Schema::dropIfExists('health_facilities');
        Schema::dropIfExists('locations');
    }
};

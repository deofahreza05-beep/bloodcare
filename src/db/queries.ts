import { db, mysqlPool } from './index.ts';
import { bloodRequests, healthFacilities, bloodStocks, donors, donationSchedules } from './schema.ts';
import { desc, eq, and } from 'drizzle-orm';

// Helper format data dari tabel database
function formatRequestRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    patientName: row.patient_name || row.patientName,
    patientAge: Number(row.patient_age ?? row.patientAge ?? 30),
    diagnosis: row.diagnosis || row.description || '',
    healthFacilityId: Number(row.health_facility_id ?? row.healthFacilityId ?? 1),
    healthFacilityName: row.health_facility_name || row.healthFacilityName || row.hospital || 'RS Rujukan',
    city: row.city || 'Pekanbaru, Riau',
    locationDetail: row.location_detail || row.locationDetail || row.hospital || 'Ruang Perawatan',
    bloodGroup: row.blood_group || row.bloodGroup || 'O',
    rhesus: row.rhesus || '+',
    component: row.component || 'PRC',
    bagsNeeded: Number(row.bags_needed ?? row.bagsNeeded ?? 1),
    bagsFulfilled: Number(row.bags_fulfilled ?? row.bagsFulfilled ?? 0),
    hospital: row.hospital || row.health_facility_name || row.healthFacilityName || '',
    urgency: row.urgency || 'sedang',
    urgencyBadge: row.urgency_badge || row.urgencyBadge || 'Kritis Segera',
    caseBadge: row.case_badge || row.caseBadge || 'IGD Darurat',
    deadlineText: row.deadline_text || row.deadlineText || 'Hari Ini',
    doctorInCharge: row.doctor_in_charge || row.doctorInCharge || 'Dokter Jaga',
    contactPerson: row.contact_person || row.contactPerson || '',
    phone: row.phone || row.contact_person || '',
    notes: row.notes || row.description || '',
    status: row.status || 'aktif',
    createdAt: row.created_at || row.createdAt || new Date(),
  };
}

function formatStockRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    healthFacilityId: row.health_facility_id ?? row.healthFacilityId,
    bloodGroup: row.blood_group || row.bloodGroup,
    rhesus: row.rhesus || '+',
    component: row.component || 'PRC',
    bagsAvailable: Number(row.bags_available ?? row.bagsAvailable ?? 0),
    updatedAt: row.updated_at || row.updatedAt || new Date(),
  };
}

// 1. Ambil Semua Permintaan Darah
export async function getAllBloodRequests() {
  if (mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query(
        'SELECT * FROM blood_requests ORDER BY id DESC'
      );
      if (Array.isArray(rows)) {
        return rows.map(formatRequestRow);
      }
    } catch (e: any) {
      console.warn('MySQL getAllBloodRequests error:', e?.message || e);
    }
  }

  try {
    return await db.select().from(bloodRequests).orderBy(desc(bloodRequests.createdAt));
  } catch (error) {
    console.error("Database query failed [getAllBloodRequests]:", error);
    throw new Error("Gagal mengambil data permintaan darah.", { cause: error });
  }
}

// 2. Simpan Permintaan Darah Baru ke MySQL / Database
export async function createBloodRequest(data: any) {
  if (mysqlPool) {
    try {
      // Ambil kolom yang ada pada tabel blood_requests
      const [columns]: any = await mysqlPool.query('DESCRIBE blood_requests');
      const colNames: string[] = columns.map((c: any) => c.Field);

      const patientName = data.patientName || data.patient_name || 'Pasien';
      const patientAge = Number(data.patientAge || data.patient_age || 30);
      const diagnosis = data.diagnosis || data.description || '';
      const healthFacilityId = Number(data.healthFacilityId || data.health_facility_id || 1);
      const healthFacilityName = data.healthFacilityName || data.health_facility_name || data.hospital || 'RS Rujukan';
      const city = data.city || 'Pekanbaru, Riau';
      const locationDetail = data.locationDetail || data.location_detail || healthFacilityName;
      const bloodGroup = data.bloodGroup || data.blood_group || 'O';
      const rhesus = data.rhesus || '+';
      const component = data.component || 'PRC';
      const bagsNeeded = Number(data.bagsNeeded || data.bags_needed || 1);
      const bagsFulfilled = Number(data.bagsFulfilled || data.bags_fulfilled || 0);
      const status = data.status || 'aktif';
      const urgency = data.urgency || 'kritis';
      const urgencyBadge = data.urgencyBadge || data.urgency_badge || 'Kritis Segera';
      const caseBadge = data.caseBadge || data.case_badge || 'IGD Darurat';
      const deadlineText = data.deadlineText || data.deadline_text || 'Hari Ini';
      const doctorInCharge = data.doctorInCharge || data.doctor_in_charge || 'Dokter Jaga';
      const contactPerson = data.contactPerson || data.contact_person || '';
      const phone = data.phone || data.contact_person || '';
      const notes = data.notes || data.description || '';

      const valuesMap: Record<string, any> = {
        patient_name: patientName,
        patient_age: patientAge,
        diagnosis: diagnosis,
        health_facility_id: healthFacilityId,
        health_facility_name: healthFacilityName,
        city: city,
        location_detail: locationDetail,
        blood_group: bloodGroup,
        rhesus: rhesus,
        component: component,
        bags_needed: bagsNeeded,
        bags_fulfilled: bagsFulfilled,
        status: status,
        urgency: urgency,
        urgency_badge: urgencyBadge,
        case_badge: caseBadge,
        deadline_text: deadlineText,
        doctor_in_charge: doctorInCharge,
        contact_person: contactPerson,
        phone: phone,
        notes: notes,
        description: diagnosis || notes,
        hospital: healthFacilityName,
      };

      const matchedCols: string[] = [];
      const matchedVals: any[] = [];

      for (const col of colNames) {
        if (col === 'id' || col === 'created_at' || col === 'updated_at') continue;
        if (valuesMap[col] !== undefined) {
          matchedCols.push(`\`${col}\``);
          matchedVals.push(valuesMap[col]);
        }
      }

      if (matchedCols.length > 0) {
        const placeholders = matchedCols.map(() => '?').join(', ');
        const insertSql = `INSERT INTO blood_requests (${matchedCols.join(', ')}) VALUES (${placeholders})`;
        const [result]: any = await mysqlPool.execute(insertSql, matchedVals);
        
        console.log("MySQL insert blood_requests success, ID:", result.insertId);
        return {
          id: result.insertId,
          ...data,
          createdAt: new Date(),
        };
      }
    } catch (e: any) {
      console.error('MySQL insert error:', e?.message || e);
    }
  }

  try {
    const result = await db.insert(bloodRequests).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Database insert failed [createBloodRequest]:", error);
    throw new Error("Gagal menambahkan permintaan darah ke database.", { cause: error });
  }
}

// 3. Update Status / Kantong Terpenuhi
export async function updateBloodRequestBags(id: number, bagsFulfilled: number, status?: string) {
  if (mysqlPool) {
    try {
      if (status) {
        await mysqlPool.execute(
          'UPDATE blood_requests SET bags_fulfilled = ?, status = ? WHERE id = ?',
          [bagsFulfilled, status, id]
        );
      } else {
        await mysqlPool.execute(
          'UPDATE blood_requests SET bags_fulfilled = ? WHERE id = ?',
          [bagsFulfilled, id]
        );
      }
      return { id, bagsFulfilled, status };
    } catch (e: any) {
      console.warn('MySQL update failed:', e?.message || e);
    }
  }

  try {
    const updateData: any = { bagsFulfilled };
    if (status) {
      updateData.status = status;
    }
    const result = await db.update(bloodRequests)
      .set(updateData)
      .where(eq(bloodRequests.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database update failed [updateBloodRequestBags]:", error);
    throw new Error("Gagal memperbarui progres donor.", { cause: error });
  }
}

// 4. Hapus Permintaan Darah
export async function deleteBloodRequest(id: number) {
  if (mysqlPool) {
    try {
      await mysqlPool.execute('DELETE FROM blood_requests WHERE id = ?', [id]);
      return { id };
    } catch (e: any) {
      console.warn('MySQL delete failed:', e?.message || e);
    }
  }

  try {
    const result = await db.delete(bloodRequests)
      .where(eq(bloodRequests.id, id))
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database delete failed [deleteBloodRequest]:", error);
    throw new Error("Gagal menghapus permintaan darah.", { cause: error });
  }
}

// 5. Fasilitas Kesehatan (health_facilities)
export async function getAllHealthFacilities() {
  if (mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM health_facilities');
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          city: r.city,
          province: r.province || 'Riau',
          address: r.address,
          phone: r.phone,
          locationCoordinates: r.location_coordinates || r.locationCoordinates,
        }));
      }
    } catch (e: any) {
      console.warn('MySQL query health facilities error:', e?.message || e);
    }
  }

  try {
    return await db.select().from(healthFacilities);
  } catch (error) {
    console.error("Database query failed [getAllHealthFacilities]:", error);
    throw new Error("Gagal mengambil data fasilitas kesehatan.", { cause: error });
  }
}

// 6. Stok Darah Berdasarkan Fasilitas (blood_stocks)
export async function getBloodStocksByFacility(facilityId: number) {
  if (mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query(
        'SELECT * FROM blood_stocks WHERE health_facility_id = ?',
        [facilityId]
      );
      return rows.map(formatStockRow);
    } catch (e: any) {
      console.warn('MySQL get blood stocks error:', e?.message || e);
    }
  }

  try {
    return await db.select().from(bloodStocks).where(eq(bloodStocks.healthFacilityId, facilityId));
  } catch (error) {
    console.error("Database query failed [getBloodStocksByFacility]:", error);
    throw new Error("Gagal mengambil stok darah fasilitas.", { cause: error });
  }
}

// 7. Update atau Insert Stok Darah (blood_stocks)
export async function updateOrInsertBloodStock(facilityId: number, bloodGroup: string, rhesus: string, bags: number) {
  if (mysqlPool) {
    try {
      const [existing]: any = await mysqlPool.query(
        'SELECT id FROM blood_stocks WHERE health_facility_id = ? AND blood_group = ? AND rhesus = ?',
        [facilityId, bloodGroup, rhesus]
      );

      if (existing && existing.length > 0) {
        await mysqlPool.execute(
          'UPDATE blood_stocks SET bags_available = ?, updated_at = NOW() WHERE id = ?',
          [bags, existing[0].id]
        );
        return { id: existing[0].id, healthFacilityId: facilityId, bloodGroup, rhesus, bagsAvailable: bags };
      } else {
        const [res]: any = await mysqlPool.execute(
          'INSERT INTO blood_stocks (health_facility_id, blood_group, rhesus, component, bags_available, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
          [facilityId, bloodGroup, rhesus, 'PRC', bags]
        );
        return { id: res.insertId, healthFacilityId: facilityId, bloodGroup, rhesus, bagsAvailable: bags };
      }
    } catch (e: any) {
      console.warn('MySQL updateOrInsertBloodStock error:', e?.message || e);
    }
  }

  try {
    const existing = await db.select()
      .from(bloodStocks)
      .where(
        and(
          eq(bloodStocks.healthFacilityId, facilityId),
          eq(bloodStocks.bloodGroup, bloodGroup),
          eq(bloodStocks.rhesus, rhesus)
        )
      );

    if (existing.length > 0) {
      const updated = await db.update(bloodStocks)
        .set({ bagsAvailable: bags, updatedAt: new Date() })
        .where(eq(bloodStocks.id, existing[0].id))
        .returning();
      return updated[0];
    } else {
      const inserted = await db.insert(bloodStocks)
        .values({
          healthFacilityId: facilityId,
          bloodGroup,
          rhesus,
          component: 'PRC',
          bagsAvailable: bags,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error("Database update/insert failed [updateOrInsertBloodStock]:", error);
    throw new Error("Gagal memperbarui stok darah di database.", { cause: error });
  }
}

// 8. Relawan Pendonor (donors)
export async function getAllDonors() {
  if (mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM donors ORDER BY id DESC');
      if (Array.isArray(rows) && rows.length > 0) {
        return rows.map((d: any) => ({
          id: d.id,
          user_id: d.user_id || 1,
          full_name: d.full_name,
          volunteer_id: d.volunteer_id,
          blood_group: d.blood_group,
          rhesus: d.rhesus || '+',
          total_donations: Number(d.total_donations || 0),
          total_volume_ml: Number(d.total_volume_ml || 0),
          lives_saved_estimate: Number(d.lives_saved_estimate || 0),
          last_donation_date: d.last_donation_date || '2025-01-01',
          next_eligible_date: d.next_eligible_date || '2025-04-01',
          days_until_next: Number(d.days_until_next || 0),
          current_points: Number(d.current_points || 100),
          badge_tier: d.badge_tier || 'Silver Donor',
          avatar_url: d.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
          is_active: Boolean(d.is_active ?? true),
        }));
      }
    } catch (e: any) {
      console.warn('MySQL getAllDonors error:', e?.message || e);
    }
  }

  try {
    return await db.select().from(donors);
  } catch (error) {
    return [];
  }
}

export async function createDonor(data: any) {
  if (mysqlPool) {
    try {
      const sql = `
        INSERT INTO donors 
        (full_name, volunteer_id, blood_group, rhesus, total_donations, total_volume_ml, lives_saved_estimate, current_points, badge_tier, avatar_url, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [res]: any = await mysqlPool.execute(sql, [
        data.fullName || data.full_name,
        data.volunteerId || data.volunteer_id || `#VOL-${Date.now()}`,
        data.bloodGroup || data.blood_group || 'O',
        data.rhesus || '+',
        Number(data.totalDonations || data.total_donations || 1),
        Number(data.totalVolumeMl || data.total_volume_ml || 350),
        Number(data.livesSavedEstimate || data.lives_saved_estimate || 3),
        Number(data.currentPoints || data.current_points || 100),
        data.badgeTier || data.badge_tier || 'Silver Donor',
        data.avatarUrl || data.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
        1,
      ]);
      return { id: res.insertId, ...data };
    } catch (e: any) {
      console.warn('MySQL createDonor error:', e?.message || e);
    }
  }

  return { id: Date.now(), ...data };
}

// 9. Jadwal Donor & Bus Keliling (donation_schedules)
export async function getAllSchedules() {
  if (mysqlPool) {
    try {
      const [rows]: any = await mysqlPool.query('SELECT * FROM donation_schedules ORDER BY id ASC');
      if (Array.isArray(rows) && rows.length > 0) {
        return rows.map((s: any) => ({
          id: s.id,
          health_facility_id: s.health_facility_id || 1,
          title: s.title,
          location_name: s.location_name,
          address: s.address,
          date: s.date,
          start_time: s.start_time,
          end_time: s.end_time,
          target_bags: Number(s.target_bags || 50),
          collected_bags: Number(s.collected_bags || 0),
          type: s.type || 'Bus Keliling',
          status: s.status || 'buka',
        }));
      }
    } catch (e: any) {
      console.warn('MySQL getAllSchedules error:', e?.message || e);
    }
  }

  try {
    return await db.select().from(donationSchedules);
  } catch (error) {
    return [];
  }
}

export async function createSchedule(data: any) {
  if (mysqlPool) {
    try {
      const sql = `
        INSERT INTO donation_schedules 
        (health_facility_id, title, location_name, address, date, start_time, end_time, target_bags, collected_bags, type, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [res]: any = await mysqlPool.execute(sql, [
        Number(data.healthFacilityId || data.health_facility_id || 1),
        data.title,
        data.locationName || data.location_name,
        data.address,
        data.date,
        data.startTime || data.start_time || '08:00',
        data.endTime || data.end_time || '14:00',
        Number(data.targetBags || data.target_bags || 50),
        Number(data.collectedBags || data.collected_bags || 0),
        data.type || 'Bus Keliling',
        data.status || 'buka',
      ]);
      return { id: res.insertId, ...data };
    } catch (e: any) {
      console.warn('MySQL createSchedule error:', e?.message || e);
    }
  }

  return { id: Date.now(), ...data };
}

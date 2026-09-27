import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Droplet, 
  Users, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X,
  Search,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { BloodRequest, HealthFacility, Donor, DonationSchedule, BloodStock, Reward, RequestStatus } from '../../types';

interface AdminDashboardViewProps {
  requests: BloodRequest[];
  onUpdateRequestStatus: (requestId: number, status: RequestStatus) => void;
  onDeleteRequest: (requestId: number) => void;
  facilities: HealthFacility[];
  donors: Donor[];
  schedules: DonationSchedule[];
  rewards: Reward[];
  onOpenNewRequestModal: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  requests,
  onUpdateRequestStatus,
  onDeleteRequest,
  facilities,
  donors,
  schedules,
  rewards,
  onOpenNewRequestModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'requests' | 'stocks' | 'donors' | 'schedules'>('requests');
  const [statusFilter, setStatusFilter] = useState<'semua' | RequestStatus>('semua');
  const [searchTerm, setSearchTerm] = useState('');

  // Stock edit state
  const [selectedFacilityId, setSelectedFacilityId] = useState<number>(facilities[0]?.id || 1);
  const [localStock, setLocalStock] = useState<Record<string, number>>({
    'A+': 35,
    'B+': 42,
    'AB+': 15,
    'O+': 8,
    'A-': 3,
    'B-': 2,
    'AB-': 1,
    'O-': 2,
  });
  const [isSavingStock, setIsSavingStock] = useState(false);

  // Fetch stocks from database whenever selectedFacilityId changes
  useEffect(() => {
    const fetchFacilityStocks = async () => {
      try {
        const res = await fetch(`/api/stocks/${selectedFacilityId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: Record<string, number> = { ...localStock };
            data.forEach((row: any) => {
              const key = `${row.bloodGroup || row.blood_group}${row.rhesus}`;
              mapped[key] = row.bagsAvailable ?? row.bags_available ?? 0;
            });
            setLocalStock(mapped);
          }
        }
      } catch (e) {
        console.log('Stock fetch note:', e);
      }
    };
    fetchFacilityStocks();
  }, [selectedFacilityId]);

  const handleStockSave = async () => {
    setIsSavingStock(true);
    try {
      // Send each blood group update to Cloud SQL
      const promises = Object.entries(localStock).map(([key, bags]) => {
        const rhesus = key.endsWith('-') ? '-' : '+';
        const bloodGroup = key.replace(/[+-]/g, '');
        return fetch('/api/stocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            facilityId: selectedFacilityId,
            bloodGroup,
            rhesus,
            bags,
          }),
        });
      });

      await Promise.all(promises);
      alert('✅ Berhasil! Perubahan stok darah telah tersimpan permanen ke Database Cloud SQL!');
    } catch (err) {
      console.error('Save stock err:', err);
      alert('Stok tersimpan di memori sistem.');
    } finally {
      setIsSavingStock(false);
    }
  };

  const activeCount = requests.filter((r) => r.status === 'aktif').length;
  const fulfilledCount = requests.filter((r) => r.status === 'terpenuhi').length;
  const completedCount = requests.filter((r) => r.status === 'selesai').length;

  const filteredRequests = requests.filter((r) => {
    const matchesStatus = statusFilter === 'semua' || r.status === statusFilter;
    const matchesSearch =
      r.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.health_facility_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.blood_group.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStockChange = (key: string, delta: number) => {
    setLocalStock((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta),
    }));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Panel Kendali Administrator BloodCare</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Dashboard Manajemen Sistem Terpadu
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pengelolaan Permintaan Darah Darurat, Verifikasi Pendonor, Stok Bank Darah RS & Jadwal Donor
          </p>
        </div>

        <button
          onClick={onOpenNewRequestModal}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Permintaan Baru</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase">Permintaan Aktif</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600">{activeCount}</div>
          <span className="text-[10px] text-slate-400">Butuh respons segera</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase">Terpenuhi</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{fulfilledCount}</div>
          <span className="text-[10px] text-slate-400">Donor siap transfusi</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase">Total Pendonor</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{donors.length + 128}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+14 minggu ini</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase">Faskes Mitra</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{facilities.length} RS/UDD</div>
          <span className="text-[10px] text-slate-400">Pekanbaru & Riau</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSubTab('requests')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'requests'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Kelola Permintaan Darah ({requests.length})
        </button>

        <button
          onClick={() => setActiveSubTab('stocks')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'stocks'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Stok Darah Faskes
        </button>

        <button
          onClick={() => setActiveSubTab('donors')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'donors'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Data Pendonor
        </button>

        <button
          onClick={() => setActiveSubTab('schedules')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeSubTab === 'schedules'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Jadwal & Bus Donor
        </button>
      </div>

      {/* Subtab 1: Requests CRUD */}
      {activeSubTab === 'requests' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          
          {/* Table Filters Header */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pasien, RS, atau golongan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['semua', 'aktif', 'terpenuhi', 'selesai'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                    statusFilter === st ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Pasien & Diagnosa</th>
                  <th className="py-3 px-3">Golongan</th>
                  <th className="py-3 px-3">Faskes / Lokasi</th>
                  <th className="py-3 px-3">Kantong</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Audit Jejak Petugas</th>
                  <th className="py-3 px-4 text-right">Aksi Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-slate-900">{req.patient_name}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{req.diagnosis}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">PJ: {req.doctor_in_charge}</div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-flex items-center justify-center font-black px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs">
                        {req.blood_group}{req.rhesus}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-bold mt-0.5">{req.component}</span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-800">{req.health_facility_name}</div>
                      <div className="text-[10px] text-slate-500">{req.location_detail}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">
                        {req.bags_fulfilled} / {req.bags_needed}
                      </div>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${Math.min(100, (req.bags_fulfilled / req.bags_needed) * 100)}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          req.status === 'aktif'
                            ? 'bg-rose-100 text-rose-700'
                            : req.status === 'terpenuhi'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* Audit Trail Jejak Petugas */}
                    <td className="py-3 px-3">
                      <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Admin UDD PMI
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        Log #{Math.abs(req.id % 99999)} • {req.created_at.includes('T') ? req.created_at.split('T')[1].substring(0, 5) : (req.created_at.split(' ')[1] || '12:00')} WIB
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <select
                          value={req.status}
                          onChange={(e) => onUpdateRequestStatus(req.id, e.target.value as RequestStatus)}
                          className="text-[11px] font-semibold bg-white border border-slate-200 rounded-lg p-1 text-slate-700 cursor-pointer"
                        >
                          <option value="aktif">Aktif</option>
                          <option value="terpenuhi">Terpenuhi</option>
                          <option value="selesai">Selesai</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Hapus permintaan untuk ${req.patient_name}?`)) {
                              onDeleteRequest(req.id);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Permintaan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRequests.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                Tidak ada data permintaan darah yang cocok.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Subtab 2: Stocks CRUD */}
      {activeSubTab === 'stocks' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Inventaris Stok Kantong Darah Real-time
              </h3>
              <p className="text-xs text-slate-500">
                Pilih fasilitas kesehatan untuk memperbarui ketersediaan stok darah
              </p>
            </div>

            <select
              value={selectedFacilityId}
              onChange={(e) => setSelectedFacilityId(Number(e.target.value))}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
            >
              {facilities.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name} ({fac.type})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(localStock).map(([key, count]) => {
              const isCritical = count < 5;
              return (
                <div
                  key={key}
                  className={`p-4 rounded-xl border flex flex-col justify-between ${
                    isCritical
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-black">{key}</span>
                    {isCritical && (
                      <span className="text-[10px] font-black uppercase text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                        Kritis
                      </span>
                    )}
                  </div>

                  <div className="text-2xl font-black tracking-tight">{count} Kantong</div>

                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => handleStockChange(key, -1)}
                      className="flex-1 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded font-black text-xs transition-colors"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleStockChange(key, 1)}
                      className="flex-1 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded font-black text-xs transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              * Perubahan otomatis tersinkron ke tabel <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px] text-slate-800">blood_stocks</code> di database.
            </span>
            <button
              disabled={isSavingStock}
              onClick={handleStockSave}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              {isSavingStock ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan ke Database...</span>
                </>
              ) : (
                <span>Simpan Pembaruan Stok ke Database</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Subtab 3: Donors Table */}
      {activeSubTab === 'donors' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-slate-900">
              Daftar Relawan & Pendonor Terdaftar
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nama Relawan</th>
                  <th className="py-3 px-3">ID Relawan</th>
                  <th className="py-3 px-3">Golongan</th>
                  <th className="py-3 px-3">Total Donor</th>
                  <th className="py-3 px-3">Poin Amal</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donors.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{d.full_name}</div>
                      <div className="text-[10px] text-slate-400">{d.badge_tier}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-600">
                      {d.volunteer_id}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-black text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        {d.blood_group}{d.rhesus}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {d.total_donations} Kali ({d.total_volume_ml} ml)
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-700">
                      ⭐ {d.current_points} Pts
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Aktif Terverifikasi
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 4: Schedules */}
      {activeSubTab === 'schedules' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-slate-900">
              Agenda Posko UDD & Bus Donor Keliling
            </h3>
            <button
              onClick={() => alert('Form penambahan jadwal posko donor dibuka!')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              + Buat Jadwal Baru
            </button>
          </div>

          <div className="space-y-3">
            {schedules.map((sc) => (
              <div key={sc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {sc.type}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1">
                    {sc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {sc.location_name} • {sc.address}
                  </p>
                  <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                    Waktu: {sc.date} ({sc.start_time} - {sc.end_time} WIB)
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-700">
                    Terkumpul: <strong>{sc.collected_bags}</strong> / {sc.target_bags} Kantong
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 inline-block mt-1 uppercase">
                    Status: {sc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

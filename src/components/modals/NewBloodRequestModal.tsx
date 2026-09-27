import React, { useState } from 'react';
import { X, AlertCircle, Plus } from 'lucide-react';
import { BloodRequest, BloodGroup, Rhesus, BloodComponent, UrgencyLevel, HealthFacility } from '../../types';

interface NewBloodRequestModalProps {
  facilities: HealthFacility[];
  onClose: () => void;
  onSubmitRequest: (newReq: Omit<BloodRequest, 'id' | 'bags_fulfilled' | 'status' | 'created_at'>) => void;
}

export const NewBloodRequestModal: React.FC<NewBloodRequestModalProps> = ({
  facilities,
  onClose,
  onSubmitRequest,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState(30);
  const [diagnosis, setDiagnosis] = useState('');
  const [facilityId, setFacilityId] = useState(facilities[0]?.id || 1);
  const [locationDetail, setLocationDetail] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O');
  const [rhesus, setRhesus] = useState<Rhesus>('+');
  const [component, setComponent] = useState<BloodComponent>('PRC');
  const [bagsNeeded, setBagsNeeded] = useState(2);
  const [urgency, setUrgency] = useState<UrgencyLevel>('kritis');
  const [urgencyBadge, setUrgencyBadge] = useState('BUTUH SEGERA');
  const [caseBadge, setCaseBadge] = useState('Kasus Bedah');
  const [deadlineText, setDeadlineText] = useState('Hari ini, 20:00 WIB');
  const [doctorInCharge, setDoctorInCharge] = useState('dr. Hendra, Sp.OG');
  const [contactPerson, setContactPerson] = useState('Keluarga (0812-xxxx-xxxx)');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !diagnosis.trim()) return;

    const selectedFacility = facilities.find((f) => f.id === Number(facilityId)) || facilities[0];

    onSubmitRequest({
      patient_name: patientName,
      patient_age: Number(patientAge),
      diagnosis,
      health_facility_id: selectedFacility.id,
      health_facility_name: selectedFacility.name,
      city: selectedFacility.city || 'Pekanbaru, Riau',
      location_detail: locationDetail || 'Ruang Perawatan',
      blood_group: bloodGroup,
      rhesus,
      component,
      bags_needed: Number(bagsNeeded),
      urgency,
      urgency_badge: urgencyBadge,
      case_badge: caseBadge,
      deadline_text: deadlineText,
      doctor_in_charge: doctorInCharge,
      contact_person: contactPerson,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-red-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Buat Permintaan Darah Darurat
              </h3>
              <p className="text-xs text-slate-500">
                Daftarkan pasien yang membutuhkan donor segera
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Pasien *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Ny. Siti Rahma"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Usia (Tahun)
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={patientAge}
                onChange={(e) => setPatientAge(Number(e.target.value))}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Diagnosis Medis / Alasan Transfusi *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pasca Operasi Caesar Darurat / DBD Grade 3"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
            />
          </div>

          {/* Hospital & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fasilitas Kesehatan *
              </label>
              <select
                value={facilityId}
                onChange={(e) => setFacilityId(Number(e.target.value))}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Gedung / Ruangan Perawatan
              </label>
              <input
                type="text"
                placeholder="Contoh: Gedung Bedah Sentral Lt. 3"
                value={locationDetail}
                onChange={(e) => setLocationDetail(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
              />
            </div>
          </div>

          {/* Blood Specs */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <span className="text-[11px] font-bold text-slate-600 block">
              Spesifikasi Golongan Darah & Komponen
            </span>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Golongan</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Rhesus</label>
                <select
                  value={rhesus}
                  onChange={(e) => setRhesus(e.target.value as Rhesus)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                >
                  <option value="+">+ Positif</option>
                  <option value="-">- Negatif</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Komponen</label>
                <select
                  value={component}
                  onChange={(e) => setComponent(e.target.value as BloodComponent)}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                >
                  <option value="PRC">PRC (Packed Red Cells)</option>
                  <option value="TC">TC (Trombosit)</option>
                  <option value="WB">WB (Whole Blood)</option>
                  <option value="FFP">FFP (Plasma Darah)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Jumlah Kantong Diperlukan
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={bagsNeeded}
                  onChange={(e) => setBagsNeeded(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Tingkat Urgensi
                </label>
                <select
                  value={urgency}
                  onChange={(e) => {
                    const u = e.target.value as UrgencyLevel;
                    setUrgency(u);
                    if (u === 'kritis') setUrgencyBadge('BUTUH SEGERA (Sisa 3 Jam)');
                    else if (u === 'tinggi') setUrgencyBadge('PRIORITAS TINGGI');
                    else setUrgencyBadge('PERMINTAAN RUTIN');
                  }}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-bold"
                >
                  <option value="kritis">Kritis (Sangat Mendesak)</option>
                  <option value="tinggi">Tinggi (24 Jam)</option>
                  <option value="rutin">Rutin (Talasemia/Bulanan)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Batas Waktu Transfusi
              </label>
              <input
                type="text"
                placeholder="Contoh: Hari ini, 18:30 WIB"
                value={deadlineText}
                onChange={(e) => setDeadlineText(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dokter Penanggung Jawab (PJ)
              </label>
              <input
                type="text"
                placeholder="Contoh: dr. Hendra, Sp.OG"
                value={doctorInCharge}
                onChange={(e) => setDoctorInCharge(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kontak Keluarga / Rumah Sakit
            </label>
            <input
              type="text"
              placeholder="Contoh: Bagian Bank Darah RS (0812-3456-7890)"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
            >
              Terbitkan Permintaan Darah
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

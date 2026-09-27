import React from 'react';
import { X, ShieldCheck, CheckCircle2, Download, FileText, User } from 'lucide-react';
import { LabResult, Donor } from '../../types';

interface LabResultModalProps {
  labResult: LabResult;
  donor: Donor;
  onClose: () => void;
}

export const LabResultModal: React.FC<LabResultModalProps> = ({ labResult, donor, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-sky-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>Rekam Hasil Laboratorium & IMLTD</span>
                <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                  SATUSEHAT
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Uji Saring Keamanan Darah Palang Merah Indonesia
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

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Patient Card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                ID Pendonor & Faskes
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                {donor.full_name} ({donor.volunteer_id})
              </div>
              <div className="text-slate-600 text-[11px] mt-0.5">
                {labResult.facility_name} • Tanggal: {labResult.date}
              </div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center font-black text-red-600 shadow-2xs">
              <span className="text-sm leading-none">{donor.blood_group}+</span>
              <span className="text-[8px] uppercase text-slate-400 mt-0.5">TERKONFIRMASI</span>
            </div>
          </div>

          {/* Screening Parameter Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-100 px-3.5 py-2 font-bold text-slate-700 text-xs flex justify-between">
              <span>Parameter Uji Saring IMLTD</span>
              <span>Hasil Uji Lab</span>
            </div>

            <div className="divide-y divide-slate-100 bg-white">
              <div className="px-3.5 py-2.5 flex justify-between items-center">
                <span className="font-medium text-slate-700">1. Skrining HIV (Anti-HIV 1/2)</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {labResult.hiv_screening}
                </span>
              </div>

              <div className="px-3.5 py-2.5 flex justify-between items-center">
                <span className="font-medium text-slate-700">2. Hepatitis B (HBsAg)</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {labResult.hepatitis_b}
                </span>
              </div>

              <div className="px-3.5 py-2.5 flex justify-between items-center">
                <span className="font-medium text-slate-700">3. Hepatitis C (Anti-HCV)</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {labResult.hepatitis_c}
                </span>
              </div>

              <div className="px-3.5 py-2.5 flex justify-between items-center">
                <span className="font-medium text-slate-700">4. Sifilis (Anti-TP / TPHA)</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {labResult.syphilis}
                </span>
              </div>
            </div>
          </div>

          {/* Vitals Record */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Kadar Hemoglobin (Hb)</span>
              <strong className="text-sm font-extrabold text-slate-900">{labResult.hemoglobin} g/dL</strong>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Sangat Ideal (12.5 - 17.0)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Tekanan Darah Terukur</span>
              <strong className="text-sm font-extrabold text-slate-900">{labResult.blood_pressure}</strong>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Normotensif</span>
            </div>
          </div>

          {/* Notes */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-slate-700">
            <div className="font-bold text-emerald-900 text-xs mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Catatan Kedokteran Transfusi PMI
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {labResult.notes}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Terhubung API SatuSehat Kemenkes</span>
          </div>

          <button
            onClick={() => alert('Laporan hasil lab terunduh dalam format PDF resmi!')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Sertifikat PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};

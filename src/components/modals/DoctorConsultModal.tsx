import React, { useState } from 'react';
import { X, Send, User, CheckCircle2, ShieldCheck, Stethoscope } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorConsultModalProps {
  doctor: Doctor;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: 'doctor' | 'user';
  text: string;
  time: string;
}

export const DoctorConsultModal: React.FC<DoctorConsultModalProps> = ({ doctor, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'doctor',
      text: `Halo dr. Adi Putra! Saya ${doctor.name}. Ada yang bisa saya bantu terkait persiapan donor, kadar hemoglobin, atau keluhan hematologi lainnya?`,
      time: '10:45',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated doctor response
    setTimeout(() => {
      let reply = 'Terima kasih informasinya. Dari parameter tensi dan hemoglobin Anda, kondisi Anda sangat fit untuk donor. Jangan lupa minum air putih minimal 500ml sebelum donor.';
      if (userMsg.text.toLowerCase().includes('tensi') || userMsg.text.toLowerCase().includes('tekanan darah')) {
        reply = 'Tekanan darah normal untuk donor adalah 100-160 sistolik dan 70-100 diastolik. Pastikan Anda beristirahat cukup malam sebelum jadwal.';
      } else if (userMsg.text.toLowerCase().includes('hb') || userMsg.text.toLowerCase().includes('hemoglobin') || userMsg.text.toLowerCase().includes('besi')) {
        reply = 'Untuk mendongkrak kadar Hb, perbanyak konsumsi makanan kaya zat besi seperti daging merah, bayam, serta buah bervitamin C tinggi.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'doctor',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={doctor.avatar_url}
                alt={doctor.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>{doctor.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              </h3>
              <p className="text-[10px] text-slate-500 truncate max-w-[220px]">
                {doctor.specialty} • {doctor.hospital}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc]">
          <div className="text-center my-1">
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              Sesi Telemedisin Terenkripsi End-to-End PMI
            </span>
          </div>

          {messages.map((m) => {
            const isMe = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs ${
                    isMe
                      ? 'bg-red-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Ketik pertanyaan medis atau keluhan Anda..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-hidden focus:border-red-500"
          />
          <button
            type="submit"
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

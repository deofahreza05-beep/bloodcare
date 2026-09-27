/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SubNavbar, ActiveTab } from './components/SubNavbar';
import { HeroQuickCards } from './components/HeroQuickCards';
import { BloodFilterSection } from './components/BloodFilterSection';
import { EmergencyRequestsList } from './components/EmergencyRequestsList';
import { RadarMapSection } from './components/RadarMapSection';
import { DonorPassportCard } from './components/DonorPassportCard';
import { FastPassScreeningCard } from './components/FastPassScreeningCard';
import { RewardsCatalogueCard } from './components/RewardsCatalogueCard';
import { ArticlesSection } from './components/ArticlesSection';
import { Footer } from './components/Footer';

// Modals
import { DonationPledgeModal } from './components/modals/DonationPledgeModal';
import { NewBloodRequestModal } from './components/modals/NewBloodRequestModal';
import { FastPassModal } from './components/modals/FastPassModal';
import { ScreeningModal } from './components/modals/ScreeningModal';
import { DoctorConsultModal } from './components/modals/DoctorConsultModal';
import { LabResultModal } from './components/modals/LabResultModal';
import { RewardRedeemModal } from './components/modals/RewardRedeemModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { DonorCertificateModal } from './components/modals/DonorCertificateModal';
import { BloodCompatibilityWidget } from './components/BloodCompatibilityWidget';
import { EmergencyHotlineButton } from './components/EmergencyHotlineButton';
import { LiveNotificationModal, LiveFeedItem } from './components/modals/LiveNotificationModal';
import { DirectScreenshotModal } from './components/modals/DirectScreenshotModal';

// Subviews
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { FacilitiesView } from './components/views/FacilitiesView';
import { TelemedicineView } from './components/views/TelemedicineView';
import { SchedulesView } from './components/views/SchedulesView';
import { ArticlesView } from './components/views/ArticlesView';
import { LaravelDocsView } from './components/views/LaravelDocsView';
import { LandingPageView } from './components/views/LandingPageView';
import { DesignKitView } from './components/views/DesignKitView';
import { StitchExporterView } from './components/views/StitchExporterView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobilePreviewModal } from './components/MobilePreviewModal';

// Mock Data
import {
  initialDonor,
  initialBloodRequests,
  initialFacilities,
  initialSchedules,
  initialDoctors,
  initialRewards,
  initialArticles,
  initialLabResult,
} from './data/mockData';
import { BloodRequest, BloodGroup, Rhesus, BloodComponent, RequestStatus, Screening, Doctor, Reward, Article, DonationSchedule } from './types';
import { Bell, CheckCircle } from 'lucide-react';

export default function App() {
  // Main State
  const [donor, setDonor] = useState(initialDonor);
  const [requests, setRequests] = useState<BloodRequest[]>(() => {
    try {
      const saved = localStorage.getItem('bloodcare_requests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load requests from localStorage', e);
    }
    return initialBloodRequests;
  });

  // Save requests to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('bloodcare_requests', JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests to localStorage', e);
    }
  }, [requests]);

  // Load live data from Cloud SQL Database API on initial mount
  useEffect(() => {
    const fetchFromCloudSql = async () => {
      try {
        const res = await fetch('/api/blood-requests');
        if (res.ok) {
          const cloudData = await res.json();
          if (Array.isArray(cloudData) && cloudData.length > 0) {
            // Map SQL columns if needed to match interface
            const mapped: BloodRequest[] = cloudData.map((item: any, idx: number) => {
              const hospitalName = item.healthFacilityName || item.health_facility_name || item.hospital || 'RSUD Arifin Achmad';
              return {
                id: item.id || (idx + 1),
                patient_name: item.patientName || item.patient_name || 'Pasien Tanpa Nama',
                patient_age: Number(item.patientAge || item.patient_age || 30),
                diagnosis: item.diagnosis || item.description || 'Kebutuhan Transfusi Darah',
                health_facility_id: Number(item.healthFacilityId || item.health_facility_id || 1),
                health_facility_name: hospitalName,
                city: item.city || 'Pekanbaru, Riau',
                location_detail: item.locationDetail || item.location_detail || hospitalName,
                blood_group: (item.bloodGroup || item.blood_group || 'O') as BloodGroup,
                rhesus: (item.rhesus || '+') as Rhesus,
                component: (item.component || 'PRC') as BloodComponent,
                bags_needed: Number(item.bagsNeeded || item.bags_needed || 1),
                bags_fulfilled: Number(item.bagsFulfilled || item.bags_fulfilled || 0),
                status: (item.status || 'aktif') as RequestStatus,
                urgency: item.urgency || 'sedang',
                urgency_badge: item.urgencyBadge || item.urgency_badge || 'Kritis Segera',
                case_badge: item.caseBadge || item.case_badge || 'Darurat Medis',
                deadline_text: item.deadlineText || item.deadline_text || 'Hari Ini',
                doctor_in_charge: item.doctorInCharge || item.doctor_in_charge || 'Dokter Jaga',
                contact_person: item.contactPerson || item.contact_person || item.phone || '0812-3456-7890',
                notes: item.notes || item.description || '',
                created_at: item.createdAt || item.created_at || new Date().toISOString(),
              };
            });
            setRequests(mapped);
          }
        }
      } catch (err) {
        console.log('Using local client state (fallback):', err);
      }
    };
    fetchFromCloudSql();
  }, []);

  const [facilities, setFacilities] = useState(initialFacilities);
  const [schedules, setSchedules] = useState(initialSchedules);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [rewards, setRewards] = useState(initialRewards);
  const [articles, setArticles] = useState(initialArticles);
  const [labResult, setLabResult] = useState(initialLabResult);
  const [screening, setScreening] = useState<Screening | null>(null);

  // App Navigation & Filters
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [activeCity, setActiveCity] = useState('Pekanbaru, Riau');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | 'Semua'>('Semua');
  const [selectedRhesus, setSelectedRhesus] = useState<Rhesus | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<BloodComponent | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('Kota Pekanbaru (5 Lokasi Aktif)');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bloodcare_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const handleAdminAuthChange = (auth: boolean) => {
    setIsAdminAuthenticated(auth);
    try {
      if (auth) {
        localStorage.setItem('bloodcare_admin_auth', 'true');
      } else {
        localStorage.removeItem('bloodcare_admin_auth');
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Modals visibility
  const [pledgeTargetRequest, setPledgeTargetRequest] = useState<BloodRequest | null>(null);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [isFastPassModalOpen, setIsFastPassModalOpen] = useState(false);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);
  const [isLabResultModalOpen, setIsLabResultModalOpen] = useState(false);
  const [selectedDoctorForChat, setSelectedDoctorForChat] = useState<Doctor | null>(null);
  const [selectedRewardForRedeem, setSelectedRewardForRedeem] = useState<Reward | null>(null);
  const [selectedArticleForRead, setSelectedArticleForRead] = useState<Article | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Live Realtime Notifications State
  const [liveNotifications, setLiveNotifications] = useState<LiveFeedItem[]>([
    {
      id: 'notif-1',
      type: 'emergency_request',
      title: 'Permintaan Darah Darurat Baru: Ny. Siti Rahma',
      description: 'RSUD Arifin Achmad membutuhkan 3 kantong PRC Gol. O+ (Sisa 3 jam).',
      timestamp: '2 menit lalu',
      bloodGroup: 'O',
      rhesus: '+',
      urgent: true,
      linkText: 'Lihat Pasien & Donor',
    },
    {
      id: 'notif-2',
      type: 'donor_pledged',
      title: 'Relawan Berikrar Donor',
      description: 'dr. Adi Putra baru saja berikrar mendonorkan 1 kantong darah untuk Ananda Dimas.',
      timestamp: '14 menit lalu',
      bloodGroup: 'B',
      rhesus: '+',
      linkText: 'Lihat Riwayat Bantuan',
    },
    {
      id: 'notif-3',
      type: 'stock_alert',
      title: 'Peringatan Stok Kritis PMI Riau',
      description: 'Stok Golongan AB- dan O- menipis di bawah batas aman harian.',
      timestamp: '45 menit lalu',
      bloodGroup: 'AB',
      rhesus: '-',
      urgent: true,
      linkText: 'Cek Bank Darah PMI',
    },
  ]);

  // Periodic Real-Time Simulation: occasionally broadcast incoming donors or emergency requests
  useEffect(() => {
    const liveInterval = setInterval(() => {
      const mockEvents = [
        {
          type: 'donor_pledged' as const,
          title: 'Relawan Baru Berikrar Donor!',
          description: 'Seorang pendonor sukarela baru saja mendaftar untuk donor darah di UDD PMI Pekanbaru.',
          bloodGroup: 'O',
          rhesus: '+',
          urgent: false,
        },
        {
          type: 'donor_pledged' as const,
          title: 'Ikrar Bantuan Darah Masuk',
          description: 'Relawan #PMI-ID-8821 menyatakan siap donor darah di RS Awal Bros Sudirman.',
          bloodGroup: 'A',
          rhesus: '+',
          urgent: false,
        },
      ];

      const chosen = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const newFeedItem: LiveFeedItem = {
        id: `notif-${Date.now()}`,
        type: chosen.type,
        title: chosen.title,
        description: chosen.description,
        timestamp: 'Baru saja',
        bloodGroup: chosen.bloodGroup,
        rhesus: chosen.rhesus,
        urgent: chosen.urgent,
        linkText: 'Lihat Rincian',
      };

      setLiveNotifications((prev) => [newFeedItem, ...prev.slice(0, 9)]);
      showToast(`📢 Sinyal Real-Time: ${chosen.title}`);
    }, 45000); // Trigger every 45s for realistic demonstration

    return () => clearInterval(liveInterval);
  }, []);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered requests for the home list with live search query & city filter
  const filteredHomeRequests = requests.filter((r) => {
    // City filter matching
    if (activeCity && activeCity !== 'Semua Wilayah') {
      const cityNameOnly = activeCity.split(',')[0].toLowerCase().trim();
      const reqCity = (r.city || '').toLowerCase();
      const facilityName = (r.health_facility_name || '').toLowerCase();
      if (!reqCity.includes(cityNameOnly) && !facilityName.includes(cityNameOnly)) {
        return false;
      }
    }

    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (r.patient_name || '').toLowerCase().includes(q) ||
        (r.diagnosis || '').toLowerCase().includes(q) ||
        (r.health_facility_name || '').toLowerCase().includes(q) ||
        (r.blood_group || '').toLowerCase().includes(q) ||
        (r.doctor_in_charge || '').toLowerCase().includes(q) ||
        (r.location_detail || '').toLowerCase().includes(q);
      
      if (!matchesSearch) return false;
    }

    if (selectedBloodGroup !== 'Semua' && r.blood_group !== selectedBloodGroup) {
      return false;
    }
    if (selectedRhesus && r.rhesus !== selectedRhesus) {
      return false;
    }
    if (selectedComponent && r.component !== selectedComponent) {
      return false;
    }
    return true;
  });

  const handleCityChange = (city: string) => {
    setActiveCity(city);
    setSelectedLocation(city);

    // If current blood group filter has no matches in the newly selected city, reset to 'Semua' so user sees patients
    const cityMatches = requests.filter((r) => {
      if (city === 'Semua Wilayah') return true;
      const c = city.split(',')[0].toLowerCase().trim();
      return (r.city || '').toLowerCase().includes(c) || r.health_facility_name.toLowerCase().includes(c);
    });

    if (selectedBloodGroup !== 'Semua' && !cityMatches.some((r) => r.blood_group === selectedBloodGroup)) {
      setSelectedBloodGroup('Semua');
    }

    showToast(`Wilayah beralih ke: ${city}. Data pasien dan rumah sakit diperbarui.`);
  };

  // Handlers
  const handleConfirmPledge = (requestId: number, bags: number) => {
    let updatedFulfilled = bags;
    let updatedStatus: RequestStatus = 'aktif';

    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const newFulfilled = req.bags_fulfilled + bags;
          const newStatus: RequestStatus = newFulfilled >= req.bags_needed ? 'terpenuhi' : 'aktif';
          updatedFulfilled = newFulfilled;
          updatedStatus = newStatus;
          return {
            ...req,
            bags_fulfilled: newFulfilled,
            status: newStatus,
          };
        }
        return req;
      })
    );

    // Sync to Cloud SQL in background
    try {
      fetch(`/api/blood-requests/${requestId}/fulfill`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bagsFulfilled: updatedFulfilled, status: updatedStatus }),
      }).catch((e) => console.log('Sync fulfill bg err:', e));
    } catch (e) {
      console.log('Sync err:', e);
    }

    // Reward points for volunteer
    setDonor((prev) => ({
      ...prev,
      current_points: prev.current_points + bags * 100,
      total_donations: prev.total_donations + 1,
      total_volume_ml: prev.total_volume_ml + bags * 350,
      lives_saved_estimate: prev.lives_saved_estimate + bags * 3,
    }));

    const targetReq = requests.find((r) => r.id === requestId);
    if (targetReq) {
      setLiveNotifications((prev) => [
        {
          id: `pledge-${Date.now()}`,
          type: 'donor_pledged',
          title: `Relawan Baru: Ikrar ${bags} Kantong Darah`,
          description: `${donor.full_name} siap mendonor untuk ${targetReq.patient_name} di ${targetReq.health_facility_name}.`,
          timestamp: 'Baru saja',
          bloodGroup: targetReq.blood_group,
          rhesus: targetReq.rhesus,
          urgent: false,
          linkText: 'Lihat Pasien',
          relatedRequest: targetReq,
        },
        ...prev,
      ]);
    }

    showToast(`Bantuan ${bags} kantong darah telah tercatat. Anda mendapatkan +${bags * 100} Poin Amal!`);
  };

  const handleCreateRequest = async (newReqData: Omit<BloodRequest, 'id' | 'bags_fulfilled' | 'status' | 'created_at'>) => {
    try {
      const response = await fetch('/api/blood-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: newReqData.patient_name,
          patientAge: newReqData.patient_age,
          diagnosis: newReqData.diagnosis,
          healthFacilityId: newReqData.health_facility_id || 1,
          healthFacilityName: newReqData.health_facility_name,
          city: newReqData.city || 'Pekanbaru, Riau',
          locationDetail: newReqData.location_detail,
          bloodGroup: newReqData.blood_group,
          rhesus: newReqData.rhesus,
          component: newReqData.component,
          bagsNeeded: newReqData.bags_needed,
          bagsFulfilled: 0,
          status: 'aktif',
          urgency: newReqData.urgency || 'kritis',
          urgencyBadge: newReqData.urgency_badge || 'Kritis Segera',
          caseBadge: newReqData.case_badge || 'IGD Darurat',
          deadlineText: newReqData.deadline_text || 'Sangat Mendesak (< 4 Jam)',
          doctorInCharge: newReqData.doctor_in_charge,
          contactPerson: newReqData.contact_person,
          notes: newReqData.notes || '',
        }),
      });

      let savedRecord: any = null;
      if (response.ok) {
        savedRecord = await response.json();
      }

      const newRequest: BloodRequest = {
        ...newReqData,
        id: savedRecord?.id || Date.now(),
        bags_fulfilled: 0,
        status: 'aktif',
        created_at: savedRecord?.createdAt || new Date().toISOString(),
      };

      setRequests((prev) => [newRequest, ...prev]);

      // Reset filters so the user immediately sees their newly submitted patient
      setSelectedBloodGroup('Semua');
      setSelectedRhesus(null);
      setSelectedComponent(null);
      setSearchQuery('');
      if (newRequest.city) {
        setActiveCity(newRequest.city);
        setSelectedLocation(newRequest.city);
      }

      // If user is currently on landing page, navigate directly to dashboard
      if (activeTab === 'landing') {
        setActiveTab('beranda');
      }

      // Live Broadcast Notification
      setLiveNotifications((prev) => [
        {
          id: `broadcast-${Date.now()}`,
          type: 'emergency_request',
          title: `🚨 Siaga Darurat Baru: ${newRequest.patient_name}`,
          description: `Dibutuhkan ${newRequest.bags_needed} kantong ${newRequest.blood_group}${newRequest.rhesus} di ${newRequest.health_facility_name}.`,
          timestamp: 'Baru saja',
          bloodGroup: newRequest.blood_group,
          rhesus: newRequest.rhesus,
          urgent: true,
          linkText: 'Bantu Sekarang',
          relatedRequest: newRequest,
        },
        ...prev,
      ]);

      showToast(`Permintaan darah untuk ${newRequest.patient_name} berhasil tersimpan ke database & terbit di radar!`);
    } catch (err) {
      console.error('Error saving request to database:', err);
      // Fallback local insert
      const fallbackRequest: BloodRequest = {
        ...newReqData,
        id: Date.now(),
        bags_fulfilled: 0,
        status: 'aktif',
        created_at: new Date().toISOString(),
      };
      setRequests((prev) => [fallbackRequest, ...prev]);
      showToast(`Permintaan darah diterbitkan (Lokal: ${fallbackRequest.patient_name}).`);
    }

    // Smooth scroll down to requests list after rendering
    setTimeout(() => {
      const el = document.getElementById('requests-list-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleUpdateRequestStatus = (requestId: number, status: RequestStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    fetch(`/api/blood-requests/${requestId}/fulfill`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bagsFulfilled: requests.find((r) => r.id === requestId)?.bags_fulfilled || 0, status }),
    }).catch((e) => console.log('Update status sync err:', e));

    showToast(`Status permintaan berhasil diperbarui menjadi: ${status.toUpperCase()}`);
  };

  const handleDeleteRequest = (requestId: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    fetch(`/api/blood-requests/${requestId}`, {
      method: 'DELETE',
    }).catch((e) => console.log('Delete sync err:', e));

    showToast('Permintaan darah berhasil dihapus dari database.');
  };

  const handleShareWhatsApp = (request: BloodRequest) => {
    const text = `🚨 *URGENT: DIBUTUHKAN DONOR DARAH* 🚨%0A%0A*Pasien:* ${request.patient_name} (${request.patient_age} Thn)%0A*Diagnosis:* ${request.diagnosis}%0A*Golongan Darah:* ${request.blood_group}${request.rhesus} (${request.component})%0A*Kebutuhan:* ${request.bags_needed - request.bags_fulfilled} kantong lagi%0A*Lokasi:* ${request.health_facility_name} (${request.location_detail})%0A*Batas Waktu:* ${request.deadline_text}%0A*PJ Medis:* ${request.doctor_in_charge}%0A%0ABantu sekarang via BloodCare: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleRedeemReward = (reward: Reward) => {
    if (donor.current_points < reward.points_required) {
      showToast('Poin Anda belum mencukupi untuk reward ini.');
      return;
    }
    setDonor((prev) => ({
      ...prev,
      current_points: prev.current_points - reward.points_required,
    }));
    showToast(`Reward "${reward.title}" berhasil ditukarkan!`);
  };

  const handleScreeningCompleted = (newScreening: Screening) => {
    setScreening(newScreening);
    showToast('Skrining berhasil dievaluasi! Fast-Pass QR Code Anda telah aktif.');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex flex-col antialiased selection:bg-red-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        donor={donor}
        onOpenNewRequest={() => setIsNewRequestModalOpen(true)}
        onSelectCity={handleCityChange}
        activeCity={activeCity}
        unreadCount={liveNotifications.length}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenLabResult={() => setIsLabResultModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMobileQR={() => setIsMobileModalOpen(true)}
        onOpenGallery={() => setIsGalleryModalOpen(true)}
        onNavigateToDesign={() => setActiveTab('stitch-export')}
        onSearchResultSelect={(item) => {
          if (item.type === 'doctor') {
            setActiveTab('telemedisin');
          } else if (item.type === 'faskes') {
            setActiveTab('faskes');
          } else if (item.type === 'screening') {
            setIsScreeningModalOpen(true);
          } else if (item.type === 'blood') {
            setSelectedBloodGroup('O');
            setSelectedRhesus('+');
            setActiveTab('beranda');
          }
        }}
      />

      {/* Secondary Navigation */}
      <SubNavbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'admin' && !isAdminAuthenticated) {
            setIsAdminLoginModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={() => {
          handleAdminAuthChange(false);
          if (activeTab === 'admin') setActiveTab('beranda');
          showToast('Sesi Admin telah dikunci dan berhasil keluar.');
        }}
        onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
      />

      {/* Main Content Area */}
      {activeTab === 'landing' ? (
        <div className="pb-16 md:pb-0">
          <LandingPageView
            onStartDonation={() => setActiveTab('donor')}
            onRequestBlood={() => setIsNewRequestModalOpen(true)}
            onExploreFacilities={() => setActiveTab('faskes')}
            onViewLiveDashboard={() => setActiveTab('beranda')}
            latestRequest={requests[0]}
          />
        </div>
      ) : (
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 pb-20 md:pb-12">
        
        {/* Render Tab Views */}
        {activeTab === 'beranda' && (
          <>
            {/* Hero Quick Cards */}
            <HeroQuickCards
              onOpenUrgentRequests={() => {
                const el = document.getElementById('requests-list-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSchedules={() => setActiveTab('donor')}
              onOpenScreening={() => setIsScreeningModalOpen(true)}
              onOpenConsultation={() => setActiveTab('telemedisin')}
              onOpenSupplements={() => {
                if (rewards[0]) setSelectedRewardForRedeem(rewards[0]);
              }}
              onOpenLabResults={() => setIsLabResultModalOpen(true)}
            />

            {/* Main Content 2-Column Grid (matching screen.png) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-start">
              
              {/* Left Column (Pusat Filter, Permintaan Darurat Aktif, Peta Radar) */}
              <div className="lg:col-span-8">
                
                {/* 1. Filter Section */}
                <div id="search-filter-section">
                  <BloodFilterSection
                    selectedBloodGroup={selectedBloodGroup}
                    onSelectBloodGroup={setSelectedBloodGroup}
                    selectedRhesus={selectedRhesus}
                    onSelectRhesus={setSelectedRhesus}
                    selectedComponent={selectedComponent}
                    onSelectComponent={setSelectedComponent}
                    selectedLocation={selectedLocation}
                    onSelectLocation={handleCityChange}
                    activeCity={activeCity}
                    matchCount={filteredHomeRequests.length}
                  />
                </div>

                {/* 2. Emergency Blood Requests List */}
                <div id="requests-list-section">
                  <EmergencyRequestsList
                    requests={filteredHomeRequests}
                    onBantuSekarang={(req) => setPledgeTargetRequest(req)}
                    onOpenNewRequestModal={() => setIsNewRequestModalOpen(true)}
                    onShareWhatsApp={handleShareWhatsApp}
                  />
                </div>

                {/* 3. Radar Map Section */}
                <RadarMapSection
                  onOpenFacilitiesTab={() => setActiveTab('faskes')}
                />

                {/* 4. Blood Compatibility Interactive Widget */}
                <div id="compatibility-widget-section">
                  <BloodCompatibilityWidget />
                </div>

              </div>

              {/* Right Column Sidebar (Paspor Relawan, Fast-Pass Skrining, Katalog Apresiasi) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 1. Paspor Relawan Donor PMI */}
                <DonorPassportCard
                  donor={donor}
                  onOpenHistory={() => setIsLabResultModalOpen(true)}
                  onOpenCertificate={() => setIsCertificateModalOpen(true)}
                />

                {/* 2. Fast-Pass Skrining Mandiri */}
                <FastPassScreeningCard
                  onShowFullQR={() => setIsFastPassModalOpen(true)}
                  onRetakeScreening={() => setIsScreeningModalOpen(true)}
                />

                {/* 3. Katalog Apresiasi Pendonor */}
                <RewardsCatalogueCard
                  currentPoints={donor.current_points}
                  rewards={rewards}
                  onRedeemReward={(r) => setSelectedRewardForRedeem(r)}
                  onOpenFullCatalog={() => {
                    if (rewards[0]) setSelectedRewardForRedeem(rewards[0]);
                  }}
                />

              </div>

            </div>

            {/* Bottom Education & Humaniora Articles */}
            <ArticlesSection
              articles={articles}
              onOpenArticle={(art) => setSelectedArticleForRead(art)}
              onViewAllArticles={() => setActiveTab('edukasi')}
            />
          </>
        )}

        {/* Tab 2: Donor Darah (Schedules & Bus Locator) */}
        {activeTab === 'donor' && (
          <div className="pt-6">
            <SchedulesView
              schedules={schedules}
              onBookSlot={(sc) => {
                showToast(`Slot antrean di ${sc.location_name} berhasil dibooking untuk dr. Adi Putra!`);
              }}
            />
          </div>
        )}

        {/* Tab 3: Telemedisin PMI */}
        {activeTab === 'telemedisin' && (
          <div className="pt-6">
            <TelemedicineView
              doctors={doctors}
              onSelectDoctor={(doc) => setSelectedDoctorForChat(doc)}
            />
          </div>
        )}

        {/* Tab 4: Faskes & RS */}
        {activeTab === 'faskes' && (
          <div className="pt-6">
            <FacilitiesView
              facilities={facilities}
              activeCity={activeCity}
              onSelectCity={handleCityChange}
              onOpenNewRequest={() => setIsNewRequestModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 5: Edukasi & Riset */}
        {activeTab === 'edukasi' && (
          <div className="pt-6">
            <ArticlesView
              articles={articles}
              onOpenArticle={(art) => setSelectedArticleForRead(art)}
            />
          </div>
        )}

        {/* Tab 6: Admin Dashboard */}
        {activeTab === 'admin' && (
          <div className="pt-6">
            {!isAdminAuthenticated ? (
              <div className="max-w-lg mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center">
                <div className="w-16 h-16 rounded-3xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mx-auto mb-4">
                  <span className="text-3xl">🔒</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase mb-2">
                  Hak Akses Terbatas (RBAC)
                </div>
                <h2 className="text-xl font-black text-slate-800">
                  Panel Administrasi Faskes & PMI Terkunci
                </h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Halaman ini berisi wewenang untuk menambah, mengubah, atau menghapus data pasien darurat dan stok kantong darah. Pengunjung umum tidak diizinkan masuk tanpa kredensial resmi.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('beranda')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Kembali ke Beranda
                  </button>
                  <button
                    onClick={() => setIsAdminLoginModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Masuk Sebagai Petugas</span>
                  </button>
                </div>
              </div>
            ) : (
              <AdminDashboardView
                requests={requests}
                onUpdateRequestStatus={handleUpdateRequestStatus}
                onDeleteRequest={handleDeleteRequest}
                facilities={facilities}
                donors={[donor]}
                schedules={schedules}
                rewards={rewards}
                onOpenNewRequestModal={() => setIsNewRequestModalOpen(true)}
              />
            )}
          </div>
        )}

        {/* Tab 7: Kode Laravel MVC & Laragon Setup Guide */}
        {activeTab === 'laravel' && (
          <div className="pt-6">
            <LaravelDocsView />
          </div>
        )}

        {/* Tab 8: Katalog Desain UI (Khusus Word/PPT Laporan Dosen) */}
        {activeTab === 'design' && (
          <div className="pt-4">
            <DesignKitView />
          </div>
        )}

        {/* Tab 9: Stitch AI Style Exporter (Download Masing-Masing & ZIP) */}
        {activeTab === 'stitch-export' && (
          <div className="pt-4">
            <StitchExporterView />
          </div>
        )}

      </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {pledgeTargetRequest && (
        <DonationPledgeModal
          request={pledgeTargetRequest}
          donor={donor}
          onClose={() => setPledgeTargetRequest(null)}
          onConfirmPledge={handleConfirmPledge}
        />
      )}

      {isNewRequestModalOpen && (
        <NewBloodRequestModal
          facilities={facilities}
          onClose={() => setIsNewRequestModalOpen(false)}
          onSubmitRequest={handleCreateRequest}
        />
      )}

      {isFastPassModalOpen && (
        <FastPassModal
          donor={donor}
          screening={screening}
          onClose={() => setIsFastPassModalOpen(false)}
        />
      )}

      {isScreeningModalOpen && (
        <ScreeningModal
          onClose={() => setIsScreeningModalOpen(false)}
          onScreeningCompleted={handleScreeningCompleted}
        />
      )}

      {selectedDoctorForChat && (
        <DoctorConsultModal
          doctor={selectedDoctorForChat}
          onClose={() => setSelectedDoctorForChat(null)}
        />
      )}

      {isLabResultModalOpen && (
        <LabResultModal
          labResult={labResult}
          donor={donor}
          onClose={() => setIsLabResultModalOpen(false)}
        />
      )}

      {selectedRewardForRedeem && (
        <RewardRedeemModal
          reward={selectedRewardForRedeem}
          currentPoints={donor.current_points}
          onClose={() => setSelectedRewardForRedeem(null)}
          onConfirmRedeem={handleRedeemReward}
        />
      )}

      {selectedArticleForRead && (
        <ArticleModal
          article={selectedArticleForRead}
          onClose={() => setSelectedArticleForRead(null)}
        />
      )}

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={() => {
          handleAdminAuthChange(true);
          setIsAdminLoginModalOpen(false);
          setActiveTab('admin');
          showToast('Otentikasi Berhasil! Selamat datang di Panel Administrasi Faskes & PMI.');
        }}
      />

      {/* Official Donor Certificate Modal (Printable/PDF) */}
      <DonorCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        donor={donor}
      />

      {/* Real-time Live Notifications Modal */}
      <LiveNotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={liveNotifications}
        onSelectNotification={(item) => {
          if (item.relatedRequest) {
            setPledgeTargetRequest(item.relatedRequest);
          } else {
            setActiveTab('beranda');
          }
        }}
        onClearAll={() => {
          setLiveNotifications([]);
          showToast('Semua notifikasi telah ditandai dibaca.');
        }}
      />

      {/* Mobile QR & Link Modal */}
      <MobilePreviewModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        appUrl={window.location.href}
      />

      {/* Tangkapan Layar Pixel-Perfect Layar Asli */}
      <DirectScreenshotModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        activeTabName={
          activeTab === 'beranda'
            ? 'Dashboard-Radar'
            : activeTab === 'landing'
            ? 'Landing-Page'
            : activeTab === 'donor'
            ? 'Jadwal-Donor'
            : activeTab === 'telemedisin'
            ? 'Telemedisin-Dokter'
            : activeTab === 'faskes'
            ? 'Stok-Faskes-RS'
            : activeTab === 'admin'
            ? 'Admin-Panel-PMI'
            : activeTab === 'edukasi'
            ? 'Edukasi-Artikel'
            : 'Laravel-Code-Docs'
        }
      />

      {/* Floating 24-Hour Emergency Hotline */}
      <EmergencyHotlineButton />

      {/* Mobile App Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNewRequest={() => setIsNewRequestModalOpen(true)}
      />

    </div>
  );
}

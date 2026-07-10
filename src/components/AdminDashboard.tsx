import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Download, 
  Plus, 
  ArrowLeft, 
  LogOut, 
  Calendar, 
  Phone, 
  Mail, 
  School, 
  User, 
  Briefcase, 
  Package, 
  Tag, 
  FileText, 
  Check, 
  X, 
  TrendingUp, 
  Users, 
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Cloud
} from 'lucide-react';
import { Lead } from '../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export function AdminDashboard({ onBackToHome }: AdminDashboardProps) {
  // Authentication states
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Leads data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [packageFilter, setPackageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Detail & Note editing modal states
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState('');

  // Manual Lead creation modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newContactPerson, setNewContactPerson] = useState('');
  const [newRole, setNewRole] = useState('Kepala Sekolah');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPackage, setNewPackage] = useState('Growth School');
  const [newNotes, setNewNotes] = useState('');

  // Notification / Toast states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Lead deletion confirmation state
  const [leadToDelete, setLeadToDelete] = useState<{ id: string; schoolName: string } | null>(null);

  // Verify auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('sapanesia_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    loadLeads();
  }, []);

  // Sync / filter leads when dependencies change
  useEffect(() => {
    let result = [...leads];

    // Apply Search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.schoolName.toLowerCase().includes(term) ||
          lead.contactPerson.toLowerCase().includes(term) ||
          lead.phone.includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          (lead.notes && lead.notes.toLowerCase().includes(term))
      );
    }

    // Apply Status filter
    if (statusFilter !== 'all') {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Apply Package filter
    if (packageFilter !== 'all') {
      result = result.filter((lead) => lead.packageInterest === packageFilter);
    }

    // Apply Sorting
    if (sortBy === 'newest') {
      // Sort descending by parsed date or index
      result.sort((a, b) => {
        const idA = parseInt(a.id.split('-')[1]) || 0;
        const idB = parseInt(b.id.split('-')[1]) || 0;
        return idB - idA;
      });
    } else {
      result.sort((a, b) => {
        const idA = parseInt(a.id.split('-')[1]) || 0;
        const idB = parseInt(b.id.split('-')[1]) || 0;
        return idA - idB;
      });
    }

    setFilteredLeads(result);
  }, [leads, searchTerm, statusFilter, packageFilter, sortBy]);

  const loadLeads = () => {
    const raw = localStorage.getItem('sapanesia_leads');
    if (raw) {
      try {
        const parsed: Lead[] = JSON.parse(raw);
        // Ensure every lead has a valid status, defaulting to 'baru' if missing
        const normalized = parsed.map(lead => ({
          ...lead,
          status: lead.status || 'baru'
        }));
        setLeads(normalized);
      } catch (e) {
        console.error('Error loading leads', e);
      }
    } else {
      // Seed some mock data initially if empty, to make the dashboard look useful
      const initialSeed: Lead[] = [
        {
          id: 'lead-1719600000000',
          schoolName: 'SMA Negeri 1 Sukoharjo',
          contactPerson: 'Dra. Endang Purwati, M.Pd.',
          role: 'Kepala Sekolah',
          phone: '+6281234567890',
          email: 'sman1skh@sch.id',
          packageInterest: 'Growth School',
          notes: 'Tertarik membuat feeds instagram pendaftaran PPDB lebih rapi dan konsisten.',
          createdAt: '25/06/2026, 09.30.15',
          status: 'baru'
        },
        {
          id: 'lead-1719500000000',
          schoolName: 'Yayasan Bakti Nusantara',
          contactPerson: 'Budi Hartono, S.T.',
          role: 'Ketua Yayasan',
          phone: '+6285698765432',
          email: 'humas@baktinusantara.or.id',
          packageInterest: 'Premium School',
          notes: 'Mencari vendor untuk handle 3 unit sekolah di bawah yayasan kami sekaligus.',
          createdAt: '24/06/2026, 14.20.00',
          status: 'dihubungi'
        },
        {
          id: 'lead-1719400000000',
          schoolName: 'SMP Al-Hikmah Bandung',
          contactPerson: 'Siti Rahmawati, S.Pd.',
          role: 'Tim Humas Sekolah',
          phone: '+6287811223344',
          email: 'smpalhikmah@gmail.com',
          packageInterest: 'Starter School',
          notes: 'Perlu bimbingan awal karena keterbatasan staff humas yang bisa desain grafik.',
          createdAt: '23/06/2026, 11.05.42',
          status: 'selesai'
        }
      ];
      localStorage.setItem('sapanesia_leads', JSON.stringify(initialSeed));
      setLeads(initialSeed);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept standard test credentials
    if (passcode === 'admin123' || passcode === 'sapanesia2026') {
      localStorage.setItem('sapanesia_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Login admin berhasil. Selamat datang kembali!', 'success');
    } else {
      setLoginError('Passcode salah. Silakan coba "admin123" atau "sapanesia2026".');
      showToast('Akses ditolak. Silakan periksa sandi Anda.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sapanesia_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
    showToast('Berhasil keluar dari panel administrator.', 'success');
  };

  const updateLeadStatus = (leadId: string, newStatus: 'baru' | 'dihubungi' | 'selesai') => {
    const updated = leads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });

    setLeads(updated);
    localStorage.setItem('sapanesia_leads', JSON.stringify(updated));
    showToast(`Status pendaftaran berhasil diperbarui menjadi "${newStatus}".`, 'success');

    // Update selected lead details if open
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const updateLeadNotes = (leadId: string, notesContent: string) => {
    const updated = leads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, notes: notesContent };
      }
      return lead;
    });

    setLeads(updated);
    localStorage.setItem('sapanesia_leads', JSON.stringify(updated));
    showToast('Catatan detail pendaftaran berhasil disimpan.', 'success');
    setIsEditingNotes(false);

    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, notes: notesContent });
    }
  };

  const handleDeleteLead = (leadId: string, school: string) => {
    setLeadToDelete({ id: leadId, schoolName: school });
  };

  const confirmDeleteLead = () => {
    if (leadToDelete) {
      const { id, schoolName } = leadToDelete;
      const updated = leads.filter(lead => lead.id !== id);
      setLeads(updated);
      localStorage.setItem('sapanesia_leads', JSON.stringify(updated));
      showToast(`Data pendaftaran "${schoolName}" berhasil dihapus.`, 'success');
      
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
      setLeadToDelete(null);
    }
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName || !newContactPerson || !newPhone || !newEmail) {
      showToast('Mohon lengkapi kolom berlabel bintang wajib.', 'error');
      return;
    }

    const formatPhoneNumber = (input: string): string => {
      const digits = input.replace(/[^0-9]/g, '');
      if (digits.startsWith('0')) {
        return '+62' + digits.slice(1);
      }
      if (digits.startsWith('62')) {
        return '+' + digits;
      }
      if (digits.length > 0) {
        return '+62' + digits;
      }
      return input;
    };

    const formattedPhone = formatPhoneNumber(newPhone);

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      schoolName: newSchoolName,
      contactPerson: newContactPerson,
      role: newRole,
      phone: formattedPhone,
      email: newEmail,
      packageInterest: newPackage,
      notes: newNotes,
      createdAt: new Date().toLocaleString('id-ID'),
      status: 'baru'
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('sapanesia_leads', JSON.stringify(updated));
    
    // Clear form
    setNewSchoolName('');
    setNewContactPerson('');
    setNewRole('Kepala Sekolah');
    setNewPhone('');
    setNewEmail('');
    setNewPackage('Growth School');
    setNewNotes('');
    
    setShowAddModal(false);
    showToast(`Registrasi offline "${newLead.schoolName}" berhasil ditambahkan!`, 'success');
  };

  // Convert current filtered leads list to downloadable CSV
  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      showToast('Tidak ada data yang dapat diekspor.', 'error');
      return;
    }

    // CSV Headers
    const headers = ['ID', 'Nama Sekolah', 'Kontak Penghubung', 'Jabatan', 'Nomor WhatsApp', 'Email', 'Paket Diminati', 'Catatan', 'Tanggal Dibuat', 'Status'];
    
    // CSV Rows
    const rows = filteredLeads.map(lead => [
      lead.id,
      `"${lead.schoolName.replace(/"/g, '""')}"`,
      `"${lead.contactPerson.replace(/"/g, '""')}"`,
      `"${lead.role}"`,
      `"${lead.phone}"`,
      `"${lead.email}"`,
      `"${lead.packageInterest}"`,
      `"${(lead.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${lead.createdAt}"`,
      `"${lead.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sapanesia_Leads_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Laporan pendaftaran berhasil diunduh sebagai file CSV.', 'success');
  };

  // Compile a custom follow up message for WhatsApp
  const handleOpenWhatsApp = (lead: Lead) => {
    const text = `Halo Bapak/Ibu ${lead.contactPerson} dari ${lead.schoolName},\n\n` +
      `Terima kasih telah mendaftar *Audit Media Sosial Gratis* dari *Sapanesia Media Management*.\n\n` +
      `Kami ingin menjadwalkan koordinasi singkat (±10 menit) untuk membahas kebutuhan branding dan desain sekolah Bapak/Ibu. Sebagai referensi, Bapak/Ibu juga dapat melihat portofolio desain kami di Sosial Media kami:\n` +
      `📲 https://instagram.com/sapanesia.smm/\n\n` +
      `Apakah Bapak/Ibu berkenan? Silakan informasikan waktu yang paling nyaman untuk kami komunikasi dengan Bapak/Ibu.\n\n` +
      `Terima kasih.\n\n` +
      `*Salam hangat,*\n` +
      `*Admin Sapanesia Media Management*`;

    const message = encodeURIComponent(text);
    let targetPhone = lead.phone.replace(/[^0-9]/g, '');
    if (targetPhone.startsWith('0')) {
      targetPhone = '62' + targetPhone.slice(1);
    }
    window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank');
  };

  // Metrics calculations
  const totalLeadsCount = leads.length;
  const baruCount = leads.filter(l => l.status === 'baru').length;
  const dihubungiCount = leads.filter(l => l.status === 'dihubungi').length;
  const selesaiCount = leads.filter(l => l.status === 'selesai').length;

  // Find most selected package
  const packageStats = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.packageInterest] = (acc[lead.packageInterest] || 0) + 1;
    return acc;
  }, {});
  let mostPopularPackage = 'Belum ada data';
  let maxCount = 0;
  Object.keys(packageStats).forEach((pkg) => {
    const count = packageStats[pkg];
    if (count > maxCount) {
      maxCount = count;
      mostPopularPackage = pkg;
    }
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Dynamic Toast Message */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl transition-all animate-bounce ${
          toastType === 'success' 
            ? 'bg-slate-950 border-emerald-900/40 text-emerald-400' 
            : 'bg-slate-950 border-rose-950 text-rose-400'
        }`} style={{ animationDuration: '3s' }}>
          <div className={`w-2 h-2 rounded-full ${toastType === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Security Login Gate View */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto my-12 relative z-10">
          <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-blue-900/20 text-blue-400 border border-blue-800/40 flex items-center justify-center mx-auto shadow-inner">
              <Lock size={28} />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-blue-900/40 px-3 py-1 rounded-full">
                Portal Kontrol Keamanan
              </span>
              <h2 className="text-2xl font-extrabold mt-3 text-white tracking-tight">
                Akses Administrator
              </h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Halaman ini dilindungi enkripsi lokal dan hanya dapat diakses oleh tim representatif internal Sapanesia Media Management.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                  Masukkan Passcode Keamanan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Masukkan kata sandi admin..."
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-800 text-sm font-bold text-white bg-slate-900/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-11 pr-10"
                    required
                  />
                  <div className="absolute left-4 top-4 text-slate-500">
                    <Lock size={16} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {showPassword ? 'Sembunyikan' : 'Lihat'}
                    </span>
                  </button>
                </div>
                {loginError && (
                  <p className="text-rose-400 text-[11px] font-semibold mt-2 leading-relaxed">
                    {loginError}
                  </p>
                )}
                <div className="mt-2 bg-slate-900 border border-slate-800/50 rounded-lg p-2.5 text-[10px] text-slate-400 leading-relaxed font-semibold">
                  💡 <span className="text-blue-400">Petunjuk Akses:</span> Anda dapat menggunakan passcode penguji <strong className="text-white bg-slate-800 px-1 py-0.5 rounded">sapanesia2026</strong> atau <strong className="text-white bg-slate-800 px-1 py-0.5 rounded">admin123</strong>.
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock size={14} />
                <span>Buka Panel Kontrol Dashboard</span>
              </button>
            </form>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="button"
                onClick={onBackToHome}
                className="text-xs text-slate-500 hover:text-white font-bold transition-colors cursor-pointer"
              >
                ← Kembali ke Halaman Utama
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard Layout */
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>System Monitor Aktif</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Branding Lead Control Panel
              </h1>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Kelola, saring, hubungi, dan tindak lanjuti pendaftaran audit media sosial sekolah secara real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-900/10"
              >
                <Plus size={15} />
                <span>Tambah Registrasi Offline</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all border border-slate-700"
              >
                <LogOut size={15} />
                <span>Keluar</span>
              </button>
            </div>
          </div>

          {/* Quick Overview Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            {/* Total Lead Summary Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-extrabold uppercase tracking-widest">Total Pendaftar</span>
                <Users size={16} className="text-blue-400" />
              </div>
              <div className="text-2xl font-black text-white">{totalLeadsCount}</div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none">Pendaftaran terkumpul</div>
            </div>

            {/* Baru Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2 border-l-4 border-l-blue-600">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">Status Baru</span>
                <Clock size={16} className="text-blue-500" />
              </div>
              <div className="text-2xl font-black text-white">{baruCount}</div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none">Menunggu tindakan</div>
            </div>

            {/* Dihubungi Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2 border-l-4 border-l-amber-600">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">Dihubungi</span>
                <MessageSquare size={16} className="text-amber-500" />
              </div>
              <div className="text-2xl font-black text-white">{dihubungiCount}</div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none">Sedang negosiasi</div>
            </div>

            {/* Selesai Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2 border-l-4 border-l-emerald-600">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Selesai/Deal</span>
                <CheckCircle size={16} className="text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-white">{selesaiCount}</div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none">Menjadi klien aktif</div>
            </div>

            {/* Popular Package Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm col-span-2 md:col-span-1 space-y-2">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-extrabold uppercase tracking-widest">Minat Tertinggi</span>
                <TrendingUp size={16} className="text-indigo-400" />
              </div>
              <div className="text-sm font-extrabold text-slate-200 truncate" title={mostPopularPackage}>
                {mostPopularPackage}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold leading-none">Paling banyak dipilih</div>
            </div>

          </div>

          {/* Filtering and Search Control Toolbar */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input bar */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari sekolah, nama kontak, WhatsApp..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-white bg-slate-900/60 focus:outline-none focus:border-blue-500 pl-10"
              />
              <div className="absolute left-3.5 top-3 text-slate-500">
                <Search size={14} />
              </div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Select filter elements */}
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto justify-end">
              
              {/* Status Select filter */}
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800 text-xs">
                <Filter size={12} className="text-slate-400" />
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Status</option>
                  <option value="baru">Baru</option>
                  <option value="dihubungi">Dihubungi</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>

              {/* Package Select filter */}
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800 text-xs">
                <Package size={12} className="text-slate-400" />
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Paket:</span>
                <select
                  value={packageFilter}
                  onChange={(e) => setPackageFilter(e.target.value)}
                  className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Paket</option>
                  <option value="Starter School">Starter School</option>
                  <option value="Growth School">Growth School</option>
                  <option value="Premium School">Premium School</option>
                </select>
              </div>

              {/* Sort Order */}
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800 text-xs">
                <Calendar size={12} className="text-slate-400" />
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Urutan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                </select>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExportCSV}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Download size={13} />
                <span>Unduh CSV</span>
              </button>

            </div>
          </div>

          {/* Lead List Table Block */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center mx-auto text-slate-400">
                    <Search size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-300">Data Pendaftaran Kosong</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Tidak ditemukan data yang sesuai dengan pencarian atau filter yang Anda terapkan. Ubah kriteria penyaringan Anda.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-900/30">
                      <th className="py-4 px-5">Nama Sekolah / Yayasan</th>
                      <th className="py-4 px-4">Kontak Penghubung</th>
                      <th className="py-4 px-4 text-center">Paket Diminati</th>
                      <th className="py-4 px-4">Tanggal Masuk</th>
                      <th className="py-4 px-4 text-center">Status Tindak Lanjut</th>
                      <th className="py-4 px-5 text-right">Kelola & Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                    {filteredLeads.map((lead) => {
                      const idNum = parseInt(lead.id.split('-')[1]) || 0;
                      
                      return (
                        <tr 
                          key={lead.id} 
                          className={`hover:bg-slate-900/40 transition-colors group ${
                            selectedLead?.id === lead.id ? 'bg-blue-950/20' : ''
                          }`}
                        >
                          {/* School Details */}
                          <td className="py-4 px-5">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-950/40 text-blue-400 border border-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <School size={15} />
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-white font-extrabold text-[13px] flex items-center gap-1.5">
                                  <span>{lead.schoolName}</span>
                                  {lead.driveFileName && (
                                    <span className="p-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-900/30 inline-flex items-center" title="Memiliki Lampiran Google Drive">
                                      <Cloud size={10} />
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium block">
                                  {lead.notes ? `${lead.notes.substring(0, 50)}...` : 'Tidak ada keluhan tambahan'}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Contact Details */}
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="text-slate-200 font-bold block">{lead.contactPerson}</div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-medium">
                                <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold text-slate-300">
                                  {lead.role}
                                </span>
                                <span>•</span>
                                <span>{lead.phone}</span>
                              </div>
                            </div>
                          </td>

                          {/* Interested Package */}
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              lead.packageInterest.includes('Premium') 
                                ? 'bg-indigo-950 text-indigo-400 border border-indigo-900/50' 
                                : lead.packageInterest.includes('Growth') 
                                ? 'bg-blue-950 text-blue-400 border border-blue-900/50' 
                                : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}>
                              {lead.packageInterest}
                            </span>
                          </td>

                          {/* Date Registered */}
                          <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                            {lead.createdAt}
                          </td>

                          {/* Follow-up Status Select */}
                          <td className="py-4 px-4 text-center">
                            <div className="relative inline-block text-left">
                              <select
                                value={lead.status || 'baru'}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className={`font-bold text-[10px] px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer uppercase tracking-wider ${
                                  lead.status === 'baru'
                                    ? 'bg-blue-950/80 text-blue-400 border-blue-900/50'
                                    : lead.status === 'dihubungi'
                                    ? 'bg-amber-950/80 text-amber-400 border-amber-900/50'
                                    : 'bg-emerald-950/80 text-emerald-400 border-emerald-900/50'
                                }`}
                              >
                                <option value="baru" className="bg-slate-950 text-blue-400">Baru</option>
                                <option value="dihubungi" className="bg-slate-950 text-amber-400">Dihubungi</option>
                                <option value="selesai" className="bg-slate-950 text-emerald-400">Selesai/Deal</option>
                              </select>
                            </div>
                          </td>

                          {/* Custom Actions */}
                          <td className="py-4 px-5 text-right space-x-2">
                            {/* WhatsApp follow up action */}
                            <button
                              onClick={() => handleOpenWhatsApp(lead)}
                              title="Hubungi via WhatsApp"
                              className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-900/40 rounded-xl inline-flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <Phone size={13} />
                            </button>

                            {/* View / Edit Notes action */}
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setCurrentNotes(lead.notes || '');
                                setIsEditingNotes(false);
                              }}
                              title="Tinjau Detail & Catatan"
                              className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-xl inline-flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <FileText size={13} />
                            </button>

                            {/* Delete entry action */}
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.schoolName)}
                              title="Hapus Data"
                              className="p-2 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-900/40 rounded-xl inline-flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Detailed Metadata and Admin Notes Modal Overlay */}
          {selectedLead && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fade-in text-left">
                {/* Visual Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"></div>

                {/* Modal Title Header */}
                <div className="p-6 sm:p-8 border-b border-slate-800 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">Detail Lengkap Lead</span>
                    <h3 className="text-xl font-extrabold text-white mt-1 leading-tight uppercase">
                      {selectedLead.schoolName}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Registrasi ID: {selectedLead.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Grid Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Informational Details Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-400">
                    <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800/40">
                      <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Informasi Kontak</span>
                      <div className="text-slate-100 font-bold flex items-center gap-2">
                        <User size={13} className="text-slate-400" />
                        <span>{selectedLead.contactPerson} ({selectedLead.role})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail size={13} className="text-slate-400" />
                        <span>{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone size={13} className="text-slate-400" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800/40">
                      <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Metrik Kerjasama</span>
                      <div className="text-slate-100 font-bold flex items-center gap-2">
                        <Package size={13} className="text-slate-400" />
                        <span>Paket: <strong className="text-blue-400">{selectedLead.packageInterest}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar size={13} className="text-slate-400" />
                        <span>Masuk: {selectedLead.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Tag size={13} className="text-slate-400" />
                        <span>Status: 
                          <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            selectedLead.status === 'baru' ? 'bg-blue-950 text-blue-400' : selectedLead.status === 'dihubungi' ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400'
                          }`}>
                            {selectedLead.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Google Drive Attachment */}
                  {selectedLead.driveFileName && (
                    <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-4 flex sm:flex-row flex-col sm:items-center justify-between gap-3 text-xs font-semibold">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                          <Cloud size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider block">Lampiran Google Drive</span>
                          <a 
                            href={selectedLead.driveFileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-slate-200 hover:text-white truncate hover:underline block mt-0.5"
                          >
                            {selectedLead.driveFileName}
                          </a>
                        </div>
                      </div>
                      <a
                        href={selectedLead.driveFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer text-center"
                      >
                        <ExternalLink size={12} />
                        <span>Buka Lampiran</span>
                      </a>
                    </div>
                  )}

                  {/* Editable notes area */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Catatan & Analisis Tim Humas</span>
                      {!isEditingNotes ? (
                        <button
                          onClick={() => setIsEditingNotes(true)}
                          className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 size={12} />
                          <span>Ubah Catatan</span>
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateLeadNotes(selectedLead.id, currentNotes)}
                            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Check size={12} />
                            <span>Simpan</span>
                          </button>
                          <button
                            onClick={() => {
                              setCurrentNotes(selectedLead.notes || '');
                              setIsEditingNotes(false);
                            }}
                            className="text-xs font-bold text-slate-500 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <X size={12} />
                            <span>Batal</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {!isEditingNotes ? (
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs leading-relaxed text-slate-300 font-medium min-h-24 whitespace-pre-wrap">
                        {selectedLead.notes || 'Belum ada catatan detail atau keluhan PPDB tambahan untuk sekolah ini.'}
                      </div>
                    ) : (
                      <textarea
                        rows={4}
                        value={currentNotes}
                        onChange={(e) => setCurrentNotes(e.target.value)}
                        placeholder="Tambahkan evaluasi awal humas, detail PPDB, kendala warna, dsb..."
                        className="w-full px-4 py-3 rounded-2xl border border-slate-800 text-xs font-semibold text-white bg-slate-950 focus:outline-none focus:border-blue-500 resize-none"
                      />
                    )}
                  </div>

                </div>

                {/* Close Button Panel */}
                <div className="p-6 border-t border-slate-800 bg-slate-950/40 text-right flex justify-between items-center">
                  <button
                    onClick={() => handleOpenWhatsApp(selectedLead)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageSquare size={13} className="fill-white" />
                    <span>Luncurkan WhatsApp Follow-up</span>
                  </button>

                  <button
                    onClick={() => setSelectedLead(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manual Lead Adding Modal Dialog */}
          {showAddModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <form 
                onSubmit={handleAddLead}
                className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fade-in text-left"
              >
                {/* Visual Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500"></div>

                <div className="p-6 sm:p-8 border-b border-slate-800 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Pencatatan Offline</span>
                    <h3 className="text-xl font-extrabold text-white mt-1 leading-tight">
                      Tambah Registrasi Baru Manual
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Gunakan panel ini jika klien mendaftar via telepon kantor atau kunjungan pameran.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 sm:p-8 space-y-5 text-xs text-slate-300 font-semibold">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* School Name */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                        Nama Sekolah / Yayasan <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={newSchoolName}
                          onChange={(e) => setNewSchoolName(e.target.value)}
                          placeholder="Contoh: SMA Kartika Siliwangi"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-semibold text-white bg-slate-950 focus:outline-none focus:border-emerald-500 pl-11"
                        />
                        <div className="absolute left-4 top-3.5 text-slate-500">
                          <School size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                        Nama Lengkap Kontak <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={newContactPerson}
                          onChange={(e) => setNewContactPerson(e.target.value)}
                          placeholder="Contoh: Drs. Wahyu Hidayat"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-semibold text-white bg-slate-950 focus:outline-none focus:border-emerald-500 pl-11"
                        />
                        <div className="absolute left-4 top-3.5 text-slate-500">
                          <User size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                        Jabatan di Sekolah <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-bold text-white bg-slate-950 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Kepala Sekolah">Kepala Sekolah</option>
                        <option value="Ketua Yayasan">Ketua Yayasan</option>
                        <option value="Tim Humas Sekolah">Tim Humas Sekolah</option>
                        <option value="Panitia PPDB">Panitia PPDB</option>
                        <option value="Guru / Staff">Guru / Staff</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                        Nomor WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="Contoh: 08123456789"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-semibold text-white bg-slate-950 focus:outline-none focus:border-emerald-500 pl-11"
                        />
                        <div className="absolute left-4 top-3.5 text-slate-500">
                          <Phone size={14} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                        Email Sekolah / Kontak <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="Contoh: wahyu@sekolah.sch.id"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-semibold text-white bg-slate-950 focus:outline-none focus:border-emerald-500 pl-11"
                        />
                        <div className="absolute left-4 top-3.5 text-slate-500">
                          <Mail size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Interested Package */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                        Pilihan Paket Layanan <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newPackage}
                        onChange={(e) => setNewPackage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-bold text-white bg-slate-950 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Starter School">Starter School (Rp 299k/bln)</option>
                        <option value="Growth School">Growth School (Rp 589k/bln)</option>
                        <option value="Premium School">Premium School (Rp 999k/bln)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                      Catatan Keluhan / Brief Tambahan
                    </label>
                    <textarea
                      rows={3}
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="Contoh: Butuh penyelarasan logo sekolah dan desain brosur PPDB fisik cetak..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 text-xs font-semibold text-white bg-slate-950 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>
                </div>

                {/* Form submit actions */}
                <div className="p-6 border-t border-slate-800 bg-slate-950/40 text-right flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Simpan Registrasi
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Deletion Confirmation Modal Dialog */}
          {leadToDelete && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative animate-fade-in text-left">
                {/* Visual Top Glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-600"></div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="w-12 h-12 bg-rose-950/30 text-rose-500 border border-rose-900/40 rounded-2xl flex items-center justify-center shadow-inner">
                    <Trash2 size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      Hapus Data Registrasi?
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Apakah Anda yakin ingin menghapus seluruh data registrasi dari <strong className="text-slate-100 font-extrabold">"{leadToDelete.schoolName}"</strong>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setLeadToDelete(null)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-3 rounded-xl cursor-pointer transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={confirmDeleteLead}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 rounded-xl cursor-pointer transition-colors"
                    >
                      Ya, Hapus Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

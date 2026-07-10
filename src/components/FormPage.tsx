import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, CheckCircle, FileText, Download, Users, School, Mail, ShieldAlert, Award, Star, ArrowLeft, Printer, Receipt, Cloud, File, Trash2 } from 'lucide-react';
import { Lead } from '../types';
import { googleSignIn, initAuth } from '../lib/googleAuth';
import { loadPickerScript, openPicker } from '../lib/googlePicker';

const signatureImg = "https://lh3.googleusercontent.com/d/1ugxoEs3jYEXY92cQAI_L5JgXDBTZA9Vz";

interface FormPageProps {
  prefilledPackage: string;
  setPrefilledPackage: (pkg: string) => void;
  onBackToHome: () => void;
}

export function FormPage({ prefilledPackage, setPrefilledPackage, onBackToHome }: FormPageProps) {
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [role, setRole] = useState('Kepala Sekolah');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [packageInterest, setPackageInterest] = useState('Growth School');
  const [notes, setNotes] = useState('');
  const [driveFileName, setDriveFileName] = useState('');
  const [driveFileUrl, setDriveFileUrl] = useState('');
  const [isPickerLoading, setIsPickerLoading] = useState(false);
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedLead, setGeneratedLead] = useState<Lead | null>(null);
  const [savedLeads, setSavedLeads] = useState<Lead[]>([]);
  const [showProposal, setShowProposal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with prefilled package from home page
  useEffect(() => {
    if (prefilledPackage) {
      setPackageInterest(prefilledPackage);
    }
    // Scroll to top on mount of this separate page
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [prefilledPackage]);

  // Load existing leads from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem('sapanesia_leads');
    if (raw) {
      try {
        setSavedLeads(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Listen for Google Auth changes to capture cached token
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleToken(token);
      },
      () => {
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAttachDriveFile = async () => {
    setIsPickerLoading(true);
    try {
      // 1. Ensure Google Picker SDK script is loaded
      await loadPickerScript();

      // 2. Obtain token (either cached or via prompt)
      let token = googleToken;
      if (!token) {
        const result = await googleSignIn();
        if (result) {
          token = result.accessToken;
          setGoogleToken(result.accessToken);
        }
      }

      if (token) {
        // 3. Open the file picker
        openPicker(token, (file) => {
          setDriveFileName(file.name);
          setDriveFileUrl(file.url);
        });
      }
    } catch (err: any) {
      console.error('Google Picker error:', err);
      alert('Gagal membuka Google Picker: ' + (err.message || 'Error tidak diketahui'));
    } finally {
      setIsPickerLoading(false);
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName || !contactName || !phone || !email) {
      alert('Mohon lengkapi seluruh kolom wajib pendaftaran.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database/API request processing to provide realistic loading feedback
    setTimeout(() => {
      const formattedPhone = formatPhoneNumber(phone);

      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        schoolName,
        contactPerson: contactName,
        role,
        phone: formattedPhone,
        email,
        packageInterest,
        notes,
        driveFileName: driveFileName || undefined,
        driveFileUrl: driveFileUrl || undefined,
        createdAt: new Date().toLocaleString('id-ID'),
        status: 'baru'
      };

      const updated = [newLead, ...savedLeads];
      setSavedLeads(updated);
      localStorage.setItem('sapanesia_leads', JSON.stringify(updated));

      setGeneratedLead(newLead);
      setIsSubmitted(true);
      setIsSubmitting(false);
      // Scroll to top on submit to show success state
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleReset = () => {
    setSchoolName('');
    setContactName('');
    setRole('Kepala Sekolah');
    setPhone('');
    setEmail('');
    setNotes('');
    setDriveFileName('');
    setDriveFileUrl('');
    setPrefilledPackage('');
    setIsSubmitted(false);
    setGeneratedLead(null);
    setShowProposal(false);
    setShowInvoice(false);
  };

  // Compile offline-ready styled HTML Invoice and trigger auto-print download
  const handleDownloadInvoice = () => {
    if (!generatedLead) return;

    const invoiceNo = `INV/SAP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const dueDateStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const priceInt = generatedLead.packageInterest.includes('Growth') ? 589000 : generatedLead.packageInterest.includes('Premium') ? 999000 : 299000;
    const priceFormatted = priceInt.toLocaleString('id-ID');

    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice Resmi - ${generatedLead.schoolName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    @media print {
      .no-print {
        display: none !important;
      }
      body {
        background-color: white !important;
        color: black !important;
      }
      .print-border {
        border: 1px solid #e2e8f0 !important;
      }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen py-10 px-4">
  
  <!-- Floating controller panel for print/back -->
  <div class="max-w-4xl mx-auto mb-6 no-print flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
    <div class="flex items-center gap-3">
      <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
      <span class="text-xs font-bold text-slate-600">Rincian Administrasi Sapanesia Media</span>
    </div>
    <div class="flex gap-2">
      <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all">
        <span>Cetak / Simpan ke PDF</span>
      </button>
    </div>
  </div>

  <!-- Main Invoice Card Page Layout -->
  <div class="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden print:border-none print:shadow-none">
    
    <!-- Header visual element -->
    <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"></div>

    <div class="flex justify-between items-start flex-col sm:flex-row gap-6 border-b border-slate-100 pb-8">
      <div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xl font-extrabold text-slate-900 tracking-tight">SAPANESIA</span>
          <span class="text-[9px] font-extrabold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md">MEDIA</span>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed font-semibold">
          Sapanesia Media Management<br>
          Kemitraan & Branding Digital Sekolah Berkelanjutan<br>
          Sukoharjo, Jawa Tengah, Indonesia<br>
          WhatsApp: +62 878-1497-2158 | Email: sapanesia.id@gmail.com
        </p>
      </div>

      <div class="text-left sm:text-right">
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-wider mb-2">Rincian Administrasi</h1>
        <div class="text-xs text-slate-500 space-y-1 font-semibold">
          <div>No Invoice: <strong class="text-slate-800 font-bold">${invoiceNo}</strong></div>
          <div>Tanggal Terbit: <span class="text-slate-700 font-bold">${dateStr}</span></div>
          <div>Jatuh Tempo: <span class="text-slate-700 font-bold">${dueDateStr}</span></div>
          <div class="mt-2 inline-block bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Menunggu Pembayaran</div>
        </div>
      </div>
    </div>

    <!-- Client Info / Bill To -->
    <div class="grid sm:grid-cols-2 gap-6 my-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
      <div>
        <h3 class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Ditagihkan Kepada:</h3>
        <div class="text-slate-800 font-bold text-sm uppercase">${generatedLead.schoolName}</div>
        <div class="text-xs text-slate-500 font-semibold mt-1">
          Pihak Penghubung: ${generatedLead.contactPerson} (${generatedLead.role})<br>
          Email: ${generatedLead.email}<br>
          WhatsApp: ${generatedLead.phone}
        </div>
      </div>
      <div>
        <h3 class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Metode Pembayaran:</h3>
        <div class="text-xs text-slate-600 font-semibold space-y-1">
          <div>Transfer Bank Resmi:</div>
          <div class="text-slate-800 font-bold text-sm">BANK MANDIRI</div>
          <div>No. Rekening: <strong class="text-blue-600 font-bold">131-00-2497215-8</strong></div>
          <div>Atas Nama: <strong class="text-slate-800 font-bold">Sapanesia Media Mandiri</strong></div>
        </div>
      </div>
    </div>

    <!-- Invoice Items Table -->
    <div class="overflow-x-auto my-8">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-200 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
            <th class="py-3 px-1">Deskripsi Item</th>
            <th class="py-3 text-center">Jumlah</th>
            <th class="py-3 text-right">Harga Satuan</th>
            <th class="py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody class="text-xs font-semibold text-slate-700 divide-y divide-slate-100">
          <tr>
            <td class="py-4 px-1">
              <span class="text-slate-900 font-bold block">Paket Kemitraan Media: ${generatedLead.packageInterest}</span>
              <span class="text-[10px] text-slate-400 block mt-0.5">Pendampingan desain visual penuh, draf postingan reguler, dan optimalisasi media sosial sekolah</span>
            </td>
            <td class="py-4 text-center">1 Bulan</td>
            <td class="py-4 text-right font-mono">Rp ${priceFormatted}</td>
            <td class="py-4 text-right font-mono text-slate-900">Rp ${priceFormatted}</td>
          </tr>
          <tr>
            <td class="py-4 px-1">
              <span class="text-slate-900 font-bold block">Konsultasi Strategis & Audit Media Sosial Komprehensif</span>
              <span class="text-[10px] text-emerald-600 block mt-0.5">Promo Pengguna Baru Terdaftar Humas (Diskon 100%)</span>
            </td>
            <td class="py-4 text-center">1 Paket</td>
            <td class="py-4 text-right font-mono">Rp 350.000</td>
            <td class="py-4 text-right font-mono text-emerald-600">-Rp 350.000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Calculations Footer -->
    <div class="border-t border-slate-100 pt-6 flex flex-col items-end text-xs font-semibold text-slate-500 space-y-2">
      <div class="flex justify-between w-64">
        <span>Subtotal:</span>
        <span class="text-slate-800 font-bold font-mono">Rp ${priceFormatted}</span>
      </div>
      <div class="flex justify-between w-64">
        <span>PPN (11% Khusus Pendidikan):</span>
        <span class="text-slate-800 font-bold font-mono">Rp 0 (Bebas Pajak)</span>
      </div>
      <div class="flex justify-between w-64 border-t border-slate-200 pt-3 text-sm font-extrabold text-slate-900">
        <span>Total Pembayaran:</span>
        <span class="text-blue-600 text-base font-mono">Rp ${priceFormatted}</span>
      </div>
    </div>

    <!-- Terms & Note -->
    <div class="mt-12 border-t border-slate-100 pt-6 grid sm:grid-cols-2 gap-6 text-[10px] leading-relaxed text-slate-400 font-medium">
      <div>
        <h4 class="font-bold text-slate-600 uppercase tracking-wider mb-1.5">Syarat & Ketentuan Kemitraan:</h4>
        <ul class="list-disc pl-4 space-y-1">
          <li>Invoice ini bersifat proforma sebagai acuan resmi kesepakatan penawaran.</li>
          <li>Pengerjaan draf desain dimulai maksimal 2 hari setelah konfirmasi deposit / pembayaran.</li>
          <li>Konfirmasi pembayaran resmi wajib dikirimkan ke WhatsApp Humas Sapanesia (+62 878-1497-2158).</li>
        </ul>
      </div>
      <div class="flex flex-col items-start sm:items-end justify-end pt-4 sm:pt-0">
        <div class="text-center w-48 relative">
          <p class="mb-1 font-bold text-slate-600">Sukoharjo, ${dateStr}</p>
          
          <!-- Signature Visual -->
          <div class="h-20 w-44 mx-auto flex items-center justify-center my-0.5 relative">
            <img src="https://lh3.googleusercontent.com/d/1ugxoEs3jYEXY92cQAI_L5JgXDBTZA9Vz" alt="Tanda Tangan Andika Putra Pututama, S.Pd" class="w-48 h-auto object-contain" />
          </div>
          
          <div class="border-b border-slate-200 w-36 mx-auto mb-1"></div>
          <p class="font-extrabold text-slate-800">Andika Putra Pututama, S.Pd</p>
          <p class="text-[9px] text-slate-400">Creative Director, Sapanesia</p>
        </div>
      </div>
    </div>

    <!-- Bottom aesthetic decoration lines -->
    <div class="mt-10 flex justify-center gap-1.5 no-print">
      <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
      <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
      <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
    </div>

  </div>

  <script>
    // Auto-prompt print shortly after page loads
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    }
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_Sapanesia_${generatedLead.schoolName.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Compile WhatsApp text string
  const getWhatsAppLink = () => {
    if (!generatedLead) return '#';
    const message = `Halo Sapanesia Media Management,%0A%0ASaya ingin berkonsultasi mengenai branding sekolah kami. Berikut rincian data formulir:%0A%0A` +
      `🏫 *Nama Sekolah/Yayasan*: ${generatedLead.schoolName}%0A` +
      `👤 *Nama Kontak*: ${generatedLead.contactPerson}%0A` +
      `💼 *Jabatan*: ${generatedLead.role}%0A` +
      `📞 *WhatsApp*: ${generatedLead.phone}%0A` +
      `✉️ *Email*: ${generatedLead.email}%0A` +
      `📦 *Minat Paket*: *${generatedLead.packageInterest}*%0A` +
      `📝 *Catatan Tambahan*: ${generatedLead.notes || '-'}%0A%0A` +
      `Mohon dibantu tindak lanjuti untuk jadwal audit gratis media sosial sekolah kami. Terima kasih!`;
    
    return `https://wa.me/6287814972158?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative">
        
        {/* Back navigation button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue font-bold text-xs tracking-wider uppercase mb-8 group transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Section Header */}
        <div className="text-left mb-10">
          <span className="text-brand-blue text-[11px] font-extrabold uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3.5">
            Konsultasi Gratis & Audit Media
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Formulir Pendaftaran Konsultasi
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Satu langkah praktis demi media sosial sekolah yang interaktif dan profesional. Mohon isi data sekolah Anda dengan lengkap, lalu dapatkan proposal instan kustomisasi.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl">
          {!isSubmitted ? (
            <form 
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-xl text-left space-y-6 relative overflow-hidden"
            >
              {/* Decorative top-right circle accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-35 pointer-events-none"></div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* School Name */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                    Nama Sekolah / Yayasan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Contoh: SMA Bakti Bandung"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue pl-11"
                    />
                    <div className="absolute left-4 top-3.5 text-slate-400">
                      <School size={16} />
                    </div>
                  </div>
                </div>

                {/* Contact Name */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                    Nama Lengkap Anda <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Contoh: Drs. H. Budi Santoso"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue pl-11"
                    />
                    <div className="absolute left-4 top-3.5 text-slate-400">
                      <Users size={16} />
                    </div>
                  </div>
                </div>

                {/* Role at School */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                    Jabatan di Sekolah <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  >
                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                    <option value="Ketua Yayasan">Ketua Yayasan</option>
                    <option value="Tim Humas Sekolah">Tim Humas Sekolah</option>
                    <option value="Panitia PPDB">Panitia PPDB</option>
                    <option value="Guru / Staff">Guru / Staff</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                    Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue pl-11"
                    />
                    <div className="absolute left-4 top-3.5 text-slate-400">
                      <Phone size={16} />
                    </div>
                  </div>
                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* School Email */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                    Email Sekolah / Pribadi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Contoh: humas@sekolah.sch.id"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue pl-11"
                    />
                    <div className="absolute left-4 top-3.5 text-slate-400">
                      <Mail size={16} />
                    </div>
                  </div>
                </div>

                {/* Interested Package */}
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                    Paket yang Diminati <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={packageInterest}
                    onChange={(e) => setPackageInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                  >
                    <option value="Starter School">Starter School (Rp 299k/bln)</option>
                    <option value="Growth School">Growth School (Rp 589k/bln - Paling Populer)</option>
                    <option value="Premium School">Premium School (Rp 999k/bln)</option>
                  </select>
                </div>
              </div>

              {/* Notes or Pain Points */}
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                  Ceritakan Keluhan / Kebutuhan Media Sosial Sekolah (Opsional)
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Kami ingin meningkatkan pendaftaran PPDB, membuat instagram feed lebih seragam, dan tidak punya staff khusus desainer."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue resize-none animate-none"
                />
              </div>

              {/* Google Drive Attachment Section (Google Picker Integration) */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Cloud size={14} className="text-brand-blue" />
                      <span>Lampiran Google Drive (Opsional)</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Unggah/lampirkan berkas brief, logo, atau aset penunjang dari Google Drive Anda
                    </p>
                  </div>
                </div>

                {driveFileName ? (
                  <div className="flex items-center justify-between bg-white border border-slate-100 rounded-lg p-2.5 shadow-sm">
                    <div className="flex items-center gap-2 overflow-hidden mr-2">
                      <File size={16} className="text-brand-blue shrink-0" />
                      <a 
                        href={driveFileUrl} 
                        target="_blank" 
                        referrerPolicy="no-referrer" 
                        className="text-xs font-bold text-slate-700 hover:text-brand-blue truncate hover:underline"
                      >
                        {driveFileName}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDriveFileName('');
                        setDriveFileUrl('');
                      }}
                      className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded transition-colors"
                      title="Hapus lampiran"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleAttachDriveFile}
                    disabled={isPickerLoading}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100/50 text-slate-700 border border-slate-200 py-2.5 px-4 rounded-lg text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    {isPickerLoading ? (
                      <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Cloud size={14} className="text-brand-blue" />
                    )}
                    <span>{isPickerLoading ? 'Membuka Google Drive...' : 'Pilih Berkas dari Google Drive'}</span>
                  </button>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-submit-consultation-page"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-900/15 transition-all hover:translate-y-[-1px] hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sedang Memproses...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Kirim Formulir Konsultasi Gratis</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security info note */}
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-4">
                <ShieldAlert size={12} className="text-brand-blue" />
                <span>Privasi data terjaga aman. Tim kami akan menghubungi Anda maks 1x24 jam sejak pengisian formulir.</span>
              </div>
            </form>
          ) : (
            /* Success Response State Card */
            <div 
              id="submission-success-card"
              className="bg-white border border-slate-200 rounded-[2rem] p-8 sm:p-12 shadow-xl text-center space-y-6 text-slate-900 overflow-hidden relative"
            >
              {/* Decorative top-right circle accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-35 pointer-events-none"></div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce" style={{ animationDuration: '3s' }}>
                <CheckCircle size={32} />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1 rounded-full">
                  Pendaftaran Berhasil Dikirim!
                </span>
                <h3 className="text-2xl font-extrabold mt-4 text-slate-900">
                  Terima Kasih, Bapak/Ibu {generatedLead?.contactPerson}!
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed max-w-lg mx-auto">
                  Data konsultasi untuk <strong className="text-brand-blue font-bold">{generatedLead?.schoolName}</strong> berhasil kami rekam di database. Pilih langkah selanjutnya untuk mempercepat respon:
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
                {/* WA Link */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-4 px-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare size={16} className="fill-white" />
                  <span>Hubungi WhatsApp</span>
                </a>

                {/* Show simulated proposal */}
                <button
                  onClick={() => {
                    setShowProposal(true);
                    setShowInvoice(false);
                  }}
                  className={`font-bold text-xs py-4 px-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    showProposal 
                      ? 'bg-slate-900 text-white ring-2 ring-slate-900 ring-offset-2' 
                      : 'bg-brand-blue hover:bg-brand-blue-dark text-white'
                  }`}
                >
                  <FileText size={16} />
                  <span>Lihat Proposal Khusus</span>
                </button>

                {/* Show simulated invoice */}
                <button
                  onClick={() => {
                    setShowInvoice(true);
                    setShowProposal(false);
                  }}
                  className={`font-bold text-xs py-4 px-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    showInvoice 
                      ? 'bg-slate-900 text-white ring-2 ring-slate-900 ring-offset-2' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <Receipt size={16} />
                  <span>Lihat Invoice Resmi</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center flex-col sm:flex-row gap-4">
                <button
                  onClick={onBackToHome}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  ← Kembali ke Beranda
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-brand-blue font-semibold underline underline-offset-4"
                >
                  Isi Formulir Ulang
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Customized proposal generator viewer */}
        {showProposal && generatedLead && (
          <div 
            id="proposal-viewer-panel"
            className="mt-10 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
            
            {/* Proposal Page 1 representation */}
            <div className="border-b border-slate-100 pb-6 mb-6 flex justify-between items-start flex-col sm:flex-row gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  Dokumen Proposal Penawaran Digital
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3 leading-tight">
                  Proposal Kemitraan Media & Branding Sekolah
                </h3>
                <span className="text-xs font-semibold text-slate-400 mt-1 block">
                  Dibuat Khusus Untuk: <strong className="text-slate-800 font-extrabold uppercase">{generatedLead.schoolName}</strong>
                </span>
              </div>
              
              <div className="flex gap-2 self-start sm:self-center">
                <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Award size={12} />
                  <span>Status: Disetujui Humas</span>
                </div>
              </div>
            </div>

            {/* Proposal Mock Sheet Details */}
            <div className="grid md:grid-cols-12 gap-8 text-xs text-slate-600">
              {/* Proposal Sidebar */}
              <div className="md:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="text-slate-900 font-extrabold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                  Spesifikasi Layanan
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Paket Pilihan</span>
                  <span className="text-xs font-bold text-brand-blue block mt-0.5">{generatedLead.packageInterest}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Kontak Penghubung</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{generatedLead.contactPerson} ({generatedLead.role})</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Biaya Investasi</span>
                  <span className="text-sm font-bold text-brand-blue block mt-0.5">
                    {generatedLead.packageInterest.includes('Growth') ? 'Rp 589.000' : generatedLead.packageInterest.includes('Premium') ? 'Rp 999.000' : generatedLead.packageInterest.includes('Starter') ? 'Rp 299.000' : 'Menunggu Kalkulasi'}
                    <span className="text-[10px] font-semibold text-slate-400">/bln</span>
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-amber-500" />)}
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-1">Jaminan Kepuasan Sapanesia 100%</span>
                </div>
              </div>

              {/* Proposal Main Text body */}
              <div className="md:col-span-8 space-y-4 text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                <p>
                  Dengan hormat Bapak/Ibu <strong>{generatedLead.contactPerson}</strong>, selaku <strong>{generatedLead.role}</strong> di <strong>{generatedLead.schoolName}</strong>.
                </p>
                <p>
                  Berdasarkan keluhan yang Anda sampaikan mengenai: <em>"{generatedLead.notes || 'Butuh peningkatkan kualitas media sosial sekolah'}"</em>, tim kreatif Sapanesia Media Management merekomendasikan skema kerja sama paket <strong>{generatedLead.packageInterest}</strong>.
                </p>
                <p>
                  Kerja sama ini mencakup pendampingan desain visual penuh, penyusunan rancangan postingan Instagram harian, template khusus publikasi PPDB Sekolah, spanduk fisik gerbang, dan review berkala 2x revisi per pengerjaan desain. Melalui skema ini, Sapanesia berkomitmen mendongkrak reputasi digital sekolah demi kesuksesan PPDB tahun ajaran ini.
                </p>
                <div className="bg-blue-50/40 p-4 border border-blue-100 rounded-xl mt-4">
                  <span className="font-bold text-slate-900 text-xs block mb-1">Mekanisme Langkah Selanjutnya:</span>
                  <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700">
                    <li>Tim kami akan menghubungi Anda via WhatsApp ke nomor +62878-1497-2158.</li>
                    <li>Sesi Audit dan konsulitasi penyesuaian desain dari warna / logo sekolah.</li>
                    <li>Tahap pembuatan draf desain pertama.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Downloader representation */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center flex-col sm:flex-row gap-4">
              <span className="text-[11px] text-slate-400 font-medium">Proposal Sapanesia Media Management - All rights reserved 2026</span>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
              >
                <Download size={14} />
                <span>Unduh & Kirim Proposal via WhatsApp</span>
              </a>
            </div>

          </div>
        )}

        {/* Customized invoice viewer panel */}
        {showInvoice && generatedLead && (() => {
          const invoiceNo = `INV/SAP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
          const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
          const dueDateStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
          const priceInt = generatedLead.packageInterest.includes('Growth') ? 589000 : generatedLead.packageInterest.includes('Premium') ? 999000 : 299000;
          const priceFormatted = priceInt.toLocaleString('id-ID');

          return (
            <div 
              id="invoice-viewer-panel"
              className="mt-10 bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
              
              {/* Invoice Header */}
              <div className="border-b border-slate-100 pb-6 mb-6 flex justify-between items-start flex-col sm:flex-row gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                    Invoice Rincian Administrasi
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3 leading-tight">
                    Sapanesia Media Management
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 mt-1 block">
                    No Invoice: <strong className="text-slate-700 font-bold">{invoiceNo}</strong>
                  </span>
                </div>
                
                <div className="flex gap-2 self-start sm:self-center">
                  <div className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <span>Status: Menunggu Pembayaran</span>
                  </div>
                </div>
              </div>

              {/* Invoice Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Ditagihkan Kepada:</h4>
                  <div className="text-slate-800 font-extrabold text-sm uppercase">{generatedLead.schoolName}</div>
                  <div className="text-slate-500 font-semibold mt-1 space-y-0.5">
                    <div>Pihak Penghubung: {generatedLead.contactPerson} ({generatedLead.role})</div>
                    <div>Email: {generatedLead.email}</div>
                    <div>WhatsApp: {generatedLead.phone}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Metode Pembayaran:</h4>
                  <div className="text-slate-600 font-semibold space-y-1">
                    <div>Transfer Bank Mandiri Sapanesia:</div>
                    <div className="text-blue-600 font-extrabold text-sm">131-00-2497215-8</div>
                    <div>a/n <strong className="text-slate-800">Sapanesia Media Mandiri</strong></div>
                    <div className="text-[10px] text-slate-400">Silakan kirimkan bukti pembayaran setelah transfer.</div>
                  </div>
                </div>
              </div>

              {/* Invoice Items Table */}
              <div className="overflow-x-auto mb-6 text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                      <th className="py-3 px-1">Deskripsi Layanan</th>
                      <th className="py-3 text-center">Durasi / Jml</th>
                      <th className="py-3 text-right">Harga Satuan</th>
                      <th className="py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                    <tr>
                      <td className="py-4 px-1">
                        <span className="text-slate-900 font-extrabold block">Paket Kemitraan: {generatedLead.packageInterest}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Pendampingan desain visual penuh, draf postingan reguler, dan optimalisasi media sosial sekolah</span>
                      </td>
                      <td className="py-4 text-center">1 Bulan</td>
                      <td className="py-4 text-right font-mono">Rp {priceFormatted}</td>
                      <td className="py-4 text-right font-mono text-slate-900">Rp {priceFormatted}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-1">
                        <span className="text-slate-900 font-extrabold block">Konsultasi Strategis & Audit Media Sosial</span>
                        <span className="text-[10px] text-emerald-600 block mt-0.5">Diskon 100% Promo Terdaftar Pengguna Baru</span>
                      </td>
                      <td className="py-4 text-center">1 Paket</td>
                      <td className="py-4 text-right font-mono">Rp 350.000</td>
                      <td className="py-4 text-right font-mono text-emerald-600">-Rp 350.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Invoice Total Panel */}
              <div className="border-t border-slate-100 pt-5 flex flex-col items-end text-xs font-semibold text-slate-500 space-y-2">
                <div className="flex justify-between w-64">
                  <span>Subtotal:</span>
                  <span className="text-slate-800 font-bold font-mono font-mono">Rp {priceFormatted}</span>
                </div>
                <div className="flex justify-between w-64">
                  <span>Pajak PPN (11% Khusus Pendidikan):</span>
                  <span className="text-slate-800 font-bold font-mono">Rp 0 (Bebas Pajak)</span>
                </div>
                <div className="flex justify-between w-64 border-t border-slate-200 pt-3 text-sm font-extrabold text-slate-900">
                  <span>Total Tagihan:</span>
                  <span className="text-blue-600 text-base font-mono">Rp {priceFormatted}</span>
                </div>
              </div>

              {/* Terms & Note and Signature in Modal Preview */}
              <div className="mt-10 border-t border-slate-100 pt-6 grid sm:grid-cols-2 gap-6 text-[10px] leading-relaxed text-slate-400 font-medium">
                <div>
                  <h4 className="font-bold text-slate-600 uppercase tracking-wider mb-1.5">Syarat & Ketentuan Kemitraan:</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Invoice ini bersifat proforma sebagai acuan resmi kesepakatan penawaran.</li>
                    <li>Pengerjaan draf desain dimulai maksimal 2 hari setelah konfirmasi deposit / pembayaran.</li>
                    <li>Konfirmasi pembayaran resmi wajib dikirimkan ke WhatsApp Humas Sapanesia (+62 878-1497-2158).</li>
                  </ul>
                </div>
                <div className="flex flex-col items-start sm:items-end justify-end pt-4 sm:pt-0">
                  <div className="text-center w-48 relative">
                    <p className="font-bold text-slate-600 mb-1">Sukoharjo, {dateStr}</p>
                    
                    {/* Signature Visual */}
                    <div className="h-20 w-44 mx-auto flex items-center justify-center my-0.5 relative">
                      <img src={signatureImg} alt="Tanda Tangan Andika Putra Pututama, S.Pd" className="w-48 h-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="border-b border-slate-200 w-36 mx-auto mb-1"></div>
                    <p className="font-extrabold text-slate-800">Andika Putra Pututama, S.Pd</p>
                    <p className="text-[9px] text-slate-400">Creative Director, Sapanesia</p>
                  </div>
                </div>
              </div>

              {/* Invoice Footer Actions */}
              <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center flex-col sm:flex-row gap-4">
                <div className="text-[10px] text-slate-400 font-semibold space-y-0.5">
                  <div>Tanggal Terbit: <strong className="text-slate-600">{dateStr}</strong></div>
                  <div>Jatuh Tempo: <strong className="text-slate-600">{dueDateStr}</strong></div>
                </div>
                
                <div className="flex gap-2 flex-wrap justify-end">
                  <button
                    onClick={handleDownloadInvoice}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Ekspor Invoice (.HTML / Cetak PDF)</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </div>
  );
}

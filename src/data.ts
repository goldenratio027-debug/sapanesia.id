import { PortfolioItem, Package, Testimonial, FAQItem, WorkflowStep, LayananItem } from './types';

export const LAYANAN_LIST: LayananItem[] = [
  {
    id: 'branding',
    title: 'Branding Sekolah',
    description: 'Layanan terfokus pada penguatan citra dan identitas lembaga agar memiliki karakter khas, mudah dikenali, dan dipercaya.',
    iconName: 'Award'
  },
  {
    id: 'medsos',
    title: 'Desain Media Sosial',
    description: 'Membantu sekolah menyajikan tampilan digital yang profesional, menarik, komunikatif, dan sesuai dengan identitas sekolah.',
    iconName: 'Instagram'
  },
  {
    id: 'edukasi',
    title: 'Konten Edukasi',
    description: 'Pembuatan konten edukatif yang memberikan nilai tambah bagi wali murid dan masyarakat, memperkuat posisi sekolah sebagai rujukan.',
    iconName: 'BookOpen'
  },
  {
    id: 'ppdb',
    title: 'Desain PPDB',
    description: 'Template brosur, spanduk, feed, dan banner promosi PPDB yang persuasif untuk menarik minat calon pendaftar secara maksimal.',
    iconName: 'Users'
  },
  {
    id: 'prestasi',
    title: 'Desain Prestasi',
    description: 'Publikasi pencapaian akademik dan non-akademik siswa serta guru secara estetik untuk meningkatkan kebanggaan sekolah.',
    iconName: 'Trophy'
  },
  {
    id: 'pengumuman',
    title: 'Desain Pengumuman',
    description: 'Pengumuman resmi sekolah, agenda akademik, libur sekolah, dan jadwal kegiatan yang dikemas rapi dan profesional.',
    iconName: 'Megaphone'
  }
];

export const WHY_CHOOSE_US: { id: string; title: string; desc: string; icon: string }[] = [
  {
    id: 'partner-khusus',
    title: 'Partner Media Khusus Pendidikan',
    desc: 'Kami bukan agensi umum. Sapanesia fokus membantu sekolah, madrasah, pesantren, dan yayasan membangun branding digital yang sesuai nilai-nilai pendidikan.',
    icon: 'GraduationCap'
  },
  {
    id: 'lebih-hemat',
    title: 'Jauh Lebih Hemat',
    desc: 'Tidak perlu menggaji desainer tetap, membeli lisensi software, atau menyediakan perangkat komputer berspesifikasi tinggi. Semua kebutuhan tercover.',
    icon: 'BadgePercent'
  },
  {
    id: 'fast-response',
    title: 'Fast Response',
    desc: 'Tim kami sigap dalam menanggapi kebutuhan publikasi sekolah Anda, memastikan setiap momen penting sekolah langsung terpublikasi tanpa tertunda.',
    icon: 'Zap'
  },
  {
    id: 'pendampingan',
    title: 'Pendampingan Branding',
    desc: 'Bukan sekadar menggambar desain, kami membantu menyusun pesan komunikasi visual yang konsisten agar reputasi sekolah terbentuk dengan baik.',
    icon: 'HeartHandshake'
  },
  {
    id: 'template-eksklusif',
    title: 'Template Profesional',
    desc: 'Akses ke koleksi template desain eksklusif yang dirancang khusus untuk memenuhi standar visual profesional sekolah masa kini.',
    icon: 'Layers'
  },
  {
    id: 'harga-terjangkau',
    title: 'Harga Terjangkau',
    desc: 'Biaya investasi bulanan yang terukur dan sangat terjangkau oleh anggaran sekolah/yayasan, dengan fleksibilitas upgrade paket kapan saja.',
    icon: 'Coins'
  }
];

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter School',
    price: 'Rp 299.000',
    features: [
      '8 Desain / Bulan',
      'Template Branding Sekolah',
      'Desain Hari Besar Nasional',
      'Desain Ucapan Prestasi Siswa',
      'Grup Koordinasi WhatsApp',
      '1x Revisi per Desain',
      'File Siap Upload (High-Res JPG)'
    ],
    color: 'border-slate-200 bg-white hover:border-blue-300'
  },
  {
    id: 'growth',
    name: 'Growth School',
    price: 'Rp 589.000',
    originalPrice: 'Rp 899.000',
    features: [
      '15 Desain / Bulan',
      'Prioritas Pengerjaan',
      'Template Branding Sekolah',
      'Template PPDB Eksklusif',
      'Template Pengumuman Sekolah',
      'Template Kegiatan Sekolah',
      'Konsultasi Desain via WhatsApp',
      '2x Revisi per Desain',
      'Bonus 1 Desain Spanduk Sekolah'
    ],
    isPopular: true,
    color: 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
  },
  {
    id: 'premium',
    name: 'Premium School',
    price: 'Rp 999.000',
    features: [
      'Semua Fitur Paket Growth',
      '25 Desain / Bulan',
      'Prioritas Nomor 1 (Paling Cepat)',
      'Template PPDB Eksklusif',
      'Laporan Aktivitas Bulanan',
      '1 Desain Spanduk Kegiatan',
      '1 Desain Brosur Digital (Slide/Lipat)',
      'Revisi Unlimited (Hingga Selesai)'
    ],
    color: 'border-slate-900 bg-slate-900 text-white hover:bg-slate-850'
  }
];

export const WORKFLOW: WorkflowStep[] = [
  {
    step: 1,
    title: 'Konsultasi & Audit Gratis',
    description: 'Menganalisis media sosial sekolah Anda saat ini secara GRATIS dan merumuskan konsep branding awal yang paling sesuai.'
  },
  {
    step: 2,
    title: 'Pemilihan Kategori Paket',
    description: 'Sekolah memilih kategori paket branding bulanan (Starter, Growth, atau Premium) yang sesuai dengan kebutuhan publikasi.'
  },
  {
    step: 3,
    title: 'Tahap Produksi Konten',
    description: 'Tim kreatif Sapanesia mulai memproduksi desain konten profesional berdasarkan kalender konten dan panduan warna sekolah.'
  },
  {
    step: 4,
    title: 'Review & Revisi',
    description: 'Draft desain dikirim ke tim humas sekolah untuk dicek, disesuaikan, atau direvisi agar selaras dengan pesan yang ingin disampaikan.'
  },
  {
    step: 5,
    title: 'Publikasi & Distribusi',
    description: 'Desain final yang telah disetujui dikirimkan dalam kualitas tinggi, siap diupload untuk meningkatkan kepercayaan calon wali murid.'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Poster Penerimaan Peserta Didik Baru (PPDB)',
    category: 'ppdb',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
    likes: 124,
    schoolName: 'SMA Negeri 1 Indonesia'
  },
  {
    id: 'port-2',
    title: 'Desain Ucapan Selamat Siswa Berprestasi Math Olympic',
    category: 'prestasi',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    likes: 98,
    schoolName: 'MA Prestasi Bandung'
  },
  {
    id: 'port-3',
    title: 'Pengumuman Resmi Kelulusan & Nilai Akhir Semester',
    category: 'pengumuman',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    likes: 85,
    schoolName: 'SMP Harapan Kita'
  },
  {
    id: 'port-4',
    title: 'Spanduk Peringatan Hari Pendidikan Nasional',
    category: 'hari_besar',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    likes: 142,
    schoolName: 'PAUD Ceria Bangsa'
  },
  {
    id: 'port-5',
    title: 'Flyer Seminar Nasional Parenting di Era Digital',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    likes: 110,
    schoolName: 'SD Kreatif Madani'
  },
  {
    id: 'port-6',
    title: 'Sertifikat Penghargaan Guru Berdedikasi',
    category: 'sertifikat',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80',
    likes: 93,
    schoolName: 'Yayasan Taruna Jaya'
  },
  {
    id: 'port-7',
    title: 'Desain Program Unggulan Pondok Pesantren Tahfidz',
    category: 'kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
    likes: 167,
    schoolName: 'Ponpes Darul Qur\'an'
  },
  {
    id: 'port-8',
    title: 'Poster Class Meeting & Lomba Seni Sekolah',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    likes: 74,
    schoolName: 'SMK Citra Karya'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-royyan',
    name: 'Muhammad Royyan, S.Pd., Gr.',
    role: 'Guru & Pengelola Media',
    school: 'SMK Islam Sudirman Andong',
    content: 'Sapanesia sangat luar biasa, karena sudah sangat membantu kami sebagai lembaga sekolah yang masih berkembang, kami sangat terbantu karena kami juga masih kurang begitu familiar dengan editing..Semoga sapensia semakin jaya..🙏',
    avatarUrl: 'https://lh3.googleusercontent.com/d/1GROU0LiB7K-nm7Imtzk-YpJ1SwxxCnTw'
  },
  {
    id: 'test-1',
    name: 'Ibu Ikha Hirmamiy',
    role: 'Kepala Sekolah',
    school: 'TK Aisyiyah 21 Laweyan',
    content: 'Sangat beruntung kami bisa didampingi sapanesia melalui program branding sekolah. Semoga bisa terus bermanfaat dalam mendukung pendidikan di Indonesia khususnya untuk guru. Sukses selalu. Dan terimakasih banyak, sangat membantu kami. Sekali lagi sukses selalu untuk sapanesia media',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Ibu Nenden Sartika, S.Pd.I',
    role: 'Wakil Kepala Hubungan Masyarakat',
    school: 'PAUD Ceria, Surakarta',
    content: 'Sangat terbantu! Kami tidak perlu lagi merekrut staff desainer sendiri yang gajinya cukup mahal. Cukup kirim foto kegiatan via WhatsApp, besoknya desain feed instagram yang rapi dan profesional sudah siap diupload.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-3',
    name: 'K.H. Ahmad Fauzan',
    role: 'Ketua Yayasan Pendidikan',
    school: 'Ponpes Modern Al-Hikmah',
    content: 'Kami awalnya khawatir branding modern akan mengurangi kekhasan pesantren. Namun Sapanesia luar biasa, mereka memahami kultur kami dan membungkus program tahfidz kami menjadi konten visual yang sangat elegan dan bermartabat.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah sekolah bisa request tema atau konsep desain tertentu?',
    answer: 'Tentu saja bisa! Di awal kerja sama, kami akan meminta pedoman branding sekolah Anda (seperti warna utama, logo, dan visi sekolah). Anda juga bisa memberikan referensi atau request konsep khusus untuk setiap materi desain.'
  },
  {
    id: 'faq-2',
    question: 'Berapa lama waktu pengerjaan untuk setiap desain?',
    answer: 'Untuk kebutuhan reguler, desain diselesaikan dalam 1-2 hari kerja setelah materi (foto & tulisan) kami terima. Untuk paket Premium, kami memprioritaskan pengerjaan nomor satu agar pengumuman darurat sekolah bisa tayang hari itu juga.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana sistem revisi jika ada kesalahan ketik atau gambar kurang sesuai?',
    answer: 'Sistem revisi kami sangat mudah dan cepat. Sekolah cukup menandai bagian yang ingin dikoreksi lalu mengirimkannya kembali ke WhatsApp Layanan CS. Jumlah revisi yang dicakup bervariasi dari 1x, 2x, hingga Unlimited tergantung paket pilihan Anda.'
  },
  {
    id: 'faq-4',
    question: 'Apakah kerja sama ini berbasis kontrak bulanan?',
    answer: 'Benar, kerja sama kami berbasis langganan bulanan tanpa kontrak yang mengikat secara kaku. Anda bisa memulai dengan uji coba 1 bulan, dan bisa memperpanjang, upgrade paket, atau berhenti kapan saja.'
  },
  {
    id: 'faq-5',
    question: 'Bagaimana cara mengirimkan materi konten (foto/keterangan)?',
    answer: 'Sangat fleksibel! Anda cukup mengunggah foto-foto kegiatan sekolah dan memberikan keterangan singkat melalui grup WhatsApp khusus yang kami buat untuk sekolah Anda, atau bisa juga melalui folder Google Drive bersama.'
  },
  {
    id: 'faq-6',
    question: 'Apakah Sapanesia menyediakan jasa pembuatan teks (copywriting)?',
    answer: 'Ya! Seluruh paket layanan kami sudah termasuk pembuatan judul (headline) yang memikat dan caption instagram yang SEO-friendly secara gratis. Humas sekolah cukup memberikan poin-poin dasar informasinya.'
  },
  {
    id: 'faq-7',
    question: 'Apakah tim Sapanesia yang memegang/mengelola akun media sosial kami?',
    answer: 'Secara default, kami bertindak sebagai pemasok aset visual (materi desain siap upload). Pengelolaan postingan dan interaksi akun tetap dipegang oleh humas sekolah demi keamanan kredensial. Namun, kami siap membantu memberikan tips taktik posting terbaik.'
  }
];

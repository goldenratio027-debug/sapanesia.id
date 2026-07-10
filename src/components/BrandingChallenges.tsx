import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, UserX, ImageOff, Share2, DollarSign } from 'lucide-react';

// @ts-ignore
import challengeImg1 from '../assets/images/regenerated_image_1782981878048.png';
// @ts-ignore
import challengeImg2 from '../assets/images/regenerated_image_1782983501004.png';
// @ts-ignore
import challengeImg3 from '../assets/images/regenerated_image_1783001799698.png';
// @ts-ignore
import challengeImg4 from '../assets/images/regenerated_image_1783002708477.png';

interface ChallengeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  imageUrl: string;
  icon: React.ComponentType<any>;
  badgeColor: string;
  iconColor: string;
}

export function BrandingChallenges() {
  const challenges: ChallengeItem[] = [
    {
      id: 'challenge-1',
      title: 'Guru Terlalu Sibuk Mengajar & Merangkap Admin',
      subtitle: 'Beban Kerja Ganda',
      description: 'Guru dan staf administrasi sudah sangat sibuk mengurus kegiatan belajar mengajar (KBM) serta administrasi sekolah. Tugas tambahan mengelola konten sosial media membuat fokus mereka terpecah.',
      impact: 'Akibatnya: Kualitas konten menurun, postingan tidak terjadwal, dan tugas utama mengajar terganggu.',
      imageUrl: challengeImg1 || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      icon: UserX,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-100',
      iconColor: 'text-rose-500 bg-rose-50 border-rose-100',
    },
    {
      id: 'challenge-2',
      title: 'Desain Kaku, Monoton & Kurang Profesional',
      subtitle: 'Keterbatasan Desain Grafis',
      description: 'Tanpa desainer grafis profesional, media sosial sekolah sering menggunakan template gratisan generik yang kaku. Warna, layout, dan tipografi tidak konsisten dengan identitas sekolah.',
      impact: 'Akibatnya: Wibawa dan citra profesional sekolah menurun di mata calon orang tua murid baru.',
      imageUrl: challengeImg2 || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      icon: ImageOff,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100',
      iconColor: 'text-amber-500 bg-amber-50 border-amber-100',
    },
    {
      id: 'challenge-3',
      title: 'Postingan Jarang Update & Terkesan Mati',
      subtitle: 'Kurang Konsistensi',
      description: 'Media sosial sekolah seringkali pasif selama berminggu-minggu, bahkan berbulan-bulan. Tidak ada rencana konten terstruktur, info prestasi terlambat diunggah, dan publikasi PPDB kurang matang.',
      impact: 'Akibatnya: Calon siswa berasumsi sekolah pasif, tidak dinamis, atau bahkan sudah tidak aktif lagi.',
      imageUrl: challengeImg3 || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
      icon: Share2,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-100',
      iconColor: 'text-blue-500 bg-blue-50 border-blue-100',
    },
    {
      id: 'challenge-4',
      title: 'Biaya Rekrutmen Tim Kreatif Internal Sangat Mahal',
      subtitle: 'Beban Anggaran Tinggi',
      description: 'Merekrut satu tim lengkap (desainer grafis, videografer, copywriter) secara mandiri membutuhkan pengeluaran gaji bulanan yang sangat besar dan menambah beban operasional sekolah.',
      impact: 'Akibatnya: Anggaran operasional membengkak, padahal dana tersebut bisa dialokasikan untuk sarana belajar.',
      imageUrl: challengeImg4 || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      icon: DollarSign,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    }
  ];

  return (
    <section id="branding-challenges" className="py-24 bg-slate-50 relative overflow-hidden border-t border-b border-slate-200/50">
      {/* Decorative background light circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-rose-600 text-xs font-black uppercase tracking-widest bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 inline-flex items-center gap-2 mb-4">
            <AlertTriangle size={14} className="text-rose-500 animate-bounce" />
            <span>Tantangan Internal Sekolah</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Masalah Utama yang Menghambat Branding Sekolah Anda
          </h2>
          <div className="h-1.5 w-16 bg-rose-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Membangun reputasi digital sekolah bukanlah hal yang mudah. Sebagian besar sekolah menemui hambatan operasional dan keterbatasan tim yang sama setiap tahunnya.
          </p>
        </motion.div>

        {/* 2x2 Grid with image and description */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {challenges.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Image Section */}
                <div className="w-full sm:w-44 lg:w-48 shrink-0 relative overflow-hidden h-48 sm:h-auto min-h-[12rem] bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
                  
                  {/* Subtle red tint overlay for problem mood */}
                  <div className="absolute inset-0 bg-rose-950/5 opacity-40 group-hover:opacity-0 transition-opacity duration-300" />
                </div>

                {/* Text & Info Section */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    {/* Badge & Icon Title */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${item.iconColor}`}>
                        <IconComponent size={16} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${item.badgeColor}`}>
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlighted impact container */}
                  <div className="bg-rose-50/40 rounded-xl p-3 border border-rose-100/50">
                    <p className="text-rose-700 text-xs font-semibold leading-relaxed">
                      {item.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Bridge to Solution */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-5 py-2.5 shadow-sm">
            <span className="w-2.5 h-2.5 bg-brand-blue rounded-full animate-pulse" />
            <p className="text-brand-blue text-xs font-extrabold tracking-wide">
              SOLUSI: Sapanesia Media Management Siap Membantu 100%
            </p>
          </div>
          <p className="text-slate-500 text-xs mt-3">
            Mulai dari perencanaan konten mingguan, desain kreatif premium, hingga optimasi postingan harian.
          </p>
        </motion.div>

      </div>
    </section>
  );
}


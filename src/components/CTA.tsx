import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, ShieldCheck, Award, ClipboardCheck } from 'lucide-react';

export function CTA() {
  const handleGoToForm = () => {
    window.location.hash = '#consultation-form';
  };

  return (
    <section 
      id="consultation" 
      className="py-20 bg-brand-gray-light bg-dot-pattern border-t border-slate-150 relative overflow-hidden"
    >
      {/* Decorative vector glows */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Promo card */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center sm:text-left">
          {/* Decorative top-right circle accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/60 rounded-full -mr-24 -mt-24 pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Promo text columns */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 text-brand-blue text-[11px] font-extrabold uppercase tracking-widest bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full">
                <Sparkles size={12} className="fill-brand-blue" />
                <span>Konsultasi Gratis & Audit Media</span>
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Siap Meningkatkan Branding & PPDB Sekolah Anda?
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Dapatkan analisis media sosial sekolah secara cuma-cuma dan rancangan strategi komunikasi digital kustom dari tim desainer ahli Sapanesia.
              </p>

              {/* Bullet benefits */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-left">
                <div className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-600">
                  <ShieldCheck size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Audit Media Sosial Gratis</span>
                </div>
                <div className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-600">
                  <Award size={16} className="text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Proposal Strategi PPDB</span>
                </div>
                <div className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-600">
                  <ClipboardCheck size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>Rekomendasi Skala Kebutuhan</span>
                </div>
                <div className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-600">
                  <MessageSquare size={16} className="text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>Sesi Pendampingan Humas</span>
                </div>
              </div>
            </div>

            {/* CTA Big Button action columns */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 w-full text-center space-y-5">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Isi formulir pendaftaran singkat dalam 1 menit untuk segera memulai kerja sama
                </p>
                
                <button
                  onClick={handleGoToForm}
                  className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs sm:text-sm py-4 rounded-2xl shadow-lg shadow-blue-900/15 transition-all hover:translate-y-[-2px] hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Mulai Pendaftaran Gratis</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                <span className="text-[10px] text-slate-400 block">
                  Respons Cepat Maks. 1x24 Jam Hari Kerja
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

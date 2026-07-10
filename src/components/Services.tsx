import React from 'react';
import { Award, Instagram, BookOpen, Users, Trophy, Megaphone, Calendar, Film } from 'lucide-react';
import { LAYANAN_LIST } from '../data';

export function Services() {
  const iconMap: Record<string, any> = {
    Award: Award,
    Instagram: Instagram,
    BookOpen: BookOpen,
    Users: Users,
    Trophy: Trophy,
    Megaphone: Megaphone,
    Calendar: Calendar,
    Film: Film,
  };

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background vector decoration */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Portofolio Layanan Kreatif
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Layanan Desain Khusus Sekolah
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Dari branding mendasar hingga konten harian media sosial, kami menyediakan solusi terlengkap untuk mempercantik dan memprofesionalkan media komunikasi sekolah Anda.
          </p>
        </div>

        {/* 3-Column layout: Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {LAYANAN_LIST.map((layanan) => {
            const IconComp = iconMap[layanan.iconName] || Award;
            
            return (
              <div
                key={layanan.id}
                id={`service-card-${layanan.id}`}
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative top-right circle accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 opacity-30 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
                
                <div className="relative z-10">
                  {/* Icon wrap */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue border border-blue-100 flex items-center justify-center flex-shrink-0 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComp size={20} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-extrabold text-base tracking-wide text-slate-900 mb-3">
                      {layanan.title}
                    </h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      {layanan.description}
                    </p>
                  </div>
                </div>

                {/* Bottom line decorator */}
                <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex justify-between items-center text-[11px] font-extrabold tracking-wider text-brand-blue uppercase">
                  <span>Sapanesia Media</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

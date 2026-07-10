import { GraduationCap, ShieldCheck, Zap, HeartHandshake, Layers, Coins } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';

export function WhyChooseUs() {
  // Mapping the string icons from data.ts to Lucide components
  const iconMap: Record<string, any> = {
    GraduationCap: GraduationCap,
    BadgePercent: ShieldCheck, // Using ShieldCheck for "Lebih Hemat/Kredibel"
    Zap: Zap,
    HeartHandshake: HeartHandshake,
    Layers: Layers,
    Coins: Coins,
  };

  return (
    <section 
      id="why-us" 
      className="py-20 bg-brand-gray-light bg-dot-pattern border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Keunggulan Sapanesia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Mengapa Sekolah Memilih Kami?
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Sapanesia Media Management hadir sebagai tim kreatif eksternal khusus sekolah Anda. Kami menawarkan solusi publikasi terlengkap dengan biaya investasi terbaik.
          </p>
        </div>

        {/* Features Bento/Grid List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComp = iconMap[item.icon] || GraduationCap;
            return (
              <div
                key={item.id}
                id={`why-us-card-${item.id}`}
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative top-right circle accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  {/* Floating decorative number badge */}
                  <div className="absolute top-0 right-0 text-slate-100 font-extrabold text-3xl group-hover:text-blue-50/70 transition-colors pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Icon Indicator */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComp size={24} />
                  </div>

                  {/* Content title */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">
                    {item.title}
                  </h3>
                  
                  {/* Content body */}
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Left vertical visual accent */}
                <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-transparent group-hover:bg-brand-blue rounded-r-full transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* Mini CTA banner within why us */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-blue-900/5 border border-blue-900/10 rounded-2xl p-4 px-6 max-w-2xl mx-auto">
            <p className="text-sm text-slate-700 font-medium">
              Ingin membuktikannya? Kami sediakan <strong className="text-brand-blue">Audit Media Sosial Sekolah GRATIS</strong> untuk Anda!
            </p>
            <a
              href="#consultation"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all flex-shrink-0"
            >
              Ajukan Audit Sekarang
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

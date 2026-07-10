import { FileText, ClipboardList, Palette, CheckCircle2, CloudUpload, ArrowRight, MessageSquare } from 'lucide-react';
import { WORKFLOW } from '../data';

export function Workflow() {
  const icons = [
    MessageSquare,  // Konsultasi & Audit Gratis
    ClipboardList,  // Pemilihan Kategori
    Palette,        // Tahap Produksi Konten
    CheckCircle2,   // Review & Revisi
    CloudUpload     // Publikasi & Distribusi
  ];

  const colors = [
    'from-blue-600 to-indigo-600 text-blue-600',
    'from-amber-500 to-yellow-500 text-amber-600',
    'from-emerald-500 to-teal-500 text-emerald-600',
    'from-purple-600 to-pink-600 text-purple-600',
    'from-blue-500 to-cyan-500 text-cyan-600'
  ];

  return (
    <section 
      id="workflow" 
      className="py-20 bg-brand-gray-light relative overflow-hidden"
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Sistem Kerja Profesional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Alur Layanan Sapanesia
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Proses kerja yang transparan, mudah, dan teratur. Kami mendampingi humas sekolah Anda mulai dari audit awal hingga materi siap dipublikasikan.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[45px] left-12 right-12 h-0.5 bg-slate-200 z-0" />

          {/* Timeline Cards Grid */}
          <div className="grid lg:grid-cols-5 gap-8 relative z-10">
            {WORKFLOW.map((item, index) => {
              const IconComp = icons[index];
              const colorClass = colors[index];
              
              return (
                <div 
                  key={item.step}
                  id={`workflow-step-${item.step}`}
                  className="group flex flex-col items-center lg:items-start text-center lg:text-left bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all hover:translate-y-[-4px] overflow-hidden relative"
                >
                  {/* Decorative top-right circle accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10 w-full flex flex-col items-center lg:items-start">
                    {/* Step Number Badge & Icon wrapper */}
                    <div className="flex items-center justify-between w-full mb-6">
                      {/* Circle Icon */}
                      <div className={`w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp size={20} />
                      </div>

                      {/* Step Number Circle */}
                      <span className="text-[11px] font-extrabold bg-slate-100 text-slate-500 w-6 h-6 rounded-full flex items-center justify-center">
                        {item.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Small visual direction marker (mobile & desktop difference) */}
                  <div className="mt-5 w-full flex justify-center lg:justify-start">
                    {index < 4 && (
                      <span className="text-slate-300 group-hover:text-brand-blue transition-colors">
                        {/* Mobile arrow pointing down, desktop arrow pointing right */}
                        <ArrowRight size={16} className="hidden lg:block animate-pulse" />
                        <span className="lg:hidden text-xs font-bold font-mono">↓ Selangkah Berikutnya</span>
                      </span>
                    )}
                    {index === 4 && (
                      <span className="text-emerald-500 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>Selesai & Siap Upload</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

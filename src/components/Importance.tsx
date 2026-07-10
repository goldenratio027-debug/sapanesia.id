import { ShieldCheck, Sparkles, Users, Palette } from 'lucide-react';

export function Importance() {
  const points = [
    {
      title: 'Meningkatkan Kepercayaan Orang Tua',
      desc: 'Orang tua mempercayakan masa depan anaknya pada institusi yang profesional. Media sosial yang kredibel memberi keyakinan instan.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-brand-blue border-blue-100',
    },
    {
      title: 'Media Sosial Lebih Profesional',
      desc: 'Feed yang rapi, informatif, dan estetik mencerminkan kualitas manajemen pendidikan serta mutu akademik sekolah yang sesungguhnya.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Mendukung PPDB',
      desc: 'Promosi PPDB digital dengan pesan yang kuat, brosur informatif, dan sebaran visual terarah terbukti mendongkrak minat calon siswa.',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Branding Sekolah Lebih Konsisten',
      desc: 'Warna, logo, dan gaya desain serasi membuat identitas sekolah membekas kuat di memori publik, membedakannya dari sekolah lain.',
      icon: Palette,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
  ];

  return (
    <section 
      id="importance" 
      className="py-20 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Urgensi Citra Digital
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Mengapa Branding Sekolah Sangat Penting?
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Di era serba digital ini, <strong className="text-slate-900 font-semibold">93% orang tua siswa mencari informasi dan memantau aktivitas sekolah melalui media sosial</strong> sebelum mantap menjatuhkan pilihan. Visual yang berantakan atau media sosial yang tidak aktif secara tidak langsung menurunkan wibawa sekolah.
          </p>
        </div>

        {/* 4 Cards Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div 
                key={index}
                id={`importance-card-${index}`}
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all hover:translate-y-[-4px] hover:border-blue-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative top-right circle accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-30 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10">
                  {/* Icon Circle wrapper */}
                  <div className={`w-12 h-12 rounded-2xl ${point.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">
                    {point.title}
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {point.desc}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="w-full h-1 bg-slate-50 group-hover:bg-brand-blue/15 rounded-full mt-6 transition-colors duration-300" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

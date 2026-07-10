import { ArrowRight, Sparkles, MessageCircle, FileText, CheckCircle2, Instagram, Award, Heart } from 'lucide-react';

export function Hero() {
  const handleScrollTo = (id: string) => {
    if (!id || id === '#') return;
    if (id === '#consultation') {
      window.location.hash = '#consultation-form';
      return;
    }
    try {
      const element = document.querySelector(id);
      if (element) {
        const topOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section 
      id="hero"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-brand-gray-light bg-grid-pattern"
    >
      {/* Decorative gradient glowing orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-blue-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/60 border border-blue-200/50 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles size={14} className="text-brand-blue-light" />
              <span>Partner Resmi Media Sekolah</span>
            </div>

            {/* Main Catchy Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight lg:leading-[1.1] mb-6">
              Partner Media & <span className="text-brand-blue relative inline-block">
                Branding Sekolah
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-blue/15 rounded-full" />
              </span>
            </h1>

            {/* Captivating Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Membantu sekolah membangun citra profesional, meningkatkan kepercayaan masyarakat, serta mendukung keberhasilan PPDB melalui layanan desain grafis, branding, dan pengelolaan media sosial yang konsisten dan terjangkau.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleScrollTo('#consultation')}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-[15px] px-8 py-4 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Konsultasi Gratis</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => handleScrollTo('#pricing')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[15px] px-8 py-4 rounded-xl shadow-sm transition-all hover:border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lihat Paket Layanan</span>
              </button>
            </div>

            {/* Quick Metrics & Benefits */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 pt-8 border-t border-slate-200 w-full">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">45%+</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Kenaikan PPDB Mitra</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100+</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Desain Tiap Bulan</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">99%</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Tingkat Kepuasan Humas</div>
              </div>
            </div>

          </div>

          {/* Right Side Mockup Design */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            
            {/* Ambient Backlight Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

            {/* 3D Simulated Interactive Phone Interface */}
            <div className="relative w-full max-w-[290px] sm:max-w-[320px] bg-slate-950 p-3 rounded-[40px] shadow-2xl border-4 border-slate-800 ring-8 ring-slate-900/10 transition-transform duration-500 hover:rotate-2">
              
              {/* Speaker & Sensor */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-20 flex justify-center items-center gap-1.5">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
                <div className="w-2 h-2 bg-slate-800 rounded-full" />
              </div>

              {/* Instagram Feed Mockup Screen */}
              <div className="bg-white rounded-[32px] overflow-hidden text-slate-900 text-xs select-none">
                
                {/* Header App Bar */}
                <div className="px-4 pt-5 pb-2.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 font-sans">sapanesia.smm</span>
                  <div className="flex gap-2 text-slate-500">
                    <Instagram size={14} />
                    <Award size={14} />
                  </div>
                </div>

                {/* Active Stories bar */}
                <div className="flex gap-3 px-4 py-2 bg-slate-50/50 border-b border-slate-50 overflow-x-hidden">
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-brand-blue flex items-center justify-center text-white font-extrabold text-[8px]">SP</div>
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-500 scale-95 font-medium">Sorotan</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full p-[1.5px] bg-slate-200">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-[8px]">PPDB</div>
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-400 scale-95">PPDB 2026</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full p-[1.5px] bg-slate-200">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-[8px]">PRST</div>
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-400 scale-95">Prestasi</span>
                  </div>
                </div>

                {/* Simulated Post Image Content */}
                <div className="relative aspect-square w-full p-4 text-white flex flex-col justify-between overflow-hidden">
                  
                  {/* Real Indonesian school photo as background with high-quality styling */}
                  <img 
                    src="https://lh3.googleusercontent.com/d/19Gt-L3CXI4MalIsebzTOab6fkAmyPdiu" 
                    alt="Siswa Sekolah Indonesia" 
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-[1.05] scale-105 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Elegant vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
                  
                  {/* Post background accent grids */}
                  <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
                  


                  {/* Post Center Graphic illustration */}
                  <div className="my-auto text-center relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-1">
                      <Award size={24} className="text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Social Actions */}
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2.5 text-slate-700">
                      <Heart size={14} className="fill-red-500 text-red-500" />
                      <MessageCircle size={14} />
                    </div>
                    <span className="text-[9px] font-extrabold text-slate-800">1,248 Suka</span>
                  </div>
                  <p className="text-[9px] text-slate-600 leading-tight">
                    <strong className="text-slate-900 font-bold">sd_kreatif_madani</strong> Alhamdulillah, selamat atas prestasi gemilang ananda Arisya! Yuk bergabung di SD Kreatif Madani...
                  </p>
                </div>

              </div>

              {/* Floating elements representing service categories */}
              <div className="absolute -right-8 bottom-1/4 bg-white p-2.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-[130px] animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[9px] font-bold text-slate-900 block">PPDB Sukses</span>
                  <span className="text-[7px] text-slate-400">Desain Persuasif</span>
                </div>
              </div>

              <div className="absolute -left-10 top-1/4 bg-white p-2.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-[145px] animate-bounce" style={{ animationDuration: '3.2s' }}>
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Award size={14} className="text-brand-blue" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-[9px] font-bold text-slate-900 block">Humas Hemat</span>
                  <span className="text-[7px] text-slate-400">Gak Perlu Gaji Desainer</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { SapanesiaLogo } from './Navbar';
import { Mail, Phone, MapPin, Instagram, Globe, Shield, Heart, Lock } from 'lucide-react';

export function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!href || href === '#') return;
    try {
      const element = document.querySelector(href);
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
    <footer 
      id="footer" 
      className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 font-sans text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Col 1: Brand & Bio (takes 4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="text-white">
              <SapanesiaLogo isFooter={true} />
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sapanesia Media Management adalah platform agensi khusus media & branding sekolah yang berkomitmen memajukan komunikasi visual institusi pendidikan demi memenangkan kepercayaan masyarakat.
            </p>

            {/* Social Icons Row */}
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/sapanesia.smm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Instagram Sapanesia"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://wa.me/6287814972158" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="WhatsApp Sapanesia"
              >
                <Phone size={14} />
              </a>
              <a 
                href="mailto:sapanesia.id@gmail.com"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-400 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Email Sapanesia"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Services Index (takes 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest border-b border-slate-900 pb-2">
              Layanan Kreatif
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Branding Sekolah & Identity</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Desain Feed & Story Medsos</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Penyusunan Konten Edukasi</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Materi Promosi PPDB Sekolah</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Poster Prestasi Siswa & Guru</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Aset Publikasi Event & Seminar</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation (takes 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest border-b border-slate-900 pb-2">
              Halaman Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#importance" onClick={(e) => handleScrollTo(e, '#importance')} className="hover:text-white transition-colors">Mengapa Branding Penting</a></li>
              <li><a href="#why-us" onClick={(e) => handleScrollTo(e, '#why-us')} className="hover:text-white transition-colors">Mengapa Memilih Kami</a></li>
              <li><a href="#pricing" onClick={(e) => handleScrollTo(e, '#pricing')} className="hover:text-white transition-colors">Paket & Harga</a></li>
              <li><a href="#faq" onClick={(e) => handleScrollTo(e, '#faq')} className="hover:text-white transition-colors">Pertanyaan Umum (FAQ)</a></li>
              <li><a href="#consultation" onClick={(e) => handleScrollTo(e, '#consultation')} className="hover:text-white transition-colors">Konsultasi Gratis</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Details (takes 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-extrabold uppercase tracking-widest border-b border-slate-900 pb-2">
              Kontak Kantor
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5 leading-relaxed">
                <MapPin size={16} className="text-brand-blue-light flex-shrink-0 mt-0.5" />
                <span>Palur Kulon, Mojolaban, Sukoharjo, Jawa Tengah.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-emerald-400" />
                <span>0878-1497-2158 (WA)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-blue-400" />
                <span>sapanesia.id@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: License and copyright */}
        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          
          {/* Left copyright notice */}
          <div>
            <span>© 2026 Sapanesia Media Management. Seluruh Hak Cipta Dilindungi.</span>
          </div>

          {/* Core SEO Meta reference links */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
            <span className="text-[10px]">#JasaBrandingSekolah</span>
            <span className="text-[10px]">#DesainMediaSosialSekolah</span>
            <span className="text-[10px]">#JasaDesainPPDB</span>
            <span className="text-[10px]">#BrandingPendidikan</span>
          </div>

          {/* Standard legal disclaimer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Shield size={12} className="text-slate-600" />
              <span>Divisi Media & Branding Sekolah</span>
            </div>
            <span className="text-slate-800">•</span>
            <a 
              href="#admin-dashboard" 
              className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-wider text-[10px]"
            >
              <Lock size={10} className="text-indigo-500" />
              <span>Akses Admin</span>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

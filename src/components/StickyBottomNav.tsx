import React, { useState, useEffect } from 'react';
import { Home, BookOpen, MessageCircle, PenSquare } from 'lucide-react';

export function StickyBottomNav() {
  const [activeItem, setActiveItem] = useState<'home' | 'program' | 'whatsapp' | 'register'>('home');

  useEffect(() => {
    const handleHashAndScroll = () => {
      const hash = window.location.hash;
      if (hash === '#consultation-form') {
        setActiveItem('register');
      } else if (hash === '#admin-dashboard') {
        setActiveItem('home');
      } else {
        // Detect if scrolled near services/program section
        const servicesElement = document.getElementById('services');
        if (servicesElement) {
          const rect = servicesElement.getBoundingClientRect();
          // If the services section is within the viewport threshold
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveItem('program');
            return;
          }
        }
        setActiveItem('home');
      }
    };

    window.addEventListener('scroll', handleHashAndScroll);
    window.addEventListener('hashchange', handleHashAndScroll);
    // Initial check
    handleHashAndScroll();

    return () => {
      window.removeEventListener('scroll', handleHashAndScroll);
      window.removeEventListener('hashchange', handleHashAndScroll);
    };
  }, []);

  const handleNavClick = (item: 'home' | 'program' | 'whatsapp' | 'register', e: React.MouseEvent) => {
    if (item === 'whatsapp') return;

    if (item === 'home') {
      e.preventDefault();
      if (window.location.hash !== '') {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item === 'program') {
      e.preventDefault();
      const scrollToServices = () => {
        const el = document.getElementById('services');
        if (el) {
          const topOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - topOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      };

      if (window.location.hash !== '') {
        window.location.hash = '';
        setTimeout(scrollToServices, 100);
      } else {
        scrollToServices();
      }
    } else if (item === 'register') {
      e.preventDefault();
      window.location.hash = '#consultation-form';
    }
  };

  const formattedWhatsAppUrl = () => {
    const text = `Halo Rekan Sapanesia,%0A%0ASaya ingin bertanya lebih lanjut mengenai layanan desain & branding sekolah dari Sapanesia Media Management.`;
    return `https://wa.me/6287814972158?text=${text}`;
  };

  return (
    <div 
      id="sticky-bottom-nav"
      className="lg:hidden print:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] py-2.5 px-4 pb-safe flex justify-around items-center"
    >
      <div className="w-full max-w-md mx-auto grid grid-cols-4 gap-1">
        
        {/* Beranda */}
        <button
          onClick={(e) => handleNavClick('home', e)}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 cursor-pointer ${
            activeItem === 'home'
              ? 'text-brand-blue font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home size={20} className={activeItem === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] mt-1 font-semibold tracking-tight">Beranda</span>
        </button>

        {/* Program */}
        <button
          onClick={(e) => handleNavClick('program', e)}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 cursor-pointer ${
            activeItem === 'program'
              ? 'text-brand-blue font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen size={20} className={activeItem === 'program' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] mt-1 font-semibold tracking-tight">Program</span>
        </button>

        {/* WhatsApp */}
        <a
          href={formattedWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 rounded-xl text-emerald-600 hover:text-emerald-700 transition-all duration-200"
        >
          <MessageCircle size={20} className="stroke-[1.8px] text-emerald-500" />
          <span className="text-[10px] mt-1 font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Daftar Sekarang */}
        <button
          onClick={(e) => handleNavClick('register', e)}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 cursor-pointer ${
            activeItem === 'register'
              ? 'text-brand-blue font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PenSquare size={20} className={activeItem === 'register' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] mt-1 font-semibold tracking-tight whitespace-nowrap">Daftar</span>
        </button>

      </div>
    </div>
  );
}

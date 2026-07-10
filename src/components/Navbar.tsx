import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, PhoneCall } from 'lucide-react';

export function SapanesiaLogo({ className = "h-9", isFooter = false }: { className?: string; isFooter?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} id="sapanesia-logo">
      <div className="relative group flex-shrink-0">
        <img 
          src="https://lh3.googleusercontent.com/d/1K6I7TOuSywtL0EBl2THW7rf-dxAc6m4E" 
          alt="Sapanesia Logo" 
          className="h-10 w-10 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold text-lg tracking-wide uppercase ${isFooter ? 'text-white border-white' : 'text-slate-900'}`}>Sapanesia</span>
        <span className="font-bold text-[9px] tracking-[0.22em] text-brand-blue uppercase mt-0.5">Media Management</span>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Keunggulan', href: '#importance' },
    { label: 'Mengapa Kami', href: '#why-us' },
    { label: 'Layanan', href: '#services' },
    { label: 'Portofolio', href: '#preview-desain' },
    { label: 'Paket', href: '#pricing' },
    { label: 'Alur Kerja', href: '#workflow' },
    { label: 'Testimoni', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (!href || href === '#') return;
    
    if (href === '#consultation') {
      window.location.hash = '#consultation-form';
      return;
    }
    
    if (window.location.hash === '#consultation-form') {
      window.location.hash = href;
      setTimeout(() => {
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
      }, 150);
      return;
    }

    try {
      const element = document.querySelector(href);
      if (element) {
        const topOffset = 80; // height of fixed navbar
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
    <nav 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" onClick={(e) => handleScrollTo(e, '#')} className="flex items-center">
            <SapanesiaLogo />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            <div className="flex gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-slate-600 hover:text-brand-blue font-medium text-[14px] transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <a
              href="#consultation"
              onClick={(e) => handleScrollTo(e, '#consultation')}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-[13px] px-5 py-2.5 rounded-full shadow-md shadow-blue-900/15 transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-blue-900/20 flex items-center gap-2"
            >
              <PhoneCall size={14} />
              <span>Konsultasi Gratis</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-blue p-1.5 focus:outline-none rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/98 shadow-xl absolute top-full left-0 right-0 py-4 px-6 animate-fade-in">
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-slate-700 hover:text-brand-blue font-semibold text-base py-2 border-b border-slate-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={(e) => handleScrollTo(e, '#consultation')}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-center py-3.5 rounded-xl shadow-md transition-all mt-4 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              <span>Konsultasi Gratis Sekarang</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

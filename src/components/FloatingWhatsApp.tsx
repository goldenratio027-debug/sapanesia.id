import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 4 seconds to catch attention gently
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
  };

  const formattedWhatsAppUrl = () => {
    const text = `Halo Rekan Sapanesia,%0A%0ASaya ingin bertanya lebih lanjut mengenai layanan desain & branding sekolah dari Sapanesia Media Management.`;
    return `https://wa.me/6287814972158?text=${text}`;
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40 font-sans flex flex-col items-end select-none">
      
      {/* Gentle attention-grabbing tooltip */}
      {showTooltip && !isOpen && (
        <div 
          onClick={handleOpenChat}
          className="bg-white border border-slate-150 p-3.5 pr-10 rounded-2xl shadow-xl mb-3 text-left max-w-[240px] relative animate-bounce cursor-pointer hover:border-slate-300"
        >
          {/* Close tooltip x */}
          <button 
            onClick={handleCloseTooltip}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            <X size={12} />
          </button>
          
          <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-wider block mb-1">
            Konsultasi Gratis
          </span>
          <p className="text-xs text-slate-700 font-semibold leading-tight">
            Butuh bantuan menyusun branding sekolah Anda? Tanya kami yuk!
          </p>
        </div>
      )}

      {/* Expanded chat window widget */}
      {isOpen && (
        <div className="bg-white border border-slate-150 w-[290px] sm:w-[320px] rounded-3xl shadow-2xl mb-4 overflow-hidden text-left animate-fade-in text-slate-900">
          
          {/* Header */}
          <div className="bg-brand-blue p-4 text-white flex justify-between items-center relative">
            <div className="flex items-center gap-3">
              {/* Sapanesia brand logo placeholder avatar */}
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs border border-white/20">
                SP
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">Rekan Sapanesia</h4>
                <span className="text-[9px] text-blue-200 font-bold block tracking-wider uppercase mt-0.5">Online • Fast Response</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/75 hover:text-white focus:outline-none p-1 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat text body area */}
          <div className="p-4 bg-slate-50 space-y-3.5 max-h-[220px] overflow-y-auto">
            {/* Auto welcome message bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[85%] text-xs leading-relaxed text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Assalamu'alaikum wr. wb.</span>
              Selamat datang di Sapanesia Media Management! Kami siap membantu merumuskan kebutuhan publikasi dan meningkatkan citra sekolah Anda.
            </div>
            
            {/* Callout advice bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[85%] text-xs leading-relaxed text-slate-700">
              Silakan ketik pertanyaan Anda atau diskusikan kustomisasi paket media sekolah di sini.
            </div>
          </div>

          {/* Send Input trigger block */}
          <div className="p-3 bg-white border-t border-slate-100">
            <a
              href={formattedWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/10"
            >
              <Send size={12} className="fill-white" />
              <span>Kirim Pertanyaan via WA</span>
            </a>
          </div>

        </div>
      )}

      {/* Main floating bubble trigger */}
      <button
        id="floating-wa-bubble"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none shadow-emerald-500/20 cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-white" />}
      </button>

    </div>
  );
}

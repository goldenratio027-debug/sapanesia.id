import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section 
      id="faq" 
      className="py-20 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Tanya Jawab Umum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Menjawab segala keraguan Anda terkait rincian teknis, sistem revisi, hingga mekanisme kerja kolaborasi media branding sekolah.
          </p>
        </div>

        {/* 2-Column layout: FAQs on left, quick help on right */}
        <div className="grid lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          
          {/* FAQ Accordions Grid (Left side, takes 8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  id={`faq-accordion-${item.id}`}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden text-left ${
                    isOpen 
                      ? 'border-brand-blue bg-blue-50/10 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    id={`faq-btn-${item.id}`}
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug pr-4">
                      {item.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-brand-blue' : ''
                      }`} 
                    />
                  </button>

                  {/* Accordion Content Panel */}
                  <div 
                    id={`faq-content-${item.id}`}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t border-slate-100/60' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <p className="px-6 py-5 text-xs sm:text-[13px] text-slate-600 leading-relaxed bg-white">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick contact Card (Right side, takes 4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-brand-gray-light border border-slate-200 rounded-[2rem] p-6 text-left relative overflow-hidden">
              {/* Decoration circle */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-xl pointer-events-none -z-10" />

              <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center mb-6">
                <HelpCircle size={20} />
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                Punya Pertanyaan Lain?
              </h3>
              
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Apabila ada pertanyaan seputar rancangan kustom atau penyesuaian anggaran yayasan yang tidak tertera di samping, tim kami siap berdiskusi kapan saja.
              </p>

              <a
                href="#consultation"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs py-3 rounded-xl shadow-md text-center block transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>Diskusi via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

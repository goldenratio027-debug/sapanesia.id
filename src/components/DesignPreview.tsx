import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function DesignPreview() {
  const images = [
    'https://lh3.googleusercontent.com/d/1AL8E_06Dmh8IskUeBMZXpWxPjJE0kItJ',
    'https://lh3.googleusercontent.com/d/1Xl67RA7ulDbbYHdUCC3-pzx5NvvRo1xo',
    'https://lh3.googleusercontent.com/d/19Gt-L3CXI4MalIsebzTOab6fkAmyPdiu',
    'https://lh3.googleusercontent.com/d/18dliZZaRS6FR1HKMw5radYrS3II-0W0f',
    'https://lh3.googleusercontent.com/d/1KT-IXRLViVQngD006bgqP202IVoPE25c',
    'https://lh3.googleusercontent.com/d/118cuCcJ3Qnx894SEaOdp17JjBZBSib4v'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the sliding carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Get index positions for active cards to display a beautiful 3-card shifting layout
  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    const current = currentIndex;
    const next = (currentIndex + 1) % images.length;
    return { prev, current, next };
  };

  const { prev, current, next } = getVisibleIndices();

  return (
    <section id="preview-desain" className="py-20 bg-slate-950 text-slate-100 relative overflow-hidden border-t border-b border-slate-900">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Preview Desain Branding Sekolah
          </h2>
          <p className="text-slate-400 mt-3 text-xs sm:text-sm max-w-2xl mx-auto font-medium leading-relaxed">
            Katalog visual publikasi kreatif, feed media sosial, poster kegiatan, dan konten edukatif premium yang dirancang khusus untuk membangun citra profesional dan memperkuat daya tarik digital sekolah Anda.
          </p>
          <div className="h-1 w-12 bg-blue-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Shifting Catalog Slider Area */}
        <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[480px] sm:min-h-[550px] md:min-h-[620px]">
          
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-30 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Previous Design"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Active Sliding Track */}
          <div className="relative w-full flex items-center justify-center overflow-hidden py-10 px-12">
            <div className="relative flex items-center justify-center w-full max-w-md h-full">
              
              <AnimatePresence initial={false} mode="popLayout">
                {/* Left Card (Faded Background) */}
                <motion.div
                  key={`prev-${prev}`}
                  initial={{ opacity: 0, x: -160, scale: 0.8, rotate: -6 }}
                  animate={{ opacity: 0.4, x: -130, scale: 0.85, rotate: -4, zIndex: 10 }}
                  exit={{ opacity: 0, scale: 0.7, x: -200 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="absolute w-[240px] sm:w-[300px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900 pointer-events-none hidden sm:block"
                >
                  <img
                    src={images[prev]}
                    alt="Catalog Item Preview"
                    className="w-full h-full object-cover brightness-[0.7]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Center/Active Card (Full Focus) */}
                <motion.div
                  key={`current-${current}`}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0, zIndex: 20 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="relative w-[280px] sm:w-[350px] aspect-[4/5] rounded-[2.2rem] overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10 bg-slate-900"
                >
                  <img
                    src={images[current]}
                    alt="Active Catalog Design"
                    className="w-full h-full object-cover brightness-100 transition-transform duration-500 hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Right Card (Faded Background) */}
                <motion.div
                  key={`next-${next}`}
                  initial={{ opacity: 0, x: 160, scale: 0.8, rotate: 6 }}
                  animate={{ opacity: 0.4, x: 130, scale: 0.85, rotate: 4, zIndex: 10 }}
                  exit={{ opacity: 0, scale: 0.7, x: 200 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="absolute w-[240px] sm:w-[300px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900 pointer-events-none hidden sm:block"
                >
                  <img
                    src={images[next]}
                    alt="Catalog Item Preview"
                    className="w-full h-full object-cover brightness-[0.7]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-30 w-11 h-11 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            aria-label="Next Design"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Dynamic sliding indicators below */}
        <div className="flex items-center gap-2 mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

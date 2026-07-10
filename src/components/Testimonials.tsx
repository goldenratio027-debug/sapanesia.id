import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, GraduationCap, User } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-brand-gray-light bg-grid-pattern relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Kisah Sukses Mitra
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Testimoni Kepala Sekolah & Yayasan
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Dengarkan langsung pengalaman tulus dari para pimpinan lembaga pendidikan yang telah mempercayakan branding sekolahnya kepada Sapanesia.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          {/* Main Card View */}
          <div 
            id="testimonial-card"
            className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background design quotes element */}
            <div className="absolute top-6 right-8 text-blue-50 pointer-events-none -z-0">
              <Quote size={120} className="stroke-current opacity-25" />
            </div>

            <div className="relative z-10">
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Content */}
              <blockquote className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium italic text-left mb-8">
                "{TESTIMONIALS[currentIndex].content}"
              </blockquote>
            </div>

            {/* Author Profile Information */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-slate-100 pt-6 relative z-10">
              
              <div className="flex items-center gap-4 text-left">
                {/* Profile Photo */}
                <div className="relative">
                  {['test-1', 'test-2', 'test-3'].includes(TESTIMONIALS[currentIndex].id) ? (
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-150 flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
                      <User size={24} />
                    </div>
                  ) : (
                    <img
                      src={TESTIMONIALS[currentIndex].avatarUrl}
                      alt={TESTIMONIALS[currentIndex].name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-150"
                    />
                  )}
                  {/* Small icon badge overlay */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-blue text-white rounded-lg flex items-center justify-center border border-white">
                    <GraduationCap size={10} />
                  </div>
                </div>

                {/* Profile details */}
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <span className="text-[11px] text-brand-blue font-bold tracking-wider uppercase block mt-1">
                    {TESTIMONIALS[currentIndex].role}
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                    {TESTIMONIALS[currentIndex].school}
                  </span>
                </div>
              </div>

              {/* Slider Controller Dots (Internal layout) */}
              <div className="flex gap-1.5 self-center">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

          {/* Navigation Control Arrows (External absolute on desktop, relative on mobile) */}
          <div className="flex justify-center sm:block gap-4 mt-6 sm:mt-0">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:-left-6 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-700 hover:text-brand-blue hover:shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Right Button */}
            <button
              onClick={handleNext}
              className="sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:-right-6 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-700 hover:text-brand-blue hover:shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

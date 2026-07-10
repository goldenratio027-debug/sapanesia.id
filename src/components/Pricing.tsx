import { Check, Sparkles } from 'lucide-react';
import { PACKAGES } from '../data';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export function Pricing({ onSelectPackage }: PricingProps) {
  const handlePilihPaket = (packageName: string) => {
    onSelectPackage(packageName);
    window.location.hash = '#consultation-form';
  };

  return (
    <section 
      id="pricing" 
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Decorative vector shape */}
      <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100/50 inline-block mb-3">
            Investasi Branding Sekolah
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Paket Layanan Bulanan Sapanesia
          </h2>
          <div className="h-1.5 w-16 bg-brand-blue rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Solusi tim media sekolah terlengkap tanpa pusing rekrutmen. Pilih paket bulanan sesuai skala publikasi yang dibutuhkan sekolah Anda.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-6">
          {PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={`border rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.isPopular ? 'overflow-visible' : 'overflow-hidden'
                } ${pkg.color} ${
                  pkg.isPopular ? 'scale-100 lg:scale-105 shadow-xl shadow-blue-950/10 z-10 my-6 lg:my-0' : 'hover:shadow-lg'
                }`}
              >
                {/* Decorative top-right circle accent inside an overflow-hidden boundary to keep main container overflow-visible */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none z-0">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-30 ${pkg.id === 'premium' ? 'bg-white/5' : 'bg-blue-50'}`} />
                </div>
                {/* Popular Highlight Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-4.5 py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap z-10">
                    <Sparkles size={11} className="fill-slate-950 text-slate-950" />
                    <span>PALING POPULER</span>
                  </div>
                )}

                <div>
                  {/* Package Title */}
                  <h3 className={`text-xl font-extrabold tracking-wide mb-2 ${pkg.id === 'premium' ? 'text-white' : 'text-slate-900'}`}>
                    {pkg.name}
                  </h3>

                  {/* Price display */}
                  <div className="mt-4 mb-6">
                    {pkg.originalPrice && (
                      <span className="text-xs text-red-500 font-bold line-through block mb-1">
                        {pkg.originalPrice}
                      </span>
                    )}
                    <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${pkg.id === 'premium' ? 'text-amber-400' : 'text-brand-blue'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-xs font-semibold ml-1.5 ${pkg.id === 'premium' ? 'text-slate-400' : 'text-slate-500'}`}>
                      / Bulan
                    </span>
                  </div>

                  {/* Divider line */}
                  <div className={`h-px w-full my-6 ${pkg.id === 'premium' ? 'bg-slate-800' : 'bg-slate-100'}`} />

                  {/* Features list */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-xs sm:text-[13px] leading-relaxed">
                        <Check 
                          size={16} 
                          className={`flex-shrink-0 mt-0.5 ${
                            pkg.id === 'premium' 
                              ? 'text-amber-400' 
                              : pkg.isPopular ? 'text-brand-blue' : 'text-emerald-500'
                          }`} 
                        />
                        <span className={pkg.id === 'premium' ? 'text-slate-300' : 'text-slate-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  id={`btn-choose-pkg-${pkg.id}`}
                  onClick={() => handlePilihPaket(pkg.name)}
                  className={`w-full py-3.5 rounded-xl text-center font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    pkg.id === 'premium'
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-400/10'
                      : pkg.isPopular
                        ? 'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-blue-900/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Pilih Paket ini
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

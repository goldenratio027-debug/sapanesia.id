import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Importance } from './components/Importance';
import { BrandingChallenges } from './components/BrandingChallenges';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Services } from './components/Services';
import { DesignPreview } from './components/DesignPreview';
import { Pricing } from './components/Pricing';
import { Workflow } from './components/Workflow';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FormPage } from './components/FormPage';
import { AdminDashboard } from './components/AdminDashboard';
import { StickyBottomNav } from './components/StickyBottomNav';

export default function App() {
  const [prefilledPackage, setPrefilledPackage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'home' | 'form' | 'admin'>('home');

  // Monitor location hash changes for instant, robust SPA routing
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#consultation-form') {
        setCurrentPage('form');
      } else if (window.location.hash === '#admin-dashboard') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    // Run initial check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 overflow-x-hidden selection:bg-blue-100 selection:text-brand-blue relative">
      
      {/* Floating Interactive WhatsApp Element */}
      <FloatingWhatsApp />

      {/* Main Top Navigation Header */}
      <Navbar />

      {currentPage === 'home' ? (
        <>
          {/* Hero Section with Interactive Mockup */}
          <Hero />

          {/* SECTION 2: Mengapa Branding Sekolah Penting? */}
          <Importance />

          {/* SECTION 2.5: Permasalahan Utama Branding Sekolah */}
          <BrandingChallenges />

          {/* SECTION 3: Mengapa Memilih Sapanesia? */}
          <WhyChooseUs />

          {/* SECTION 4: Layanan Kami */}
          <Services />

          {/* SECTION 4.5: Preview Desain Premium (Alternating Motion) */}
          <DesignPreview />

          {/* SECTION 5: Paket Layanan & Custom Quote Calculator */}
          <Pricing onSelectPackage={setPrefilledPackage} />

          {/* SECTION 6: Alur Kerja */}
          <Workflow />

          {/* SECTION 8: Testimoni */}
          <Testimonials />

          {/* SECTION 9: FAQ */}
          <FAQ />

          {/* SECTION 10: Call To Action & Lead Free Consultation Form */}
          <CTA />
        </>
      ) : currentPage === 'form' ? (
        /* Separate Dedicated Form Filling Page View */
        <FormPage 
          prefilledPackage={prefilledPackage} 
          setPrefilledPackage={setPrefilledPackage} 
          onBackToHome={handleBackToHome} 
        />
      ) : (
        /* Secure Admin Dashboard View */
        <AdminDashboard onBackToHome={handleBackToHome} />
      )}

      {/* Footer Block with Contact & Mapping */}
      <Footer />

      {/* Sticky Bottom Navigation for Mobile */}
      {currentPage !== 'admin' && <StickyBottomNav />}

    </div>
  );
}

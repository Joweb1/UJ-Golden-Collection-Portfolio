import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Collections from './components/Collections';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import AutoScroll from './components/AutoScroll';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#hero');

  // Handle Hash Navigation
  useEffect(() => {
    const handleHashChange = () => {
      // Normalize hash: empty string becomes #hero (Home)
      const hash = window.location.hash || '#hero';
      
      // Clean up previous ScrollTriggers to prevent ghost pinning or layout issues
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      setCurrentHash(hash);
      
      // Force scroll to top instantly
      window.scrollTo(0, 0);
      
      // Re-initialize logic after DOM update
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    };

    // Initial check
    if (!loading) {
       // Just set the hash state initially, no need to kill triggers yet
       setCurrentHash(window.location.hash || '#hero');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading]);

  const renderContent = () => {
    // Determine which view to show based on hash
    // We add specific keys to force React to unmount/remount components cleanly
    switch (currentHash) {
      case '#about':
        return (
          <div key="about-view" className="min-h-screen flex flex-col animate-fade-in">
             <About />
             <div className="flex-grow"></div>
             <Contact />
          </div>
        );
      case '#collections':
        return (
          <div key="collections-view" className="min-h-screen flex flex-col animate-fade-in">
             <Collections />
             <Contact />
          </div>
        );
      case '#services':
        // Services component is full screen and handles its own layout
        return <Services key="services-view" />;
      case '#testimonials':
        return (
           <div key="testimonials-view" className="min-h-screen flex flex-col animate-fade-in">
              <div className="flex-grow flex items-center">
                 <div className="w-full"><Testimonials /></div>
              </div>
              <Contact />
           </div>
        );
      case '#contact':
        return (
           <div key="contact-view" className="min-h-screen flex flex-col justify-center bg-black animate-fade-in">
             <Contact />
           </div>
        );
      case '#hero':
      default:
        // Home View: Render all components in order
        return (
          <div key="home-view" className="animate-fade-in">
            <Hero />
            <About />
            <Collections />
            <Services />
            <Testimonials />
            <Contact />
          </div>
        );
    }
  };

  return (
    <div className="bg-black min-h-screen text-white selection:bg-gold-500 selection:text-black">
      <CustomCursor />
      <AutoScroll />
      
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative">
          <Navbar />
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default App;
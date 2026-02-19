import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, BRAND_NAME } from '../constants';
import { ArrowRight, Instagram, Facebook, Mail } from 'lucide-react';
import gsap from 'gsap';

const menuImages = [
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/Florenceshowimage.jpg", // Home - Main Showcase
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/proimage.jpg", // About - Professional/Founder
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/multiplebags.jpg", // Collections - Variety
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/travelbagset.jpg", // Services - Logistics/Travel
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/bagandfan.jpg", // Success - Lifestyle
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/handbag3.jpg", // Contact - Product
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number>(0);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Toggle Menu Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
        if (isOpen) {
            // Open Sequence
            const tl = gsap.timeline();
            
            tl.to(overlayRef.current, {
                height: "100vh",
                duration: 0.8,
                ease: "power4.inOut"
            })
            .to(".menu-link-item", {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.4")
            .to(".menu-divider", {
                scaleX: 1,
                duration: 0.8,
                ease: "power3.inOut"
            }, "-=0.8")
            .to(".menu-footer", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.6");

        } else {
            // Close Sequence
            const tl = gsap.timeline();

            tl.to(".menu-link-item", {
                y: 100,
                opacity: 0,
                rotateX: -20,
                duration: 0.4,
                stagger: 0.05,
                ease: "power3.in"
            })
            .to(".menu-footer", {
                y: 20,
                opacity: 0,
                duration: 0.3
            }, "-=0.4")
            .to(overlayRef.current, {
                height: 0,
                duration: 0.8,
                ease: "power4.inOut"
            }, "-=0.2");
        }
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Smart Navbar Hide/Show on Scroll
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
        const currentScroll = window.scrollY;
        // Hide on scroll down (>100px), show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100 && !isOpen) {
            gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: "power2.out" });
        } else {
            gsap.to(headerRef.current, { yPercent: 0, duration: 0.4, ease: "power2.out" });
        }
        lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleLinkHover = (index: number) => {
    setActiveImage(index);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault(); // Prevent default anchor jump behavior
    
    // Explicitly update the hash
    window.location.hash = href;
    
    // Close the menu
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-[60] px-6 py-6 mix-blend-difference text-white flex justify-between items-center transition-transform duration-300">
         <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex flex-col group relative z-[60] cursor-pointer">
            <span className="font-serif text-2xl font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] bg-[length:200%_auto] animate-gold-shimmer">
              UJ
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium group-hover:tracking-[0.5em] transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] bg-[length:200%_auto] animate-gold-shimmer">
              Golden
            </span>
         </a>

         <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex items-center gap-3 group cursor-pointer relative z-[60]"
            aria-label="Toggle Menu"
         >
            <span className="hidden md:block text-xs uppercase tracking-widest font-bold group-hover:text-gold-500 transition-colors">
                {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className="relative w-8 h-8 flex items-center justify-center">
                 <span className={`absolute w-8 h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-1.5 group-hover:-translate-y-2.5'}`}></span>
                 <span className={`absolute w-8 h-[2px] bg-white transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-1.5 group-hover:translate-y-2.5'}`}></span>
            </div>
         </button>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div ref={menuRef}>
        <div ref={overlayRef} className="fixed top-0 left-0 w-full h-0 bg-[#080808] z-50 overflow-hidden flex flex-col md:flex-row">
            
            {/* Background Image Preview Area (Dynamic) */}
            <div className="absolute inset-0 z-0 opacity-20 md:opacity-40 transition-all duration-700 ease-in-out">
                 {menuImages.map((img, i) => (
                    <div 
                        key={i}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out transform scale-105 ${activeImage === i ? 'opacity-100 scale-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                 ))}
                 <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            </div>

            {/* Links Container */}
            <div className="relative z-10 w-full h-full container mx-auto px-6 flex flex-col justify-center">
                <div className="flex flex-col items-start gap-4 md:gap-2">
                    {NAV_ITEMS.map((item, index) => (
                        <div 
                            key={index} 
                            className="group relative overflow-hidden cursor-pointer w-full md:w-auto"
                            onMouseEnter={() => handleLinkHover(index)}
                        >
                            <a 
                              href={item.href} 
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="menu-link-item block transform translate-y-[100px] opacity-0 perspective-1000 origin-bottom-left"
                            >
                                <div className="flex items-center">
                                    <span className="text-xs font-mono text-gold-500 mr-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                        0{index + 1}
                                    </span>
                                    <span className="block text-5xl md:text-8xl lg:text-9xl font-serif font-light text-neutral-500 group-hover:text-white transition-colors duration-500 group-hover:translate-x-4 md:group-hover:translate-x-10 transform">
                                        {item.label}
                                    </span>
                                </div>
                                <span className="hidden md:block absolute top-1/2 -left-8 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-500 text-gold-500">
                                    <ArrowRight size={32} />
                                </span>
                            </a>
                            <div className="menu-divider w-0 h-[1px] bg-white/10 mt-2 transform origin-left transition-all duration-500 group-hover:w-full group-hover:bg-gold-500"></div>
                        </div>
                    ))}
                </div>

                {/* Footer Info in Menu */}
                <div className="menu-footer mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 opacity-0 transform translate-y-10">
                    <div className="text-neutral-400 text-xs md:text-sm mb-6 md:mb-0">
                        <p className="uppercase tracking-widest mb-2 text-gold-500 font-bold">Headquarters</p>
                        <p>Trade Fair Complex, Lagos</p>
                        <p className="mt-1 text-white">contact@florencegolden.com</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href="#" className="group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
                            <Instagram size={18} className="group-hover:text-gold-500 transition-colors" />
                            <span className="text-xs uppercase tracking-wider">Instagram</span>
                        </a>
                        <a href="#" className="group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
                            <Facebook size={18} className="group-hover:text-gold-500 transition-colors" />
                            <span className="text-xs uppercase tracking-wider">Facebook</span>
                        </a>
                        <a href="#" className="group flex items-center space-x-2 text-white/50 hover:text-white transition-colors">
                            <Mail size={18} className="group-hover:text-gold-500 transition-colors" />
                            <span className="text-xs uppercase tracking-wider">Mail</span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
      </div>
      <style>{`
        @keyframes goldShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gold-shimmer {
          animation: goldShimmer 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;
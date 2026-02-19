import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_TEXT } from '../constants';
import { ArrowDown, Sparkles, PlayCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Chaotic Entrance
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-word", {
        y: 200,
        z: -500,
        rotationX: 90,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
      })
      .from(".hero-deco", {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      }, "-=1");

      // 2. Mouse Interaction (Hyper-reactive)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Extreme Tilt for text
        gsap.to(textContainerRef.current, {
          rotationY: xPos * 20,
          rotationX: -yPos * 20,
          duration: 0.5,
          ease: "power1.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Cleanup
      return () => window.removeEventListener('mousemove', handleMouseMove);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAutoScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('toggle-auto-scroll'));
  };

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505] perspective-2000">
      
      {/* Dynamic Background: Abstract Luxury Video */}
      <div className="absolute inset-0 z-0">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover brightness-[0.6]"
         >
            <source src="https://videos.pexels.com/video-files/5527786/5527786-hd_1920_1080_25fps.mp4" type="video/mp4" />
         </video>
         {/* Lighter overlay to allow video to be seen */}
         <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Marquee Layers - Double layer for depth */}
      {/* Increased opacity significantly for visibility */}
      <div className="absolute top-[5%] w-full -rotate-6 opacity-80 z-0 pointer-events-none select-none">
        <div className="animate-marquee whitespace-nowrap flex space-x-12">
           {[...Array(4)].map((_, i) => (
             <span key={i} className="text-[12vw] font-serif font-thin text-transparent stroke-text-white drop-shadow-lg">LUXURY • BAGS • </span>
           ))}
        </div>
      </div>
      <div className="absolute bottom-[5%] w-full rotate-3 opacity-80 z-0 pointer-events-none select-none">
        <div className="animate-marquee-reverse whitespace-nowrap flex space-x-12">
           {[...Array(4)].map((_, i) => (
             <span key={i} className="text-[10vw] font-serif font-black text-transparent stroke-text-gold drop-shadow-lg">FLORENCE • GOLDEN • </span>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <div ref={textContainerRef} className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center transform-style-3d">
        
        <div className="hero-deco mb-8 flex items-center space-x-4 text-gold-400">
          <div className="w-12 h-[1px] bg-gold-400"></div>
          <Sparkles size={20} className="animate-pulse" />
          <span className="text-sm font-sans uppercase tracking-[0.4em] font-semibold text-white">Est. 2024</span>
          <div className="w-12 h-[1px] bg-gold-400"></div>
        </div>

        <h1 className="flex flex-col items-center font-serif font-medium text-7xl md:text-9xl lg:text-[10rem] leading-[0.9] text-white mix-blend-normal drop-shadow-2xl">
          <span className="hero-word block hover:text-gold-400 transition-colors duration-300 italic">The Bag</span>
          <span className="hero-word block font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-500 to-gold-200 bg-[length:200%_auto] animate-shine">
             EMPIRE
          </span>
        </h1>
        
        <p className="hero-word mt-10 font-sans text-neutral-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed backdrop-blur-sm py-2 px-4 rounded-full border border-white/5 bg-black/20">
          {HERO_TEXT.subtitle}
        </p>

        <div className="hero-word mt-14">
          <button 
            onClick={handleAutoScrollClick}
            className="group relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:bg-gold-500 cursor-pointer"
            aria-label="Start Auto Scroll"
          >
             <span className="absolute inset-0 border border-black/10 rounded-full animate-ping opacity-20"></span>
             {/* Show Play icon on hover, Arrow otherwise */}
             <div className="relative z-10">
                <ArrowDown className="text-black group-hover:opacity-0 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
                <PlayCircle className="text-black opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
             </div>
          </button>
          <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500 font-bold group-hover:text-white transition-colors">Auto Explore</p>
        </div>
      </div>

      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
        }
        .stroke-text-gold {
          -webkit-text-stroke: 2px rgba(222, 166, 35, 0.8);
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          animation: shine 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
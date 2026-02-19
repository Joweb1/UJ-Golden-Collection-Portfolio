import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation logic
      let progress = { value: 0 };
      
      const loadTl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
            onComplete: onComplete
          });
        }
      });

      // 1. New Text Animation
      const titleLines = textWrapperRef.current?.querySelectorAll('.loader-title-line');
      
      if (titleLines) {
        gsap.set(titleLines, { y: "120%", skewY: 10, opacity: 0 });
        
        loadTl.to(titleLines, {
            y: "0%",
            skewY: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.15,
            ease: "power4.out"
        }, 0);
      }

      // 2. Counter Animation (Maintained)
      loadTl.to(progress, {
        value: 100,
        duration: 3,
        ease: "expo.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(progress.value).toString().padStart(2, '0');
          }
        }
      }, 0);

      // Optional: Pulse the outline text
      const outlineText = textWrapperRef.current?.querySelector('.outline-text');
      if (outlineText) {
          gsap.to(outlineText, {
              opacity: 0.6,
              duration: 1,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
          });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050505] text-white overflow-hidden py-10 px-6 cursor-none">
      
      {/* Header Details */}
      <div className="w-full flex justify-between items-start opacity-60">
         <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans text-neutral-400">Portfolio ©2024</span>
         <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans text-gold-500">Florence Golden</span>
      </div>

      {/* Main Display Text */}
      <div ref={textWrapperRef} className="flex flex-col items-center justify-center w-full relative z-10 mix-blend-screen">
         <div className="overflow-hidden mb-[-1vw]">
            <h1 className="loader-title-line block font-serif text-[18vw] md:text-[15vw] leading-[0.85] text-gold-400 font-bold tracking-tighter">
              UJ
            </h1>
         </div>
         <div className="overflow-hidden">
            <h1 className="loader-title-line outline-text block font-serif text-[18vw] md:text-[15vw] leading-[0.85] text-transparent font-light tracking-tighter italic">
              GOLDEN
            </h1>
         </div>
      </div>

      {/* Footer / Loading Bar */}
      <div className="w-full flex items-end justify-between relative z-20">
         <div className="flex flex-col items-start gap-3">
            <span className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-[0.2em]">Loading Collection</span>
            <div className="w-24 md:w-48 h-[2px] bg-neutral-900 overflow-hidden">
               <div className="h-full bg-gold-500 w-full origin-left animate-progress"></div>
            </div>
         </div>

         <div className="text-6xl md:text-8xl font-serif font-thin text-white tabular-nums leading-none">
            <span ref={counterRef}>00</span>
            <span className="text-xl md:text-3xl text-gold-500 align-top ml-1">%</span>
         </div>
      </div>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(222, 166, 35, 0.9);
          color: transparent;
        }
        @media (min-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 2px rgba(222, 166, 35, 0.9);
          }
        }
        .animate-progress {
            animation: grow 3s ease-in-out forwards;
        }
        @keyframes grow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
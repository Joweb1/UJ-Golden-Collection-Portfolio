import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_LIST } from '../constants';
import { Boxes, ShoppingBag, Truck, Globe, CheckCircle, ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Boxes: <Boxes size={80} strokeWidth={1} />,
  ShoppingBag: <ShoppingBag size={80} strokeWidth={1} />,
  Truck: <Truck size={80} strokeWidth={1} />,
  Globe: <Globe size={80} strokeWidth={1} />,
  CheckCircle: <CheckCircle size={80} strokeWidth={1} />,
};

// Map services to specific, high-quality images from the provided list
const serviceImages = [
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/multiplebags.jpg",     // Wholesale: Bulk display
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/bagandfan.jpg",        // Retail: Lifestyle/Classy
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/travelbagsilver.jpg",  // Logistics: Travel/Luggage
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/Florenceshowimage.jpg",// Sourcing: Showroom/Display
  "https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/handbagred.jpg",       // Quality: Detail shot
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Calculate total slides: Intro (1) + Services (n) + Outro (1)
  const totalSlides = SERVICES_LIST.length + 2;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Setup Logic
      const slides = gsap.utils.toArray(".horizontal-panel");
      const actualSlidesCount = slides.length; 
      
      // Movement Calculation
      const xPercentMovement = -(100 * (actualSlidesCount - 1) / actualSlidesCount);

      // 2. Main Horizontal Scroll Timeline with Snapping
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Increased scrub for a smoother, weighted feel
          snap: {
            snapTo: 1 / (actualSlidesCount - 1), // Snap to each panel (0, 0.16, 0.33, etc.)
            duration: { min: 0.1, max: 0.3 }, // Faster, snappier duration
            delay: 0, // Instant engagement when scroll stops
            ease: "power3.inOut" // Stronger easing curve for a magnetic feel
          },
          // Increase scroll distance (multiplier 1.5) to make it harder to overshoot and give the snap more room to work
          end: () => "+=" + (window.innerWidth * (actualSlidesCount - 1) * 1.5), 
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
                gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          }
        }
      });

      // 3. The Physical Translation
      tl.to(trackRef.current, {
        xPercent: xPercentMovement,
        ease: "none",
      });

      // 4. Inner Parallax & Animations
      slides.forEach((slide: any) => {
        // Parallax for the Image
        const img = slide.querySelector('.parallax-image');
        if (img) {
            // Intense parallax + subtle scale for "cool" look
            gsap.fromTo(img, 
                { objectPosition: "0% 50%", scale: 1 },
                { 
                    objectPosition: "100% 50%", 
                    scale: 1.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: tl, 
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
            );
        }

        // Parallax for text
        const textContent = slide.querySelector('.parallax-content');
        if (textContent) {
             gsap.fromTo(textContent,
                { x: 100, opacity: 0.5 },
                { 
                    x: -50, // Reduced movement to keep it readable while snapping
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: slide,
                        containerAnimation: tl,
                        start: "left right",
                        end: "right left",
                        scrub: true
                    }
                }
             );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [totalSlides]);

  return (
    <section id="services" ref={sectionRef} className="relative h-screen bg-neutral-950 overflow-hidden">
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
         <div ref={progressBarRef} className="h-full bg-gold-500 origin-left transform scale-x-0 will-change-transform box-shadow-glow"></div>
      </div>

      {/* The Train Track (Flex Row) */}
      <div 
        ref={trackRef} 
        className="flex flex-row h-full will-change-transform"
        style={{ width: `${totalSlides * 100}vw` }}
      >
        
        {/* Slide 1: Intro */}
        <div className="horizontal-panel w-[100vw] h-full flex items-center justify-center relative bg-neutral-900 border-r border-white/5">
           <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10 px-12 max-w-4xl">
              <span className="text-gold-500 uppercase tracking-[0.5em] text-sm font-bold block mb-4 animate-pulse">Our Expertise</span>
              <h2 className="text-7xl md:text-9xl font-serif text-white mb-8 leading-[0.9]">
                Global <br/> <span className="text-transparent stroke-text-gold italic">Services</span>
              </h2>
              <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                 Experience the full spectrum of bag empire operations. From sourcing to doorstep delivery, we handle the complexities so you can focus on style.
              </p>
              <div className="mt-12 flex items-center gap-4 text-white opacity-50">
                 <ArrowRight className="animate-bounce-horizontal" />
                 <span className="text-sm uppercase tracking-widest">Swipe to Explore</span>
              </div>
           </div>
        </div>

        {/* Slides 2-6: Services */}
        {SERVICES_LIST.map((service, index) => (
          <div key={index} className="horizontal-panel w-[100vw] h-full flex flex-row relative border-r border-white/5 bg-black">
             
             {/* Left: Image Area (Parallax) */}
             <div className="w-1/2 h-full relative overflow-hidden hidden md:block border-r border-white/5 group">
                 {/* Reduced overlay opacity to make image clearer */}
                 <div className="absolute inset-0 bg-gold-900/5 z-10 mix-blend-multiply transition-colors duration-500 group-hover:bg-transparent"></div>
                 {/* Decorative Overlay */}
                 <div className="absolute inset-0 z-20 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shine pointer-events-none"></div>
                 
                 <img 
                    src={serviceImages[index % serviceImages.length]} 
                    alt={service.title} 
                    className="parallax-image w-full h-full object-cover opacity-100 filter contrast-105"
                    style={{ objectFit: "cover", objectPosition: "0% 50%" }}
                 />
                 
                 <div className="absolute bottom-12 left-12 z-20 mix-blend-difference">
                     <span className="text-[10rem] md:text-[14rem] font-serif font-bold text-white/10 leading-none absolute -top-40 -left-6 select-none">0{index + 1}</span>
                     <h3 className="text-4xl font-serif text-white relative z-10 tracking-tight">{service.title}</h3>
                 </div>
             </div>

             {/* Right: Content Area */}
             <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-12 md:p-24 relative bg-neutral-950">
                 {/* Mobile Background Image (Absolute) - Increased opacity for better visibility */}
                 <div className="absolute inset-0 md:hidden z-0">
                     <img 
                        src={serviceImages[index % serviceImages.length]} 
                        className="w-full h-full object-cover opacity-50"
                        alt=""
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40"></div>
                 </div>

                 <div className="parallax-content relative z-10">
                     <div className="text-gold-500 mb-8 transform hover:scale-110 transition-transform duration-300 origin-left inline-block drop-shadow-[0_0_15px_rgba(222,166,35,0.3)]">
                        {iconMap[service.icon]}
                     </div>
                     <h3 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                        {service.title}
                     </h3>
                     <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-transparent mb-8"></div>
                     <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-lg">
                        {service.description}
                     </p>
                     
                     <div className="mt-12 flex items-center space-x-4 group cursor-pointer w-fit">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-black transition-all duration-300">
                           <ArrowUpRight size={20} />
                        </div>
                        <span className="text-sm uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">Learn More</span>
                     </div>
                 </div>
             </div>

          </div>
        ))}

        {/* Slide 7: Outro/CTA */}
        <div className="horizontal-panel w-[100vw] h-full flex items-center justify-center bg-gold-600 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
             {/* CTA Background Image */}
             <div className="absolute inset-0 z-0 opacity-10">
                <img src="https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/travelbagset.jpg" className="w-full h-full object-cover grayscale" />
             </div>
             
             <div className="text-center relative z-10">
                 <h2 className="text-6xl md:text-9xl font-serif text-black mb-8">
                    Start Your <br/> Journey
                 </h2>
                 <p className="text-black/70 text-xl max-w-lg mx-auto mb-12 font-medium">
                    Join the thousands of resellers and fashion enthusiasts trusting Florence Golden Empires.
                 </p>
                 <a 
                    href="#contact"
                    className="inline-block px-12 py-6 bg-black text-white rounded-full text-lg uppercase tracking-widest font-bold hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-2xl"
                 >
                    Contact Us Now
                 </a>
             </div>
        </div>

      </div>

      <style>{`
        .stroke-text-gold {
          -webkit-text-stroke: 1px #dea623;
        }
        @media (min-width: 768px) {
            .stroke-text-gold {
              -webkit-text-stroke: 2px #dea623;
            }
        }
        .animate-bounce-horizontal {
            animation: bounceHorizontal 2s infinite;
        }
        @keyframes bounceHorizontal {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(25%); }
        }
        .box-shadow-glow {
            box-shadow: 0 0 10px #dea623;
        }
      `}</style>
    </section>
  );
};

export default Services;
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={containerRef} className="py-32 bg-gold-900/10 border-y border-white/5 relative">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <div className="mb-8 flex justify-center text-gold-500 opacity-50">
          <Quote size={48} />
        </div>
        
        {TESTIMONIALS.map((item, index) => (
          <div key={index} className="testimonial-content">
            <h3 className="text-2xl md:text-4xl font-serif text-white leading-normal italic mb-10">
              "{item.text}"
            </h3>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-700 rounded-full mb-4"></div>
              <h4 className="text-gold-400 font-bold uppercase tracking-widest text-sm">{item.author}</h4>
              <p className="text-neutral-500 text-xs mt-1 uppercase tracking-wide">{item.role}</p>
            </div>
          </div>
        ))}

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale mix-blend-screen">
          {/* Faux Partner Logos */}
          {[1,2,3,4].map((i) => (
             <div key={i} className="h-12 border border-white/30 flex items-center justify-center text-xs text-white">RESELLER {i}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
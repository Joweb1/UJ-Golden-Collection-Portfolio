import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_TEXT, BRAND_ALT_NAME } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(imgRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-neutral-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <div ref={textRef} className="w-full md:w-1/2">
            <h4 className="text-gold-500 text-sm tracking-widest uppercase mb-4 font-bold">Our Story</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
              {BRAND_ALT_NAME}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6 font-light">
              {ABOUT_TEXT.description}
            </p>
            <p className="text-white italic font-serif text-xl border-l-2 border-gold-500 pl-4">
              {ABOUT_TEXT.subText}
            </p>
          </div>

          <div ref={imgRef} className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-gold-500/10 transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 border border-gold-500/30"></div>
            <div className="relative overflow-hidden aspect-[4/5]">
              <img 
                src="https://github.com/Joweb1/Jovibe-images/raw/refs/heads/main/proimage.jpg" 
                alt="Florence Golden - The Bag Empire" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
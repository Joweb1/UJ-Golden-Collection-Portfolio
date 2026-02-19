import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLLECTIONS_LIST } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Collections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.collection-item').forEach((item: any, i) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={containerRef} className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-gold-500 uppercase tracking-widest text-xs font-bold">The Empire Stock</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mt-2">Our Collections</h2>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 border border-white/20 text-white hover:border-gold-500 hover:text-gold-500 transition-colors text-sm uppercase tracking-widest">
            View Full Catalogue
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
          {COLLECTIONS_LIST.map((item, index) => (
            <div 
              key={index} 
              className={`collection-item relative group overflow-hidden cursor-pointer ${
                index === 0 ? 'lg:col-span-3' : index === 1 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="block text-gold-400 text-xs uppercase tracking-widest mb-1">{item.category}</span>
                <h3 className="text-white font-serif text-2xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        gsap.to(follower, { scale: 1.5, borderColor: '#dea623', backgroundColor: 'rgba(222, 166, 35, 0.1)', duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { scale: 1, borderColor: '#ffffff', backgroundColor: 'transparent', duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-gold-500 rounded-full -ml-1.5 -mt-1.5 mix-blend-difference"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full -ml-5 -mt-5 transition-colors duration-300"
      />
    </div>
  );
};

export default CustomCursor;
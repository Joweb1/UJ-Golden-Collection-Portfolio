import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, X } from 'lucide-react';
import gsap from 'gsap';

const AutoScroll: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Controls visibility of the floating widget
  
  const animationFrameRef = useRef<number | null>(null);
  const waitEndTime = useRef<number>(0);
  const scrollAccumulator = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Configuration for different behaviors
  const BEHAVIORS = {
    // Fast movement, long step, pause (For pinned horizontal sections)
    // Increased speed from 15 to 25, reduced pause to 1s
    SWIPE: { speed: 25, step: window.innerHeight * 0.8, pause: 1000 }, 
    
    // Medium movement, medium step, pause (For text sections)
    // Increased speed from 2 to 4, reduced pause to 1.5s
    READ: { speed: 4, step: window.innerHeight * 0.7, pause: 1500 },
    
    // Slow, continuous movement (For grids/visuals)
    // Increased speed from 1 to 2 for a faster cinematic flow
    SCAN: { speed: 2, step: Infinity, pause: 0 } 
  };

  const toggleScroll = (forceState?: boolean) => {
    const newState = forceState !== undefined ? forceState : !isScrolling;
    setIsScrolling(newState);
    if (newState) setIsVisible(true);
  };

  useEffect(() => {
    // Listen for the specific event from Hero button
    const handleCustomToggle = () => toggleScroll(true);
    
    // Stop on manual interaction to prevent fighting the user
    const handleInteraction = () => {
        if (isScrolling) setIsScrolling(false);
    };

    window.addEventListener('toggle-auto-scroll', handleCustomToggle);
    window.addEventListener('wheel', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('toggle-auto-scroll', handleCustomToggle);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isScrolling]);

  useEffect(() => {
    const html = document.documentElement;

    if (isScrolling) {
      // 1. Disable smooth scrolling to prevent vibration
      html.style.scrollBehavior = 'auto';
      lastTimeRef.current = performance.now();
      
      const performScroll = (time: number) => {
        // Calculate delta time for consistent speed across frame rates
        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        // Check if we are in a pause period
        if (time < waitEndTime.current) {
          animationFrameRef.current = requestAnimationFrame(performScroll);
          return;
        }

        // 2. Context Awareness: Determine behavior based on visible section
        let currentBehavior = BEHAVIORS.SCAN; // Default
        
        // Check for specific sections
        const services = document.getElementById('services');
        const about = document.getElementById('about');
        const testimonials = document.getElementById('testimonials');

        // Helper to check if element is roughly in view
        const isInView = (el: HTMLElement | null) => {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        };

        if (isInView(services)) {
            // Services is pinned by GSAP, so it feels like horizontal swiping
            // We need fast scroll to traverse the pin distance
            currentBehavior = BEHAVIORS.SWIPE;
        } else if (isInView(about) || isInView(testimonials)) {
            // Text heavy sections
            currentBehavior = BEHAVIORS.READ;
        }

        // 3. Execute Scroll
        // Adjust speed based on delta time (target 60fps)
        const frameAdjustedSpeed = currentBehavior.speed * (deltaTime / 16.66);
        
        window.scrollBy(0, frameAdjustedSpeed);
        scrollAccumulator.current += frameAdjustedSpeed;

        // 4. Check for Step/Pause
        if (scrollAccumulator.current >= currentBehavior.step) {
            scrollAccumulator.current = 0;
            waitEndTime.current = time + currentBehavior.pause;
        }

        // Check if reached bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            setIsScrolling(false);
        } else {
            animationFrameRef.current = requestAnimationFrame(performScroll);
        }
      };

      animationFrameRef.current = requestAnimationFrame(performScroll);

    } else {
      // Cleanup
      html.style.scrollBehavior = 'smooth'; // Re-enable CSS smooth scroll
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        html.style.scrollBehavior = 'smooth';
    };
  }, [isScrolling]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center gap-2 animate-fade-in">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 flex items-center gap-2 shadow-2xl">
            <button 
                onClick={() => setIsScrolling(!isScrolling)}
                className="w-10 h-10 rounded-full bg-gold-500 text-black flex items-center justify-center hover:scale-110 transition-transform"
                title={isScrolling ? "Pause Auto Scroll" : "Resume Auto Scroll"}
            >
                {isScrolling ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
            </button>
            
            <button 
                onClick={() => { setIsScrolling(false); setIsVisible(false); }}
                className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-500/80 transition-colors"
                title="Exit Auto Scroll"
            >
                <X size={14} />
            </button>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-gold-500 font-bold bg-black/80 px-2 py-1 rounded">
            {isScrolling ? "Auto Scroll On" : "Paused"}
        </span>
    </div>
  );
};

export default AutoScroll;
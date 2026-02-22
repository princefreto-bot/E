import { useState, useEffect, useCallback, RefObject } from 'react';

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress within the container
    const containerTop = rect.top;
    const containerHeight = rect.height - windowHeight;
    
    let scrollProgress = 0;
    
    if (containerTop <= 0) {
      scrollProgress = Math.min(Math.abs(containerTop) / containerHeight, 1);
    }
    
    setProgress(Math.max(0, Math.min(1, scrollProgress)));
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return progress;
}

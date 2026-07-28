import { useEffect } from 'react';

export function useTextAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all text motion elements
    const elements = document.querySelectorAll(
      '.text-motion, .text-motion-left, .text-motion-right, .text-motion-scale'
    );
    
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

// Default export for compatibility
export default useTextAnimation;


import { useEffect } from 'react';

export function useInteractive() {
  useEffect(() => {
    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    const updateScrollProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    };

    // ============================================
    // CUSTOM MOUSE CURSOR
    // ============================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    document.body.classList.add('has-custom-cursor');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isCursorVisible = false;

    const updateCursor = () => {
      if (isCursorVisible) {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursor.style.opacity = '1';
        cursor.style.display = 'block';
      }
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isCursorVisible) {
        isCursorVisible = true;
        cursorX = mouseX;
        cursorY = mouseY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        if (!isCursorVisible) {
          isCursorVisible = true;
          cursorX = mouseX;
          cursorY = mouseY;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        isCursorVisible = true;
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
      }
    };

    const handleTouchEnd = () => {
      // Keep cursor visible briefly on touch end
      setTimeout(() => {
        isCursorVisible = false;
        cursor.style.display = 'none';
      }, 200);
    };

    const handleMouseEnter = () => {
      cursor.style.display = 'block';
      cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.display = 'none';
      isCursorVisible = false;
    };

    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList) return;
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('btn') ||
        target.closest('.btn') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        cursor.classList.add('hover');
      }
    };

    const handleElementMouseLeave = () => {
      cursor.classList.remove('hover');
    };

    const handleMouseDown = () => {
      cursor.classList.add('click');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('click');
    };

    const handleTouchStartClick = () => {
      cursor.classList.add('click');
    };

    const handleTouchEndClick = () => {
      cursor.classList.remove('click');
    };

    // ============================================
    // SMOOTH SCROLL MOTION / PARALLAX
    // ============================================
    const handleSmoothScroll = () => {
      const sections = document.querySelectorAll('section');
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Calculate scroll progress for this section
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));

        // Apply parallax effect
        if (section.classList.contains('parallax-slow')) {
          (section as HTMLElement).style.transform = `translateY(${scrollProgress * 50}px)`;
        } else if (section.classList.contains('parallax-medium')) {
          (section as HTMLElement).style.transform = `translateY(${scrollProgress * 30}px)`;
        } else if (section.classList.contains('parallax-fast')) {
          (section as HTMLElement).style.transform = `translateY(${scrollProgress * 15}px)`;
        }

        // Fade on scroll
        const fadeElements = section.querySelectorAll('.fade-on-scroll');
        fadeElements.forEach((el) => {
          const elRect = el.getBoundingClientRect();
          const isVisible = elRect.top < windowHeight && elRect.bottom > 0;
          if (isVisible) {
            el.classList.add('visible');
          }
        });
      });
    };

    // ============================================
    // CLICK RIPPLE EFFECT
    // ============================================
    const addRippleEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.classList.contains('btn') || target.closest('.btn')) {
        const buttonElement = target.closest('.btn') as HTMLElement | null;
        const button = (buttonElement || target) as HTMLElement;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
    };

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    };

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target as HTMLElement;
        if (target.classList.contains('btn') || target.tagName === 'BUTTON') {
          target.click();
        }
      }
    };

    // ============================================
    // EVENT LISTENERS
    // ============================================
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('scroll', handleSmoothScroll);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mouseenter', handleElementMouseEnter, true);
    document.addEventListener('mouseleave', handleElementMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStartClick, { passive: true });
    document.addEventListener('touchend', handleTouchEndClick, { passive: true });
    document.addEventListener('click', addRippleEffect);
    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Initial calls
    updateScrollProgress();
    handleSmoothScroll();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('scroll', handleSmoothScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseenter', handleElementMouseEnter, true);
      document.removeEventListener('mouseleave', handleElementMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStartClick);
      document.removeEventListener('touchend', handleTouchEndClick);
      document.removeEventListener('click', addRippleEffect);
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('keydown', handleKeyboardNavigation);
      document.body.classList.remove('has-custom-cursor');
      progressBar.remove();
      cursor.remove();
    };
  }, []);
}


import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import mainLogo from '../assets/main_logo.png';

const MOBILE_BREAKPOINT = 768;

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (!isMobile) return null;

  const topbar = (
    <div
      className="hero__topbar hero__topbar--mobile-fixed"
      role="banner"
    >
      <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
        <img
          src={mainLogo}
          alt="SIFA Advisory"
          className="brand__logo"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </Link>
      <button
        className={`menu-toggle ${menuOpen ? 'active' : ''}`}
        type="button"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );

  return createPortal(topbar, document.body);
}

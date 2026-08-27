import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

const MOBILE_BREAKPOINT = 768;

const TABS = [
  {
    to: '/',
    match: (p: string) => p === '/' || p === '',
    label: 'Home',
    labelAr: 'الرئيسية',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    to: '/about',
    match: (p: string) => p.startsWith('/about'),
    label: 'About',
    labelAr: 'من نحن',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6" />
        <circle cx="12" cy="7.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/services',
    match: (p: string) => p.startsWith('/services'),
    label: 'Services',
    labelAr: 'خدماتنا',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/insight',
    match: (p: string) => p.startsWith('/insight'),
    label: 'Insight',
    labelAr: 'مقالات',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h13a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z" />
        <path d="M8 8.5h7M8 12h7M8 15.5h4" />
      </svg>
    ),
  },
  {
    to: '/contact',
    match: (p: string) => p.startsWith('/contact'),
    label: 'Contact',
    labelAr: 'اتصل بنا',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 5.5h17v13h-17z" />
        <path d="m3.5 6 8.5 6.5L20.5 6" />
      </svg>
    ),
  },
];

export default function MobileBottomNav() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const pathname = location.pathname;

  const bar = (
    <nav className="mbn" aria-label="Bottom navigation">
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.to}
            to={tab.to}
            className={`mbn__item ${active ? 'mbn__item--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {tab.icon}
            <span className="mbn__label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  // Push page content above the fixed bar so nothing is hidden behind it
  document.body.style.setProperty('--mbn-height', '62px');

  return createPortal(bar, document.body);
}

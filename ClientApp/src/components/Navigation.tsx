import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navigation.css';

interface NavigationProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navigation({ menuOpen, setMenuOpen }: NavigationProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simple services list
  const services = [
    { id: 'financial-services', name: t('services.financial') },
    { id: 'transaction-services', name: t('services.transaction') },
    { id: 'risk-advisory', name: t('services.risk') },
    { id: 'people-organization', name: t('services.people') },
    { id: 'information-technology', name: t('services.it') },
    { id: 'branding-marketing', name: t('services.branding') },
    { id: 'events-gifts', name: t('services.events') },
    { id: 'media-production', name: t('services.media') },
  ];

  const isActive = (path: string) => {
    if (path === '/services') {
      return location.pathname === '/services' || location.pathname.startsWith('/services/');
    }
    return location.pathname === path;
  };

  return (
    <>
      <nav className={menuOpen ? 'active' : ''}>
        <Link
          className={isActive('/') ? 'active' : ''}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.home')}
        </Link>
        <Link
          className={isActive('/about') ? 'active' : ''}
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.about')}
        </Link>

        {/* Simple Services Dropdown */}
        <div
          className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`}
          ref={dropdownRef}
        >
          <Link
            to="/services"
            className={`nav-dropdown__toggle ${isActive('/services') ? 'active' : ''}`}
            onClick={(e) => {
              // Only toggle on mobile (when menu is open)
              if (menuOpen) {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              }
              // On desktop, allow default navigation to /services
              // CSS hover handles the dropdown visibility
            }}
          >
            {t('nav.services')}
            <svg
              className="nav-dropdown__arrow"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 4.5l3 3 3-3" />
            </svg>
          </Link>
          <div className="nav-dropdown__menu">
            <Link
              to="/services"
              className={location.pathname === '/services' ? 'active' : ''}
              onClick={() => {
                setMenuOpen(false);
                setDropdownOpen(false);
              }}
            >
              {t('services.overview')}
            </Link>
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className={location.pathname === `/services/${service.id}` ? 'active' : ''}
                onClick={() => {
                  setMenuOpen(false);
                  setDropdownOpen(false);
                }}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <Link
          className={isActive('/insight') ? 'active' : ''}
          to="/insight"
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.insight')}
        </Link>
        <Link
          className={isActive('/contact') ? 'active' : ''}
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          {t('nav.contacts')}
        </Link>
      </nav>
      <LanguageSwitcher />
    </>
  );
}


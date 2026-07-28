import { useState } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import Navigation from './Navigation';
import Footer from './Footer';
import mainLogo from '../assets/main_logo.png';
import './LegalPage.css';

interface LegalPageLayoutProps {
  titleKey: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ titleKey, children }: LegalPageLayoutProps) {
  const { t, isRTL } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`page legal-page ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Exact same header structure as About.tsx / Services.tsx */}
      <header className="hero hero--legal" id="home">
        <div className="hero__background" aria-hidden />
        <div className="hero__topbar">
          <div className="brand">
            <img
              src={mainLogo}
              alt="SIFA Advisory"
              className="brand__logo"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
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

        {/* Hero title area */}
        <div className="legal-hero__content">
          <h1 className="legal-hero__title">{t(titleKey)}</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="legal-main">
        <div className="legal-main__container">
          <div className="legal-main__content">
            {children}
          </div>
        </div>
      </main>

      <Footer showContactInfo={true} />
    </div>
  );
}

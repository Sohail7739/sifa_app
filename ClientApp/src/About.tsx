import type { CSSProperties } from 'react';
// import { Link } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import './App.css';
import Footer from './components/Footer';
import aboutHeroImage from './assets/aboutpage_hero.png';
import blocksImage from './assets/blocks.png';
import triangleImage from './assets/insight_page/triangle.png';
import missionImage from './assets/our-mission.jpg';
import visionImage from './assets/our-vision.jpg';
import promiseImage from './assets/our-promise.jpg';
import whoWeAreBallFlip1 from './assets/3D/boll_3_flip1.png';
import whoWeAreBallFlip2 from './assets/3D/boll_3_flip2.png';
import collaborationIcon from './assets/about_page_icons/collaboration_6823087.png';
import strategyIcon from './assets/about_page_icons/strategy_16687005.png';
import globalIcon from './assets/about_page_icons/global-network_15583134.png';
import teamIcon from './assets/about_page_icons/team_10870099.png';
import integrityIcon from './assets/about_page_icons/loyalty-program_12474332.png';
import mainLogo from './assets/main_logo.png';

import excellenceIcon from './assets/about_page_icons/puzzle_12506257.png';
import innovationIcon from './assets/about_page_icons/idea_2926156.png';

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

import { useState, useEffect, useRef } from 'react';

export default function About() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [whoWeAreBallFlipIndex, setWhoWeAreBallFlipIndex] = useState(0);
  const whoWeAreSectionRef = useRef<HTMLElement>(null);
  useTextAnimation();
  useInteractive();
  const aboutStyle: CSSVarProperties = {
    '--about-hero-bg': `url(${aboutHeroImage})`,
    '--blocks-image': `url(${blocksImage})`,
  };

  // Handle scroll-based who-we-are ball image changes
  useEffect(() => {
    const lastScrollYRef = { current: window.scrollY };
    const scrollThreshold = 50; // Rotate every 50px scrolled

    const handleScroll = () => {
      if (!whoWeAreSectionRef.current) return;

      const section = whoWeAreSectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
      if (isVisible) {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollYRef.current;
        
        if (Math.abs(scrollDelta) >= scrollThreshold) {
          // Rotate forward on scroll down, backward on scroll up
          if (scrollDelta > 0) {
            setWhoWeAreBallFlipIndex((prevIndex) => (prevIndex + 1) % 2);
          } else {
            setWhoWeAreBallFlipIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
          }
          lastScrollYRef.current = currentScrollY;
        }
      } else {
        // Reset to first image when section is out of view
        setWhoWeAreBallFlipIndex(0);
        lastScrollYRef.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="page">
      <header className="hero hero--about" id="home">
        <div className="hero__background" aria-hidden />
        <div className="hero__topbar">
          <div className="brand">
            <img src={mainLogo} alt="SIFA Advisory" className="brand__logo" loading="eager" fetchPriority="high" decoding="async" />
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
      </header>

      <section className="about-hero" style={aboutStyle}>
        <div className="about-hero__background" />
        <div className="about-hero__overlay" aria-hidden="true" />
        <div className="about-hero__content">
          <div className="about-hero__left animate-fade-in-up">
            <p className="about-hero__eyebrow text-motion text-motion-delay-1">{t('about.eyebrow')}</p>
            <h1 className="about-hero__title text-motion text-motion-delay-2">{t('about.hero.title')}</h1>
            <button className="btn btn--outline about-hero__cta text-motion text-motion-delay-3" type="button">
              {t('about.hero.button')}
            </button>
          </div>
          <div className="about-hero__right">
            <div className="about-hero__image-wrapper">
              <img src={blocksImage} alt="Geometric design elements" className="about-hero__building" loading="lazy" decoding="async" />
              <div className="about-hero__triangles" style={{ backgroundImage: `url(${triangleImage})` }} aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="who-we-are" ref={whoWeAreSectionRef}>
        <div className="who-we-are__header">
          <h2 className="who-we-are__title text-motion text-motion-delay-1">{t('about.whoWeAre.title')}</h2>
          <p className="who-we-are__description text-motion text-motion-delay-2">
            {t('about.whoWeAre.description')}
          </p>
        </div>
        <div className="who-we-are__grid">
          <article className="who-we-are__card text-motion-scale">
            <div className="who-we-are__card-image">
              <img src={missionImage} alt={t('about.whoWeAre.mission.title')} loading="lazy" decoding="async" />
              <div className="who-we-are__card-overlay">
                <h3 className="who-we-are__card-title text-motion text-motion-delay-1">{t('about.whoWeAre.mission.title')}</h3>
                <p className="who-we-are__card-text text-motion text-motion-delay-2">
                  {t('about.whoWeAre.mission.description')}
                </p>
              </div>
            </div>
          </article>
          <article className="who-we-are__card text-motion-scale">
            <div className="who-we-are__card-image">
              <img src={visionImage} alt={t('about.whoWeAre.vision.title')} loading="lazy" decoding="async" />
              <div className="who-we-are__card-overlay">
                <h3 className="who-we-are__card-title text-motion text-motion-delay-1">{t('about.whoWeAre.vision.title')}</h3>
                <p className="who-we-are__card-text text-motion text-motion-delay-2">
                  {t('about.whoWeAre.vision.description')}
                </p>
              </div>
            </div>
          </article>
          <article className="who-we-are__card text-motion-scale">
            <div className="who-we-are__card-image">
              <img src={promiseImage} alt={t('about.whoWeAre.promise.title')} loading="lazy" decoding="async" />
              <div className="who-we-are__card-overlay">
                <h3 className="who-we-are__card-title text-motion text-motion-delay-1">{t('about.whoWeAre.promise.title')}</h3>
                <p className="who-we-are__card-text text-motion text-motion-delay-2">
                  {t('about.whoWeAre.promise.description')}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div className="who-we-are__ball">
          <img 
            src={whoWeAreBallFlip1} 
            alt="" 
            className={`who-we-are__ball-image ${whoWeAreBallFlipIndex === 0 ? 'who-we-are__ball-image--active' : ''}`}
            aria-hidden="true"
          />
          <img 
            src={whoWeAreBallFlip2} 
            alt="" 
            className={`who-we-are__ball-image ${whoWeAreBallFlipIndex === 1 ? 'who-we-are__ball-image--active' : ''}`}
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="what-makes-us-different">
        <div className="what-makes-us-different__container">
          <div className="what-makes-us-different__column">
            <h2 className="what-makes-us-different__title text-motion text-motion-delay-1">{t('about.different.title')}</h2>
            <div className="what-makes-us-different__list">
              <div className="what-makes-us-different__item text-motion-left">
                <div className="what-makes-us-different__icon">
                  <img src={collaborationIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.different.collaboration.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.different.collaboration.description')}</p>
                </div>
              </div>
              <div className="what-makes-us-different__item text-motion-left">
                <div className="what-makes-us-different__icon">
                  <img src={strategyIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.different.bespoke.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.different.bespoke.description')}</p>
                </div>
              </div>
              <div className="what-makes-us-different__item text-motion-left">
                <div className="what-makes-us-different__icon">
                  <img src={globalIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.different.global.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.different.global.description')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="what-makes-us-different__divider" aria-hidden />
          <div className="what-makes-us-different__column">
            <h2 className="what-makes-us-different__title text-motion text-motion-delay-1">{t('about.values.title')}</h2>
            <div className="what-makes-us-different__list">
              <div className="what-makes-us-different__item text-motion-right">
                <div className="what-makes-us-different__icon">
                  <img src={teamIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.values.collaboration.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.values.collaboration.description')}</p>
                </div>
              </div>
              <div className="what-makes-us-different__item text-motion-right">
                <div className="what-makes-us-different__icon">
                  <img src={integrityIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.values.integrity.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.values.integrity.description')}</p>
                </div>
              </div>
              <div className="what-makes-us-different__item text-motion-right">
                <div className="what-makes-us-different__icon">
                  <img src={excellenceIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.values.excellence.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.values.excellence.description')}</p>
                </div>
              </div>
              <div className="what-makes-us-different__item text-motion-right">
                <div className="what-makes-us-different__icon">
                  <img src={innovationIcon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="what-makes-us-different__content">
                  <h3 className="what-makes-us-different__item-title text-motion text-motion-delay-1">{t('about.values.innovation.title')}</h3>
                  <p className="what-makes-us-different__item-text text-motion text-motion-delay-2">{t('about.values.innovation.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer style={aboutStyle} showContactInfo={true} />
    </div>
  );
}


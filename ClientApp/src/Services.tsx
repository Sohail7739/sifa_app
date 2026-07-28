import { useState, useEffect, useRef } from 'react';
import React from 'react';
import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import './App.css';
import './ServicesCarousel.css';
import './Pricing.css';
import Footer from './components/Footer';
import heroBackground from './assets/Rectangle_4525.png';
import buildingImage from './assets/service_page/building.png';
import triangleImage from './assets/service_page/traingle.png';
import brandingMarketingImage from './assets/service_page/sf_mission.png';
import transactionServicesImage from './assets/service_page/Transaction_services.png';
import riskAdvisoryImage from './assets/service_page/Risk_Advisory.png';
import peopleOrganizationImage from './assets/service_page/people_organization.png';
import informationTechnologyImage from './assets/service_page/Information-Technology.jpg';
import eventsGiftsImage from './assets/service_page/Merges_acquisition.png';
import mediaProductionImage from './assets/service_page/pexels-vito-gorican-10954628-6253568.jpg';
import financialServicesImage from './assets/service_page/financial/enbd_salary_transfer_new_en.jpg';
import servicesContentBallFlip1 from './assets/3D/boll_2_flip1.png';
import servicesContentBallFlip2 from './assets/3D/boll_2_flip2.png';
// import arrowIcon from './assets/service_page/arrow.png';
// import pillsArrowIcon from './assets/pills_arrow.png';
import getInTouchBuilding from './assets/service_page/getintouch_building.png';
import getTouchBackground from './assets/service_page/gettouh.png';
import mainLogo from './assets/main_logo.png';

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export default function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Services data
  const servicesData = [
    {
      id: 'financial-services',
      name: t('services.cards.financial.name'),
      description: t('services.cards.financial.description'),
      image: financialServicesImage,
      link: '/services/financial-services'
    },
    {
      id: 'transaction-services',
      name: t('services.cards.transaction.name'),
      description: t('services.cards.transaction.description'),
      image: transactionServicesImage,
      link: '/services/transaction-services'
    },
    {
      id: 'risk-advisory',
      name: t('services.cards.risk.name'),
      description: t('services.cards.risk.description'),
      image: riskAdvisoryImage,
      link: '/services/risk-advisory'
    },
    {
      id: 'people-organization',
      name: t('services.cards.people.name'),
      description: t('services.cards.people.description'),
      image: peopleOrganizationImage,
      link: '/services/people-organization'
    },
    {
      id: 'it-consulting',
      name: t('services.cards.it.name'),
      description: t('services.cards.it.description'),
      image: informationTechnologyImage,
      link: '/services/information-technology'
    },
    {
      id: 'branding-marketing',
      name: t('services.cards.branding.name'),
      description: t('services.cards.branding.description'),
      image: brandingMarketingImage,
      link: '/services/branding-marketing'
    },
    {
      id: 'events-gifts',
      name: t('services.cards.events.name'),
      description: t('services.cards.events.description'),
      image: eventsGiftsImage,
      link: '/services/events-gifts'
    },
    {
      id: 'media-production',
      name: t('services.cards.media.name'),
      description: t('services.cards.media.description'),
      image: mediaProductionImage,
      link: '/services/media-production'
    }
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesContentBallFlipIndex, setServicesContentBallFlipIndex] = useState(0);
  const servicesContentSectionRef = useRef<HTMLElement>(null);
  useTextAnimation();
  useInteractive();
  
  const servicesStyle: CSSVarProperties = {
    '--services-hero-bg': `url(${heroBackground})`,
    '--services-cta-bg': `url(${getTouchBackground})`,
  };

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Services carousel arrow navigation
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 500;
    const newScrollLeft =
      direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
    carouselRef.current.scrollTo({
      left: Math.max(0, newScrollLeft),
      behavior: 'smooth',
    });
  };

  // Handle scroll-based services content ball image changes
  useEffect(() => {
    const lastScrollYRef = { current: window.scrollY };
    const scrollThreshold = 50; // Rotate every 50px scrolled

    const handleScroll = () => {
      if (!servicesContentSectionRef.current) return;

      const section = servicesContentSectionRef.current;
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
            setServicesContentBallFlipIndex((prevIndex) => (prevIndex + 1) % 2);
          } else {
            setServicesContentBallFlipIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
          }
          lastScrollYRef.current = currentScrollY;
        }
      } else {
        // Reset to first image when section is out of view
        setServicesContentBallFlipIndex(0);
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
      <header className="hero hero--services" id="home">
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

      <section className="services-hero" style={servicesStyle}>
        <div className="services-hero__background" />
        <div className="services-hero__overlay" aria-hidden />
        <div className="services-hero__content">
          <div className="services-hero__left animate-fade-in-up">
            <p className="services-hero__eyebrow text-motion text-motion-delay-1">{t('services.eyebrow')}</p>
            <h1 className="services-hero__title">
              <span className="services-hero__title-line text-motion text-motion-delay-2">{t('services.hero.titleLine1')}</span>
              <span className="services-hero__title-line text-motion text-motion-delay-3">{t('services.hero.titleLine2')}</span>
            </h1>
            <p className="services-hero__description text-motion text-motion-delay-4">
              {t('services.hero.description')}
            </p>
          </div>
          <div className="services-hero__right">
            <div className="services-hero__image-wrapper">
              <img src={buildingImage} alt="Modern building" className="services-hero__building" loading="lazy" decoding="async" />
              <div className="services-hero__triangles" style={{ backgroundImage: `url(${triangleImage})` }} aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="services-cards" id="services" ref={servicesContentSectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="services-cards__container">
          <div className="services-cards__header">
            <h2 className="services-cards__title text-motion text-motion-delay-1">{t('services.title')}</h2>
          </div>
          
          <div className="services-content__ball">
            <img 
              src={servicesContentBallFlip1} 
              alt="" 
              className={`services-content__ball-image ${servicesContentBallFlipIndex === 0 ? 'services-content__ball-image--active' : ''}`}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <img 
              src={servicesContentBallFlip2} 
              alt="" 
              className={`services-content__ball-image ${servicesContentBallFlipIndex === 1 ? 'services-content__ball-image--active' : ''}`}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="services-carousel__wrapper">
            <button
              className="services-carousel__arrow services-carousel__arrow--prev"
              type="button"
              aria-label="Previous services"
              onClick={() => scrollCarousel('left')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="services-carousel__arrow services-carousel__arrow--next"
              type="button"
              aria-label="Next services"
              onClick={() => scrollCarousel('right')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div 
              className="services-carousel"
              ref={carouselRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
            <div className="services-carousel__track">
              {servicesData.map((service, index) => (
                <React.Fragment key={service.id}>
                  <div 
                    className={`service-card-featured text-motion text-motion-delay-${index + 1}`}
                    style={{backgroundImage: `url(${service.image})`}}
                  >
                    <div className="service-card-featured__content">
                      <h3 className="service-card-featured__title">{service.name}</h3>
                      <p className="service-card-featured__description">
                        {service.description}
                      </p>
                      <Link to={service.link} className="service-card-featured__button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Show DRAG button after every card - positioned in track, not in card */}
                  {index < servicesData.length - 1 && (
                    <div className="drag-indicator-wrapper">
                      <div className="drag-indicator">
                        <div className="drag-indicator__content">
                          <svg className="drag-indicator__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6"/>
                          </svg>
                          <span className="drag-indicator__text">DRAG</span>
                          <svg className="drag-indicator__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="pricing-section__container">
          <h2 className="pricing-section__title text-motion">{t('pricing.title')}</h2>
          <div className="pricing-section__grid">
            {['marketing', 'financial', 'startup'].map((key, index) => (
              <div key={key} className={`pricing-card text-motion text-motion-delay-${index + 1}`}>
                <div className="pricing-card__content">
                  <h3 className="pricing-card__title">{t(`pricing.services.${key}.name`)}</h3>
                  <p className="pricing-card__description">{t(`pricing.services.${key}.description`)}</p>
                </div>
                <div className="pricing-card__price">
                  <span>{t(`pricing.services.${key}.price`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta" style={servicesStyle}>
        <div className="services-cta__container">
          <div className="services-cta__content">
            <p className="services-cta__question text-motion text-motion-delay-1">{t('services.cta.question')}</p>
            <h2 className="services-cta__title text-motion text-motion-delay-2">{t('services.cta.title')}</h2>
            <p className="services-cta__description text-motion text-motion-delay-3">{t('services.cta.description')}</p>
            <button 
              className="services-cta__button text-motion text-motion-delay-4" 
              type="button"
              onClick={() => {
                navigate('/contact');
                // Scroll to form after navigation
                setTimeout(() => {
                  const formElement = document.querySelector('.contact-main__form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
            >
              {t('services.cta.button')}
            </button>
          </div>
          <div className="services-cta__image">
            <img src={getInTouchBuilding} alt="Modern building architecture" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <Footer style={servicesStyle} showContactInfo={true} />
    </div>
  );
}


import { useState, useEffect, useRef } from 'react';
import React from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import './App.css';
import './ServicesCarousel.css';
import Footer from './components/Footer';
import homeHeroGif from './assets/homeheroimg.gif';
import hero3Video from './assets/hero3.mp4';
import heroOverlayImage from './assets/1.png';
import rectangleBackground from './assets/Rectangle_4525.png';
import contactBackground from './assets/Rectangle21.png';
import trustedOverlay from './assets/overlay.png';
import trustedByLeader from './assets/trusted-by-leader.jpg';
import iconExpert from './assets/expert_that_diliverd.png';
import iconTailored from './assets/tailored_nottemp.png';
import iconGlobal from './assets/global_prospective.png';
import ballFlip1 from './assets/3D/boll_1_flip1.png';
import ballFlip2 from './assets/3D/boll_1_flip2.png';
import ballFlip3 from './assets/3D/boll_1_fip3.png';
import servicesBallFlip1 from './assets/3D/boll_3_flip1.png';
import servicesBallFlip2 from './assets/3D/boll_3_flip2.png';
import clientsBallFlip1 from './assets/3D/boll_4_flip1.png';
import clientsBallFlip2 from './assets/3D/boll_4_flip2.png';
import logoDynex from './assets/client_logos/dynex.png';
import logoAlwael from './assets/client_logos/alwael.png';
import logoGga from './assets/client_logos/gga.png';
import logoExact from './assets/client_logos/exat.png';
import logoWazen from './assets/client_logos/wazen.png';
import logoAlturki from './assets/client_logos/alturki.png';
import mainLogo from './assets/main_logo.png';
// import sifaMap from './assets/Contact_page/sifamap.png';
import brandingMarketingImage from './assets/service_page/sf_mission.png';
// import pillsArrowIcon from './assets/pills_arrow.png';
import transactionServicesImage from './assets/service_page/Transaction_services.png';
import riskAdvisoryImage from './assets/service_page/Risk_Advisory.png';
import peopleOrganizationImage from './assets/service_page/people_organization.png';
import informationTechnologyImage from './assets/service_page/Information-Technology.jpg';
import eventsGiftsImage from './assets/service_page/Merges_acquisition.png';
import mediaProductionImage from './assets/service_page/pexels-vito-gorican-10954628-6253568.jpg';
import financialServicesImage from './assets/service_page/financial/enbd_salary_transfer_new_en.jpg';

const clients = [
  { name: 'DYNEX', tagline: 'Dynamic and Excellence Arabia', logo: logoDynex },
  { name: 'ALWAEEL', tagline: 'الأوائل', logo: logoAlwael },
  { name: 'GGA', tagline: 'Gulf General Analytics', logo: logoGga },
  { name: 'EXACT', tagline: 'Technical Solutions', logo: logoExact },
  { name: 'WAZEN', tagline: 'وازن', logo: logoWazen },
  { name: 'ALTURKI', tagline: 'Alturki Group', logo: logoAlturki },
];

// WhySifa will be created dynamically using translations

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export default function App() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1); // Start with GIF slide (index 1)
  const [ballFlipIndex, setBallFlipIndex] = useState(0);
  const [servicesBallFlipIndex, setServicesBallFlipIndex] = useState(0);
  const [clientsBallFlipIndex, setClientsBallFlipIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const whySectionRef = useRef<HTMLElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const clientsSectionRef = useRef<HTMLElement>(null);

  // Gallery State
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  useTextAnimation();
  useInteractive();

  // Drag functionality for Services Gallery
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
    const scrollAmount = 500; // Scroll by ~1 card width
    const newScrollLeft =
      direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
    carouselRef.current.scrollTo({
      left: Math.max(0, newScrollLeft),
      behavior: 'smooth',
    });
  };

  // Services data with translations
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

  // Create whySifa dynamically using translations
  const whySifa = [
    {
      title: t('home.why.expertise.title'),
      description: t('home.why.expertise.description'),
      icon: iconExpert,
    },
    {
      title: t('home.why.tailored.title'),
      description: t('home.why.tailored.description'),
      icon: iconTailored,
    },
    {
      title: t('home.why.global.title'),
      description: t('home.why.global.description'),
      icon: iconGlobal,
    },
  ];

  // Hero slider slides with translations
  const heroSlides = [
    {
      // Slide 1: Static background image with 1.png overlay and button
      backgroundImage: rectangleBackground,
      additionalImage: heroOverlayImage,
      title: t('home.hero.title1'),
      description: t('home.hero.description1'),
      buttonText: t('home.hero.button1'),
      buttonLink: '/services',
      isVideo: false,
    },
    {
      // Slide 2: Video/GIF background without 1.png overlay
      backgroundImage: homeHeroGif,
      additionalImage: null,
      title: null,
      description: null,
      buttonText: null,
      buttonLink: null,
      isVideo: false,
    },
    {
      // Slide 3: Video background with showreel content
      backgroundImage: hero3Video,
      additionalImage: null,
      title: t('home.hero.showreel.title'),
      description: t('home.hero.showreel.description'),
      buttonText: t('home.hero.showreel.button'),
      buttonLink: null,
      isVideo: true,
      onButtonClick: () => {
        console.log('Watch Now button clicked!');
        setShowVideoModal(true);
      },
    },
  ];

  const currentSlideData = heroSlides[currentSlide];
  const heroStyle: CSSVarProperties = {
    '--hero-photo': `url(${currentSlideData.backgroundImage})`,
    '--hero-accent': 'none',
  };

  // Auto-play slider disabled - slides change only manually via navigation dots
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval);
  // }, [heroSlides.length]);
  const contactStyle: CSSVarProperties = {
    '--contact-bg': `url(${contactBackground})`,
  };
  const servicesStyle: CSSVarProperties = {};
  const trustedStyle: CSSVarProperties = {
    '--trusted-bg': `url(${trustedByLeader})`,
    '--trusted-overlay': `url(${trustedOverlay})`,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-fade-up, .scroll-animate-fade-left, .scroll-animate-fade-right');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Handle escape key for video modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false);
      }
    };

    if (showVideoModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showVideoModal]);

  // Reset video when slide changes
  useEffect(() => {
    setShowVideoModal(false);
  }, [currentSlide]);

  // Preload slide 3 video as soon as page loads for instant playback
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = hero3Video;
    link.type = 'video/mp4';
    document.head.appendChild(link);
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Handle scroll-based ball image changes for Why SIFA section
  useEffect(() => {
    const lastScrollYRef = { current: window.scrollY };
    const scrollThreshold = 50; // Rotate every 50px scrolled

    const handleScroll = () => {
      if (!whySectionRef.current) return;

      const section = whySectionRef.current;
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
            setBallFlipIndex((prevIndex) => (prevIndex + 1) % 3);
          } else {
            setBallFlipIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
          }
          lastScrollYRef.current = currentScrollY;
        }
      } else {
        // Reset to first image when section is out of view
        setBallFlipIndex(0);
        lastScrollYRef.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll-based services ball image changes
  useEffect(() => {
    const lastScrollYRef = { current: window.scrollY };
    const scrollThreshold = 50; // Rotate every 50px scrolled

    const handleScroll = () => {
      if (!servicesSectionRef.current) return;

      const section = servicesSectionRef.current;
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
            setServicesBallFlipIndex((prevIndex) => (prevIndex + 1) % 2);
          } else {
            setServicesBallFlipIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
          }
          lastScrollYRef.current = currentScrollY;
        }
      } else {
        // Reset to first image when section is out of view
        setServicesBallFlipIndex(0);
        lastScrollYRef.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll-based clients ball image changes
  useEffect(() => {
    const lastScrollYRef = { current: window.scrollY };
    const scrollThreshold = 50; // Rotate every 50px scrolled

    const handleScroll = () => {
      if (!clientsSectionRef.current) return;

      const section = clientsSectionRef.current;
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
            setClientsBallFlipIndex((prevIndex) => (prevIndex + 1) % 2);
          } else {
            setClientsBallFlipIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
          }
          lastScrollYRef.current = currentScrollY;
        }
      } else {
        // Reset to first image when section is out of view
        setClientsBallFlipIndex(0);
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
      {/* Preload slide 3 video for instant playback when user navigates to it */}
      <video
        preload="auto"
        muted
        playsInline
        style={{
          position: 'absolute',
          left: '-9999px',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
        aria-hidden="true"
      >
        <source src={hero3Video} type="video/mp4" />
      </video>
      <header
        className={`hero hero--slide-${currentSlide}`}
        id="home"
        style={heroStyle}
      >
        {currentSlideData.isVideo ? (
          <video
            className="hero__video-background"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={currentSlideData.backgroundImage} type="video/mp4" />
          </video>
        ) : (
          <div className="hero__background" aria-hidden />
        )}
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
        {/* Slider Navigation Arrows - Middle of Hero */}
        <button
          className="hero__slider-arrow hero__slider-arrow--prev"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="hero__slider-arrow hero__slider-arrow--next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          aria-label="Next slide"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="hero__body">
          <div className="hero__content">
            <div className="hero__left animate-fade-in-up">
              {currentSlideData.title && (
                <h1 className="hero__title">{currentSlideData.title}</h1>
              )}
              {currentSlideData.description && (
                <p className="hero__description">{currentSlideData.description}</p>
              )}
              {currentSlideData.buttonText && (
                currentSlideData.buttonLink ? (
                  <Link to={currentSlideData.buttonLink} className="btn btn--accent btn--rounded">
                    {currentSlideData.buttonText}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={currentSlideData.onButtonClick}
                    className="btn btn--accent btn--rounded"
                  >
                    {currentSlideData.buttonText}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="hero__triangles" aria-hidden>
            {currentSlideData.additionalImage && (
              <img src={currentSlideData.additionalImage} alt="" className="hero__additional-image" loading="lazy" decoding="async" />
            )}
          </div>
          {/* Slider Navigation Dots - Bottom */}
          <div className="hero__slider-controls">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero__slider-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </header>

      <section className="why scroll-animate-fade-up" id="about" ref={whySectionRef}>
        <div className="why__header">
          <h2 className="text-motion text-motion-delay-1">{t('home.why.title')}</h2>
          <p className="text-motion text-motion-delay-2">{t('home.why.description')}</p>
        </div>
        <div className="why__grid">
          {whySifa.map((item, index) => (
            <article className="why-card scroll-animate-fade-up text-motion-scale" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="why-card__icon" aria-hidden>
                {item.icon && <img src={item.icon} alt="" loading="lazy" decoding="async" />}
              </div>
              <h3 className="text-motion text-motion-delay-1">{item.title}</h3>
              <p className="text-motion text-motion-delay-2">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="why__ball">
          <img
            src={ballFlip1}
            alt=""
            className={`why__ball-image ${ballFlipIndex === 0 ? 'why__ball-image--active' : ''}`}
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            src={ballFlip2}
            alt=""
            className={`why__ball-image ${ballFlipIndex === 1 ? 'why__ball-image--active' : ''}`}
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            src={ballFlip3}
            alt=""
            className={`why__ball-image ${ballFlipIndex === 2 ? 'why__ball-image--active' : ''}`}
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="trusted" style={trustedStyle}>
        <div className="trusted__copy">
          <h3 className="text-motion text-motion-delay-1">{t('home.trusted.title')}</h3>
          <p className="text-motion text-motion-delay-2" dangerouslySetInnerHTML={{ __html: t('home.trusted.description') }} />
        </div>
        <a className="btn btn--outline trusted__cta text-motion text-motion-delay-3" href="#about">
          {t('home.trusted.button')}
        </a>
      </section>

      <section className="services" id="services" style={servicesStyle} ref={servicesSectionRef}>
        <div className="services__intro">
          <h2 className="services__title text-motion text-motion-delay-1">{t('home.services.title')}</h2>
          <p className="services__subtitle text-motion text-motion-delay-2">{t('home.services.subtitle')}</p>
          <p className="services__description text-motion text-motion-delay-3">{t('home.services.description')}</p>
        </div>
        <div className="services-cards__container">
          <div className="services-content__ball">
            <img 
              src={servicesBallFlip1} 
              alt="" 
              className={`services-content__ball-image ${servicesBallFlipIndex === 0 ? 'services-content__ball-image--active' : ''}`}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <img 
              src={servicesBallFlip2} 
              alt="" 
              className={`services-content__ball-image ${servicesBallFlipIndex === 1 ? 'services-content__ball-image--active' : ''}`}
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

      <section className="clients" ref={clientsSectionRef}>
        <h2 className="text-motion text-motion-delay-1">{t('home.clients.title')}</h2>
        <p className="clients__subhead text-motion text-motion-delay-2">{t('home.clients.subhead')}</p>
        <div className="clients__logos">
          <div className="clients__logos-track">
            {/* Create multiple sets for seamless infinite scrolling */}
            {Array.from({ length: 4 }, (_, setIndex) =>
              clients.map((client, clientIndex) => (
                <div className="clients__logo text-motion-scale" key={`set-${setIndex}-${client.name}-${clientIndex}`}>
                  <img src={client.logo} alt={client.name} loading="lazy" decoding="async" />
                </div>
              ))
            )}
          </div>
        </div>
        <p className="clients__footnote text-motion text-motion-delay-3">{t('home.clients.footnote')}</p>
        <div className="clients__ball">
          <img
            src={clientsBallFlip1}
            alt=""
            className={`clients__ball-image ${clientsBallFlipIndex === 0 ? 'clients__ball-image--active' : ''}`}
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            src={clientsBallFlip2}
            alt=""
            className={`clients__ball-image ${clientsBallFlipIndex === 1 ? 'clients__ball-image--active' : ''}`}
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="contact" id="contact" style={contactStyle}>
        <div className="contact__info">
          <p className="eyebrow text-motion text-motion-delay-1">{t('home.contact.eyebrow')}</p>
          <h2 className="text-motion text-motion-delay-2">{t('home.contact.title')}</h2>
          <p className="text-motion text-motion-delay-3">{t('home.contact.description')}</p>
          <ul>
            <li>
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.2l8 5 8-5V8l-8 5-8-5z" />
                </svg>
              </span>
              <div>
                <strong>{t('home.contact.email')}</strong>
                <p>{t('common.email')}</p>
              </div>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2a7 7 0 0 0-7 7c0 4.6 7 13 7 13s7-8.4 7-13a7 7 0 0 0-7-7zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2z" />
                </svg>
              </span>
              <div>
                <strong>{t('home.contact.officeAddress')}</strong>
                <p>{t('common.officeAddress')}</p>
              </div>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8.4 3h-2a1 1 0 0 0-1 1c0 9 7.6 16.6 16.6 16.6a1 1 0 0 0 1-1v-2c0-.6-.4-1-1-1-1.7 0-3.3-.3-4.8-1a1 1 0 0 0-1 .1l-2.1 1.3a15.4 15.4 0 0 1-6.2-6.2l1.3-2.1a1 1 0 0 0 .1-1c-.7-1.5-1-3.1-1-4.8 0-.6-.4-1-1-1z" />
                </svg>
              </span>
              <div>
                <strong>{t('home.contact.phone')}</strong>
                <p>{t('common.phone2')}</p>
              </div>
            </li>
          </ul>
        </div>
        <form className="contact__form">
          <div className="contact__form-copy">
            <h3 className="text-motion text-motion-delay-1">{t('home.contact.formTitle')}</h3>
            <p className="text-motion text-motion-delay-2">{t('home.contact.formDescription')}</p>
          </div>
          <label>
            <span className="sr-only">{t('home.contact.name')}</span>
            <input type="text" placeholder={t('home.contact.name')} />
          </label>
          <label>
            <span className="sr-only">{t('home.contact.email')}</span>
            <input type="email" placeholder={t('home.contact.emailPlaceholder')} />
          </label>
          <label>
            <span className="sr-only">{t('home.contact.message')}</span>
            <textarea rows={5} placeholder={t('home.contact.message')} />
          </label>
          <Link
            to="/contact#contact-form"
            className="btn btn--accent"
          >
            {t('home.contact.submit')}
          </Link>
        </form>
      </section>

      <Footer showContactInfo={false} />

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="video-modal"
          onClick={() => setShowVideoModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div className="video-modal__backdrop" />
          <div
            className="video-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal__close"
              onClick={() => setShowVideoModal(false)}
              aria-label="Close video"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="video-modal__wrapper">
              <h2 id="video-modal-title" className="sr-only">SIFA's 2025 Showreel</h2>
              <div className="video-modal__header">
                <h3>{t('home.hero.showreel.title')}</h3>
              </div>
              <div className="video-modal__video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/MTbUohEeSfw?si=OCDUids2MsdnvraS&autoplay=1&rel=0&modestbranding=1&showinfo=0"
                  title="SIFA's 2025 Showreel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




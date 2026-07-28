import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import './App.css';
import Footer from './components/Footer';
import heroBackground from './assets/service_page/herobackground.png';
import buildingImage from './assets/service_page/building.png';
import triangleImage from './assets/service_page/traingle.png';
import brandingMarketingImage from './assets/service_page/sf_mission.png';
import transactionServicesImage from './assets/service_page/Transaction_services.png';
import riskAdvisoryImage from './assets/service_page/Risk_Advisory.png';
import peopleOrganizationImage from './assets/service_page/people_organization.png';
import informationTechnologyImage from './assets/service_page/Information-Technology.jpg';
import eventsGiftsImage from './assets/service_page/Merges_acquisition.png';
import mediaProductionImage from './assets/service_page/pexels-vito-gorican-10954628-6253568.jpg';

import getInTouchBuilding from './assets/service_page/getintouch_building.png';
import getTouchBackground from './assets/service_page/gettouh.png';
import mainLogo from './assets/main_logo.png';
import serviceSingle2 from './assets/client_logos/detailsimg/service-single2.jpg';
import serviceSingle3 from './assets/client_logos/detailsimg/service-single3.jpg';
import serviceSingle4 from './assets/client_logos/detailsimg/service-single4.jpg';
import transService1 from './assets/client_logos/detailsimg/transaction_services (1).jpg';
import transService2 from './assets/client_logos/detailsimg/transaction_services (2).jpg';
import transService3 from './assets/client_logos/detailsimg/transaction_services (3).jpg';
import transService4 from './assets/client_logos/detailsimg/transaction_services (4).jpg';
import brandingImg1 from './assets/client_logos/detailsimg/brandingmarketing/brandingmarketing.jpg';
import brandingImg2 from './assets/client_logos/detailsimg/brandingmarketing/arab.webp';
import brandingImg3 from './assets/client_logos/detailsimg/brandingmarketing/brandingmarketing3.jpg';
import brandingImg4 from './assets/client_logos/detailsimg/brandingmarketing/marketing-saudi-arabia-1080x675.jpg';
import riskImg1 from './assets/client_logos/detailsimg/riskadvisery/riskandadvisery1.webp';
import riskImg2 from './assets/client_logos/detailsimg/riskadvisery/riskandadvisery2.webp';
import riskImg3 from './assets/client_logos/detailsimg/riskadvisery/riskandadvisery3.webp';
import riskImg4 from './assets/client_logos/detailsimg/riskadvisery/riskandadvisery4.webp';
import peopleImg1 from './assets/client_logos/detailsimg/poepleandorganization/peopleandorganization1.jpg';
import peopleImg2 from './assets/client_logos/detailsimg/poepleandorganization/peopleandorganization2.jpg';
import peopleImg3 from './assets/client_logos/detailsimg/poepleandorganization/peopleandorganization3.jpg';
import peopleImg4 from './assets/client_logos/detailsimg/poepleandorganization/peopleandorganization4.jpg';
import itImg1 from './assets/client_logos/detailsimg/itconsulting/itconsulting1.webp';
import itImg2 from './assets/client_logos/detailsimg/itconsulting/itconsulting2.jpg';
import itImg3 from './assets/client_logos/detailsimg/itconsulting/itconsulting3.jpg';
import itImg4 from './assets/client_logos/detailsimg/itconsulting/itconsulting4.jpg';
import eventImg1 from './assets/client_logos/detailsimg/eventandgift/eventandgift1.png';
import eventImg2 from './assets/client_logos/detailsimg/eventandgift/eventandgift2.jpg';
import eventImg3 from './assets/client_logos/detailsimg/eventandgift/eventandgift3.jpg';
import eventImg4 from './assets/client_logos/detailsimg/eventandgift/eventandgift4.jpg';
import mediaImg1 from './assets/client_logos/detailsimg/mediaphoto/mediaphoto1.png';
import mediaImg2 from './assets/client_logos/detailsimg/mediaphoto/mediaphoto2.png';
import mediaImg3 from './assets/client_logos/detailsimg/mediaphoto/mediaphoto3.png';
import mediaImg4 from './assets/client_logos/detailsimg/mediaphoto/mediaphoto4.jpeg';
import financialImg2 from './assets/service_page/financial/Financial-Services.webp';
import financialImg3 from './assets/service_page/financial/components-of-financial-services-medium.jpg';
import financialMainImg from './assets/service_page/financial/enbd_salary_transfer_new_en.jpg';
import financialVideoImg from './assets/service_page/financial/main.jpeg';
import financialBenefitsImg from './assets/service_page/financial/finan2.jpeg';
import './ServiceDetail.css';

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export default function ServiceDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAcc, setActiveAcc] = useState<number | null>(0);
  const servicesContentSectionRef = useRef<HTMLElement>(null);
  useTextAnimation();
  useInteractive();

  // Services data mapping (moved up for scope availability)
  const servicesMap: Record<string, {
    id: string;
    nameKey: string;
    image: string;
  }> = {
    'branding-marketing': {
      id: 'branding',
      nameKey: 'services.services.branding.name',
      image: brandingMarketingImage,
    },
    'transaction-services': {
      id: 'transaction',
      nameKey: 'services.services.transaction.name',
      image: transactionServicesImage,
    },
    'risk-advisory': {
      id: 'risk',
      nameKey: 'services.services.risk.name',
      image: riskAdvisoryImage,
    },
    'people-organization': {
      id: 'people',
      nameKey: 'services.services.people.name',
      image: peopleOrganizationImage,
    },
    'information-technology': {
      id: 'it',
      nameKey: 'services.services.it.name',
      image: informationTechnologyImage,
    },
    'financial-services': {
      id: 'financial',
      nameKey: 'services.services.financial.name',
      image: financialMainImg, // Using enbd_salary_transfer_new_en.jpg as the hero image
    },
    'events-gifts': {
      id: 'eventsGifts',
      nameKey: 'services.services.eventsGifts.name',
      image: eventsGiftsImage,
    },
    'media-production': {
      id: 'mediaProduction',
      nameKey: 'services.services.mediaProduction.name',
      image: mediaProductionImage,
    },
  };


  const currentService = serviceId ? servicesMap[serviceId] : null;

  // Image Selection Logic
  let benefitsImg = serviceSingle2;
  let galleryImg1 = serviceSingle3;
  let galleryImg2 = serviceSingle4;
  let videoImg = serviceSingle2;

  if (currentService?.id === 'transaction') {
    benefitsImg = transService1;
    galleryImg1 = transService2;
    galleryImg2 = transService3;
    videoImg = transService4;
  } else if (currentService?.id === 'branding') {
    benefitsImg = brandingImg1;
    galleryImg1 = brandingImg2;
    galleryImg2 = brandingImg3;
    videoImg = brandingImg4;
  } else if (currentService?.id === 'risk') {
    benefitsImg = riskImg1;
    galleryImg1 = riskImg2;
    galleryImg2 = riskImg3;
    videoImg = riskImg4;
  } else if (currentService?.id === 'people') {
    benefitsImg = peopleImg1;
    galleryImg1 = peopleImg2;
    galleryImg2 = peopleImg3;
    videoImg = peopleImg4;
  } else if (currentService?.id === 'it') {
    benefitsImg = itImg1;
    galleryImg1 = itImg2;
    galleryImg2 = itImg3;
    videoImg = itImg4;
  } else if (currentService?.id === 'financial') {
    benefitsImg = financialBenefitsImg; // finan2.jpeg for benefits section
    galleryImg1 = financialImg2; // Financial-Services.webp for gallery
    galleryImg2 = financialImg3; // components-of-financial-services-medium.jpg for gallery
    videoImg = financialVideoImg; // main.jpeg for video section
  } else if (currentService?.id === 'eventsGifts') {
    benefitsImg = eventImg1;
    galleryImg1 = eventImg2;
    galleryImg2 = eventImg3;
    videoImg = eventImg4;
  } else if (currentService?.id === 'mediaProduction') {
    benefitsImg = mediaImg1;
    galleryImg1 = mediaImg2;
    galleryImg2 = mediaImg3;
    videoImg = mediaImg4;
  }

  // Fetch content from translation
  const rawContent = currentService ? t(`services.services.${currentService.id}`) : null;
  const content = (rawContent && typeof rawContent === 'object') ? rawContent : null;




  // Redirect to services overview if service not found
  useEffect(() => {
    if (!currentService && serviceId) {
      navigate('/services', { replace: true });
    }
  }, [currentService, serviceId, navigate]);

  if (!currentService) {
    return null;
  }

  // Fallback defaults if content is missing for a specific ID
  const displayTitle = content?.title || t(currentService.nameKey);
  const displayIntro = content?.intro || "Service details coming soon.";
  const displayBenefits = content?.benefits || ["Strategic planning", "Operational efficiency", "Growth focused"];
  const displayFeatures = content?.features || ["Comprehensive analysis", "Tailored solutions"];
  const displayFaq = content?.faq || [{ q: "Contact us for details", a: "Please reach out to our team." }];
  // Default process if missing in translation
  const defaultProcess = [
    { title: "Discovery", description: "We start by understanding your goals and challenges." },
    { title: "Strategy", description: "Developing a tailored roadmap for your success." },
    { title: "Execution", description: "Implementing solutions with precision and care." },
    { title: "Evaluation", description: "Reviewing results to ensure maximum impact." }
  ];
  const displayProcess = content?.process || defaultProcess;

  const servicesStyle: CSSVarProperties = {
    '--services-hero-bg': `url(${heroBackground})`,
    '--services-cta-bg': `url(${getTouchBackground})`,
  };

  // Handle scroll animations for layout elements
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


  return (
    <div className="page">
      <header className="hero hero--services" id="home">
        <div className="hero__background" aria-hidden />
        <div className="hero__topbar">
          <div className="brand">
            <Link to="/">
              <img src={mainLogo} alt="SIFA Advisory" className="brand__logo" loading="eager" fetchPriority="high" decoding="async" />
            </Link>
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
              <span className="services-hero__title-line text-motion text-motion-delay-2">{displayTitle}</span>
            </h1>
            <p className="services-hero__description text-motion text-motion-delay-3">
              {displayIntro}
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

      <section className="service-detail-section" id="services" ref={servicesContentSectionRef}>
        <div className="service-detail-container">

          {/* Main Hero Image for Detail */}
          <img
            src={currentService.image}
            alt={displayTitle}
            className="service-main-image text-motion-scale animated"
            loading="eager"
          />

          {/* Intro Text */}
          <h2 className="service-detail-title text-motion text-motion-delay-1 animated">{displayTitle}</h2>
          <p className="service-detail-text text-motion text-motion-delay-2 animated">
            {displayIntro}
          </p>

          {/* Subsections if any (e.g. Branding vs Marketing) */}
          {content?.sections?.map((section: any, idx: number) => (
            <div key={idx} className="service-subsection">
              <h3 className="service-subsection-title">{section.title}</h3>
              {section.content && <p className="service-detail-text">{section.content}</p>}
              {section.list && section.list.length > 0 && (
                <ul className="service-content-list" style={{ marginBottom: '2rem', paddingLeft: '1.5rem', color: '#0b2115' }}>
                  {section.list.map((item: any, i: number) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Benefits Section */}
          <div className="service-benefits">
            <div className="service-benefits__content">
              <h3>{content?.labels?.benefitsTitle || 'Benefits With Our Service'}</h3>
              <ul className="service-benefits__list">
                {displayBenefits.map((benefit: any, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="service-benefits__image">
              <img src={benefitsImg} alt="Benefits" loading="lazy" />
            </div>
          </div>

          {/* Gallery Side-by-Side */}
          <div className="service-gallery scroll-animate-fade-up">
            <img src={galleryImg1} alt="Collaboration" loading="lazy" />
            <img src={galleryImg2} alt="Meeting" loading="lazy" />
          </div>

          {/* Process Flow */}
          <div className="service-process">
            <div className="process-line scroll-animate"></div>
            <div className="process-steps">
              {displayProcess && displayProcess.map((step: any, index: number) => (
                <div 
                  className="process-step scroll-animate-fade-up" 
                  key={index}
                >
                  <span className="process-number">0{index + 1}</span>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="service-key-features scroll-animate-fade-up">
            <h3>{content?.labels?.featuresTitle || 'Key Features'}</h3>
            <ul className="service-benefits__list"> {/* Reusing list style for features */}
              {displayFeatures.map((feature: any, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Video Section */}
          <div className="service-video scroll-animate-fade-up">
            <img src={videoImg} alt="Service Intro Video" />
          </div>

          {/* FAQ Section */}
          <div className="service-faq scroll-animate-fade-up">
            <div className="faq-header">
              <span className="faq-eyebrow">{content?.labels?.faqEyebrow || 'FAQ___'}</span>
              <h2>{content?.labels?.faqTitle || 'Get Every Single Answer From Here'}</h2>
              <Link to="/contact" className="btn-see-all">
                {content?.labels?.seeAll || 'See ALL'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="faq-list">
              {displayFaq.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`faq-item ${activeAcc === i ? 'active' : ''}`}
                  onClick={() => setActiveAcc(activeAcc === i ? null : i)}
                >
                  <button className="faq-question">
                    {item.q}
                    <div className="faq-icon"></div>
                  </button>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
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

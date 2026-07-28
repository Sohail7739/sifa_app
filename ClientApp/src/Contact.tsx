import { useState, useEffect, useRef, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import emailjs from '@emailjs/browser';
import './App.css';
import heroBackgroundImg from './assets/Contact_page/herobackgroundimg.png';
import clockTower from './assets/Contact_page/clocktower.png';
import triangle from './assets/Contact_page/triangle.png';
import getInTouch from './assets/Contact_page/getintouch.png';
import sifaMap from './assets/Contact_page/sifamap.png';
import mainLogo from './assets/main_logo.png';

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

// EmailJS Configuration
// Service ID: service_sz2q267
// Template ID: template_g3isw7g
// Public Key: XI9UcIU6k1u9rPP-S
const EMAILJS_SERVICE_ID = 'service_sz2q267';
const EMAILJS_TEMPLATE_ID = 'template_g3isw7g';
const EMAILJS_PUBLIC_KEY = 'XI9UcIU6k1u9rPP-S';

export default function Contact() {
  const { t, language } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    services: [] as string[],
    challenges: '',
    contactDay: '',
  });
  useTextAnimation();
  useInteractive();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  const contactStyle: CSSVarProperties = {
    '--contact-hero-bg': `url(${heroBackgroundImg})`,
    '--contact-main-bg': `url(${heroBackgroundImg})`,
  };

  const scrollToForm = () => {
    const formElement = document.querySelector('.contact-main__form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Scroll to form if hash is present in URL
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const formElement = document.getElementById('contact-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const serviceOptions = useMemo(() => [
    { key: 'financial', label: t('contact.form.services.financial') },
    { key: 'transaction', label: t('contact.form.services.transaction') },
    { key: 'risk', label: t('contact.form.services.risk') },
    { key: 'people', label: t('contact.form.services.people') },
    { key: 'it', label: t('contact.form.services.it') },
    { key: 'branding', label: t('contact.form.services.branding') },
    { key: 'events', label: t('contact.form.services.events') },
    { key: 'media', label: t('contact.form.services.media') },
  ], [t, language]);

  const handleServiceToggle = (serviceKey: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceKey)
        ? prev.services.filter(s => s !== serviceKey)
        : [...prev.services, serviceKey],
    }));
  };

  const getSelectedServicesText = () => {
    if (formData.services.length === 0) {
      return t('contact.form.servicesPlaceholder');
    }
    if (formData.services.length === 1) {
      return t(`contact.form.services.${formData.services[0]}`);
    }
    
    const remainingCount = formData.services.length - 1;
    
    if (isMobile) {
      // On mobile, show shorter text to prevent overflow
      if (formData.services.length > 2) {
        return `${formData.services.length} services selected`;
      } else {
        const firstService = t(`contact.form.services.${formData.services[0]}`);
        // Truncate first service name if too long on mobile
        const maxLength = 18;
        const truncatedService = firstService.length > maxLength 
          ? firstService.substring(0, maxLength) + '...' 
          : firstService;
        return `${truncatedService} +${remainingCount}`;
      }
    } else {
      // On desktop, show full text
      const firstService = t(`contact.form.services.${formData.services[0]}`);
      return `${firstService} + ${remainingCount} more`;
    }
  };

  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!servicesDropdownOpen) {
      // Restore body scroll when dropdown is closed
      if (isMobile) {
        document.body.style.overflow = '';
      }
      return;
    }

    // Prevent body scroll when dropdown is open on mobile
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    // Use setTimeout to prevent immediate closing when opening
    let cleanup: (() => void) | null = null;
    const timeoutId = setTimeout(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
          setServicesDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });

      cleanup = () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) {
        cleanup();
      }
      if (isMobile) {
        document.body.style.overflow = '';
      }
    };
  }, [servicesDropdownOpen, isMobile]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate services selection
    if (formData.services.length === 0) {
      setServicesDropdownOpen(true);
      return;
    }

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || EMAILJS_SERVICE_ID.includes('YOUR_') ||
        !EMAILJS_TEMPLATE_ID || EMAILJS_TEMPLATE_ID.includes('YOUR_') || 
        !EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY.includes('YOUR_')) {
      setSubmitStatus('error');
      setSubmitMessage('Email service is not configured. Please contact the website administrator.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Prepare email template parameters
      // Sending all fields with multiple variable name variations
      const servicesText = formData.services.length > 0 
        ? formData.services.map(key => t(`contact.form.services.${key}`)).join(', ')
        : 'Not selected';
      
      const contactDayText = formData.contactDay 
        ? t(`contact.form.days.${formData.contactDay}`)
        : 'Not selected';

      const templateParams = {
        // Primary variable names (most common)
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        website: formData.website || 'Not provided',
        services: servicesText,
        challenges: formData.challenges,
        contact_day: contactDayText,
        message: formData.challenges,
        
        // Alternative variable names
        user_name: formData.name,
        name: formData.name,
        email: formData.email,
        user_email: formData.email,
        message_name: formData.name,
        reply_to: formData.email,
        phone_number: formData.phone,
        phone_number_text: formData.phone,
        business_website: formData.website || 'Not provided',
        website_url: formData.website || 'Not provided',
        selected_services: servicesText,
        services_list: servicesText,
        preferred_day: contactDayText,
        contact_preferred_day: contactDayText,
        best_day: contactDayText,
        message_text: formData.challenges,
        user_message: formData.challenges,
        form_message: formData.challenges,
        
        // Complete form data as formatted text (use this if template only has one field)
        form_data: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🌐 Website: ${formData.website || 'Not provided'}

🎯 Services Interested In:
${servicesText}

📅 Preferred Contact Day:
${contactDayText}

💬 Message/Challenges:
${formData.challenges}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from your website contact form.
        `.trim(),
        
        // HTML formatted version
        form_data_html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #117547; border-bottom: 2px solid #117547; padding-bottom: 10px;">New Contact Form Submission</h2>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>👤 Name:</strong> ${formData.name}</p>
    <p><strong>📧 Email:</strong> ${formData.email}</p>
    <p><strong>📱 Phone:</strong> ${formData.phone}</p>
    <p><strong>🌐 Website:</strong> ${formData.website || 'Not provided'}</p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>🎯 Services Interested In:</strong></p>
    <p>${servicesText}</p>
    
    <p><strong>📅 Preferred Contact Day:</strong></p>
    <p>${contactDayText}</p>
  </div>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>💬 Message/Challenges:</strong></p>
    <p style="white-space: pre-wrap;">${formData.challenges}</p>
  </div>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  <p style="color: #666; font-size: 12px;">This email was sent from your website contact form.</p>
</div>
        `.trim(),
      };

      // Debug logging
      console.log('Sending email with EmailJS...');
      console.log('Service ID:', EMAILJS_SERVICE_ID);
      console.log('Template ID:', EMAILJS_TEMPLATE_ID);
      console.log('Template Parameters:', templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Response:', response);

      // Success
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        website: '',
        services: [],
        challenges: '',
        contactDay: '',
      });

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 3000);
    } catch (error: any) {
      // Error handling with detailed logging
      console.error('EmailJS Error Details:', error);
      console.error('Error Status:', error?.status);
      console.error('Error Text:', error?.text);
      console.error('Error Response:', error?.response);
      
      let errorMessage = 'Sorry, there was an error sending your message. Please try again later or contact us directly.';
      
      // Provide more specific error messages
      if (error?.status === 400) {
        errorMessage = 'Invalid request. Please check your form data and try again.';
      } else if (error?.status === 401) {
        errorMessage = 'Authentication failed. Please check your EmailJS configuration.';
      } else if (error?.status === 403) {
        errorMessage = 'Gmail API permission denied. Please reconnect your Gmail account in EmailJS dashboard with proper permissions.';
      } else if (error?.status === 404) {
        errorMessage = 'Service or template not found. Please verify your Service ID and Template ID.';
      } else if (error?.text) {
        // Try to extract more specific error from EmailJS response
        if (error.text.includes('insufficient authentication scopes')) {
          errorMessage = 'Gmail authentication error: Please reconnect your Gmail account in EmailJS dashboard and grant "Send email on your behalf" permission.';
        } else if (error.text.includes('Invalid template')) {
          errorMessage = 'Email template error. Please check your template configuration in EmailJS dashboard.';
        } else {
          errorMessage = `Error: ${error.text}`;
        }
      }
      
      setSubmitStatus('error');
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <header className="hero hero--contact" id="home">
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

      <section className="contact-hero" style={contactStyle}>
        <div className="contact-hero__background" />
        <div className="contact-hero__overlay" aria-hidden />
        <div className="contact-hero__content">
          <div className="contact-hero__left animate-fade-in-up">
            <p className="contact-hero__eyebrow text-motion text-motion-delay-1">{t('contact.eyebrow')}</p>
            <h1 className="contact-hero__title text-motion text-motion-delay-2">{t('contact.hero.title')}</h1>
            <p className="contact-hero__description text-motion text-motion-delay-3">
              {t('contact.hero.description')}
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="btn btn--contact-hero text-motion text-motion-delay-4"
            >
              {t('contact.hero.button')}
            </button>
          </div>
          <div className="contact-hero__right">
            <div className="contact-hero__image-wrapper">
              <img src={clockTower} alt={t('contact.images.clockTower')} className="contact-hero__tower" loading="lazy" decoding="async" />
              <div className="contact-hero__triangles" style={{ backgroundImage: `url(${triangle})` }} aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main" style={contactStyle}>
        <div className="contact-main__container">
          <div className="contact-main__left">
            <div className="contact-main__image">
              <img src={getInTouch} alt={t('contact.images.locationMap')} loading="lazy" decoding="async" />
            </div>
            <ul className="contact-main__list">
              <li className="contact-main__item text-motion-left">
                <span className="contact-main__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <strong className="text-motion text-motion-delay-1">{t('contact.info.officeAddress')}</strong>
                  <p className="text-motion text-motion-delay-2">{t('common.officeAddress')}</p>
                </div>
              </li>
              <li className="contact-main__item text-motion-left">
                <span className="contact-main__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <strong className="text-motion text-motion-delay-1">{t('contact.info.email')}</strong>
                  <p className="text-motion text-motion-delay-2">{t('common.email')}</p>
                </div>
              </li>
              <li className="contact-main__item text-motion-left">
                <span className="contact-main__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <strong className="text-motion text-motion-delay-1">{t('contact.info.phone')}</strong>
                  <p className="text-motion text-motion-delay-2">{t('common.phone2')}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="contact-main__right">
            <form id="contact-form" className="contact-main__form" onSubmit={handleSubmit}>
              <div className="contact-main__form-copy">
                <h3 className="text-motion text-motion-delay-1">{t('contact.form.title')}</h3>
                <p className="text-motion text-motion-delay-2">{t('contact.form.description')}</p>
              </div>
              <label>
                <span className="sr-only">{t('contact.form.name')}</span>
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <span className="sr-only">{t('contact.form.phone')}</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.form.phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <span className="sr-only">{t('contact.form.email')}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <span className="sr-only">{t('contact.form.website')}</span>
                <input
                  type="url"
                  name="website"
                  placeholder={t('contact.form.website')}
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <span>{t('contact.form.services')}</span>
                <div className="contact-main__form-multiselect" ref={servicesDropdownRef}>
                  <button
                    type="button"
                    className={`contact-main__form-multiselect-toggle ${servicesDropdownOpen ? 'open' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setServicesDropdownOpen(!servicesDropdownOpen);
                    }}
                    aria-expanded={servicesDropdownOpen}
                    aria-haspopup="listbox"
                  >
                    <span className="contact-main__form-multiselect-text">
                      {getSelectedServicesText()}
                    </span>
                    <svg
                      className="contact-main__form-multiselect-arrow"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9L1 4h10z" />
                    </svg>
                  </button>
                  {servicesDropdownOpen && (
                    <div 
                      className="contact-main__form-multiselect-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {serviceOptions.map((option) => (
                        <label
                          key={option.key}
                          className="contact-main__form-multiselect-option"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(option.key)}
                            onChange={() => handleServiceToggle(option.key)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </label>
              <label>
                <span className="sr-only">{t('contact.form.challenges')}</span>
                <textarea
                  rows={5}
                  name="challenges"
                  placeholder={t('contact.form.challenges')}
                  value={formData.challenges}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                <span>{t('contact.form.contactDay')}</span>
                <select
                  name="contactDay"
                  value={formData.contactDay}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">{t('contact.form.contactDayPlaceholder')}</option>
                  <option value="saturday">{t('contact.form.days.saturday')}</option>
                  <option value="sunday">{t('contact.form.days.sunday')}</option>
                  <option value="monday">{t('contact.form.days.monday')}</option>
                  <option value="tuesday">{t('contact.form.days.tuesday')}</option>
                  <option value="wednesday">{t('contact.form.days.wednesday')}</option>
                  <option value="thursday">{t('contact.form.days.thursday')}</option>
                </select>
              </label>
              {/* Status Messages */}
              {submitStatus !== 'idle' && (
                <div 
                  className={`contact-main__form-status ${submitStatus === 'success' ? 'success' : 'error'}`}
                  role="alert"
                >
                  {submitMessage}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn--contact"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : t('contact.form.submit')}
              </button>
              <div className="contact-main__form-whatsapp">
                <p>{t('contact.form.whatsappText')}</p>
                <a
                  href={t('contact.form.whatsappLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--whatsapp"
                  aria-label={t('contact.form.whatsappLabel')}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {t('contact.form.whatsappButton')}
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer footer--contact">
        <div className="contact-footer__container">
          <div className="contact-footer__row">
            <div className="contact-footer__left">
              <div className="brand brand--footer">
                <img src={mainLogo} alt="SIFA Advisory" className="brand__logo" loading="eager" fetchPriority="high" decoding="async" />
              </div>
              <div className="social">
                <a href="https://www.linkedin.com/company/sifa-consult/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M6 9H3v12h3zm.2-4.2a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0zM21 21h-3v-5.7c0-1.4 0-3.3-2-3.3s-2.2 1.5-2.2 3.2V21h-3V9h2.8v1.6h.1c.4-.8 1.5-1.6 3-1.6 3.3 0 4 2.2 4 5.1z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/sifa.consulting" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm4 3.2A3.8 3.8 0 1 1 8.2 14 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zm5.3-3.7a1 1 0 1 1-1.1 1.6 1 1 0 0 1 1.1-1.6z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="contact-footer__right">
              <div className="contact-footer__map">
                <a href="https://maps.app.goo.gl/RLxnQ4xwUsiKEqiw7" target="_blank" rel="noopener noreferrer" className="contact-footer__map-link">
                  <img src={sifaMap} alt="SIFA Location Map" />
                  <div className="contact-footer__map-overlay">
                    <span>{t('contact.clickToViewFullMap')}</span>
                  </div>
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
                <p className="copyright" style={{ margin: 0 }}>
                  {t('home.footer.copyright')}
                </p>
                <div className="footer__legal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end', fontSize: '0.85rem' }}>
                  <Link to="/privacy-policy" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>{t('legal.privacyPolicy')}</Link>
                  <Link to="/terms-conditions" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>{t('legal.termsConditions')}</Link>
                  <Link to="/return-policy" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>{t('legal.returnPolicy')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


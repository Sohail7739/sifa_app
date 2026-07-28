import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import mainLogo from '../assets/main_logo.png';

interface FooterProps {
  className?: string;
  style?: CSSProperties;
  showContactInfo?: boolean;
}

export default function Footer({ className = 'footer', style, showContactInfo = true }: FooterProps) {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/sifa-consult/' },
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/sifa.consulting' },
  ];

  const renderSocialIcon = (type: string) => {
    switch (type) {
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" role="img">
            <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm4 3.2A3.8 3.8 0 1 1 8.2 14 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zm5.3-3.7a1 1 0 1 1-1.1 1.6 1 1 0 0 1 1.1-1.6z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" role="img">
            <path d="M6 9H3v12h3zm.2-4.2a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0zM21 21h-3v-5.7c0-1.4 0-3.3-2-3.3s-2.2 1.5-2.2 3.2V21h-3V9h2.8v1.6h.1c.4-.8 1.5-1.6 3-1.6 3.3 0 4 2.2 4 5.1z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className={className} style={style}>
      <div className="footer__content">
        {showContactInfo ? (
          <div className="footer__top">
            <div className="footer__left">
              <div className="brand brand--footer">
                <img src={mainLogo} alt="SIFA Advisory" className="brand__logo" loading="eager" fetchPriority="high" decoding="async" />
              </div>
            </div>
            <div className="footer__middle">
              <div className="footer__contact-item">
                <div className="footer__contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="footer__contact-content">
                  <h4 className="footer__contact-label">{t('contact.info.officeAddress')}</h4>
                  <p className="footer__contact-text">{t('common.officeAddress')}</p>
                </div>
              </div>
              <div className="footer__contact-item">
                <div className="footer__contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="footer__contact-content">
                  <h4 className="footer__contact-label">{t('contact.info.email')}</h4>
                  <p className="footer__contact-text">{t('common.email')}</p>
                </div>
              </div>
              <div className="footer__contact-item">
                <div className="footer__contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="footer__contact-content">
                  <h4 className="footer__contact-label">{t('contact.info.phone')}</h4>
                  <p className="footer__contact-text">{t('common.phone2')}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="footer__bottom">
          {!showContactInfo ? (
            <div className="footer__left">
              <div className="brand brand--footer">
                <img src={mainLogo} alt="SIFA Advisory" className="brand__logo" loading="eager" fetchPriority="high" decoding="async" />
              </div>
              <div className="social">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    {renderSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="social">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  {renderSocialIcon(link.icon)}
                </a>
              ))}
            </div>
          )}

          {!showContactInfo && (
            <div className="footer__center">
              <div className="footer__circle"></div>
            </div>
          )}

          <div className="footer__right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <p className="copyright">{t('home.footer.copyright')}</p>
            <div className="footer__legal-links" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end', fontSize: '0.85rem' }}>
              <Link to="/privacy-policy" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>{t('legal.privacyPolicy')}</Link>
              <Link to="/terms-conditions" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>{t('legal.termsConditions')}</Link>
              <Link to="/return-policy" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>{t('legal.returnPolicy')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

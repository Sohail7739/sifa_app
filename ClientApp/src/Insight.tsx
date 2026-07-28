import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import './App.css';
import heroImage from './assets/insight_page/hero-image.png';
import buildingImage from './assets/insight_page/building.png';
import triangleImage from './assets/insight_page/triangle.png';
import Footer from './components/Footer';
import article1Image from './assets/insight_page/article1img.jpg';
import article2Image from './assets/insight_page/article2img.jpg';
import greenlineImage from './assets/insight_page/greenline.png';
import mainLogo from './assets/main_logo.png';

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export default function Insight() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  useTextAnimation();
  useInteractive();
  const insightStyle: CSSVarProperties = {
    '--insight-hero-bg': `url(${heroImage})`,
  };

  return (
    <div className="page">
      <header className="hero hero--insight" id="home">
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

      <section className="insight-hero" style={insightStyle}>
        <div className="insight-hero__background" />
        <div className="insight-hero__overlay" aria-hidden />
        <div className="insight-hero__content">
          <div className="insight-hero__left animate-fade-in-up">
            <p className="insight-hero__eyebrow text-motion text-motion-delay-1">{t('insight.eyebrow')}</p>
            <h1 className="insight-hero__title">
              <span className="insight-hero__title-line text-motion text-motion-delay-2">{t('insight.hero.titleLine1')}</span>
              <span className="insight-hero__title-line text-motion text-motion-delay-3">{t('insight.hero.titleLine2')}</span>
            </h1>
            <p className="insight-hero__description text-motion text-motion-delay-4">
              {t('insight.hero.description')}
            </p>
          </div>
          <div className="insight-hero__right">
            <div className="insight-hero__image-wrapper">
              <img src={buildingImage} alt="Traditional architecture" className="insight-hero__building" loading="lazy" decoding="async" />
              <div className="insight-hero__triangles" style={{ backgroundImage: `url(${triangleImage})` }} aria-hidden />
            </div>
          </div>
        </div>
      </section>


      <section className="insights-content">
        <div className="insights-articles-grid">
          {/* Article 1 Card */}
          <article className="insight-card text-motion-scale">
            <div className="insight-card__image-wrapper">
              <img src={article1Image} alt={t('insight.articles.article1.imageAlt')} className="insight-card__image" loading="lazy" decoding="async" />
            </div>
            <div className="insight-card__content">
              <h2 className="insight-card__title text-motion text-motion-delay-1">
                {t('insight.articles.article1.title')}
              </h2>
              <Link to="/insight/article/1" className="btn btn--outline insight-card__button text-motion text-motion-delay-2">
                {t('insight.readMore')}
              </Link>
            </div>
          </article>

          {/* Article 2 Card */}
          <article className="insight-card text-motion-scale">
            <div className="insight-card__image-wrapper">
              <img src={article2Image} alt={t('insight.articles.article2.imageAlt')} className="insight-card__image" loading="lazy" decoding="async" />
            </div>
            <div className="insight-card__content">
              <h2 className="insight-card__title text-motion text-motion-delay-1">
                {t('insight.articles.article2.title')}
              </h2>
              <Link to="/insight/article/2" className="btn btn--outline insight-card__button text-motion text-motion-delay-2">
                {t('insight.readMore')}
              </Link>
            </div>
          </article>
        </div>

        <div className="insights-cta">
          <button className="btn btn--accent btn--insights text-motion text-motion-delay-3" type="button">
            {t('insight.button')}
          </button>
        </div>
      </section>

      <section className="insight-divider">
        <img src={greenlineImage} alt="" aria-hidden="true" />
      </section>

      <Footer showContactInfo={true} />
    </div>
  );
}


import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext';
import Navigation from './components/Navigation';
import { useTextAnimation } from './hooks/useTextAnimation';
import { useInteractive } from './hooks/useInteractive';
import './App.css';
import Footer from './components/Footer';
import heroImage from './assets/insight_page/hero-image.png';
import buildingImage from './assets/insight_page/building.png';
import triangleImage from './assets/insight_page/triangle.png';
import article1Image from './assets/insight_page/article1img.jpg';
import article2Image from './assets/insight_page/article2img.jpg';
import greenlineImage from './assets/insight_page/greenline.png';
import mainLogo from './assets/main_logo.png';

type CSSVarProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

export default function ArticleDetail() {
  const { t } = useTranslation();
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  useTextAnimation();
  useInteractive();
  
  const insightStyle: CSSVarProperties = {
    '--insight-hero-bg': `url(${heroImage})`,
  };

  // Get article data based on articleId
  const getArticleData = () => {
    if (articleId === '1') {
      return {
        image: article1Image,
        imageAlt: t('insight.articles.article1.imageAlt'),
        title: t('insight.articles.article1.title'),
        metaDescription: t('insight.articles.article1.metaDescription'),
        content: 'article1'
      };
    } else if (articleId === '2') {
      return {
        image: article2Image,
        imageAlt: t('insight.articles.article2.imageAlt'),
        title: t('insight.articles.article2.title'),
        metaDescription: '',
        content: 'article2'
      };
    }
    return null;
  };

  const articleData = getArticleData();

  if (!articleData) {
    return (
      <div className="page">
        <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
          <h1>{t('insight.articleNotFound')}</h1>
          <Link to="/insight">{t('insight.backToInsights')}</Link>
        </div>
      </div>
    );
  }

  const renderArticleContent = () => {
    if (articleData.content === 'article1') {
      return (
        <>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p1')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p2')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p3')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h1')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p4')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p5')}
          </p>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article1.content.li1')}</li>
            <li>{t('insight.articles.article1.content.li2')}</li>
            <li>{t('insight.articles.article1.content.li3')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p6')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h2')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p7')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h3')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p8')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h4')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p9')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h5')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p10')}
          </p>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article1.content.li4')}</li>
            <li>{t('insight.articles.article1.content.li5')}</li>
            <li>{t('insight.articles.article1.content.li6')}</li>
            <li>{t('insight.articles.article1.content.li7')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p11')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h6')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p12')}
          </p>
          <h3 className="insight-article__subheading">{t('insight.articles.article1.content.h7')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p13')}
          </p>
          <h3 className="insight-article__subheading">{t('insight.articles.article1.content.h8')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p14')}
          </p>
          <h3 className="insight-article__subheading">{t('insight.articles.article1.content.h9')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p15')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h10')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p16')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article1.content.h11')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p17')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p18')}
          </p>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article1.content.li8')}</li>
            <li>{t('insight.articles.article1.content.li9')}</li>
            <li>{t('insight.articles.article1.content.li10')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p19')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p20')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p21')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article1.content.p22')}
          </p>
        </>
      );
    } else if (articleData.content === 'article2') {
      return (
        <>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p1')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p2')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article2.content.h1')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p3')}
          </p>

          <h3 className="insight-article__subheading">{t('insight.articles.article2.content.h2')}</h3>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article2.content.li1')}</li>
            <li>{t('insight.articles.article2.content.li2')}</li>
            <li>{t('insight.articles.article2.content.li3')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p4')}
          </p>

          <h3 className="insight-article__subheading">{t('insight.articles.article2.content.h3')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p5')}
          </p>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article2.content.li4')}</li>
            <li>{t('insight.articles.article2.content.li5')}</li>
            <li>{t('insight.articles.article2.content.li6')}</li>
            <li>{t('insight.articles.article2.content.li7')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p6')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article2.content.h4')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p7')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p8')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p9')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p10')}
          </p>
          <ul className="insight-article__list">
            <li><strong>{t('insight.articles.article2.content.li8')}</strong></li>
            <li><strong>{t('insight.articles.article2.content.li9')}</strong></li>
            <li><strong>{t('insight.articles.article2.content.li10')}</strong></li>
            <li><strong>{t('insight.articles.article2.content.li11')}</strong></li>
            <li><strong>{t('insight.articles.article2.content.li12')}</strong></li>
            <li><strong>{t('insight.articles.article2.content.li13')}</strong></li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p11')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p12')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p13')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p14')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article2.content.h5')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p15')}
          </p>

          <h3 className="insight-article__subheading">{t('insight.articles.article2.content.h6')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p16')}
          </p>

          <h3 className="insight-article__subheading">{t('insight.articles.article2.content.h7')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p17')}
          </p>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article2.content.li14')}</li>
            <li>{t('insight.articles.article2.content.li15')}</li>
            <li>{t('insight.articles.article2.content.li16')}</li>
          </ul>

          <h3 className="insight-article__subheading">{t('insight.articles.article2.content.h8')}</h3>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p18')}
          </p>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article2.content.li17')}</li>
            <li>{t('insight.articles.article2.content.li18')}</li>
            <li>{t('insight.articles.article2.content.li19')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p19')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article2.content.h9')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p20')}
          </p>

          <h3 className="insight-article__subheading">{t('insight.articles.article2.content.h10')}</h3>
          <ul className="insight-article__list">
            <li>{t('insight.articles.article2.content.li20')}</li>
            <li>{t('insight.articles.article2.content.li21')}</li>
            <li>{t('insight.articles.article2.content.li22')}</li>
            <li>{t('insight.articles.article2.content.li23')}</li>
            <li>{t('insight.articles.article2.content.li24')}</li>
            <li>{t('insight.articles.article2.content.li25')}</li>
          </ul>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p21')}
          </p>

          <h2 className="insight-article__heading">{t('insight.articles.article2.content.h11')}</h2>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p22')}
          </p>
          <p className="insight-article__paragraph">
            {t('insight.articles.article2.content.p23')}
          </p>
        </>
      );
    }
    return null;
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
        <article className="insight-article text-motion-scale">
          <div className="insight-article__header">
            <div className="insight-article__image-wrapper">
              <img src={articleData.image} alt={articleData.imageAlt} className="insight-article__image" loading="lazy" decoding="async" />
            </div>
            <div className="insight-article__meta">
              <h1 className="insight-article__title text-motion text-motion-delay-1">
                {articleData.title}
              </h1>
              {articleData.metaDescription && (
                <p className="insight-article__meta-description text-motion text-motion-delay-2">
                  {articleData.metaDescription}
                </p>
              )}
            </div>
          </div>
          <div className="insight-article__body">
            <div className="insight-article__content">
              {renderArticleContent()}
            </div>
          </div>
        </article>

        <div className="insights-cta">
          <button 
            className="btn btn--accent btn--insights text-motion text-motion-delay-3" 
            type="button"
            onClick={() => navigate('/insight')}
          >
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


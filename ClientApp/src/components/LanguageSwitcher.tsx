import { useTranslation } from '../contexts/TranslationContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="language-switcher"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      style={{
        background: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: '#f4f8f6',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontFamily: 'inherit',
        marginLeft: '1rem',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
}


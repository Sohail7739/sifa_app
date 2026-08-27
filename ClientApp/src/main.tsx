import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext';
import MobileHeader from './components/MobileHeader';
import MobileBottomNav from './components/MobileBottomNav';
import './components/MobileBottomNav.css';
import App from './App.tsx';
import About from './About.tsx';
import Services from './Services.tsx';
import ServiceDetail from './ServiceDetail.tsx';
import Insight from './Insight.tsx';
import Contact from './Contact.tsx';
import ArticleDetail from './ArticleDetail.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import TermsConditions from './TermsConditions.tsx';
import ReturnPolicy from './ReturnPolicy.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TranslationProvider>
      <HashRouter>
        <div style={{ backgroundColor: '#0b2115', minHeight: '100vh', width: '100%' }}>
          <MobileHeader />
          <MobileBottomNav />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/insight" element={<Insight />} />
            <Route path="/insight/article/:articleId" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
          </Routes>
        </div>
      </HashRouter>
    </TranslationProvider>
  </React.StrictMode>,
);


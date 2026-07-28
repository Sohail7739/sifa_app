import React, { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Page Components
  const HomePage = () => (
    <div className="page-content">
      <h1>Hello from Home Page!</h1>
      <p>Welcome to the home page</p>
    </div>
  );

  const ServicesPage = () => (
    <div className="page-content">
      <h1>Hello from Services Page!</h1>
      <p>Explore all our services</p>
    </div>
  );

  const WebDevelopmentPage = () => (
    <div className="page-content">
      <h1>Hello from Web Development!</h1>
      <p>Professional web development services</p>
    </div>
  );

  const MobileAppsPage = () => (
    <div className="page-content">
      <h1>Hello from Mobile Apps!</h1>
      <p>Build amazing mobile applications</p>
    </div>
  );

  const UIUXPage = () => (
    <div className="page-content">
      <h1>Hello from UI/UX Design!</h1>
      <p>Beautiful and intuitive designs</p>
    </div>
  );

  const DigitalMarketingPage = () => (
    <div className="page-content">
      <h1>Hello from Digital Marketing!</h1>
      <p>Grow your online presence</p>
    </div>
  );

  const ConsultingPage = () => (
    <div className="page-content">
      <h1>Hello from Consulting!</h1>
      <p>Expert business consulting</p>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'services': return <ServicesPage />;
      case 'web-development': return <WebDevelopmentPage />;
      case 'mobile-apps': return <MobileAppsPage />;
      case 'ui-ux-design': return <UIUXPage />;
      case 'digital-marketing': return <DigitalMarketingPage />;
      case 'consulting': return <ConsultingPage />;
      default: return <HomePage />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-color: #0a0e27;
          --accent-color: #ff6b35;
          --accent-hover: #ff8555;
          --text-primary: #ffffff;
          --text-secondary: #b8bcc8;
          --bg-overlay: rgba(10, 14, 39, 0.95);
          --border-color: rgba(255, 255, 255, 0.1);
          --shadow-glow: 0 0 40px rgba(255, 107, 53, 0.3);
        }

        body {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          min-height: 100vh;
        }

        .header-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0;
        }

        .header-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: var(--bg-overlay);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .header-container {
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
          position: relative;
        }

        .logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          z-index: 10;
          cursor: pointer;
        }

        .logo-dot {
          width: 10px;
          height: 10px;
          background: var(--accent-color);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .logo:hover {
          transform: translateY(-2px);
          text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: none;
          border: none;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 107, 53, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: var(--accent-color);
          background: rgba(255, 107, 53, 0.15);
        }

        .dropdown-arrow {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid currentColor;
          transition: transform 0.3s ease;
          margin-left: 4px;
        }

        .nav-item:hover .dropdown-arrow {
          transform: rotate(180deg);
        }

        /* HOVER-BASED DROPDOWN */
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 260px;
          background: var(--bg-overlay);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 0.75rem;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), var(--shadow-glow);
          z-index: 100;
          pointer-events: none;
        }

        /* Show dropdown on hover */
        .nav-item:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .dropdown-item {
          display: block;
          padding: 1rem 1.25rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          margin-bottom: 0.25rem;
        }

        .dropdown-item:last-child {
          margin-bottom: 0;
        }

        .dropdown-item::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }

        .dropdown-item:hover {
          color: var(--text-primary);
          background: rgba(255, 107, 53, 0.15);
          transform: translateX(8px);
          padding-left: 1.5rem;
        }

        .dropdown-item:hover::after {
          width: 100%;
        }

        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 10;
        }

        .menu-bar {
          width: 28px;
          height: 3px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu-toggle.open .menu-bar:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .mobile-menu-toggle.open .menu-bar:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.open .menu-bar:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .nav-mobile {
          position: fixed;
          top: 81px;
          left: 0;
          right: 0;
          background: var(--bg-overlay);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .nav-mobile.open {
          max-height: calc(100vh - 81px);
          overflow-y: auto;
        }

        .nav-mobile-content {
          padding: 1.5rem 2rem;
        }

        .nav-mobile .nav-link {
          display: block;
          width: 100%;
          padding: 1rem;
          margin-bottom: 0.5rem;
          border-radius: 12px;
        }

        /* Mobile dropdown - click based */
        .nav-mobile .dropdown-menu {
          position: static;
          opacity: 1;
          visibility: visible;
          transform: none;
          margin-top: 0.5rem;
          margin-left: 0;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          padding: 0;
          box-shadow: none;
          pointer-events: auto;
        }

        .nav-mobile .dropdown-menu.open {
          max-height: 500px;
          padding: 0.75rem;
        }

        .nav-mobile .dropdown-item {
          margin-bottom: 0.5rem;
        }

        .page-content {
          margin-top: 100px;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          color: var(--text-primary);
          text-align: center;
          min-height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-content h1 {
          font-family: 'Syne', sans-serif;
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-color) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-content p {
          font-size: 1.5rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        @media (max-width: 968px) {
          .nav-desktop {
            display: none;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .page-content h1 {
            font-size: 2.5rem;
          }

          .page-content p {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 640px) {
          .header-container {
            padding: 0 1rem;
          }

          .logo {
            font-size: 1.5rem;
          }

          .page-content h1 {
            font-size: 2rem;
          }

          .page-content {
            padding: 2rem 1rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header-wrapper">
        <div className="header-backdrop"></div>
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo" onClick={() => navigateTo('home')}>
              <span className="logo-dot"></span>
              YourBrand
            </div>

            {/* Desktop Navigation - HOVER BASED */}
            <nav className="nav-desktop">
              {/* Home Link */}
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                Home
              </button>

              {/* Services with Hover Dropdown */}
              <div className="nav-item">
                <div
                  className={`nav-link ${currentPage === 'services' || currentPage === 'web-development' || currentPage === 'mobile-apps' || currentPage === 'ui-ux-design' || currentPage === 'digital-marketing' || currentPage === 'consulting' ? 'active' : ''}`}
                  onClick={() => navigateTo('services')}
                >
                  Services
                  <span className="dropdown-arrow"></span>
                </div>
                
                {/* Dropdown appears on hover */}
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => navigateTo('web-development')}
                  >
                    Web Development
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => navigateTo('mobile-apps')}
                  >
                    Mobile Apps
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => navigateTo('ui-ux-design')}
                  >
                    UI/UX Design
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => navigateTo('digital-marketing')}
                  >
                    Digital Marketing
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => navigateTo('consulting')}
                  >
                    Consulting
                  </button>
                </div>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - CLICK BASED */}
        <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-mobile-content">
            {/* Home Link */}
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Home
            </button>

            {/* Services with Click Dropdown for Mobile */}
            <div className="nav-item">
              <button
                className={`nav-link ${currentPage === 'services' || currentPage === 'web-development' || currentPage === 'mobile-apps' || currentPage === 'ui-ux-design' || currentPage === 'digital-marketing' || currentPage === 'consulting' ? 'active' : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Services
                <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}></span>
              </button>
              
              <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                <button
                  className="dropdown-item"
                  onClick={() => navigateTo('web-development')}
                >
                  Web Development
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigateTo('mobile-apps')}
                >
                  Mobile Apps
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigateTo('ui-ux-design')}
                >
                  UI/UX Design
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigateTo('digital-marketing')}
                >
                  Digital Marketing
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigateTo('consulting')}
                >
                  Consulting
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      {renderPage()}
    </>
  );
}
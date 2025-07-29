'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're on client side
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initial check
    handleResize();

    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('floating-particles');
      if (!particlesContainer) return;

      const particleCount = 50;
      particlesContainer.innerHTML = '';

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00d4aa;
          border-radius: 50%;
          opacity: 0.6;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 3 + 3}s ease-in-out infinite;
          animation-delay: ${Math.random() * 6}s;
        `;
        particlesContainer.appendChild(particle);
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Create particles after component mounts
    createParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Főoldal', href: '#home' },
    { id: 'features', label: 'Funkciók', href: '#features' },
    { id: 'services', label: 'Szolgáltatások', href: '#services' },
    { id: 'pricing', label: 'Árlista', href: '#pricing' },
    { id: 'contact', label: 'Kapcsolat', href: '#contact' },
  ];

  const features: FeatureCard[] = [
    {
      id: 'ai-optimization',
      icon: '🧠',
      title: 'AI-alapú Optimalizálás',
      description: 'Gépi tanulás segítségével optimalizáljuk az útvonalakat, csökkentve a költségeket és a szállítási időt automatikusan.'
    },
    {
      id: 'real-time-tracking',
      icon: '📍',
      title: 'Valós idejű Nyomon követés',
      description: 'Kövesd nyomon a járműveket és szállítmányokat valós időben, GPS alapú helymeghatározással és pontos ETA-val.'
    },
    {
      id: 'detailed-reports',
      icon: '📊',
      title: 'Részletes Jelentések',
      description: 'Átfogó analitikák és jelentések a teljesítményről, költségekről és hatékonyságról intuitív dashboardon.'
    },
    {
      id: 'quick-integration',
      icon: '⚡',
      title: 'Gyors Integráció',
      description: 'Könnyű bevezetés és integráció meglévő rendszerekkel. API-k és szakértői támogatás a zökkenőmentes átálláshoz.'
    },
    {
      id: 'security-reliability',
      icon: '🛡️',
      title: 'Biztonság és Megbízhatóság',
      description: 'Európai adatvédelmi szabályoknak megfelelő biztonság, redundáns infrastruktúra és 99.9% üzemidő garancia.'
    },
    {
      id: 'timocom-integration',
      icon: '🤝',
      title: 'Timocom Integráció',
      description: 'Teljes integráció a Timocom platformmal - keresés, ajánlattétel és fuvarfelvétel automatizálva.'
    }
  ];

  const stats: StatItem[] = [
    { id: 'users', value: '500+', label: 'Aktív felhasználó' },
    { id: 'cost-reduction', value: '35%', label: 'Költségcsökkentés' },
    { id: 'uptime', value: '99.9%', label: 'Üzemidő' },
    { id: 'support', value: '24/7', label: 'Támogatás' }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: '#050816',
      color: '#ffffff',
      lineHeight: 1.6,
      overflowX: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #050816 0%, #0a0e27 50%, #1a1a3e 100%)',
      }} />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%2300d4aa' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        animation: 'gridMove 20s linear infinite'
      }} />

      {/* Floating Particles */}
      <div
        id="floating-particles"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* Navigation */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(10, 14, 39, 0.95)' : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(30px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        padding: '1rem 0'
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem'
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
              fontSize: '1.2rem',
              color: 'white'
            }}>
              🚛
            </div>
            FleetEgo Agent
          </Link>

          {/* Desktop Navigation */}
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            alignItems: 'center',
            margin: 0,
            padding: 0
          }}>
            {navigationItems.map((item) => (
              <li key={item.id} style={{ display: isMobile ? 'none' : 'block' }}>
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 500,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ display: isMobile ? 'none' : 'block' }}>
              <Link href="/login" style={{
                background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                color: 'white',
                padding: '0.8rem 1.8rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
                display: 'inline-block'
              }}>
                Bejelentkezés
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: isMobile ? 'block' : 'none',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(10, 14, 39, 0.95)',
            backdropFilter: 'blur(30px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </a>
            ))}
            <Link href="/login" style={{
              background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
              marginTop: '1rem'
            }}>
              Bejelentkezés
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '800px',
          zIndex: 2
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            🚀 Új generációs fuvarszervező rendszer
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            FLEETEGO AGENT
          </h1>

          <div style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#00d4aa',
            marginBottom: '1.5rem',
            fontWeight: 600
          }}>
            AI-alapú fuvarszervező és TMS rendszer
          </div>

          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '3rem',
            lineHeight: 1.8
          }}>
            Forradalmasítsd a fuvarszervezést mesterséges intelligenciával. Automatizált útvonaltervezés, 
            valós idejű nyomon követés és költségoptimalizálás egy platformon.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/login" style={{
              background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              🚀 Kezdjük el
            </Link>
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, '#features')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '1rem 2rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              ℹ️ Tudj meg többet
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {stats.map((stat) => (
              <div key={stat.id}>
                <h3 style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#00d4aa',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '6rem 2rem',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Miért válaszd a FleetEgo Agent-et?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.2rem',
            marginBottom: '4rem'
          }}>
            Modern technológiák és AI-alapú megoldások a hatékony fuvarszervezésért
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature) => (
              <div key={feature.id} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '2.5rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.5rem',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#ffffff'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.7
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#050816',
        padding: '4rem 2rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {['Adatvédelem', 'ÁSZF', 'Támogatás', 'API', 'Partnerek'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  fontWeight: 500
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#00d4aa'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
              >
                {link}
              </a>
            ))}
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '0.5rem'
          }}>
            &copy; 2025 FleetEgo Agent. Minden jog fenntartva.
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            AI-alapú fuvarszervező és TMS rendszer
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-20px) translateY(-20px); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1; 
          }
        }

        .particle {
          animation: float 6s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mobile-hidden {
            display: none !important;
          }
          
          .mobile-visible {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
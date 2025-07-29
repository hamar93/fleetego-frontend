'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Interfészek
interface MenuModule {
  id: string;
  title: string;
  icon: string;
  submenu: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  href: string;
  status: 'ready' | 'development' | 'planned';
}

export default function Dashboard() {
  const [openDropdown, setOpenDropdown] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();

  // Roadmap alapú modulok
  const menuModules: MenuModule[] = [
    {
      id: 'fleet-management',
      title: 'Alapflotta Kezelés',
      icon: '🚛',
      submenu: [
        { 
          id: 'drivers-assignment', 
          title: 'Sofőrök és Vontatók Hozzárendelése', 
          icon: '👥', 
          description: 'Sofőrök és vontatók párosítása, csere',
          href: '/dashboard/fleet-management/drivers-assignment',
          status: 'ready'
        },
        { 
          id: 'trailer-status', 
          title: 'Pótkocsi Állapot', 
          icon: '📦', 
          description: 'Rakott / üres kijelzés, állapot követés',
          href: '/dashboard/fleet-management/trailer-status',
          status: 'ready'
        },
        { 
          id: 'vehicle-issues', 
          title: 'Hiba Bejelentés', 
          icon: '🔧', 
          description: 'Vontató/pótkocsi hiba bejelentése sofőr részről',
          href: '/dashboard/fleet-management/vehicle-issues',
          status: 'planned'
        },
        { 
          id: 'loading-status', 
          title: 'Lerakás / Felrakás Státusz', 
          icon: '📍', 
          description: 'Státusz jelentése valós időben',
          href: '/dashboard/fleet-management/loading-status',
          status: 'planned'
        }
      ]
    },
    {
      id: 'time-tracking',
      title: 'Időalapú Nyomon Követés',
      icon: '⏰',
      submenu: [
        { 
          id: 'weekly-tracking', 
          title: 'Heti / 2 Heti Vezetési Idő', 
          icon: '📊', 
          description: 'Vezetési idő nyilvántartás',
          href: '/dashboard/time-tracking/weekly-tracking',
          status: 'planned'
        },
        { 
          id: 'fair-distribution', 
          title: 'Fuvarok Igazságos Elosztása', 
          icon: '⚖️', 
          description: 'Vezetési idők alapján történő elosztás',
          href: '/dashboard/time-tracking/fair-distribution',
          status: 'planned'
        },
        { 
          id: 'route-planning', 
          title: 'Fuvartervezés', 
          icon: '🗺️', 
          description: 'Pihenőidőkkel és szabadságokkal kalkulálva',
          href: '/dashboard/time-tracking/route-planning',
          status: 'planned'
        },
        { 
          id: 'auto-planning', 
          title: 'Automatikus Tervek', 
          icon: '🤖', 
          description: 'Heti / kétheti tervek automatikus generálása',
          href: '/dashboard/time-tracking/auto-planning',
          status: 'planned'
        }
      ]
    },
    {
      id: 'shipment-tracking',
      title: 'Fuvar Státusz és Dokumentáció',
      icon: '📋',
      submenu: [
        { 
          id: 'status-tracking', 
          title: 'Fuvar Státusz Nyomon Követése', 
          icon: '📍', 
          description: 'Felvételre vár / felvéve / úton / lerakva',
          href: '/dashboard/shipment-tracking/status-tracking',
          status: 'planned'
        },
        { 
          id: 'document-upload', 
          title: 'CMR / Szállítólevél Feltöltés', 
          icon: '📄', 
          description: 'Sofőr részéről fénykép feltöltés',
          href: '/dashboard/shipment-tracking/document-upload',
          status: 'planned'
        },
        { 
          id: 'auto-pairing', 
          title: 'Automatikus Párosítás', 
          icon: '🔗', 
          description: 'Fuvarmegbízással való párosítás',
          href: '/dashboard/shipment-tracking/auto-pairing',
          status: 'planned'
        },
        { 
          id: 'auto-invoicing', 
          title: 'Automatikus Számlakészítés', 
          icon: '💰', 
          description: 'Dokumentum alapján számlázás',
          href: '/dashboard/shipment-tracking/auto-invoicing',
          status: 'planned'
        }
      ]
    },
    {
      id: 'communication',
      title: 'Kommunikáció és Visszajelzés',
      icon: '💬',
      submenu: [
        { 
          id: 'driver-chat', 
          title: 'Chat Sofőr-Iroda', 
          icon: '💬', 
          description: 'Chat alapú kommunikáció',
          href: '/dashboard/communication/driver-chat',
          status: 'planned'
        },
        { 
          id: 'office-chat', 
          title: 'Irodai Chat Modul', 
          icon: '🏢', 
          description: 'Külön irodai chat modul',
          href: '/dashboard/communication/office-chat',
          status: 'planned'
        },
        { 
          id: 'driver-gallery', 
          title: 'Sofőr Bemutatkozás', 
          icon: '📸', 
          description: 'Sofőrök képgalériája cég alá feltöltve',
          href: '/dashboard/communication/driver-gallery',
          status: 'planned'
        }
      ]
    },
    {
      id: 'ai-automation',
      title: 'Automatizált Fuvarfigyelés (AI)',
      icon: '🧠',
      submenu: [
        { 
          id: 'auto-monitoring', 
          title: 'Automatikus Fuvarfigyelés', 
          icon: '👁️', 
          description: 'Fuvarbörzéken 5 percenként',
          href: '/dashboard/ai-automation/auto-monitoring',
          status: 'planned'
        },
        { 
          id: 'python-logic', 
          title: 'Python Logika', 
          icon: '🐍', 
          description: 'Keresési ciklusok Mistral 7B szerveren',
          href: '/dashboard/ai-automation/python-logic',
          status: 'planned'
        },
        { 
          id: 'cargo-consolidation', 
          title: 'FTL / LTL Összevonás', 
          icon: '📦', 
          description: 'Optimalizált útvonalra rakományok',
          href: '/dashboard/ai-automation/cargo-consolidation',
          status: 'planned'
        },
        { 
          id: 'distance-insertion', 
          title: 'Távolság-alapú Beszúrás', 
          icon: '📏', 
          description: 'LTL esetén 150-200 km-es sáv',
          href: '/dashboard/ai-automation/distance-insertion',
          status: 'planned'
        }
      ]
    },
    {
      id: 'language-ai',
      title: 'Nyelvi és AI-funkciók',
      icon: '🌐',
      submenu: [
        { 
          id: 'real-time-translation', 
          title: 'Valós Idejű Fordítás', 
          icon: '🔄', 
          description: 'RO-HU, EN-HU nyelvi fordítás',
          href: '/dashboard/language-ai/real-time-translation',
          status: 'planned'
        },
        { 
          id: 'cargo-interpretation', 
          title: 'Fuvarleírás Értelmezése', 
          icon: '📝', 
          description: 'Írásban + hangban továbbítás',
          href: '/dashboard/language-ai/cargo-interpretation',
          status: 'planned'
        },
        { 
          id: 'voice-control', 
          title: 'Hang Alapú Vezérlés', 
          icon: '🎤', 
          description: 'Utasítás, visszajelzés',
          href: '/dashboard/language-ai/voice-control',
          status: 'planned'
        },
        { 
          id: 'ai-upload', 
          title: 'AI Börzefeltöltés', 
          icon: '🤖', 
          description: 'IA töltse fel eladó fuvart jóváhagyás után',
          href: '/dashboard/language-ai/ai-upload',
          status: 'planned'
        }
      ]
    },
    {
      id: 'admin-finance',
      title: 'Adminisztratív és Pénzügyi',
      icon: '💼',
      submenu: [
        { 
          id: 'invoicing', 
          title: 'Számlázás Modul', 
          icon: '💰', 
          description: 'Automatikus számlakészítés',
          href: '/dashboard/admin-finance/invoicing',
          status: 'planned'
        },
        { 
          id: 'document-management', 
          title: 'Dokumentumkezelő', 
          icon: '📁', 
          description: 'Dokumentumok rendszerezése',
          href: '/dashboard/admin-finance/document-management',
          status: 'planned'
        },
        { 
          id: 'statistics', 
          title: 'Statisztikai Riportok', 
          icon: '📊', 
          description: 'Fuvar, bevétel, idő riportok',
          href: '/dashboard/admin-finance/statistics',
          status: 'planned'
        },
        { 
          id: 'route-planner', 
          title: 'Útvonaltervező', 
          icon: '🗺️', 
          description: 'Optimális útvonalak tervezése',
          href: '/dashboard/admin-finance/route-planner',
          status: 'planned'
        },
        { 
          id: 'maintenance', 
          title: 'Javítási Naptár', 
          icon: '🔧', 
          description: 'Automatikus emlékeztetők',
          href: '/dashboard/admin-finance/maintenance',
          status: 'planned'
        }
      ]
    },
    {
      id: 'subcontractors',
      title: 'Alvállalkozók Kezelése',
      icon: '🤝',
      submenu: [
        { 
          id: 'contractor-assignment', 
          title: 'Alvállalkozók Hozzárendelése', 
          icon: '👔', 
          description: 'Céghez való hozzárendelés',
          href: '/dashboard/subcontractors/contractor-assignment',
          status: 'planned'
        },
        { 
          id: 'communication-channel', 
          title: 'Kommunikációs Csatorna', 
          icon: '💬', 
          description: 'Biztosított kommunikáció',
          href: '/dashboard/subcontractors/communication-channel',
          status: 'planned'
        },
        { 
          id: 'performance-monitoring', 
          title: 'Státusz és Teljesítmény', 
          icon: '📈', 
          description: 'Figyelés és értékelés',
          href: '/dashboard/subcontractors/performance-monitoring',
          status: 'planned'
        },
        { 
          id: 'document-upload-sub', 
          title: 'Dokumentumok, Számlák', 
          icon: '📄', 
          description: 'Feltöltés és kezelés',
          href: '/dashboard/subcontractors/document-upload-sub',
          status: 'planned'
        },
        { 
          id: 'financial-tracking', 
          title: 'Pénzügyi Statisztikák', 
          icon: '💸', 
          description: 'Kintlévőségek nyomon követése',
          href: '/dashboard/subcontractors/financial-tracking',
          status: 'planned'
        }
      ]
    },
    {
      id: 'registration-auth',
      title: 'Regisztrációs és Jogosultsági',
      icon: '🔐',
      submenu: [
        { 
          id: 'client-registration', 
          title: 'Ügyfél Regisztráció', 
          icon: '📝', 
          description: 'Kezdeményezés kezelése',
          href: '/dashboard/registration-auth/client-registration',
          status: 'planned'
        },
        { 
          id: 'invitation-links', 
          title: 'Meghívó Linkek', 
          icon: '🔗', 
          description: 'Rendszer által küldött linkek',
          href: '/dashboard/registration-auth/invitation-links',
          status: 'planned'
        },
        { 
          id: 'permission-management', 
          title: 'Jogosultságkezelés', 
          icon: '👥', 
          description: 'Admin / diszpécser / sofőr / alvállalkozó',
          href: '/dashboard/registration-auth/permission-management',
          status: 'planned'
        }
      ]
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDropdownToggle = (moduleId: string) => {
    setOpenDropdown(openDropdown === moduleId ? '' : moduleId);
  };

  const handleNavigation = (href: string, status: string) => {
    if (status === 'ready') {
      router.push(href);
    } else {
      alert(`Ez a modul jelenleg ${status === 'development' ? 'fejlesztés' : 'tervezés'} alatt áll.`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return { color: '#00ff88', bg: 'rgba(0, 255, 136, 0.2)', text: '✅ Kész' };
      case 'development':
        return { color: '#ffb800', bg: 'rgba(255, 184, 0, 0.2)', text: '🚧 Fejlesztés' };
      case 'planned':
        return { color: '#ff4757', bg: 'rgba(255, 71, 87, 0.2)', text: '📋 Tervezett' };
      default:
        return { color: '#ffffff', bg: 'rgba(255, 255, 255, 0.1)', text: 'Ismeretlen' };
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: '#050816',
      color: '#ffffff',
      minHeight: '100vh',
      lineHeight: 1.6,
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, #050816 0%, #0a0e27 50%, #1a1a3e 100%)',
      }} />

      {/* Header */}
      <header style={{
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(30px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem'
        }}>
          {/* Logo */}
          <Link href="/dashboard" style={{
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

          {/* User Menu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                ☰
              </button>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                👤
              </div>
              <span style={{ fontWeight: 600 }}>Admin Felhasználó</span>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: isMobile ? (sidebarOpen ? '320px' : '0') : '350px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
          padding: isMobile && !sidebarOpen ? '0' : '2rem 1rem',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          position: isMobile ? 'fixed' : 'static',
          height: isMobile ? '100vh' : 'auto',
          zIndex: 999,
          top: isMobile ? '80px' : 'auto',
          overflowY: 'auto'
        }}>
          <nav>
            {/* Modulok dropdown menükkel */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {menuModules.map((module) => (
                <div key={module.id}>
                  {/* Modul főcím */}
                  <button
                    onClick={() => handleDropdownToggle(module.id)}
                    style={{
                      width: '100%',
                      background: openDropdown === module.id ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      padding: '1rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.3rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem'
                    }}>
                      <span style={{ fontSize: '1.1rem' }}>{module.icon}</span>
                      <span style={{ fontSize: '0.9rem' }}>{module.title}</span>
                    </div>
                    <span style={{
                      fontSize: '0.8rem',
                      transform: openDropdown === module.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}>
                      ▼
                    </span>
                  </button>

                  {/* Dropdown submenu */}
                  {openDropdown === module.id && (
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      marginBottom: '0.8rem',
                      marginLeft: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {module.submenu.map((subItem) => {
                        const badge = getStatusBadge(subItem.status);
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigation(subItem.href, subItem.status)}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              border: 'none',
                              color: 'rgba(255, 255, 255, 0.7)',
                              padding: '0.8rem',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              textAlign: 'left',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.6rem',
                              marginBottom: '0.3rem'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                            }}
                          >
                            <span style={{ fontSize: '0.9rem', marginTop: '0.1rem' }}>{subItem.icon}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ 
                                fontSize: '0.85rem', 
                                fontWeight: 600,
                                marginBottom: '0.3rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                {subItem.title}
                                <span style={{
                                  background: badge.bg,
                                  color: badge.color,
                                  padding: '0.1rem 0.4rem',
                                  borderRadius: '8px',
                                  fontSize: '0.6rem',
                                  fontWeight: 500
                                }}>
                                  {badge.text}
                                </span>
                              </div>
                              <div style={{ 
                                fontSize: '0.7rem', 
                                color: 'rgba(255, 255, 255, 0.5)',
                                lineHeight: 1.3
                              }}>
                                {subItem.description.length > 50 
                                  ? subItem.description.substring(0, 50) + '...' 
                                  : subItem.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* Dashboard Overview */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#ffffff'
            }}>
              Üdvözöljük a FleetEgo Agent-ben! 🚛
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem',
              fontSize: '1.2rem'
            }}>
              AI-alapú fuvarszervező rendszer irányítópultja
            </p>

            {/* Gyors statisztikák */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)'
              }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>3</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Aktív Sofőr</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>4</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Aktív Vontató</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
              }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>1</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Úton Lévő Fuvar</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)'
              }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>2</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Rakott Pótkocsi</p>
              </div>
            </div>

            {/* Roadmap modulok grid */}
            <h3 style={{
              color: '#00d4aa',
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              📋 Rendszer Modulok (Roadmap szerint)
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {menuModules.map((module) => (
                <div key={module.id} style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => handleDropdownToggle(module.id)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem'
                    }}>
                      {module.icon}
                    </div>
                    <div>
                      <h4 style={{
                        color: '#ffffff',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem'
                      }}>
                        {module.title}
                      </h4>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.9rem'
                      }}>
                        {module.submenu.length} almodul
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gap: '0.8rem'
                  }}>
                    {module.submenu.slice(0, 3).map((item) => {
                      const badge = getStatusBadge(item.status);
                      return (
                        <div key={item.id} style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: '10px',
                          padding: '0.8rem',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#00d4aa' }}>{item.icon}</span>
                            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              {item.title}
                            </span>
                          </div>
                          <span style={{
                            background: badge.bg,
                            color: badge.color,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '8px',
                            fontSize: '0.6rem',
                            fontWeight: 600
                          }}>
                            {badge.text}
                          </span>
                        </div>
                      );
                    })}
                    {module.submenu.length > 3 && (
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        padding: '0.5rem'
                      }}>
                        +{module.submenu.length - 3} további...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gyorselérés kártyák */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              color: '#00d4aa',
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              🚀 Gyorselérés - Elérhető Modulok
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {menuModules.flatMap(module => 
                module.submenu.filter(item => item.status === 'ready')
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href, item.status)}
                  style={{
                    background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '2rem',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 212, 170, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 170, 0.3)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        marginBottom: '0.3rem'
                      }}>
                        {item.title}
                      </h4>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        display: 'inline-block'
                      }}>
                        ✅ ELÉRHETŐ
                      </div>
                    </div>
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </button>
              ))}

              {menuModules.flatMap(module => 
                module.submenu.filter(item => item.status === 'ready')
              ).length === 0 && (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
                  <p>Még nincsenek teljesen kész modulok. Hamarosan elérhető lesz az első!</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Interfészek
interface Potkocsi {
  id: string;
  rendszam: string;
  tipus: string;
  allapot: 'rakott' | 'ures' | 'szerviz' | 'hibas' | 'inaktiv';
  vontatoId?: string;
  soforId?: string;
  soforNev?: string;
  vontatoRendszam?: string;
  utolsoFrissites: string;
  helyszin?: string;
  rakomanyTipus?: string;
  rakomanyTomeg?: number;
  celallomas?: string;
  indulasIdeje?: string;
  erkezesIdeje?: string;
  gps: {
    lat: number;
    lng: number;
  };
  teljesitmenyStatisztika: {
    osszesKm: number;
    osszesFuvar: number;
    atlagKihasznaltsag: number;
    utolsoSzerviz: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface StatusChangeRecord {
  id: string;
  potkocsId: string;
  regiallapot: string;
  ujallapot: string;
  datum: string;
  ido: string;
  felhasznalo: string;
  helyszin: string;
  megjegyzes: string;
}

function TrailerStatus() {
  const [activeView, setActiveView] = useState<'overview' | 'details' | 'history' | 'map'>('overview');
  const [selectedTrailer, setSelectedTrailer] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('osszes');
  const [potkocsik, setPotkocsik] = useState<Potkocsi[]>([]);
  const [statusHistory, setStatusHistory] = useState<StatusChangeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Pótkocsi mintaadatok betöltése
    const mintaPotkocsik: Potkocsi[] = [
      {
        id: '1',
        rendszam: 'HU-PK-001',
        tipus: 'Schmitz Cargobull',
        allapot: 'rakott',
        vontatoId: 'HU-123-AB',
        soforId: '1',
        soforNev: 'Kovács József',
        vontatoRendszam: 'HU-123-AB',
        utolsoFrissites: '2025-01-18 14:30',
        helyszin: 'Budapest, XIII. kerület',
        rakomanyTipus: 'Elektronikai cikkek',
        rakomanyTomeg: 18500,
        celallomas: 'München, Németország',
        indulasIdeje: '2025-01-18 06:00',
        erkezesIdeje: '2025-01-19 14:00',
        gps: { lat: 47.5636, lng: 19.0947 },
        teljesitmenyStatisztika: {
          osszesKm: 245000,
          osszesFuvar: 189,
          atlagKihasznaltsag: 87,
          utolsoSzerviz: '2024-12-15'
        },
        createdAt: '2023-08-15',
        updatedAt: '2025-01-18'
      },
      {
        id: '2',
        rendszam: 'HU-PK-002',
        tipus: 'Krone Cool Liner',
        allapot: 'ures',
        vontatoId: 'HU-456-CD',
        soforId: '2',
        soforNev: 'Nagy Péter',
        vontatoRendszam: 'HU-456-CD',
        utolsoFrissites: '2025-01-18 13:45',
        helyszin: 'Debrecen, Belváros',
        indulasIdeje: '2025-01-18 08:00',
        gps: { lat: 47.5316, lng: 21.6273 },
        teljesitmenyStatisztika: {
          osszesKm: 198000,
          osszesFuvar: 145,
          atlagKihasznaltsag: 82,
          utolsoSzerviz: '2024-11-28'
        },
        createdAt: '2023-06-10',
        updatedAt: '2025-01-18'
      },
      {
        id: '3',
        rendszam: 'HU-PK-003',
        tipus: 'Kögel Cargo',
        allapot: 'rakott',
        vontatoId: 'HU-789-EF',
        soforId: '3',
        soforNev: 'Szabó Mária',
        vontatoRendszam: 'HU-789-EF',
        utolsoFrissites: '2025-01-18 15:20',
        helyszin: 'Szeged, Ipari Park',
        rakomanyTipus: 'Élelmiszerek',
        rakomanyTomeg: 22000,
        celallomas: 'Bukarest, Románia',
        indulasIdeje: '2025-01-18 05:30',
        erkezesIdeje: '2025-01-19 18:00',
        gps: { lat: 46.2530, lng: 20.1414 },
        teljesitmenyStatisztika: {
          osszesKm: 156000,
          osszesFuvar: 98,
          atlagKihasznaltsag: 91,
          utolsoSzerviz: '2025-01-05'
        },
        createdAt: '2024-02-20',
        updatedAt: '2025-01-18'
      },
      {
        id: '4',
        rendszam: 'HU-PK-004',
        tipus: 'Schwarzmüller',
        allapot: 'szerviz',
        utolsoFrissites: '2025-01-17 09:00',
        helyszin: 'MAN Szerviz, Kecskemét',
        gps: { lat: 46.9073, lng: 19.6890 },
        teljesitmenyStatisztika: {
          osszesKm: 301000,
          osszesFuvar: 234,
          atlagKihasznaltsag: 78,
          utolsoSzerviz: '2025-01-17'
        },
        createdAt: '2022-11-05',
        updatedAt: '2025-01-17'
      },
      {
        id: '5',
        rendszam: 'HU-PK-005',
        tipus: 'Krone Profi Liner',
        allapot: 'ures',
        utolsoFrissites: '2025-01-18 16:10',
        helyszin: 'Pécs, Keleti Ipari Park',
        gps: { lat: 46.0727, lng: 18.2330 },
        teljesitmenyStatisztika: {
          osszesKm: 87000,
          osszesFuvar: 67,
          atlagKihasznaltsag: 85,
          utolsoSzerviz: '2024-10-12'
        },
        createdAt: '2024-08-30',
        updatedAt: '2025-01-18'
      },
      {
        id: '6',
        rendszam: 'HU-PK-006',
        tipus: 'Wielton Curtainsider',
        allapot: 'hibas',
        utolsoFrissites: '2025-01-18 11:30',
        helyszin: 'M1-es autópálya, 65 km',
        gps: { lat: 47.6875, lng: 17.6504 },
        teljesitmenyStatisztika: {
          osszesKm: 178000,
          osszesFuvar: 134,
          atlagKihasznaltsag: 80,
          utolsoSzerviz: '2024-09-22'
        },
        createdAt: '2023-04-18',
        updatedAt: '2025-01-18'
      }
    ];

    // Státusz történet mintaadatok
    const mintaHistory: StatusChangeRecord[] = [
      {
        id: '1',
        potkocsId: '1',
        regiallapot: 'ures',
        ujallapot: 'rakott',
        datum: '2025-01-18',
        ido: '06:15',
        felhasznalo: 'Kovács József',
        helyszin: 'Budapest, GLS Raktár',
        megjegyzes: 'Elektronikai cikkek felrakása München felé'
      },
      {
        id: '2',
        potkocsId: '2',
        regiallapot: 'rakott',
        ujallapot: 'ures',
        datum: '2025-01-18',
        ido: '12:30',
        felhasznalo: 'Nagy Péter',
        helyszin: 'Debrecen, Tesco Központ',
        megjegyzes: 'Áru lerakása - következő fuvar várva'
      },
      {
        id: '3',
        potkocsId: '3',
        regiallapot: 'ures',
        ujallapot: 'rakott',
        datum: '2025-01-18',
        ido: '05:45',
        felhasznalo: 'Szabó Mária',
        helyszin: 'Szeged, Pick Üzem',
        megjegyzes: 'Élelmiszer export Bukarestbe'
      },
      {
        id: '4',
        potkocsId: '4',
        regiallapot: 'hibas',
        ujallapot: 'szerviz',
        datum: '2025-01-17',
        ido: '09:00',
        felhasznalo: 'Rendszer',
        helyszin: 'MAN Szerviz, Kecskemét',
        megjegyzes: 'Fékrendszer javítás - tervezett időtartam: 2 nap'
      }
    ];

    setPotkocsik(mintaPotkocsik);
    setStatusHistory(mintaHistory);
  }, []);

  // Helper functions
  const getStatusColor = (allapot: string) => {
    switch (allapot) {
      case 'rakott':
        return { bg: 'linear-gradient(135deg, #00d4aa, #00a0db)', color: '#ffffff', icon: '📦', text: 'Rakott' };
      case 'ures':
        return { bg: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#ffffff', icon: '📭', text: 'Üres' };
      case 'szerviz':
        return { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', color: '#ffffff', icon: '🔧', text: 'Szerviz' };
      case 'hibas':
        return { bg: 'linear-gradient(135deg, #ff4757, #ff3742)', color: '#ffffff', icon: '⚠️', text: 'Hibás' };
      case 'inaktiv':
        return { bg: 'rgba(128, 128, 128, 0.6)', color: '#ffffff', icon: '⭕', text: 'Inaktív' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', icon: '❓', text: 'Ismeretlen' };
    }
  };

  const handleStatusChange = (potkocsId: string, ujAllapot: string) => {
    const potkocsi = potkocsik.find(p => p.id === potkocsId);
    if (!potkocsi) return;

    const newRecord: StatusChangeRecord = {
      id: Date.now().toString(),
      potkocsId,
      regiallapot: potkocsi.allapot,
      ujallapot: ujAllapot,
      datum: new Date().toISOString().split('T')[0],
      ido: new Date().toTimeString().split(' ')[0].substring(0, 5),
      felhasznalo: 'Admin Felhasználó',
      helyszin: potkocsi.helyszin || 'Ismeretlen',
      megjegyzes: `Státusz módosítva: ${potkocsi.allapot} → ${ujAllapot}`
    };

    setStatusHistory(prev => [newRecord, ...prev]);
    setPotkocsik(prev => prev.map(p => 
      p.id === potkocsId 
        ? { ...p, allapot: ujAllapot as any, utolsoFrissites: new Date().toLocaleString('hu-HU') }
        : p
    ));

    alert(`Pótkocsi ${potkocsi.rendszam} állapota módosítva: ${ujAllapot}`);
  };

  const getFilteredTrailers = () => {
    let filtered = potkocsik;

    if (statusFilter !== 'osszes') {
      filtered = filtered.filter(p => p.allapot === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.rendszam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tipus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.soforNev?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.helyszin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatistics = () => {
    const total = potkocsik.length;
    const rakott = potkocsik.filter(p => p.allapot === 'rakott').length;
    const ures = potkocsik.filter(p => p.allapot === 'ures').length;
    const szerviz = potkocsik.filter(p => p.allapot === 'szerviz').length;
    const hibas = potkocsik.filter(p => p.allapot === 'hibas').length;
    const kihasznaltsag = total > 0 ? Math.round((rakott / total) * 100) : 0;

    return { total, rakott, ures, szerviz, hibas, kihasznaltsag };
  };

  const stats = getStatistics();

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: '#050816',
      color: '#ffffff',
      minHeight: '100vh',
      lineHeight: 1.6
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
          {/* Breadcrumb Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Link 
              href="/dashboard"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.8)',
                padding: '0.8rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              ← Vissza
            </Link>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem'
            }}>
              <Link href="/dashboard" style={{ color: '#00d4aa', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <span>/</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Alapflotta Kezelés</span>
              <span>/</span>
              <span style={{ color: '#ffffff' }}>Pótkocsi Állapot</span>
            </div>
          </div>

          {/* Logo */}
          <Link href="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#ffffff',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '35px',
              height: '35px',
              background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
              fontSize: '1rem',
              color: 'white'
            }}>
              🚛
            </div>
            FleetEgo Agent
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Page Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(30px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '25px',
          padding: '3rem',
          marginBottom: '3rem',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            marginBottom: '1rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            📦 Pótkocsi Állapot Kezelés
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2.5rem',
            fontSize: '1.2rem',
            fontWeight: 500
          }}>
            Rakott / üres kijelzés, állapot követés és valós idejű frissítés
          </p>

          {/* Tab navigáció */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'overview', label: '👁️ Áttekintés' },
              { id: 'details', label: '📋 Részletek' },
              { id: 'history', label: '📚 Előzmények' },
              { id: 'map', label: '🗺️ Térkép' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                style={{
                  background: activeView === tab.id ? 'linear-gradient(135deg, #00d4aa, #00a0db)' : 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: activeView === tab.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: activeView === tab.id ? '0 8px 32px rgba(0, 212, 170, 0.3)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
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
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {stats.total}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Összes Pótkocsi</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {stats.rakott}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Rakott</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f093fb, #f5576c)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {stats.ures}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Üres</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)'
          }}>
            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
              {stats.kihasznaltsag}%
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kihasználtság</p>
          </div>
        </div>

        {/* Content based on active view */}
        {activeView === 'overview' && (
          <div>
            {/* Filters */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(30px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '0.8rem',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  🔍 Keresés
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rendszám, típus, sofőr neve..."
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                />
              </div>

              <div style={{ minWidth: '200px' }}>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '0.8rem',
                  fontSize: '1rem',
                  fontWeight: 600
                }}>
                  📊 Állapot szűrő
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  <option value="osszes">Összes állapot</option>
                  <option value="rakott">📦 Rakott</option>
                  <option value="ures">📭 Üres</option>
                  <option value="szerviz">🔧 Szerviz</option>
                  <option value="hibas">⚠️ Hibás</option>
                  <option value="inaktiv">⭕ Inaktív</option>
                </select>
              </div>
            </div>

            {/* Pótkocsi lista */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(30px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                color: '#00d4aa',
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '2rem'
              }}>
                📦 Pótkocsi Állapotok ({getFilteredTrailers().length} db)
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '2rem'
              }}>
                {getFilteredTrailers().map((potkocsi) => {
                  const statusInfo = getStatusColor(potkocsi.allapot);
                  return (
                    <div key={potkocsi.id} style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '20px',
                      padding: '2rem',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}>
                      {/* Header */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.5rem'
                      }}>
                        <div>
                          <h4 style={{
                            color: '#ffffff',
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem'
                          }}>
                            <span style={{ fontSize: '1.5rem' }}>🚚</span>
                            {potkocsi.rendszam}
                          </h4>
                          <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '1rem'
                          }}>
                            {potkocsi.tipus}
                          </p>
                        </div>

                        <div style={{
                          background: statusInfo.bg,
                          color: statusInfo.color,
                          padding: '0.8rem 1.2rem',
                          borderRadius: '15px',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          textAlign: 'center',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}>
                          {statusInfo.icon} {statusInfo.text}
                        </div>
                      </div>

                      {/* Details */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                          gap: '1rem',
                          fontSize: '0.9rem'
                        }}>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>📍 Helyszín:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.3rem 0 0 0' }}>
                              {potkocsi.helyszin || 'Ismeretlen'}
                            </p>
                          </div>

                          {potkocsi.soforNev && (
                            <div>
                              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>👤 Sofőr:</span>
                              <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.3rem 0 0 0' }}>
                                {potkocsi.soforNev}
                              </p>
                            </div>
                          )}

                          {potkocsi.vontatoRendszam && (
                            <div>
                              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>🚛 Vontató:</span>
                              <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.3rem 0 0 0' }}>
                                {potkocsi.vontatoRendszam}
                              </p>
                            </div>
                          )}

                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>⏰ Frissítve:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.3rem 0 0 0' }}>
                              {potkocsi.utolsoFrissites}
                            </p>
                          </div>
                        </div>

                        {/* Rakományinformációk */}
                        {potkocsi.allapot === 'rakott' && potkocsi.rakomanyTipus && (
                          <div style={{
                            background: 'rgba(0, 212, 170, 0.1)',
                            border: '1px solid rgba(0, 212, 170, 0.3)',
                            borderRadius: '10px',
                            padding: '1rem',
                            marginTop: '1rem'
                          }}>
                            <h5 style={{
                              color: '#00d4aa',
                              fontSize: '1rem',
                              fontWeight: 700,
                              marginBottom: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              📦 Rakományinformációk
                            </h5>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                              gap: '0.8rem',
                              fontSize: '0.85rem'
                            }}>
                              <div>
                                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Típus:</span>
                                <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                  {potkocsi.rakomanyTipus}
                                </p>
                              </div>
                              {potkocsi.rakomanyTomeg && (
                                <div>
                                  <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Tömeg:</span>
                                  <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                    {potkocsi.rakomanyTomeg.toLocaleString()} kg
                                  </p>
                                </div>
                              )}
                              {potkocsi.celallomas && (
                                <div>
                                  <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Célállomás:</span>
                                  <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                    {potkocsi.celallomas}
                                  </p>
                                </div>
                              )}
                              {potkocsi.erkezesIdeje && (
                                <div>
                                  <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Érkezés:</span>
                                  <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                    {potkocsi.erkezesIdeje}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Gyors állapotváltás gombok */}
                      <div style={{
                        display: 'flex',
                        gap: '0.8rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}>
                        {['rakott', 'ures', 'szerviz', 'hibas'].map((status) => {
                          const statusColor = getStatusColor(status);
                          const isCurrentStatus = potkocsi.allapot === status;
                          
                          return (
                            <button
                              key={status}
                              onClick={() => !isCurrentStatus && handleStatusChange(potkocsi.id, status)}
                              disabled={isCurrentStatus}
                              style={{
                                background: isCurrentStatus 
                                  ? 'rgba(128, 128, 128, 0.3)' 
                                  : 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                color: isCurrentStatus 
                                  ? 'rgba(255, 255, 255, 0.5)' 
                                  : 'rgba(255, 255, 255, 0.8)',
                                padding: '0.6rem 1rem',
                                borderRadius: '10px',
                                cursor: isCurrentStatus ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                opacity: isCurrentStatus ? 0.5 : 1
                              }}
                              onMouseEnter={(e) => {
                                if (!isCurrentStatus) {
                                  e.currentTarget.style.background = statusColor.bg;
                                  e.currentTarget.style.color = statusColor.color;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isCurrentStatus) {
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                                }
                              }}
                            >
                              {statusColor.icon} {statusColor.text}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {getFilteredTrailers().length === 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '4rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nincs találat</h3>
                    <p>Próbálja meg módosítani a keresési feltételeket!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'details' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '3rem'
            }}>
              📋 Részletes Pótkocsi Információk
            </h3>

            {/* Pótkocsi kiválasztás */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '3rem'
            }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1rem',
                fontSize: '1.2rem',
                fontWeight: 600
              }}>
                🚚 Pótkocsi kiválasztása
              </label>
              <select
                value={selectedTrailer}
                onChange={(e) => setSelectedTrailer(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: 500
                }}
              >
                <option value="">Válasszon egy pótkocsit...</option>
                {potkocsik.map((potkocsi) => (
                  <option key={potkocsi.id} value={potkocsi.id}>
                    {potkocsi.rendszam} - {potkocsi.tipus} ({getStatusColor(potkocsi.allapot).text})
                  </option>
                ))}
              </select>
            </div>

            {/* Kiválasztott pótkocsi részletei */}
            {selectedTrailer && (
              (() => {
                const potkocsi = potkocsik.find(p => p.id === selectedTrailer);
                if (!potkocsi) return null;
                
                const statusInfo = getStatusColor(potkocsi.allapot);
                
                return (
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '20px',
                    padding: '3rem'
                  }}>
                    {/* Fejléc */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '3rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div>
                        <h4 style={{
                          color: '#ffffff',
                          fontSize: '2rem',
                          fontWeight: 700,
                          marginBottom: '0.5rem'
                        }}>
                          🚚 {potkocsi.rendszam}
                        </h4>
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '1.3rem'
                        }}>
                          {potkocsi.tipus}
                        </p>
                      </div>
                      
                      <div style={{
                        background: statusInfo.bg,
                        color: statusInfo.color,
                        padding: '1rem 2rem',
                        borderRadius: '20px',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
                      }}>
                        {statusInfo.icon} {statusInfo.text}
                      </div>
                    </div>

                    {/* Információk grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '2rem',
                      marginBottom: '3rem'
                    }}>
                      {/* Alapinformációk */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '15px',
                        padding: '2rem'
                      }}>
                        <h5 style={{
                          color: '#00d4aa',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          marginBottom: '1.5rem'
                        }}>
                          📋 Alapinformációk
                        </h5>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Rendszám:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.rendszam}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Típus:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.tipus}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Utolsó frissítés:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.utolsoFrissites}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Létrehozva:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.createdAt}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Jelenlegi hozzárendelés */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '15px',
                        padding: '2rem'
                      }}>
                        <h5 style={{
                          color: '#00d4aa',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          marginBottom: '1.5rem'
                        }}>
                          🔗 Jelenlegi Hozzárendelés
                        </h5>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Sofőr:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.soforNev || 'Nincs hozzárendelve'}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Vontató:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.vontatoRendszam || 'Nincs hozzárendelve'}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Helyszín:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.helyszin || 'Ismeretlen'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Teljesítmény statisztikák */}
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '15px',
                        padding: '2rem'
                      }}>
                        <h5 style={{
                          color: '#00d4aa',
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          marginBottom: '1.5rem'
                        }}>
                          📊 Teljesítmény Statisztikák
                        </h5>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Összes km:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.teljesitmenyStatisztika.osszesKm.toLocaleString()} km
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Összes fuvar:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.teljesitmenyStatisztika.osszesFuvar} db
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Átlag kihasználtság:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.teljesitmenyStatisztika.atlagKihasznaltsag}%
                            </p>
                          </div>
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Utolsó szerviz:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.teljesitmenyStatisztika.utolsoSzerviz}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Rakományinformációk (ha rakott) */}
                      {potkocsi.allapot === 'rakott' && potkocsi.rakomanyTipus && (
                        <div style={{
                          background: 'rgba(0, 212, 170, 0.1)',
                          border: '2px solid rgba(0, 212, 170, 0.3)',
                          borderRadius: '15px',
                          padding: '2rem'
                        }}>
                          <h5 style={{
                            color: '#00d4aa',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem'
                          }}>
                            📦 Rakományinformációk
                          </h5>
                          <div style={{ display: 'grid', gap: '1rem' }}>
                            <div>
                              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Rakomány típusa:</span>
                              <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                {potkocsi.rakomanyTipus}
                              </p>
                            </div>
                            {potkocsi.rakomanyTomeg && (
                              <div>
                                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Tömeg:</span>
                                <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                  {potkocsi.rakomanyTomeg.toLocaleString()} kg
                                </p>
                              </div>
                            )}
                            {potkocsi.celallomas && (
                              <div>
                                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Célállomás:</span>
                                <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                  {potkocsi.celallomas}
                                </p>
                              </div>
                            )}
                            {potkocsi.indulasIdeje && (
                              <div>
                                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Indulás:</span>
                                <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                  {potkocsi.indulasIdeje}
                                </p>
                              </div>
                            )}
                            {potkocsi.erkezesIdeje && (
                              <div>
                                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Tervezett érkezés:</span>
                                <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                                  {potkocsi.erkezesIdeje}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Állapotváltás gombok */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '15px',
                      padding: '2rem'
                    }}>
                      <h5 style={{
                        color: '#00d4aa',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        marginBottom: '1.5rem'
                      }}>
                        🔄 Állapot Módosítása
                      </h5>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem'
                      }}>
                        {['rakott', 'ures', 'szerviz', 'hibas', 'inaktiv'].map((status) => {
                          const statusColor = getStatusColor(status);
                          const isCurrentStatus = potkocsi.allapot === status;
                          
                          return (
                            <button
                              key={status}
                              onClick={() => !isCurrentStatus && handleStatusChange(potkocsi.id, status)}
                              disabled={isCurrentStatus}
                              style={{
                                background: isCurrentStatus 
                                  ? statusColor.bg
                                  : 'rgba(255, 255, 255, 0.1)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                color: isCurrentStatus 
                                  ? statusColor.color
                                  : 'rgba(255, 255, 255, 0.8)',
                                padding: '1rem 1.5rem',
                                borderRadius: '12px',
                                cursor: isCurrentStatus ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                opacity: isCurrentStatus ? 0.8 : 1,
                                textAlign: 'center'
                              }}
                              onMouseEnter={(e) => {
                                if (!isCurrentStatus) {
                                  e.currentTarget.style.background = statusColor.bg;
                                  e.currentTarget.style.color = statusColor.color;
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isCurrentStatus) {
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }
                              }}
                            >
                              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {statusColor.icon}
                              </div>
                              <div style={{ fontSize: '0.9rem' }}>
                                {statusColor.text}
                              </div>
                              {isCurrentStatus && (
                                <div style={{ fontSize: '0.7rem', marginTop: '0.3rem', opacity: 0.8 }}>
                                  (Jelenlegi)
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}

            {!selectedTrailer && (
              <div style={{
                textAlign: 'center',
                padding: '4rem',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚚</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Válasszon egy pótkocsit</h3>
                <p>A részletes információk megtekintéséhez válasszon ki egy pótkocsit a fenti listából.</p>
              </div>
            )}
          </div>
        )}

        {activeView === 'history' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '3rem'
            }}>
              📚 Állapotváltozási Előzmények
            </h3>

            {/* Előzmények táblázat */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              overflow: 'hidden'
            }}>
              {/* Fejléc */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 2fr',
                gap: '1rem',
                padding: '1.5rem',
                background: 'rgba(0, 212, 170, 0.2)',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#00d4aa'
              }}>
                <div>🚚 Pótkocsi</div>
                <div>📊 Régi Állapot</div>
                <div>🔄 Új Állapot</div>
                <div>📅 Dátum</div>
                <div>⏰ Idő</div>
                <div>👤 Felhasználó</div>
                <div>📝 Megjegyzés</div>
              </div>

              {/* Adatok */}
              {statusHistory.map((record, index) => {
                const regiStatus = getStatusColor(record.regiallapot);
                const ujStatus = getStatusColor(record.ujallapot);
                const potkocsi = potkocsik.find(p => p.id === record.potkocsId);
                
                return (
                  <div
                    key={record.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 2fr',
                      gap: '1rem',
                      padding: '1.5rem',
                      borderBottom: index < statusHistory.length - 1 
                        ? '1px solid rgba(255, 255, 255, 0.1)' 
                        : 'none',
                      fontSize: '0.95rem',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>🚚</span>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>
                        {potkocsi?.rendszam || record.potkocsId}
                      </span>
                    </div>

                    <div style={{
                      background: regiStatus.bg,
                      color: regiStatus.color,
                      padding: '0.4rem 0.8rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}>
                      {regiStatus.icon} {regiStatus.text}
                    </div>

                    <div style={{
                      background: ujStatus.bg,
                      color: ujStatus.color,
                      padding: '0.4rem 0.8rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}>
                      {ujStatus.icon} {ujStatus.text}
                    </div>

                    <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {record.datum}
                    </div>

                    <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {record.ido}
                    </div>

                    <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {record.felhasznalo}
                    </div>

                    <div style={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem'
                    }}>
                      {record.megjegyzes}
                    </div>
                  </div>
                );
              })}

              {statusHistory.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nincs állapotváltozási előzmény</h3>
                  <p>Az állapotváltozások itt fognak megjelenni.</p>
                </div>
              )}
            </div>

            {/* Export gomb */}
            <div style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                color: 'white',
                padding: '1.2rem 2.5rem',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}>
                📊 Excel Export
              </button>
            </div>
          </div>
        )}

        {activeView === 'map' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '3rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '3rem'
            }}>
              🗺️ Pótkocsi Térképes Megjelenítés
            </h3>

            {/* Térkép placeholder */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              padding: '4rem',
              textAlign: 'center',
              marginBottom: '3rem',
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px dashed rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🗺️</div>
              <h4 style={{
                color: '#00d4aa',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1rem'
              }}>
                Interaktív Térkép
              </h4>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                lineHeight: 1.6
              }}>
                Itt jelennek meg a pótkocsik valós idejű pozíciói GPS koordináták alapján. 
                A térkép integrációja a következő fejlesztési fázisban kerül implementálásra.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '15px',
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '2rem'
              }}>
                🚧 Fejlesztés alatt
              </div>
            </div>

            {/* Pótkocsi pozíciók lista */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '20px',
              padding: '2rem'
            }}>
              <h4 style={{
                color: '#00d4aa',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '2rem'
              }}>
                📍 Jelenlegi Pozíciók
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '1.5rem'
              }}>
                {potkocsik.map((potkocsi) => {
                  const statusInfo = getStatusColor(potkocsi.allapot);
                  return (
                    <div key={potkocsi.id} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <h5 style={{
                          color: '#ffffff',
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          margin: 0
                        }}>
                          🚚 {potkocsi.rendszam}
                        </h5>
                        <div style={{
                          background: statusInfo.bg,
                          color: statusInfo.color,
                          padding: '0.3rem 0.8rem',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          {statusInfo.icon} {statusInfo.text}
                        </div>
                      </div>

                      <div style={{
                        display: 'grid',
                        gap: '0.8rem',
                        fontSize: '0.9rem'
                      }}>
                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>📍 Helyszín:</span>
                          <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                            {potkocsi.helyszin || 'Ismeretlen'}
                          </p>
                        </div>

                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>🌐 GPS koordináták:</span>
                          <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                            {potkocsi.gps.lat.toFixed(4)}, {potkocsi.gps.lng.toFixed(4)}
                          </p>
                        </div>

                        {potkocsi.soforNev && (
                          <div>
                            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>👤 Sofőr:</span>
                            <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                              {potkocsi.soforNev}
                            </p>
                          </div>
                        )}

                        <div>
                          <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>⏰ Frissítve:</span>
                          <p style={{ color: '#ffffff', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                            {potkocsi.utolsoFrissites}
                          </p>
                        </div>
                      </div>

                      <button style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        padding: '0.8rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        marginTop: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #00d4aa, #00a0db)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      }}
                      >
                        🗺️ Megjelenítés térképen
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Gyors műveletek floating gomb */}
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000
        }}>
          <button style={{
            background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0, 212, 170, 0.4)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 212, 170, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 170, 0.4)';
          }}
          onClick={() => window.location.reload()}
          title="Frissítés"
          >
            🔄
          </button>
        </div>
      </main>
    </div>
  );
}

export default TrailerStatus;
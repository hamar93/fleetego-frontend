'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Interfészek
interface Sofor {
  id: string;
  nev: string;
  telefonszam: string;
  email: string;
  jogositvany: string;
  jogositvanyLejarat: string;
  szuletesiDatum: string;
  lakcim: string;
  allapot: 'aktiv' | 'pihen' | 'szabadsag' | 'betegseg' | 'inaktiv';
  vontatoId?: string;
  profilKep?: string;
  munkaidoNyilvantartas: WorkLog[];
  teljesitmenyStatisztika: PerformanceStats;
  createdAt: string;
  updatedAt: string;
}

interface WorkLog {
  id: string;
  soforId: string;
  datum: string;
  vezetesMentes: number;
  pihenoido: number;
  szabadsag: boolean;
  betegseg: boolean;
  helyszin?: string;
  megjegyzes?: string;
}

interface PerformanceStats {
  osszesKilometer: number;
  osszesOra: number;
  atlagFogyasztas: number;
  idokbenTeljesites: number;
  biztonsagiPontszam: number;
  ugyfelElegedettseg: number;
  osszesUt: number;
  teljesitettUtak: number;
}

interface Vontato {
  id: string;
  rendszam: string;
  tipus: string;
  allapot: 'aktiv' | 'szerviz' | 'hibas' | 'inaktiv';
  soforId?: string;
  potkocsiId?: string;
}

interface AssignmentRecord {
  id: string;
  soforNev: string;
  vontatoId: string;
  datumTol: string;
  datumIg: string | null;
  status: 'aktiv' | 'lezart';
  km: number;
  megjegyzes: string;
}

function DriversAssignment() {
  const [assignmentView, setAssignmentView] = useState<'overview' | 'assign' | 'history'>('overview');
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [assignmentHistory, setAssignmentHistory] = useState<AssignmentRecord[]>([]);
  const [soforok, setSoforok] = useState<Sofor[]>([]);
  const [vontatók, setVontatók] = useState<Vontato[]>([]);

  useEffect(() => {
    // Sofőr mintaadatok betöltése
    const mintaSoforok: Sofor[] = [
      {
        id: '1',
        nev: 'Kovács József',
        telefonszam: '+36 30 123 4567',
        email: 'kovacs.jozsef@fleetego.hu',
        jogositvany: 'C+E',
        jogositvanyLejarat: '2026-08-15',
        szuletesiDatum: '1985-03-12',
        lakcim: '4000 Debrecen, Petőfi tér 1.',
        allapot: 'aktiv',
        vontatoId: 'HU-123-AB',
        profilKep: '👨‍💼',
        munkaidoNyilvantartas: [],
        teljesitmenyStatisztika: {
          osszesKilometer: 125000,
          osszesOra: 2400,
          atlagFogyasztas: 6.8,
          idokbenTeljesites: 95,
          biztonsagiPontszam: 92,
          ugyfelElegedettseg: 4.7,
          osszesUt: 156,
          teljesitettUtak: 148
        },
        createdAt: '2024-01-15',
        updatedAt: '2025-01-17'
      },
      {
        id: '2',
        nev: 'Nagy Péter',
        telefonszam: '+36 30 987 6543',
        email: 'nagy.peter@fleetego.hu',
        jogositvany: 'C+E',
        jogositvanyLejarat: '2025-12-03',
        szuletesiDatum: '1978-11-08',
        lakcim: '1010 Budapest, Váci út 45.',
        allapot: 'aktiv',
        vontatoId: 'HU-456-CD',
        profilKep: '👨‍🦳',
        munkaidoNyilvantartas: [],
        teljesitmenyStatisztika: {
          osszesKilometer: 180000,
          osszesOra: 3200,
          atlagFogyasztas: 7.2,
          idokbenTeljesites: 88,
          biztonsagiPontszam: 85,
          ugyfelElegedettseg: 4.5,
          osszesUt: 203,
          teljesitettUtak: 179
        },
        createdAt: '2023-08-20',
        updatedAt: '2025-01-16'
      },
      {
        id: '3',
        nev: 'Szabó Mária',
        telefonszam: '+36 30 555 1234',
        email: 'szabo.maria@fleetego.hu',
        jogositvany: 'C+E',
        jogositvanyLejarat: '2027-04-22',
        szuletesiDatum: '1990-07-25',
        lakcim: '6720 Szeged, Dóm tér 12.',
        allapot: 'pihen',
        vontatoId: 'HU-789-EF',
        profilKep: '👩‍💼',
        munkaidoNyilvantartas: [],
        teljesitmenyStatisztika: {
          osszesKilometer: 95000,
          osszesOra: 1800,
          atlagFogyasztas: 6.5,
          idokbenTeljesites: 97,
          biztonsagiPontszam: 96,
          ugyfelElegedettseg: 4.9,
          osszesUt: 112,
          teljesitettUtak: 109
        },
        createdAt: '2024-06-10',
        updatedAt: '2025-01-17'
      },
      {
        id: '4',
        nev: 'Horváth András',
        telefonszam: '+36 30 333 4444',
        email: 'horvath.andras@fleetego.hu',
        jogositvany: 'C+E',
        jogositvanyLejarat: '2026-03-15',
        szuletesiDatum: '1988-05-20',
        lakcim: '3300 Eger, Dobó tér 5.',
        allapot: 'aktiv',
        profilKep: '👨‍🏭',
        munkaidoNyilvantartas: [],
        teljesitmenyStatisztika: {
          osszesKilometer: 87000,
          osszesOra: 1650,
          atlagFogyasztas: 6.4,
          idokbenTeljesites: 94,
          biztonsagiPontszam: 88,
          ugyfelElegedettseg: 4.6,
          osszesUt: 98,
          teljesitettUtak: 92
        },
        createdAt: '2024-04-22',
        updatedAt: '2025-01-17'
      }
    ];

    const mintaVontatok: Vontato[] = [
      { id: 'HU-123-AB', rendszam: 'HU-123-AB', tipus: 'Volvo FH16', allapot: 'aktiv', soforId: '1' },
      { id: 'HU-456-CD', rendszam: 'HU-456-CD', tipus: 'Scania R500', allapot: 'aktiv', soforId: '2' },
      { id: 'HU-789-EF', rendszam: 'HU-789-EF', tipus: 'Mercedes Actros', allapot: 'aktiv', soforId: '3' },
      { id: 'HU-321-GH', rendszam: 'HU-321-GH', tipus: 'MAN TGX', allapot: 'szerviz' },
      { id: 'HU-555-XY', rendszam: 'HU-555-XY', tipus: 'DAF XF', allapot: 'aktiv' },
      { id: 'HU-777-ZZ', rendszam: 'HU-777-ZZ', tipus: 'Iveco Stralis', allapot: 'aktiv' }
    ];

    // Assignment history mintaadatok
    const mintaHistory: AssignmentRecord[] = [
      {
        id: '1',
        soforNev: 'Kovács József',
        vontatoId: 'HU-123-AB',
        datumTol: '2025-01-15',
        datumIg: null,
        status: 'aktiv',
        km: 1245,
        megjegyzes: 'Rendszeres hozzárendelés - hosszú távú'
      },
      {
        id: '2',
        soforNev: 'Nagy Péter',
        vontatoId: 'HU-456-CD',
        datumTol: '2025-01-10',
        datumIg: null,
        status: 'aktiv',
        km: 2156,
        megjegyzes: 'Nemzetközi útvonalakhoz optimális'
      },
      {
        id: '3',
        soforNev: 'Szabó Mária',
        vontatoId: 'HU-789-EF',
        datumTol: '2025-01-12',
        datumIg: null,
        status: 'aktiv',
        km: 890,
        megjegyzes: 'Tapasztalt sofőr - prémium jármű'
      },
      {
        id: '4',
        soforNev: 'Tóth László',
        vontatoId: 'HU-321-GH',
        datumTol: '2024-12-20',
        datumIg: '2025-01-08',
        status: 'lezart',
        km: 3420,
        megjegyzes: 'Lezárva - jármű szervizre került'
      }
    ];

    setSoforok(mintaSoforok);
    setVontatók(mintaVontatok);
    setAssignmentHistory(mintaHistory);
  }, []);

  // Helper functions
  const handleAssignment = () => {
    if (!selectedDriver || !selectedVehicle) {
      alert('Kérjük válasszon sofőrt és vontatót!');
      return;
    }

    const newAssignment: AssignmentRecord = {
      id: Date.now().toString(),
      soforNev: soforok.find(s => s.id === selectedDriver)?.nev || '',
      vontatoId: selectedVehicle,
      datumTol: new Date().toISOString().split('T')[0],
      datumIg: null,
      status: 'aktiv',
      km: 0,
      megjegyzes: 'Új hozzárendelés a rendszerből'
    };

    setAssignmentHistory(prev => [newAssignment, ...prev]);
    
    setSoforok(prev => prev.map(sofor => 
      sofor.id === selectedDriver 
        ? { ...sofor, vontatoId: selectedVehicle }
        : { ...sofor, vontatoId: sofor.vontatoId === selectedVehicle ? undefined : sofor.vontatoId }
    ));

    setVontatók(prev => prev.map(vontato => 
      vontato.id === selectedVehicle 
        ? { ...vontato, soforId: selectedDriver }
        : { ...vontato, soforId: vontato.soforId === selectedDriver ? undefined : vontato.soforId }
    ));

    setSelectedDriver('');
    setSelectedVehicle('');
    setAssignmentView('overview');
    
    alert('Hozzárendelés sikeresen létrehozva!');
  };

  const getAvailableDrivers = () => {
    return soforok.filter(sofor => 
      sofor.allapot === 'aktiv' || sofor.allapot === 'pihen'
    );
  };

  const getAvailableVehicles = () => {
    return vontatók.filter(vontato => 
      vontato.allapot === 'aktiv' && !vontato.soforId
    );
  };

  const getCurrentAssignments = () => {
    return soforok
      .filter(sofor => sofor.vontatoId)
      .map(sofor => {
        const vontato = vontatók.find(v => v.id === sofor.vontatoId);
        return {
          sofor,
          vontato,
          assignmentDate: assignmentHistory.find(h => 
            h.soforNev === sofor.nev && h.vontatoId === sofor.vontatoId && h.status === 'aktiv'
          )?.datumTol || 'Ismeretlen'
        };
      });
  };

  const handleUnassign = (soforId: string, vontatoId: string) => {
    if (confirm('Biztosan megszünteti a hozzárendelést?')) {
      setAssignmentHistory(prev => prev.map(h => 
        h.soforNev === soforok.find(s => s.id === soforId)?.nev && h.vontatoId === vontatoId && h.status === 'aktiv'
          ? { ...h, status: 'lezart', datumIg: new Date().toISOString().split('T')[0] }
          : h
      ));

      setSoforok(prev => prev.map(sofor => 
        sofor.id === soforId ? { ...sofor, vontatoId: undefined } : sofor
      ));

      setVontatók(prev => prev.map(vontato => 
        vontato.id === vontatoId ? { ...vontato, soforId: undefined } : vontato
      ));
    }
  };

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
              <span style={{ color: '#ffffff' }}>Sofőrök és Vontatók Hozzárendelése</span>
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
            🚛 Sofőrök és Vontatók Hozzárendelése
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2.5rem',
            fontSize: '1.2rem',
            fontWeight: 500
          }}>
            Sofőrök és vontatók párosítása, hozzárendelések kezelése és csere valós időben
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
              { id: 'assign', label: '➕ Új Hozzárendelés' },
              { id: 'history', label: '📚 Előzmények' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAssignmentView(tab.id as any)}
                style={{
                  background: assignmentView === tab.id ? 'linear-gradient(135deg, #00d4aa, #00a0db)' : 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: assignmentView === tab.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: assignmentView === tab.id ? '0 8px 32px rgba(0, 212, 170, 0.3)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {assignmentView === 'overview' && (
          <div>
            {/* Statisztikák */}
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
                  {getCurrentAssignments().length}
                </h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Aktív Hozzárendelés</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}>
                <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                  {getAvailableDrivers().length}
                </h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Elérhető Sofőr</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
              }}>
                <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                  {getAvailableVehicles().length}
                </h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Szabad Vontató</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)'
              }}>
                <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                  {Math.round((getCurrentAssignments().length / vontatók.filter(v => v.allapot === 'aktiv').length) * 100)}%
                </h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Kihasználtság</p>
              </div>
            </div>

            {/* Jelenlegi hozzárendelések */}
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
                🔗 Aktív Hozzárendelések
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '2rem'
              }}>
                {getCurrentAssignments().map((assignment, index) => (
                  <div key={index} style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '2px solid rgba(0, 212, 170, 0.3)'
                  }}>
                    {/* Sofőr info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        {assignment.sofor.profilKep}
                      </div>
                      <div>
                        <h4 style={{
                          color: '#ffffff',
                          fontSize: '1.3rem',
                          fontWeight: 600,
                          marginBottom: '0.3rem'
                        }}>
                          {assignment.sofor.nev}
                        </h4>
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '1rem'
                        }}>
                          {assignment.sofor.telefonszam}
                        </p>
                      </div>
                    </div>

                    {/* Kapcsolat ikon */}
                    <div style={{
                      textAlign: 'center',
                      margin: '1.5rem 0',
                      fontSize: '2rem'
                    }}>
                      🔗
                    </div>

                    {/* Vontató info */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{
                        color: '#ffffff',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem'
                      }}>
                        🚛 {assignment.vontato?.rendszam}
                      </h4>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        {assignment.vontato?.tipus}
                      </p>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.9rem'
                      }}>
                        Hozzárendelve: {assignment.assignmentDate}
                      </p>
                    </div>

                    {/* Műveletek */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => handleUnassign(assignment.sofor.id, assignment.sofor.vontatoId!)}
                        style={{
                          background: 'linear-gradient(135deg, #ff4757, #ff3742)',
                          border: 'none',
                          color: 'white',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 600,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ❌ Megszüntet
                      </button>
                      <button
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 600,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ✏️ Szerkeszt
                      </button>
                    </div>
                  </div>
                ))}

                {getCurrentAssignments().length === 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '4rem',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔗</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nincs aktív hozzárendelés</h3>
                    <p>Kezdjen el egy új hozzárendelést a fenti gombbal!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Gyors hozzárendelés gomb */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setAssignmentView('assign')}
                style={{
                  background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                  border: 'none',
                  color: 'white',
                  padding: '1.5rem 3rem',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                ➕ Új Hozzárendelés Létrehozása
              </button>
            </div>
          </div>
        )}

        {assignmentView === 'assign' && (
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
              ➕ Új Hozzárendelés Létrehozása
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem',
              marginBottom: '3rem'
            }}>
              {/* Sofőr kiválasztás */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1.5rem',
                  fontSize: '1.3rem',
                  fontWeight: 600
                }}>
                  👤 Sofőr kiválasztása
                </label>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}>
                  {getAvailableDrivers().map((sofor) => (
                    <div
                      key={sofor.id}
                      onClick={() => setSelectedDriver(sofor.id)}
                      style={{
                        background: selectedDriver === sofor.id 
                          ? 'linear-gradient(135deg, #00d4aa, #00a0db)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: selectedDriver === sofor.id 
                            ? 'rgba(255, 255, 255, 0.2)' 
                            : 'linear-gradient(135deg, #00d4aa, #00a0db)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}>
                          {sofor.profilKep}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            color: '#ffffff',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem'
                          }}>
                            {sofor.nev}
                          </h4>
                          <p style={{
                            color: selectedDriver === sofor.id 
                              ? 'rgba(255, 255, 255, 0.8)' 
                              : 'rgba(255, 255, 255, 0.6)',
                            fontSize: '1rem'
                          }}>
                            {sofor.jogositvany} • {sofor.allapot}
                          </p>
                        </div>
                        {selectedDriver === sofor.id && (
                          <div style={{
                            color: 'white',
                            fontSize: '1.5rem'
                          }}>
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vontató kiválasztás */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1.5rem',
                  fontSize: '1.3rem',
                  fontWeight: 600
                }}>
                  🚛 Vontató kiválasztása
                </label>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}>
                  {getAvailableVehicles().map((vontato) => (
                    <div
                      key={vontato.id}
                      onClick={() => setSelectedVehicle(vontato.id)}
                      style={{
                        background: selectedVehicle === vontato.id 
                          ? 'linear-gradient(135deg, #00d4aa, #00a0db)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: selectedVehicle === vontato.id 
                            ? 'rgba(255, 255, 255, 0.2)' 
                            : 'linear-gradient(135deg, #667eea, #764ba2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}>
                          🚛
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            color: '#ffffff',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem'
                          }}>
                            {vontato.rendszam}
                          </h4>
                          <p style={{
                            color: selectedVehicle === vontato.id 
                              ? 'rgba(255, 255, 255, 0.8)' 
                              : 'rgba(255, 255, 255, 0.6)',
                            fontSize: '1rem'
                          }}>
                            {vontato.tipus}
                          </p>
                        </div>
                        {selectedVehicle === vontato.id && (
                          <div style={{
                            color: 'white',
                            fontSize: '1.5rem'
                          }}>
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hozzárendelés előnézet */}
            {selectedDriver && selectedVehicle && (
              <div style={{
                background: 'rgba(0, 212, 170, 0.1)',
                border: '2px solid rgba(0, 212, 170, 0.3)',
                borderRadius: '20px',
                padding: '3rem',
                marginBottom: '3rem'
              }}>
                <h4 style={{
                  color: '#00d4aa',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '2rem'
                }}>
                  🔍 Hozzárendelés Előnézete
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '3rem',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '3rem',
                      marginBottom: '1rem'
                    }}>
                      {soforok.find(s => s.id === selectedDriver)?.profilKep}
                    </div>
                    <h5 style={{
                      color: '#ffffff',
                      fontSize: '1.3rem',
                      fontWeight: 600
                    }}>
                      {soforok.find(s => s.id === selectedDriver)?.nev}
                    </h5>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    fontSize: '3rem'
                  }}>
                    🔗
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '3rem',
                      marginBottom: '1rem'
                    }}>
                      🚛
                    </div>
                    <h5 style={{
                      color: '#ffffff',
                      fontSize: '1.3rem',
                      fontWeight: 600
                    }}>
                      {vontatók.find(v => v.id === selectedVehicle)?.rendszam}
                    </h5>
                  </div>
                </div>
              </div>
            )}

            {/* Műveletek */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setAssignmentView('overview')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                ❌ Mégse
              </button>
              <button
                onClick={handleAssignment}
                disabled={!selectedDriver || !selectedVehicle}
                style={{
                  background: selectedDriver && selectedVehicle
                    ? 'linear-gradient(135deg, #00d4aa, #00a0db)'
                    : 'rgba(128, 128, 128, 0.3)',
                  border: 'none',
                  color: 'white',
                  padding: '1.2rem 2.5rem',
                  borderRadius: '15px',
                  cursor: selectedDriver && selectedVehicle ? 'pointer' : 'not-allowed',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: selectedDriver && selectedVehicle 
                    ? '0 8px 32px rgba(0, 212, 170, 0.3)' 
                    : 'none',
                  opacity: selectedDriver && selectedVehicle ? 1 : 0.6,
                  transition: 'all 0.3s ease'
                }}
              >
                ✅ Hozzárendelés Létrehozása
              </button>
            </div>
          </div>
        )}

        {assignmentView === 'history' && (
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
              📚 Hozzárendelési Előzmények
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
                gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 3fr',
                gap: '1rem',
                padding: '1.5rem',
                background: 'rgba(0, 212, 170, 0.2)',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#00d4aa'
              }}>
                <div>👤 Sofőr</div>
                <div>🚛 Vontató</div>
                <div>📅 Kezdet</div>
                <div>📅 Vége</div>
                <div>📊 Státusz</div>
                <div>📝 Megjegyzés</div>
              </div>

              {/* Adatok */}
              {assignmentHistory.map((record, index) => (
                <div
                  key={record.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 3fr',
                    gap: '1rem',
                    padding: '1.5rem',
                    borderBottom: index < assignmentHistory.length - 1 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : 'none',
                    fontSize: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <div style={{
                      width: '35px',
                      height: '35px',
                      background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem'
                    }}>
                      {soforok.find(s => s.nev === record.soforNev)?.profilKep || '👤'}
                    </div>
                    <span style={{ color: '#ffffff' }}>{record.soforNev}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>🚛</span>
                    <span style={{ color: '#ffffff' }}>{record.vontatoId}</span>
                  </div>

                  <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {record.datumTol}
                  </div>

                  <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {record.datumIg || 'Folyamatban'}
                  </div>

                  <div>
                    <span style={{
                      background: record.status === 'aktiv' 
                        ? 'rgba(0, 255, 136, 0.25)' 
                        : 'rgba(255, 71, 87, 0.25)',
                      color: record.status === 'aktiv' ? '#00ff88' : '#ff4757',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      {record.status === 'aktiv' ? '🟢 Aktív' : '🔴 Lezárt'}
                    </span>
                  </div>

                  <div style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem'
                  }}>
                    {record.megjegyzes}
                  </div>
                </div>
              ))}

              {assignmentHistory.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nincs hozzárendelési előzmény</h3>
                  <p>Az első hozzárendelések itt fognak megjelenni.</p>
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
      </main>
    </div>
  );
}

export default DriversAssignment;
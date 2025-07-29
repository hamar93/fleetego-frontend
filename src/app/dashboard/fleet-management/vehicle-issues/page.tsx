'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Interfészek
interface HibaBejelentes {
  id: string;
  bejelentoId: string;
  bejelentoNev: string;
  jarmuId: string;
  jarmuTipus: 'vontato' | 'potkocsi'; // JAVÍTÁS: hiányzó |
  jarmuRendszam: string;
  hibaTipus: string;
  sulyossag: 'alacsony' | 'kozepes' | 'magas' | 'kritikus';
  leiras: string;
  helyszin: string;
  gpsKoordinatak: {
    lat: number;
    lng: number;
  };
  kepek: string[];
  allapot: 'uj' | 'folyamatban' | 'megoldva' | 'elutasitva';
  prioritas: number;
  bejelentesIdeje: string;
  megoldasIdeje?: string;
  megoldasLeiras?: string;
  szervizPartnerId?: string;
  szervizPartnerNev?: string;
  koltsegBecslese?: number;
  javitasIdotartama?: number;
  kapcsolodoFuvarId?: string;
  createdAt: string;
  updatedAt: string;
}

interface Jarmu {
  id: string;
  rendszam: string;
  tipus: 'vontato' | 'potkocsi';
  gyarto: string;
  modell: string;
  soforId?: string;
  soforNev?: string;
  allapot: 'aktiv' | 'hibas' | 'szerviz' | 'inaktiv';
}

interface HibaTipus {
  kategoria: string;
  hibak: string[];
  ikon: string;
}

function VehicleIssues() {
  const [activeView, setActiveView] = useState<'overview' | 'report' | 'details' | 'statistics'>('overview');
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'osszes' | 'uj' | 'folyamatban' | 'megoldva' | 'elutasitva'>('osszes');
  const [filterSeverity, setFilterSeverity] = useState<'osszes' | 'alacsony' | 'kozepes' | 'magas' | 'kritikus'>('osszes');
  const [hibaBejelentesek, setHibaBejelentesek] = useState<HibaBejelentes[]>([]);
  const [jarmuvek, setJarmuvek] = useState<Jarmu[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  // JAVÍTÁS: ujBejelentes típusdefiníció bővítése
  const [ujBejelentes, setUjBejelentes] = useState<{
    jarmuId: string;
    hibaTipus: string;
    sulyossag: 'alacsony' | 'kozepes' | 'magas' | 'kritikus';
    leiras: string;
    helyszin: string;
    kepek: string[];
  }>({
    jarmuId: '',
    hibaTipus: '',
    sulyossag: 'kozepes',
    leiras: '',
    helyszin: '',
    kepek: []
  });

  // ...hibaTipusok és useEffect változatlan...

  useEffect(() => {
    // Mintaadatok betöltése
    const mintaJarmuvek: Jarmu[] = [
      { id: '1', rendszam: 'HU-123-AB', tipus: 'vontato', gyarto: 'Volvo', modell: 'FH16', soforId: '1', soforNev: 'Kovács József', allapot: 'aktiv' },
      { id: '2', rendszam: 'HU-456-CD', tipus: 'vontato', gyarto: 'Scania', modell: 'R500', soforId: '2', soforNev: 'Nagy Péter', allapot: 'aktiv' },
      { id: '3', rendszam: 'HU-789-EF', tipus: 'vontato', gyarto: 'Mercedes', modell: 'Actros', soforId: '3', soforNev: 'Szabó Mária', allapot: 'hibas' },
      { id: '4', rendszam: 'HU-PK-001', tipus: 'potkocsi', gyarto: 'Schmitz', modell: 'Cargobull', soforId: '1', soforNev: 'Kovács József', allapot: 'aktiv' },
      { id: '5', rendszam: 'HU-PK-002', tipus: 'potkocsi', gyarto: 'Krone', modell: 'Cool Liner', soforId: '2', soforNev: 'Nagy Péter', allapot: 'aktiv' },
      { id: '6', rendszam: 'HU-PK-003', tipus: 'potkocsi', gyarto: 'Kögel', modell: 'Cargo', soforId: '3', soforNev: 'Szabó Mária', allapot: 'szerviz' }
    ];

    const mintaHibaBejelentesek: HibaBejelentes[] = [
      // ...mintaadatok változatlan...
    ];

    setJarmuvek(mintaJarmuvek);
    setHibaBejelentesek(mintaHibaBejelentesek);
  }, []);

  // Helper functions
  const getSeverityColor = (sulyossag: 'alacsony' | 'kozepes' | 'magas' | 'kritikus') => {
    switch (sulyossag) {
      case 'alacsony':
        return { bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', color: '#ffffff', icon: '🟢', text: 'Alacsony' };
      case 'kozepes':
        return { bg: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#ffffff', icon: '🟡', text: 'Közepes' };
      case 'magas':
        return { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', color: '#ffffff', icon: '🟠', text: 'Magas' };
      case 'kritikus':
        return { bg: 'linear-gradient(135deg, #ff4757, #ff3742)', color: '#ffffff', icon: '🔴', text: 'Kritikus' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', icon: '⚪', text: 'Ismeretlen' };
    }
  };

  const getStatusColor = (allapot: 'uj' | 'folyamatban' | 'megoldva' | 'elutasitva') => {
    switch (allapot) {
      case 'uj':
        return { bg: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#ffffff', icon: '🆕', text: 'Új' };
      case 'folyamatban':
        return { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', color: '#ffffff', icon: '⚙️', text: 'Folyamatban' };
      case 'megoldva':
        return { bg: 'linear-gradient(135deg, #00d4aa, #00a0db)', color: '#ffffff', icon: '✅', text: 'Megoldva' };
      case 'elutasitva':
        return { bg: 'linear-gradient(135deg, #ff4757, #ff3742)', color: '#ffffff', icon: '❌', text: 'Elutasítva' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', icon: '❓', text: 'Ismeretlen' };
    }
  };

  // JAVÍTÁS: handleNewReport típushiba javítás
  const handleNewReport = () => {
    if (!ujBejelentes.jarmuId || !ujBejelentes.hibaTipus || !ujBejelentes.leiras) {
      alert('Kérjük töltse ki az összes kötelező mezőt!');
      return;
    }

    const jarmu = jarmuvek.find(j => j.id === ujBejelentes.jarmuId);
    if (!jarmu) return;

    const ujHiba: HibaBejelentes = {
      id: Date.now().toString(),
      bejelentoId: 'admin',
      bejelentoNev: 'Admin Felhasználó',
      jarmuId: ujBejelentes.jarmuId,
      jarmuTipus: jarmu.tipus,
      jarmuRendszam: jarmu.rendszam,
      hibaTipus: ujBejelentes.hibaTipus,
      sulyossag: ujBejelentes.sulyossag,
      leiras: ujBejelentes.leiras,
      helyszin: ujBejelentes.helyszin || 'Központi Telephely',
      gpsKoordinatak: { lat: 47.4979, lng: 19.0402 },
      kepek: ujBejelentes.kepek,
      allapot: 'uj',
      prioritas: ujBejelentes.sulyossag === 'kritikus' ? 10 : ujBejelentes.sulyossag === 'magas' ? 8 : ujBejelentes.sulyossag === 'kozepes' ? 5 : 2,
      bejelentesIdeje: new Date().toLocaleString('hu-HU'),
      createdAt: new Date().toLocaleString('hu-HU'),
      updatedAt: new Date().toLocaleString('hu-HU')
    };

    setHibaBejelentesek(prev => [ujHiba, ...prev]);
    setJarmuvek(prev => prev.map(j =>
      j.id === ujBejelentes.jarmuId
        ? { ...j, allapot: ujBejelentes.sulyossag === 'kritikus' || ujBejelentes.sulyossag === 'magas' ? 'hibas' : j.allapot }
        : j
    ));

    setUjBejelentes({
      jarmuId: '',
      hibaTipus: '',
      sulyossag: 'kozepes',
      leiras: '',
      helyszin: '',
      kepek: []
    });

    setActiveView('overview');
    alert('Hibabejelentés sikeresen rögzítve!');
  };

  // JAVÍTÁS: handleStatusChange típushiba javítás
  const handleStatusChange = (hibaId: string, ujAllapot: 'uj' | 'folyamatban' | 'megoldva' | 'elutasitva') => {
    setHibaBejelentesek(prev => prev.map(h =>
      h.id === hibaId
        ? {
            ...h,
            allapot: ujAllapot,
            updatedAt: new Date().toLocaleString('hu-HU'),
            megoldasIdeje: ujAllapot === 'megoldva' ? new Date().toLocaleString('hu-HU') : h.megoldasIdeje
          }
        : h
    ));

    const hiba = hibaBejelentesek.find(h => h.id === hibaId);
    if (hiba && ujAllapot === 'megoldva') {
      setJarmuvek(prev => prev.map(j =>
        j.id === hiba.jarmuId ? { ...j, allapot: 'aktiv' } : j
      ));
    }

    alert(`Hibabejelentés állapota módosítva: ${ujAllapot}`);
  };

  const getFilteredIssues = () => {
    let filtered = hibaBejelentesek;

    if (filterStatus !== 'osszes') {
      filtered = filtered.filter(h => h.allapot === filterStatus);
    }

    if (filterSeverity !== 'osszes') {
      filtered = filtered.filter(h => h.sulyossag === filterSeverity);
    }

    if (searchTerm) {
      filtered = filtered.filter(h =>
        h.jarmuRendszam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.hibaTipus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.bejelentoNev.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.leiras.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.prioritas - a.prioritas);
  };

  const getStatistics = () => {
    const total = hibaBejelentesek.length;
    const uj = hibaBejelentesek.filter(h => h.allapot === 'uj').length;
    const folyamatban = hibaBejelentesek.filter(h => h.allapot === 'folyamatban').length;
    const megoldva = hibaBejelentesek.filter(h => h.allapot === 'megoldva').length;
    const kritikus = hibaBejelentesek.filter(h => h.sulyossag === 'kritikus' && h.allapot !== 'megoldva').length;
    const atlagMegoldasiIdo = hibaBejelentesek
      .filter(h => h.megoldasIdeje)
      .reduce((acc, h) => acc + (h.javitasIdotartama || 0), 0) /
      (hibaBejelentesek.filter(h => h.megoldasIdeje).length || 1);

    return { total, uj, folyamatban, megoldva, kritikus, atlagMegoldasiIdo: Math.round(atlagMegoldasiIdo * 10) / 10 };
  };

  const stats = getStatistics();

  // JAVÍTÁS: hibatyípusok definiálása
  const hibaTipusok: HibaTipus[] = [
    {
      kategoria: 'Motor és hajtáslánc',
      ikon: '🔧',
      hibak: ['Motor túlmelegedés', 'Olajszivárgás', 'Hűtőfolyadék szivárgás', 'Kipufogó probléma', 'Turbó hiba', 'Váltó probléma']
    },
    {
      kategoria: 'Fékrendszer',
      ikon: '🛑',
      hibak: ['Fékbetét kopás', 'Fékfolyadék szivárgás', 'Levegős fék hiba', 'ABS hiba', 'Fékkorong sérülés']
    },
    {
      kategoria: 'Elektromos rendszer',
      ikon: '⚡',
      hibak: ['Akkumulátor lemerülés', 'Generátor hiba', 'Világítás meghibásodás', 'Fedélzeti elektronika', 'Biztosíték kiégés']
    },
    {
      kategoria: 'Futómű és kormányrendszer',
      ikon: '🛞',
      hibak: ['Gumidefekt', 'Felfüggesztés hiba', 'Kormányműhiba', 'Kerékcsapágy kopás', 'Lengéscsillapító']
    },
    {
      kategoria: 'Karosszéria és felépítmény',
      ikon: '🚛',
      hibak: ['Ajtó nem záródik', 'Ablak sérülés', 'Ponyva szakadás', 'Rámpa hiba', 'Hűtőkamra meghibásodás']
    },
    {
      kategoria: 'Egyéb',
      ikon: '❓',
      hibak: ['Klíma hiba', 'Fűtés probléma', 'Ülés sérülés', 'Tükör sérülés', 'Egyéb probléma']
    }
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: '#050816',
        color: '#ffffff',
        minHeight: '100vh',
        lineHeight: 1.6,
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(135deg, #050816 0%, #0a0e27 50%, #1a1a3e 100%)',
        }}
      />

      {/* Header */}
      <header
        style={{
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(30px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 2rem',
          }}
        >
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                transition: 'all 0.3s ease',
              }}
            >
              ← Vissza
            </Link>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
              }}
            >
              <Link href="/dashboard" style={{ color: '#00d4aa', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <span>/</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Alapflotta Kezelés</span>
              <span>/</span>
              <span style={{ color: '#ffffff' }}>Hiba Bejelentés</span>
            </div>
          </div>
          {/* Logo */}
          <Link
            href="/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '35px',
                height: '35px',
                background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
                fontSize: '1rem',
                color: 'white',
              }}
            >
              🚛
            </div>
            FleetEgo Agent
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {/* Page Header */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '25px',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              marginBottom: '1rem',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            🔧 Vontató/Pótkocsi Hiba Bejelentés
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2.5rem',
              fontSize: '1.2rem',
              fontWeight: 500,
            }}
          >
            Járműhibák bejelentése és kezelése sofőr részről valós időben
          </p>
          {/* Tab navigáció */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { id: 'overview', label: '👁️ Áttekintés' },
              { id: 'report', label: '➕ Új Bejelentés' },
              { id: 'details', label: '📋 Részletek' },
              { id: 'statistics', label: '📊 Statisztikák' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                style={{
                  background:
                    activeView === tab.id
                      ? 'linear-gradient(135deg, #00d4aa, #00a0db)'
                      : 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: activeView === tab.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow:
                    activeView === tab.id
                      ? '0 8px 32px rgba(0, 212, 170, 0.3)'
                      : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statisztika kártyák */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}
          >
            <h3
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: 'white',
              }}
            >
              {stats.total}
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Összes bejelentés
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
            }}
          >
            <h3
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: 'white',
              }}
            >
              {stats.megoldva}
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Megoldva
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(255, 71, 87, 0.3)',
            }}
          >
            <h3
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: 'white',
              }}
            >
              {stats.kritikus}
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Kritikus állapotú
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #ff4757, #ff3742)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(255, 71, 87, 0.3)',
            }}
          >
            <h3
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: 'white',
              }}
            >
              {stats.uj}
            </h3>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: 500,
                margin: 0,
              }}
            >
              Új bejelentés
            </p>
          </div>
        </div>

        {/* Hibák listája */}
        {activeView === 'overview' && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '3rem',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#ffffff',
              }}
            >
              Aktív Hibák
            </h2>
            {hibaBejelentesek.length === 0 && (
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Nincs aktív hiba bejelentés.
              </p>
            )}
            {getFilteredIssues().map((hiba) => {
              const severityInfo = getSeverityColor(hiba.sulyossag);
              const statusInfo = getStatusColor(hiba.allapot);
              return (
                <div
                  key={hiba.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    border: `2px solid ${statusInfo.color}`,
                  }}
                >
                  {/* Priority Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: severityInfo.bg,
                      color: severityInfo.color,
                      padding: '0.5rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {severityInfo.icon} {severityInfo.text}
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          margin: 0,
                          color: '#ffffff',
                        }}
                      >
                        {hiba.jarmuRendszam}
                      </h3>
                      <div
                        style={{
                          background: statusInfo.bg,
                          color: statusInfo.color,
                          padding: '0.5rem 1rem',
                          borderRadius: '10px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {statusInfo.icon} {statusInfo.text}
                      </div>
                    </div>
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1rem',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {hiba.leiras}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '1rem',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        Bejelentő:
                      </span>
                      <span
                        style={{
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        {hiba.bejelentoNev}
                      </span>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        Bejelentés ideje:
                      </span>
                      <span
                        style={{
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        {hiba.bejelentesIdeje}
                      </span>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                        }}
                      >
                        Utolsó frissítés:
                      </span>
                      <span
                        style={{
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        {hiba.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Új bejelentés form */}
        {activeView === 'report' && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '3rem',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: '#ffffff',
              }}
            >
              Új Hibabejelentés
            </h2>
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                🚗 Jármű kiválasztása *
              </label>
              <select
                value={ujBejelentes.jarmuId}
                onChange={(e) => setUjBejelentes((prev) => ({ ...prev, jarmuId: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                <option value="">Válasszon járművet...</option>
                {jarmuvek.map((jarmu) => (
                  <option key={jarmu.id} value={jarmu.id}>
                    {jarmu.rendszam} ({jarmu.tipus === 'vontato' ? 'Vontató' : 'Pótkocsi'})
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                🛠️ Hibajelenség típusa *
              </label>
              <select
                value={ujBejelentes.hibaTipus}
                onChange={(e) => setUjBejelentes((prev) => ({ ...prev, hibaTipus: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                <option value="">Válasszon hibátípust...</option>
                {hibaTipusok.map((tipus) => (
                  <optgroup key={tipus.kategoria} label={tipus.kategoria}>
                    {tipus.hibak.map((hiba) => (
                      <option key={hiba} value={hiba}>
                        {hiba}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                ⚠️ Sürgősség *
              </label>
              <select
                value={ujBejelentes.sulyossag}
                onChange={(e) => setUjBejelentes((prev) => ({ ...prev, sulyossag: e.target.value as any }))}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                <option value="alacsony">🟢 Alacsony</option>
                <option value="kozepes">🟡 Közepes</option>
                <option value="magas">🟠 Magas</option>
                <option value="kritikus">🔴 Kritikus</option>
              </select>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                📝 Részletes leírás *
              </label>
              <textarea
                value={ujBejelentes.leiras}
                onChange={(e) => setUjBejelentes((prev) => ({ ...prev, leiras: e.target.value }))}
                placeholder="Írja le részletesen a problémát..."
                rows={4}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 500,
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                📍 Helyszín
              </label>
              <input
                type="text"
                value={ujBejelentes.helyszin}
                onChange={(e) => setUjBejelentes((prev) => ({ ...prev, helyszin: e.target.value }))}
                placeholder="pl. M1-es autópálya 65 km, Budapest belváros..."
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                📸 Képek csatolása
              </label>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px dashed rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  Húzza ide a képeket vagy kattintson a tallózáshoz
                </p>
                <button
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    const fileName = `hiba_${Date.now()}.jpg`;
                    setUjBejelentes((prev) => ({
                      ...prev,
                      kepek: [...prev.kepek, fileName],
                    }));
                  }}
                >
                  📁 Fájlok tallózása
                </button>
              </div>
              {/* Csatolt képek listája */}
              {ujBejelentes.kepek.length > 0 && (
                <div
                  style={{
                    marginTop: '1rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <h5
                    style={{
                      color: '#00d4aa',
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: '0.8rem',
                    }}
                  >
                    Csatolt képek:
                  </h5>
                  {ujBejelentes.kepek.map((kep, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '0.8rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>📷 {kep}</span>
                      <button
                        onClick={() =>
                          setUjBejelentes((prev) => ({
                            ...prev,
                            kepek: prev.kepek.filter((_, i) => i !== index),
                          }))
                        }
                        style={{
                          background: 'rgba(255, 71, 87, 0.2)',
                          border: 'none',
                          color: '#ff4757',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Sürgősségi tippek */}
            <div
              style={{
                background: 'rgba(255, 184, 0, 0.1)',
                border: '2px solid rgba(255, 184, 0, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <h5
                style={{
                  color: '#ffb800',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                💡 Sürgősségi útmutató
              </h5>
              <ul
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  margin: 0,
                  paddingLeft: '1.2rem',
                }}
              >
                <li>
                  <strong>Kritikus hibák:</strong> Azonnali veszély, jármű nem közlekedésképes
                </li>
                <li>
                  <strong>Magas prioritás:</strong> Súlyos probléma, hamar javítandó
                </li>
                <li>
                  <strong>Közepes:</strong> Normál ütemben javítandó hiba
                </li>
                <li>
                  <strong>Alacsony:</strong> Kisebb probléma, halasztható
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Bejelentés előnézet */}
        {(ujBejelentes.jarmuId && ujBejelentes.hibaTipus && ujBejelentes.leiras) && (
          <div
            style={{
              background: 'rgba(0, 212, 170, 0.1)',
              border: '2px solid rgba(0, 212, 170, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              marginTop: '3rem',
            }}
          >
            <h4
              style={{
                color: '#00d4aa',
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              🔍 Bejelentés Előnézete
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
              }}
            >
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Jármű:</span>
                <p
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: '0.3rem 0 0 0',
                  }}
                >
                  {jarmuvek.find((j) => j.id === ujBejelentes.jarmuId)?.rendszam}{' '}
                  ({jarmuvek.find((j) => j.id === ujBejelentes.jarmuId)?.tipus === 'vontato' ? 'Vontató' : 'Pótkocsi'})
                </p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Hibatípus:</span>
                <p
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: '0.3rem 0 0 0',
                  }}
                >
                  {ujBejelentes.hibaTipus}
                </p>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Súlyosság:</span>
                <p
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    margin: '0.3rem 0 0 0',
                  }}
                >
                  {getSeverityColor(ujBejelentes.sulyossag).icon} {getSeverityColor(ujBejelentes.sulyossag).text}
                </p>
              </div>
              {ujBejelentes.helyszin && (
                <div>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Helyszín:</span>
                  <p
                    style={{
                      color: '#ffffff',
                      fontWeight: 600,
                      margin: '0.3rem 0 0 0',
                    }}
                  >
                    {ujBejelentes.helyszin}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Műveletek */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'flex-end',
            marginTop: '3rem',
          }}
        >
          <button
            onClick={() => setActiveView('overview')}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
          >
            ❌ Mégse
          </button>
          <button
            onClick={handleNewReport}
            disabled={!ujBejelentes.jarmuId || !ujBejelentes.hibaTipus || !ujBejelentes.leiras}
            style={{
              background:
                ujBejelentes.jarmuId && ujBejelentes.hibaTipus && ujBejelentes.leiras
                  ? 'linear-gradient(135deg, #00d4aa, #00a0db)'
                  : 'rgba(128, 128, 128, 0.3)',
              border: 'none',
              color: 'white',
              padding: '1.2rem 2.5rem',
              borderRadius: '15px',
              cursor: ujBejelentes.jarmuId && ujBejelentes.hibaTipus && ujBejelentes.leiras ? 'pointer' : 'not-allowed',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow:
                ujBejelentes.jarmuId && ujBejelentes.hibaTipus && ujBejelentes.leiras
                  ? '0 8px 32px rgba(0, 212, 170, 0.3)'
                  : 'none',
              opacity: ujBejelentes.jarmuId && ujBejelentes.hibaTipus && ujBejelentes.leiras ? 1 : 0.6,
              transition: 'all 0.3s ease',
            }}
          >
            ✅ Bejelentés Rögzítése
          </button>
        </div>
      </main>
    </div>
  );
}

export default VehicleIssues;
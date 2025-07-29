'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      const particleCount = 30;
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

    createParticles();

    // Focus on username field
    const usernameField = document.getElementById('username');
    if (usernameField) {
      usernameField.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        const formEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(formEvent);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === '1234') {
        setSuccess('Sikeres bejelentkezés! Átirányítás...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError('Hibás felhasználónév vagy jelszó!');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: '#050816',
      color: '#ffffff',
      lineHeight: 1.6,
      overflowX: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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

      {/* Grid Pattern */}
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
        id="particles"
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

      {/* Back to Landing Button */}
      <Link href="/" style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        color: 'rgba(255, 255, 255, 0.7)',
        padding: '1rem',
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontSize: '1.2rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        ← Vissza
      </Link>

      {/* Login Container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(40px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '30px',
        padding: '4rem',
        width: '90%',
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Shimmer Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 170, 0.1), transparent)',
          animation: 'shimmer 3s ease-in-out infinite'
        }} />

        {/* Logo */}
        <div style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #00d4aa, #00a0db)',
          borderRadius: '30px',
          margin: '0 auto 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 15px 50px rgba(0, 212, 170, 0.5)',
          fontSize: '3rem',
          color: 'white',
          animation: 'logoPulse 3s ease-in-out infinite',
          position: 'relative',
          zIndex: 2
        }}>
          🚛
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          marginBottom: '0.8rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #00d4aa 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 2
        }}>
          FleetEgo Agent
        </h1>

        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '3rem',
          fontSize: '1.2rem',
          fontWeight: 500,
          position: 'relative',
          zIndex: 2
        }}>
          AI-alapú fuvarszervező és TMS rendszer
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(255, 71, 87, 0.2)',
            border: '1px solid #ff4757',
            color: '#ff4757',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            fontWeight: 600,
            animation: 'shake 0.5s ease',
            position: 'relative',
            zIndex: 2
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div style={{
            background: 'rgba(0, 255, 136, 0.2)',
            border: '1px solid #00ff88',
            color: '#00ff88',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            fontWeight: 600,
            position: 'relative',
            zIndex: 2
          }}>
            ✅ {success}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 2 }} noValidate>
          <div style={{
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <label htmlFor="username" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '0.8rem',
              fontWeight: 600,
              fontSize: '1rem'
            }}>
              Felhasználónév
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="admin"
              autoComplete="username"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                outline: 'none',
                opacity: loading ? 0.6 : 1
              }}
            />
          </div>

          <div style={{
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <label htmlFor="password" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '0.8rem',
              fontWeight: 600,
              fontSize: '1rem'
            }}>
              Jelszó
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="1234"
              autoComplete="current-password"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                outline: 'none',
                opacity: loading ? 0.6 : 1
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? 'rgba(0, 212, 170, 0.5)' : 'linear-gradient(135deg, #00d4aa, #00a0db)',
              color: 'white',
              padding: '1.5rem',
              border: 'none',
              borderRadius: '15px',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 10px 40px rgba(0, 212, 170, 0.4)',
              marginTop: '1.5rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  borderTop: '2px solid white',
                  animation: 'spin 1s linear infinite'
                }} />
                Bejelentkezés...
              </>
            ) : (
              <>🚀 Bejelentkezés</>
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0, 212, 170, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(0, 212, 170, 0.3)',
          position: 'relative',
          zIndex: 2
        }}>
          <h4 style={{
            color: '#00d4aa',
            marginBottom: '0.5rem',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ℹ️ Timocom Demo Hozzáférés
          </h4>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: '1rem'
          }}>
            Ez egy teljesen funkcionális bemutató verzió a FleetEgo Agent Office rendszerről. 
            Minden funkció működik valós szimulált adatokkal.
          </p>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1rem',
            borderRadius: '10px',
            fontFamily: "'Courier New', monospace"
          }}>
            <p style={{
              margin: '0.3rem 0',
              fontSize: '0.95rem'
            }}>
              <strong>Felhasználónév:</strong> admin
            </p>
            <p style={{
              margin: '0.3rem 0',
              fontSize: '0.95rem'
            }}>
              <strong>Jelszó:</strong> 1234
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-20px) translateY(-20px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 15px 50px rgba(0, 212, 170, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 20px 60px rgba(0, 212, 170, 0.7); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .particle {
          animation: float 6s ease-in-out infinite;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            padding: 2.5rem;
            margin: 1rem;
          }
          
          .login-title {
            font-size: 2rem;
          }
          
          .login-logo {
            width: 100px;
            height: 100px;
          }
          
          .back-btn {
            top: 1rem;
            left: 1rem;
            padding: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
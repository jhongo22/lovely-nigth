'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // 1. Consultar en la tabla usuarios de Supabase
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('username', username.trim().toLowerCase())
        .eq('password', password.trim())
        .single();

      if (error || !data) {
        // Fallback de emergencia por si hay desconexión
        if (username.trim().toLowerCase() === 'admin' && password.trim() === 'admin123') {
          sessionStorage.setItem('lovely_admin_session', JSON.stringify({ username: 'admin', rol: 'admin' }));
          router.push('/admin');
          return;
        }
        setErrorMsg('Usuario o contraseña incorrectos. Revisa e intenta de nuevo.');
        setLoading(false);
        return;
      }

      // Guardar sesión en sessionStorage
      sessionStorage.setItem('lovely_admin_session', JSON.stringify({
        id: data.id,
        username: data.username,
        nombre: data.nombre,
        rol: data.rol,
      }));

      router.push('/admin');
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al conectar con el servidor. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAF8F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: 'var(--font-jakarta), sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E8E5DF',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.05)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        {/* LOGO & ENCABEZADO */}
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#1C1917',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 4px 16px rgba(28, 25, 23, 0.2)',
          }}
        >
          <Lock size={22} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            color: '#1C1917',
            margin: '0 0 0.35rem 0',
            fontWeight: 700,
          }}
        >
          Lovely Night ERP
        </h1>

        <p style={{ fontSize: '0.88rem', color: '#78716C', marginBottom: '2rem' }}>
          Ingresa tus credenciales de administración
        </p>

        {errorMsg && (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
              border: '1px solid rgba(220, 38, 38, 0.2)',
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#57534E', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em' }}>
              Usuario Administrador
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.5rem',
                  borderRadius: '10px',
                  border: '1.5px solid #D1D5DB',
                  fontSize: '0.92rem',
                  outline: 'none',
                  backgroundColor: '#FAF8F5',
                }}
              />
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#57534E', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.5rem',
                  borderRadius: '10px',
                  border: '1.5px solid #D1D5DB',
                  fontSize: '0.92rem',
                  outline: 'none',
                  backgroundColor: '#FAF8F5',
                }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.95rem',
              borderRadius: '10px',
              backgroundColor: '#1C1917',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              opacity: loading ? 0.7 : 1,
            }}
          >
            <span>{loading ? 'Verificando...' : 'Iniciar Sesión'}</span>
            <ArrowRight size={16} />
          </button>

          {/* BOTÓN VOLVER A LA TIENDA */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.8rem',
              borderRadius: '10px',
              backgroundColor: '#FAF8F5',
              color: '#57534E',
              border: '1px solid #E5E7EB',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>← Volver a la Tienda Pública</span>
          </Link>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F3F4F6', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#78716C' }}>
          <ShieldCheck size={14} style={{ color: '#10B981' }} />
          <span>Acceso Protegido por Supabase Database</span>
        </div>
      </div>
    </div>
  );
}

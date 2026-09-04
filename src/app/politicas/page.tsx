import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Truck, Heart, ArrowLeft } from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/icons/WhatsAppIcon';

export const metadata = {
  title: 'Políticas de Cambios, Garantías y Envíos | Lovely Night Sleepwear',
  description: 'Conoce nuestras políticas de cambio de talla, garantía de confección y despachos con Pago Contraentrega en Medellín y Colombia.',
};

export default function PoliticasPage() {
  return (
    <div style={{ backgroundColor: '#fdf6f0', minHeight: '80vh', padding: '3.5rem 0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--accent-terra)',
            marginBottom: '1.5rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>Volver a la Tienda</span>
        </Link>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(28, 28, 28, 0.08)',
            padding: '3rem 2.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-terra)', display: 'block', marginBottom: '0.4rem' }}>
            Compromiso & Transparencia
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#1C1917', marginBottom: '1rem', fontWeight: 600 }}>
            Políticas de Cambios, Garantías y Envíos
          </h1>

          <p style={{ fontSize: '0.95rem', color: '#57534E', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            En <strong>Lovely Night</strong> confeccionamos prendas de descanso con estándares de alta costura en Medellín. Queremos que tu experiencia sea perfecta desde que haces tu pedido hasta que lo disfrutas en tus noches.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {/* SECCIÓN 1: CAMBIOS DE TALLA */}
            <section style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#faebea', color: 'var(--accent-terra)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RefreshCw size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
                  1. Cambios de Talla Ágiles (15 Días)
                </h2>
              </div>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#44403C', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Tienes hasta <strong>15 días calendario</strong> desde que recibes tu paquete para solicitar cambio por talla o color.</li>
                <li>La prenda debe estar <strong>sin uso, sin lavar, con sus etiquetas originales</strong> y en perfecto estado.</li>
                <li>Por higiene y normativa de salud, las prendas íntimas o panties no tienen cambio (a menos que presenten defecto de fábrica comprobado).</li>
                <li>En Medellín, podemos coordinar el cambio con mensajero motorizado en tu misma dirección.</li>
              </ul>
            </section>

            {/* SECCIÓN 2: GARANTÍA DE CONFECCIÓN */}
            <section style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#F0FDF4', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
                  2. Garantía de Calidad y Confección (30 Días)
                </h2>
              </div>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#44403C', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Todas nuestras prendas cuentan con <strong>30 días de garantía</strong> por costuras, botones, sesgos o defectos del tejido.</li>
                <li>La garantía no cubre daños por lavado inadecuado (uso de cloro, lavado con agua caliente excesiva o desgarres por objetos punzantes).</li>
                <li>Si tu prenda presenta alguna falla de fábrica, te enviamos una nueva sin costo adicional o reembolsamos tu dinero.</li>
              </ul>
            </section>

            {/* SECCIÓN 3: ENVÍOS Y PAGO CONTRAENTREGA */}
            <section style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
                  3. Envíos y Modalidad Pago Contraentrega
                </h2>
              </div>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#44403C', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li><strong>Medellín y Área Metropolitana</strong>: Entregas en 24 a 48 horas hábiles mediante mensajería local. Pagas en efectivo o transferencia Bancolombia/Nequi al recibir.</li>
                <li><strong>Resto de Colombia</strong>: Envíos coordinados con transportadoras aliadas (Interrapidísimo, Envía o Servientrega) con entrega en 2 a 4 días hábiles.</li>
                <li>Te notificaremos el estado de despacho y el número de guía de seguimiento por WhatsApp.</li>
              </ul>
            </section>

            {/* SECCIÓN 4: CUIDADOS DE LA PRENDA */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>
                  4. Consejos de Cuidado del Satín Seda
                </h2>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#57534E', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Para preservar el brillo sedoso, la caída pesada y el tacto ultrasuave durante años:
              </p>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#44403C', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Lavar a mano o en lavadora en ciclo <strong>Delicado / Suave</strong> con agua fría.</li>
                <li>Usar jabón suave sin blanqueadores ni cloro.</li>
                <li>Secar a la sombra sin retorcer fuertemente.</li>
                <li>Si deseas planchar, hazlo por el revés de la prenda a baja temperatura o con vapor vertical.</li>
              </ul>
            </section>
          </div>

          {/* ASISTENCIA INMEDIATA POR WHATSAPP */}
          <div
            style={{
              marginTop: '3rem',
              backgroundColor: '#fdf6f0',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #E7E5E0',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1C1917', margin: '0 0 0.25rem 0' }}>
                ¿Necesitas gestionar un cambio hoy mismo?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#78716C', margin: 0 }}>
                Escríbenos a nuestra línea oficial de atención en Medellín y te ayudamos en minutos.
              </p>
            </div>

            <a
              href="https://wa.me/573000000000?text=Hola%20Lovely%20Night,%20quiero%20solicitar%20un%20cambio%20de%20talla%20o%20asesor%C3%ADa%20de%20garant%C3%ADa"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '0.85rem 1.4rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
              }}
            >
              <WhatsAppOfficialIcon size={19} fill="#FFFFFF" />
              <span>Chatear con una Asesora</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

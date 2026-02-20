import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer" style={{ borderTop: '1px solid var(--line)', padding: '2rem 1rem', marginTop: '4rem', textAlign: 'center' }}>
      <div className="page-shell" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <nav aria-label="Navegación secundaria" style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://www.pachanodesign.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Pachano Design ↗</a>
          <Link href="/legal/privacidad" style={{ color: 'var(--muted)' }}>Política de Privacidad</Link>
          <Link href="/legal/aviso-legal" style={{ color: 'var(--muted)' }}>Aviso Legal</Link>
          <a href="mailto:hola@hectorpachano.com" style={{ color: 'var(--muted)' }}>hola@hectorpachano.com</a>
        </nav>
        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} Hector Pachano // Digital Systems. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

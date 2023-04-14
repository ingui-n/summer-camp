import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <h2 className="logo">Táborovač</h2>
      <nav>
        <ul className="nav-links">
          <li><Link href='#'>O nás</Link></li>
          <li><Link href='#'>Tábory</Link></li>
          <li><Link href='#'>Kontakty</Link></li>
        </ul>
      </nav>
      <Link href='/login' className="cta">Přihlášení</Link>
    </header>
  );
}

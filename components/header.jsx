'use client';

import Link from 'next/link';
import {useRef} from "react";

export default function Header() {
  const burgerRef = useRef(null);
  const navLinksRef = useRef(null);

  const toggles = () => {
    navLinksRef.current.classList.toggle('nav-active');
    burgerRef.current.classList.toggle('toggle');
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link href='/'><h2>Táborovač</h2></Link>
        </div>
        <ul className="nav-links" ref={navLinksRef}>
          <li><Link href='/about'>O NÁS</Link></li>
          <li><Link href='/camp'>TÁBORY</Link></li>
          <li><Link href='/login'>PŘIHLÁSÍT SE</Link></li>
          {/*  todo sign out */}
          {/*  todo přihlásit se do aplikace X přihlásit se na tábor?*/}
        </ul>

        <div className="burger" ref={burgerRef} onClick={toggles}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
}

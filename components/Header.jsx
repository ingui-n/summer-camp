'use client';

import Link from 'next/link';
import {useRef} from "react";
import {useSession} from "next-auth/react";
import {isUserAdmin} from "@/lib/base";

export default function Header() {
  const {status, data} = useSession();
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
          {data && isUserAdmin(data.user)
            && <li><Link href='/administration'>ADMINISTRACE</Link></li>
          }
          {status === 'unauthenticated'
            ? <li><Link href='/sign-in'>PŘIHLÁSÍT SE</Link></li>
            : <li><Link href='/sign-out'>[{data?.user.name}] ODHLÁSIT SE</Link></li>
          }
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

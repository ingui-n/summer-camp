'use client';
import '@/styles/home.css';
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Link from 'next/link';
import {useSession} from "next-auth/react";


export default function HomeSection() {
  const session = useSession();

  return (
    <div className="bg">
      <div className="centered-container">
        <h1 className='home-title'>Přihlaš se ještě dnes.</h1>
        <div className="flex-parent">
          {session.status === 'unauthenticated' &&
            <Link href='/sign-in'>
              <ButtonUnstyled className="black main-btn">PŘIHLÁSIT SE</ButtonUnstyled>
            </Link>
          }
          <Link href='/camp'>
            <ButtonUnstyled className="white main-btn">NABÍDKA</ButtonUnstyled>
          </Link>
        </div>
      </div>
    </div>
  );
}

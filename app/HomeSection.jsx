'use client';
import '@/styles/home.css';
import Button from "@mui/base/Button";
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
              <Button className="black main-btn">PŘIHLÁSIT SE</Button>
            </Link>
          }
          <Link href='/camp'>
            <Button className="white main-btn">NABÍDKA</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

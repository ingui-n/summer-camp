'use client';
import '@/styles/home.css';
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Link from 'next/link';


export default function HomeSection() {
  return (
    <div className="bg">
      <div className="centered-container">
        <h1 className='home-title'>Přihlaš se ještě dnes.</h1>
        <div className="flex-parent">
          <Link href='/login'>
            <ButtonUnstyled className="black main-btn">PŘIHLÁSIT SE</ButtonUnstyled>
          </Link>
          <Link href='/'>
            <ButtonUnstyled className="white main-btn">NABÍDKA</ButtonUnstyled>
          </Link>
          {/*todo link nabídka*/}
        </div>
      </div>
    </div>
  );
}

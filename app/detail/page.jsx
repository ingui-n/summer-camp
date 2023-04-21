'use client';
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useRef} from "react";
import {Button} from "@mui/material";


export default function Page() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const images = bannerRef.current.querySelectorAll('img');
    let index = 0;

    setInterval(() => {
      images[index].classList.remove('active');
      index++;
      if (index === images.length) {
        index = 0;
      }
      images[index].classList.add('active');
    }, 3000);
  }, []);

  return (
    <>
      <div className="banner" ref={bannerRef}>
        <Image
          src="/about-image1.jpg"
          alt='dgsd'
          width={1500}
          height={1500}
          className='active'
        />
        <Image
          src="/about-image2.jpg"
          alt='dgsd'
          width={1500}
          height={1500}
        />
      </div>
      <main className='detail'>
        <section>
          <h1>Tábor v lesích ve stanech</h1>
          <p>TEXT Z DBS</p>
        </section>

        <section className='detail-links'>
          <Link href='/camp'><Button variant="outlined">TÁBORY</Button></Link>
          <Link href='/camp-form'><Button variant="contained">PŘIHLÁSIT SE</Button></Link>
        </section>

        <section>
          <h1>JÍDELNÍČEK</h1>
          <table>
            <thead>
            <tr>
              <th>TYP - S/O/V</th>
              <th>Název</th>
              <th>Popis</th>
              <th>Alergen</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            <tr>
              <td>snídaně</td>
              <td>vajíčka</td>
              <td>Podavají se s obloženým chlebem, šunkou, sýrem a zeleninou. K dispozici je také teplý čaj.</td>
              <td>69</td>
            </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

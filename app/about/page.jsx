'use client';
import Image from 'next/image';
import {useEffect, useRef} from "react";

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
        <Image
          src="/about-image3.jpg"
          alt='dgsd'
          width={1500}
          height={1500}
        />
      </div>
      <main className='about-main'>
        <section>
          <h1 className='about-h1'>O nás</h1>
          <p>Tetx</p>
        </section>

        <section>
          <h1 className='about-h1'>Kontakt</h1>
          <p>Na vaše dotazy rádi odpovíme!</p>
          <p><u>Kontaktujete nás na:</u></p>
          <table>
            <thead>
            <tr>
              <th>Email</th>
              <th>Telefon</th>
              <th>Adresa</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>taborovac@email.cz</td>
              <td>776284132</td>
              <td>U Potůčku 24, Kradec Hrálové</td>
            </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

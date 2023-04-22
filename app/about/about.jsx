'use client';

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export default function About({campData}) {
  const bannerRef = useRef(null);
  const [description, setDescription] = useState({
    aboutUs: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    setDescription(JSON.parse(campData.description));
  }, [campData]);

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
          <p>{description.aboutUs}</p>
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
              <td>{description.email}</td>
              <td>{description.phone}</td>
              <td>{description.address}</td>
            </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

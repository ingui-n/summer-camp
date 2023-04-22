'use client';

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@mui/material";

const foodType = {
  0: 'Snídaně',
  1: 'Oběd',
  2: 'Svačina',
  3: 'Večeře'
};

export default function Detail({campData, programData, menuData}) {
  const [description, setDescription] = useState({
    name: '',
    mainDescription: '',
  });
  const bannerRef = useRef(null);

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
      </div>
      <main className='detail'>
        <section>
          <h1>{description.name}</h1>
          <p>{description.mainDescription}</p>
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
              <th>TYP</th>
              <th>Název</th>
              <th>Popis</th>
              <th>Alergen</th>
            </tr>
            </thead>
            <tbody>
            {menuData && menuData.map((food, index) => (
              <tr key={index}>
                <td>{foodType[food.type]}</td>
                <td>{food.name}</td>
                <td>{food.description}</td>
                <td>{food.alergen.number} - {food.alergen.name}</td>
              </tr>
            ))}
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

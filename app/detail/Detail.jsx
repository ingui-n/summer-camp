'use client';

import {useEffect, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@mui/material";
import {foodTypes} from "@/lib/configTypes";
import {getFormattedDates} from "@/lib/base";


export default function Detail({campData, programData, menuData, isUserRegistered}) {
  const bannerRef = useRef(null);
  const mainDescriptionRef = useRef(null);

  useEffect(() => {
    const description = JSON.parse(campData.description);
    mainDescriptionRef.current.innerHTML = description.mainDescription;
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
          <h1>{campData.name}</h1>
          <div ref={mainDescriptionRef}></div>
          <br/>
          <h3>Cena: {campData.price} Kč</h3>
        </section>

        <section className='detail-links'>
          <Link href='/camp'><Button variant="outlined">TÁBORY</Button></Link>
          {!isUserRegistered &&
            <Link href='/register'><Button variant="contained">PŘIHLÁSIT SE</Button></Link>
          }
        </section>

        {isUserRegistered &&
          <>
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
                    <td>{foodTypes.find(({type}) => type === food.type)?.label || ''}</td>
                    <td>{food.food_name}</td>
                    <td>{food.description}</td>
                    <td>{food.number} - {food.alergen_name}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </section>

            <section>
              <h1>PROGRAM</h1>
              <table>
                <thead>
                <tr>
                  <th>Od - Do</th>
                  <th>Název</th>
                  <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                {programData && programData.map((program, index) => (
                  <tr key={index}>
                    <td>{getFormattedDates(program.from, program.to)}</td>
                    <td>{program.name}</td>
                    <td>{program.description}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </section>
          </>
        }
      </main>
    </>
  );
}

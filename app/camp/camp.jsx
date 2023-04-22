'use client';

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";

export default function Camp({campData}) {
  const [description, setDescription] = useState({
    name: '',
    shortDescription: '',
  });

  useEffect(() => {
    setDescription(JSON.parse(campData.description));
  }, [campData]);

  return (
    <>
      <div className="card-container">
        <div className="card-under">
          <div className="card">
            <h6 className='card-header'><strong>{description.name}</strong></h6>
            <span>{description.mainDescription}</span>
            <Link href='/detail'>
              <ButtonUnstyled className="card-footer">PODROBNOSTI</ButtonUnstyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

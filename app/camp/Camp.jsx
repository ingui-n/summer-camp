'use client';

import {useEffect, useState} from "react";
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
      <div className="camp-card-container">
        <div className="camp-card-under">
          <div className="camp-card">
            <h6 className='camp-card-header'><strong>{description.name}</strong></h6>
            <span>{description.mainDescription}</span>
            <Link href='/detail'>
              <ButtonUnstyled className="camp-card-footer">PODROBNOSTI</ButtonUnstyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

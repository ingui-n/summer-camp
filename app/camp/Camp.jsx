'use client';

import {useEffect, useState} from "react";
import Link from "next/link";
import Button from "@mui/base/Button";

export default function Camp({campData}) {
  const [description, setDescription] = useState({
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
            <h6 className='camp-card-header'><strong>{campData.name}</strong></h6>
            <span>{description.mainDescription}</span>
            <Link href='/detail'>
              <Button className="camp-card-footer">PODROBNOSTI</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

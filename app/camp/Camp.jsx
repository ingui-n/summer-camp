'use client';

import {useEffect, useRef} from "react";
import Link from "next/link";
import Button from "@mui/base/Button";

export default function Camp({campData}) {
  const shortDescriptionRef = useRef(null);

  useEffect(() => {
    const description = JSON.parse(campData.description);
    shortDescriptionRef.current.innerHTML = description.shortDescription;
  }, [campData]);

  return (
    <>
      <div className="camp-card-container">
        <div className="camp-card-under">
          <div className="camp-card">
            <h6 className='camp-card-header'><strong>{campData.name}</strong></h6>
            <div ref={shortDescriptionRef}></div>
            <Link href='/detail'>
              <Button className="camp-card-footer">PODROBNOSTI</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

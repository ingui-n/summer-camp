'use client';
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Link from "next/link";


export default function Page() {
  return (
    <>
      <div className="card-container">
        <div className="card-under">
          <div className="card">
            <h6 className='card-header'><strong>Tábor v lesích ve stanech</strong>.</h6>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, eaque impedit culpa quis mollitia modi voluptatem repellendus atque quae rem fugit at praesentium nisi ullam sapiente cupiditate quod ex voluptatum.</span>
            <Link href='/detail'>
              <ButtonUnstyled className="card-footer">PODROBNOSTI</ButtonUnstyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

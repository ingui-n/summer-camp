import '@/styles/global.css';
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className='not-found-container'>
        <div className='not-found-content'>
        <h2>Stránka, kterou hledáte, zde nebyla nalezena</h2>
        <Image
          src='https://http.cat/404'
          alt='404'
          width={750}
          height={600}
        />
        </div>
      </div>
    </>
  );
}

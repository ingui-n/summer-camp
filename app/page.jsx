import SignOut from "@/components/sign-out";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/header";

export const metadata = {
  title: 'Super tábor',
  description: 'some content',
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header/>
      {!!session && <SignOut/>}

      <section className="bg">
        {/*<Image*/}
        {/*  src="/mainBackground.jpg"*/}
        {/*  alt="Picture"*/}
        {/*  fill={true}*/}
        {/*  className="bgImage"*/}
        {/*/>*/}
        <div className='bgContent'>
          <h1>Kdo si hraje nezlobí!</h1>
          <div className="flex-parent">
            <Link href='/login' className='black main-btn'>PŘIHLÁSIT SE</Link>
            <Link href='/camps' className='white main-btn'>NABÍDKA</Link>
          </div>
        </div>
      </section>
    </>
  );
};

async function getData() {
  //todo fetch data

  return {data: 'fsd'};
}

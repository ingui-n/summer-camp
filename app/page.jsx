import SignOut from "@/components/sign-out";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";

export const metadata = {
  title: 'Super tábor',
  description: 'some content',
};

export default function Home() {
  const session = getServerSession(authOptions);

  return (
    <>
      {!!session && <SignOut/>}
    </>
  );
};

async function getStaticProps() {
  //todo fetch data

  return {data: 'fsd'};
}

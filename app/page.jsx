import SignOut from "@/components/sign-out";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";

export const metadata = {
  title: 'Super tábor',
  description: 'some content',
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!!session && <SignOut/>}
    </>
  );
};

async function getData() {
  //todo fetch data

  return {data: 'fsd'};
}

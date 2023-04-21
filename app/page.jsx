import SignOut from "@/components/sign-out";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
import Header from "@/components/header";
import HomeSection from "@/components/homeSection";

export const metadata = {
  title: 'Super tábor',
  description: 'some content',
};

export default async function Home() {
  const session = await getServerSession(authOptions);


  return (
    <>
      <Header/>
      <HomeSection/>
    </>
  );
};

async function getData() {
  //todo remove fetch data

  return {data: 'fsd'};
}

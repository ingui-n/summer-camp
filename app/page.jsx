import Header from "@/components/Header";
import HomeSection from "@/app/HomeSection";

export const metadata = {
  title: 'Super tábor',
  description: 'some content',
};

export default async function Home() {
  return (
    <>
      <Header/>
      <HomeSection/>
    </>
  );
};

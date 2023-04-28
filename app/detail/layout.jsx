import '@/styles/detail.css';
import Header from "@/components/Header";

export const metadata = {
  title: 'Camp Details',
  description: 'Camp details page',
};

export default async function Layout({children}) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

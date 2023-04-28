import '@/styles/camp.css';
import Header from "@/components/Header";

export const metadata = {
  title: 'Camp',
  description: 'Camp page',
};
export default async function Layout({children}) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

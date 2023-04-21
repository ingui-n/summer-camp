import '@/styles/about.css';
import Header from "@/components/header";

export const metadata = {
  title: 'About',
  description: 'About page',
};
export default function Layout({children}) {
  return (
    <>
      <Header/>
      {children}
    </>
  );
}

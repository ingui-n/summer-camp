import '@/styles/camp.css';
import Header from "@/components/header";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";

export const metadata = {
  title: 'Camp',
  description: 'Camp page',
};
export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <Header/>
      {children}
    </>
  );
}

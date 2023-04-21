import '@/styles/detail.css';
import Header from "@/components/header";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";

export const metadata = {
  title: 'Camp Details',
  description: 'Camp details page',
};
export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  // console.log(session)
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

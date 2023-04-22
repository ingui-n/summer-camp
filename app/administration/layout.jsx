import '@/styles/administration.css';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";

export const metadata = {
  title: 'Administration',
  description: 'Administration page',
};
export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  // console.log(session)
  if (!session) {
    redirect('/');
  }

  //todo if role != 0 admin - redirect

  return (
    <>
      {children}
    </>
  );
}

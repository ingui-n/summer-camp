import '@/styles/auth.css';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";

export const metadata = {
  title: 'Login',
  description: 'Login page',
};

export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <>
      <div className="card-wrapper">
        <div className="card">
          {children}
        </div>
      </div>
    </>
  );
}

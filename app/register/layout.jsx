import '@/styles/auth.css';
import '@/styles/register.css';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation';

export const metadata = {
  title: 'Register',
  description: 'Register page',
};

export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="card-wrapper">
      <div className="card">
        {children}
      </div>
    </div>
  );
}

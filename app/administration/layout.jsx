import '@/styles/administration.css';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/administration/Navbar";

export const metadata = {
  title: 'Administration',
  description: 'Administration page',
};
export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  if (session.user.role !== 0) {
    redirect('/');
  }

  return (
    <>
      <div className='admin-body'>
        <Navbar/>
        <div className="container">
          <div className="sidebar">
            <ul>
              {/*todo add more links*/}
              <li><Link href='/administration/food-menu'>Food Menu</Link></li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

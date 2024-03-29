import '@/styles/administration.css';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/administration/Navbar";
import {isUserAdmin, isUserBasic} from "@/lib/base";

export const metadata = {
  title: 'Administration',
  description: 'Administration page',
};
export default async function Layout({children}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  if (isUserBasic(session.user)) {
    redirect('/');
  }

  return (
    <>
      <div className='admin-body'>
        <Navbar/>
        <div className="container">
          <div className="sidebar">
            <ul>
              <li><Link href='/administration/food-menu'>Jídla</Link></li>
              <li><Link href='/administration/allergens'>Alergeny</Link></li>
              <li><Link href='/administration/program'>Program</Link></li>
              {isUserAdmin(session.user) &&
                <>
                  <li><Link href='/administration/camp-description'>Podrobnosti táboru</Link></li>
                  <li><Link href='/administration/jobs'>Pracovní pozice</Link></li>
                  <li><Link href='/administration/workers'>Pracovníci</Link></li>
                  <li><Link href='/administration/logins'>Uživatelé</Link></li>
                  <li><Link href='/administration/applications'>Přihlášky</Link></li>
                </>
              }
            </ul>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

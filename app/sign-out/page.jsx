'use client';

import {signOut, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useEffect} from "react";

export default function Page() {
  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      redirect('/');
    } else if (session.status === 'authenticated')
    signOut('/').catch();
  }, [session]);

  return <></>;
}

'use client';

import {SessionProvider} from "next-auth/react";

export default function RootProviders({children}) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}

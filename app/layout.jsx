import '@/styles/globals.css';
import {Roboto} from "next/font/google";
import RootProviders from "@/components/RootProviders";

export const metadata = {
  title: {
    template: '%s | Super tábor',
  },
  description: 'lorem ipsum dolor sit amet, consectetur adip',
};

const roboto = Roboto({
  weight: ['500'],
  subsets: ['latin'],
  variable: "--font-roboto"
});

export default async function RootLayout({children}) {
  return (
    <html lang="cs">
    <body className={roboto.className}>
    <RootProviders>
      {children}
    </RootProviders>
    </body>
    </html>
  );
};

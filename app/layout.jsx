// import '@/styles/globals.css';
import '@/styles/style.css';
import {Roboto} from "next/font/google";
import RootProviders from "@/components/RootProviders";
import Header from "@/components/header";

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

export default function RootLayout({children}) {
  return (
    <html lang="cs">
    <body className={roboto.className}>
    <RootProviders>
      <Header/>
      {children}
    </RootProviders>
    </body>
    </html>
  );
};

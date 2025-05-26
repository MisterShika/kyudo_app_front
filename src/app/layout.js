'use client';

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SyncUserAfterLogin from "../components/syncuserafterlogin";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SyncUserAfterLogin />
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

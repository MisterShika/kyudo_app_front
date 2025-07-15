'use client';

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SyncUserAfterLogin from "../components/syncuserafterlogin";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <SyncUserAfterLogin />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

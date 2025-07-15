'use client';

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SyncUserAfterLogin from "../components/syncuserafterlogin";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <SessionProvider>
          <SyncUserAfterLogin />
          <Header />
          <main className="flex-grow bg-gray-100 relative">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

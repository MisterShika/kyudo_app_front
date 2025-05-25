'use client';

// import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SyncUserAfterLogin from '@/components/syncuserafterlogin';

export default function SessionLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SyncUserAfterLogin />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

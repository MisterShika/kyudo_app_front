'use client';

// import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SyncUserAfterLogin from '@/components/syncuserafterlogin';

export default function SessionLayout({ children }) {
  return (
        <SessionProvider>
          <SyncUserAfterLogin />
          {children}
        </SessionProvider>
  );
}

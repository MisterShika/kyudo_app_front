'use client';

// import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SyncUserAfterLogin from '@/components/syncuserafterlogin';

export default function DashboardLayout({ children }) {
  return (
        <SessionProvider>
          <SyncUserAfterLogin />
          {children}
        </SessionProvider>
  );
}

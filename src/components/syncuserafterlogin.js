'use client';

import { useSession, getSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SyncUserAfterLogin() {
  const { status } = useSession();

  useEffect(() => {
    const sync = async () => {
      const session = await getSession();
      if (!session?.user?.email) return;

      await fetch('/api/sync-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`, // optional if your session contains a custom token
        },
      });
    };

    if (status === 'authenticated') {
      sync();
    }
  }, [status]);

  return null;
}

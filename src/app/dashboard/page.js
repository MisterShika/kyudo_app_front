'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return (
    <div>
      <div>ID: {session.user.id}</div>
      <div>Email: {session.user.email}</div>
      <div>Role: {session.user.role}</div>
    </div>
  );
}

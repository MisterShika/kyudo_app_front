'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  console.log(session);

  const handleStartSession = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch('http://localhost:3000/sessions/startSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start session');
      }

      const data = await response.json();
      console.log('Session started:', data);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  if (status === 'loading') return (
    <div>Loading...</div>
  );

  if (!session) return (
    <div>Not logged in</div>
  );

  return (
    <div>
      <div>ID: {session.user.id}</div>
      <div>Email: {session.user.email}</div>
      <div>Role: {session.user.role}</div>

    {session.user.currentSessionId ? (
      <div className="mt-2 inline-block px-2 py-1 bg-green-500 text-white text-sm rounded">
        Session exists
      </div>
    ) : (
      <button onClick={handleStartSession} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Start Session
      </button>
    )}
    </div>
  );
}

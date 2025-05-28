'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image'

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header>
            {session?.user?.image && (
                <> 
                    Logged in as : {session.user.email}
                    <Image
                        src={session.user.image}
                        alt={session.user.name || 'User image'}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                </>
            )}
        </header>
    );
}
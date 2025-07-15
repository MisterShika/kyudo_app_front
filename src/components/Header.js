'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image'

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="flex flex-row h-16 bg-sky-200">
            {session?.user?.image && (
                <> 
                    Logged in as : {session.user.email}
                    <div className="user-image-container">
                        <Image
                            src={session.user.image}
                            alt={session.user.name || 'User image'}
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                    </div>
                    <div className="logo-container">

                    </div>
                    <div className="header-hamburger">
                        
                    </div>
                </>
            )}
        </header>
    );
}
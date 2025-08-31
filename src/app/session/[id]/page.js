"use client";

import TargetArea from '@/components/TargetArea';
import Loading from '@/components/TargetArea';
import { useSession } from 'next-auth/react';


export default function Session() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Loading />;
    }

    return (
        
        <TargetArea userId={session?.user?.id} sessionId={session?.user?.currentSessionId} />
        
    );
}

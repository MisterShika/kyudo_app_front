'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';


export default function SingleSession ({ params }) {
    const { sessionId } = useParams();
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/sessions/getSession/${sessionId}`)
            .then(res => res.json())
            .then(setSessionData);
    }, [sessionId]);

    if(sessionData == null){
        return (
            <Loading />
        );
    }else{
        return (
            <div>
                {JSON.stringify(sessionData, null, 2)}
            </div>
        );
    }
}
'use client';

import { useSession } from 'next-auth/react';
import { use, useState, useEffect } from 'react';


export default function SingleSession ({ params }) {
    const { sessionId } = use(params);
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/sessions/getSession/${sessionId}`)
            .then(res => res.json())
            .then(setSessionData);
    }, []);

    if(sessionData == null){
        return (
            <div>
                Loading...
            </div>
        );
    }else{
        return (
            <div>
                {JSON.stringify(sessionData, null, 2)}
            </div>
        );
    }
}
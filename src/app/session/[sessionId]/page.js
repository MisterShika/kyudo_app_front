'use client';

import { useSession } from 'next-auth/react';
import { use, useState } from 'react';


export default function SingleSession ({ params }) {

    const { sessionId } = use(params);

    return (
        <div>
            <h1>Session ID: {sessionId}</h1>
        </div>
    );
}
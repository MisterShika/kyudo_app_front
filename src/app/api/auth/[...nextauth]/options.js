import GoogleProvider from 'next-auth/providers/google';
import { getToken } from 'next-auth/jwt';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ account, profile }) {
            const email = profile?.email || '';
            const domain = email.split('@')[1];
            if (account?.provider === 'google' && domain === 'gmail.com') {
                if(profile?.email_verified == true){
                    try{
                        fetch(`${apiBaseUrl}/users`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                // 'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                email: profile.email,
                            })
                        });
                    }catch(error){
                        console.error('Failed to reach Express backend:', error);
                        return false;
                    }
                    return true;
                }
            }
            return false;
        },
    },
};

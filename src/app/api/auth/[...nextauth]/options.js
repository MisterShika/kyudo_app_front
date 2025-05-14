import GoogleProvider from 'next-auth/providers/google';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function accountExists () {
    console.log("accountexists fired");
}

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

                try{
                    const res = await fetch(`${apiBaseUrl}/users`);
                    console.log(res);
                }catch(error){
                    console.error('Failed to reach Express backend:', error);
                }

                return true;
            }
            return false;
        },
    },
};

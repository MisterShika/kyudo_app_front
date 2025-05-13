import GoogleProvider from 'next-auth/providers/google';

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const allowedDomains = ['gmail.com'];
      const email = profile?.email || '';
      const domain = email.split('@')[1];

      if (account?.provider === 'google' && allowedDomains.includes(domain)) {
        return true;
      }
      return false;
    },
  },
};

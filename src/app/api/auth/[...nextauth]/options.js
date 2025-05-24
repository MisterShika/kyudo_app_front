import GoogleProvider from 'next-auth/providers/google';
import jwtDecode from 'jsonwebtoken';

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
  async signIn({ user, account, profile }) {
    const email = profile?.email;
    const domain = email?.split('@')[1];

    if (account?.provider === 'google' && profile?.email_verified && domain === 'gmail.com') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const backendJwt = await res.text();
        const cleanedJwt = backendJwt.replace(/^"(.*)"$/, '$1');
        const backendUser = jwtDecode.decode(cleanedJwt);

        user.backendUser = backendUser;
        return true;
      } catch (err) {
        console.error('Backend sync failed:', err);
        return false;
      }
    }

    return false;
  },

  async jwt({ token, user }) {
    if (user?.backendUser) {
      token.id = user.backendUser.id;
      token.email = user.backendUser.email;
      token.role = user.backendUser.role;
      token.currentSessionId = user.backendUser.currentSessionId;
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.currentSessionId = token.currentSessionId;
    }
    return session;
  },
}
};

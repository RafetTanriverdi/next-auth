import NextAuth from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        
      }
      return token
    },
    async session({ session, token }) {
    
     return {
    ...session,
    user: {
      
      ...session.user,
      accessToken: token.accessToken,
      
    },
  }
    },
  },
})

export { handler as GET, handler as POST }

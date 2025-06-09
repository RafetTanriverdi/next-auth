import { createAccessToken } from "@rt/actions/createAccessToken";
import { fetchRolesFromAuth0 } from "@rt/actions/fetchRolesFromAuth0";
import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      idToken: true,
      authorization: {
        params: {
          audience: `${process.env.AUTH0_ISSUER!}/api/v2/`,
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = account.providerAccountId;

        try {
          const managementAccessToken = await createAccessToken();
          const roles = await fetchRolesFromAuth0(
            token.sub,
            managementAccessToken
          );
          token.roles = roles.map((role: { name: string }) => role.name);
        } catch (error) {
          token.roles = [];
          throw new Error(
            "Failed to fetch user roles from Auth0",
            error as Error
          );
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.sub = token.sub;
      session.user.roles = token.roles as string[] | undefined;

      return session;
    },
  },
};

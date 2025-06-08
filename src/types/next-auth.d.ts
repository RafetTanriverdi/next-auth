import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    roles?: string[];
  }

  interface JWT {
    roles?: string[];
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      sub?: string;
      roles?: string[];

      accessToken?: string;
    };
  }

  interface User {
    sub?: string;
  }
}

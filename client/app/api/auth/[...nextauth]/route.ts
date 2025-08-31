import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });
  
  export { handler as GET, handler as POST };
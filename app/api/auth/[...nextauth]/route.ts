import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = ({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "notsubscribed",
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        console.log(profile)
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: profile.role ? profile.role : "notsubscribed",
        };
      }
    }) 
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (trigger === "update") {
        if (session.info) {
          if (session.info == "subscribed") {
            token.role = "subscribed"
          }
          else if (session.info == "notsubscribed") {
            token.role = 'notsubscribed'
          }
        }
      }
      if (account) {
        token.provider = account.provider;
      }
      return { ...token, ...user, ...account };
    },
    async session({ session, token, user }) {
      session.user.role = token.role;
      session.user.provider = token.provider;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin"
  }
});

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

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
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        console.log(`FROM NEXTAUTH, JWT TRIGGER`)
        if (session.info) {
          console.log(session.info)
          if (session.info == "subscribed") {
            token.role = "subscribed"
            console.log(`TOKEN: ${JSON.stringify(token)}`)
          }
          else if (session.info == "notsubscribed") {
            token.role = 'notsubscribed'
            console.log(`TOKEN: ${JSON.stringify(token)}`)
          }
        }
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

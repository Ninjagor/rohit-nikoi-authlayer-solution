import NextAuth from "next-auth";
import { User, Account } from "@prisma/client";
import { JWT } from "next-auth/jwt";

interface ExtendedUser extends User {
  provider: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  type JWT = User & Account;
}

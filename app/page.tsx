"use client";
import Image from 'next/image'

// Component Imports 
import MainNav from './_components/Navbars/MainNav'
import MaxWidthContentWrapper from './_components/Wrappers/MaxWidthContentWrapper' 
import Link from 'next/link'
import CodeBlockComponent from './_components/CodeBlocks/CodeBlockComponent';

import { signIn } from 'next-auth/react';

export default function Home() {
  const callBackExplanation = `callbacks: {
async jwt({ token, user, trigger, session, account }) {
    if (trigger === "update") {
      // PSUEDO CODE BEGINS (for simplicity)
      if session.info then set token.role to session.info
      // PSUEDO CODE ENDS
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
}`
  const databaseSchema = `CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "role" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);`
  const prismaAdapterExample = `import { PrismaAdapter } from "@auth/prisma-adapter"
export const authOptions: AuthOptions = ({
  adapter: PrismaAdapter(prisma),
  // Following code (callbacks)
)}`

  return (
  <>
      <MainNav/>
      <div className="mt-5" />
      <MaxWidthContentWrapper customStyles="!flex-col mb-10">
        <section className="w-full h-fit min-h-[300px] relative py-3 flex flex-col justify-start gap-5 items-center mt-12">
          <h1 className="text-3xl font-semibold tracking-tight text-center">Authentication Layer <span className="text-sky-400">Solution</span></h1> 
          <p className="text-sm text-neutral-500/70 font-medium lg:max-w-[50%] text-center md:max-w-[75%]">This is my solution to the authentication layer problemset for nikoi. My solution includes protected routes, a google and github authentication layer, role-based access as well as the storing of user data in a PostgreSQL database.</p>
          <Link className="bg-sky-400 text-white text-sm px-5 py-2 rounded-full hover:bg-sky-500 font-medium" href="https://github.com/Ninjagor/rohit-nikoi-authlayer-solution"><span>Github Repo</span></Link>
          <div className="absolute gradient gradientone left-[30%] top-0 w-[350px] h-[350px] translate-x-[-50%] z-[-1] rounded-full pointer-events-none">
          </div>
          <div className="absolute gradienttwo gradient left-[70%] top-[-20px] w-[350px] h-[350px] translate-x-[-50%] z-[-1] rounded-full pointer-events-none">
          </div>
        </section>


        <div className="flex flex-col gap-4 mt-5">
          <h1 className="text-lg mb-10 font-semibold tracking-tight opacity-80">Code Explanation:</h1>
          <div className="flex mb-12 flex-col items-start justify-start gap-4">
            <h1 className="text-xl font-semibold tracking-tight">User and Account Schema:</h1>
            <CodeBlockComponent
            code={databaseSchema}
              language='sql'
              showLineNumbers={false}
            />
            <p className="mt-4 text-md font-medium opacity-50 lg:max-w-[60%]">This is the database schema which defines User and Account. These are written originally in prisma, but a SQL file is generated to match the schema. The &quot;User&quot; contains personal information like email, name, role, etc. Meanwhile &quot;Account&quot; tracks authentication-related information, such as provider, access_token, etc.</p>
          </div>

          <div className="flex mb-12 flex-col items-start justify-start gap-4">
            <h1 className="text-xl font-semibold tracking-tight">Callback Functions:</h1>
            <CodeBlockComponent
            code={callBackExplanation}
              language='typescript'
              showLineNumbers
            />
            <p className="mt-4 text-md font-medium opacity-50 lg:max-w-[70%]">These are the callback functions which generate the JWT token and create a session for the user. The JWT callback is triggered when update(), signIn/signUp, and other authentication methods are called. This function returns the JWT token, user object, and account object as a spread.</p>
          </div>



        </div>
      </MaxWidthContentWrapper>
  </>
  )
}

"use client";
import Image from 'next/image'

// Component Imports 
import MainNav from './_components/Navbars/MainNav'
import MaxWidthContentWrapper from './_components/Wrappers/MaxWidthContentWrapper' 
import Link from 'next/link'
import CodeBlockComponent from './_components/CodeBlocks/CodeBlockComponent';

import { signIn } from 'next-auth/react';

export default function Home() {
  const codeLineOne = `  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },`
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
          <CodeBlockComponent
          code={codeLineOne}
            language='typescript'
            showLineNumbers
          />
        </div>
      </MaxWidthContentWrapper>
  </>
  )
}

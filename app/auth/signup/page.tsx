"use client";
import React, { useEffect } from 'react'

import Image from 'next/image';
import Link from 'next/link';

import MainNav from '@/app/_components/Navbars/MainNav';
import MaxWidthContentWrapper from '@/app/_components/Wrappers/MaxWidthContentWrapper';

import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const page = () => {
  const { data: session, status, update } = useSession()
  useEffect(() => {
    if (session?.user || session) {
      redirect("/")
    }
  }, [])

  const googleAuth = async() => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/"
    })
  }
  const ghAuth = async() => {
    const result = await signIn("github", {
      redirect: true,
      callbackUrl: "/"
    })
  }
  return (
  <>
      <MainNav/>
      <MaxWidthContentWrapper>
        <div className="w-full max-w-[600px] ml-auto mr-auto bg-white rounded-md flex flex-col items-center justify-center mt-12 px-4 py-12 gap-4 border-[1px] border-neutral-200">
          <p className="text-2xl font-semibold opacity-80 tracking-tight">Register an Account</p>
          <button onClick={googleAuth} className="mt-8 flex items-center justify-center gap-4 px-10 py-3 rounded-full border-[1px] border-neutral-200 hover:bg-neutral-50">
            <Image 
            src="/google-logo.svg"
            alt="Google Logo"
            width={24}
              height={24}
            />
            <p className="text-md opacity-50 font-medium">Sign up with Google</p>
          </button>
          <button onClick={ghAuth} className="mt-0 flex items-center justify-center gap-4 px-10 py-3 rounded-full border-[1px] border-neutral-200 hover:bg-neutral-50">
            <Image 
            src="/github-mark.svg"
            alt="Google Logo"
            width={24}
              height={24}
            />
            <p className="text-md opacity-50 font-medium">Sign up with Github</p>
          </button>
          <div className="mt-8 flex items-center justify-center gap-2">
            <p className="text-sm font-medium opacity-40">Already have an account?</p>
            <Link href="/auth/signin" className="text-sm font-medium text-sky-400 hover:text-sky-500">
              Sign in.
            </Link>
          </div>
        </div>
      </MaxWidthContentWrapper>
  </>
  )
}

export default page;

"use client";
import React, { useEffect } from 'react'

import Image from 'next/image';

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

  const onSubmit = async() => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/"
    })
  }
  return (
  <>
      <MainNav/>
      <MaxWidthContentWrapper>
        <div className="w-full max-w-[600px] ml-auto mr-auto bg-white rounded-md flex flex-col items-center justify-center mt-12 px-4 py-12 gap-4 border-[1px] border-neutral-200">
          <p className="text-2xl font-semibold opacity-80 tracking-tight">Welcome Back</p>
          <button onClick={onSubmit} className="mt-8 flex items-center justify-center gap-4 px-10 py-3 rounded-full border-[1px] border-neutral-200 hover:bg-neutral-50">
            <Image 
            src="/google-logo.svg"
            alt="Google Logo"
            width={24}
              height={24}
            />
            <p className="text-md opacity-50 font-medium">Sign in with Google</p>
          </button>
        </div>
      </MaxWidthContentWrapper>
  </>
  )
}

export default page;

import React from 'react'
import Image from 'next/image';

import { redirect } from 'next/navigation';

import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";

import Link from 'next/link';

import prisma from '../lib/prisma';

import MainNav from '../_components/Navbars/MainNav';
import MaxWidthContentWrapper from '../_components/Wrappers/MaxWidthContentWrapper';
import UpdateSubscription from './components/UpdateSubscription';

const Page = async() => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session) {
    redirect('/')
  }
  return (
    <>
      <MainNav />
      <div className="mt-5" />
      <MaxWidthContentWrapper customStyles='hidden'>
        <div className="flex flex-col gap-7 items-start">
            <div className="flex gap-4 items-center justify-center">
              <p className="text-lg font-semibold opacity-70 tracking-tight">Profile Image: </p>
              <Image
                src={session.user.image ?? ""}
                alt={session.user.name ?? ""}
                className=" rounded-full"
                width={40}
                height={40}
              />
            </div>
            <div className="flex gap-4 items-center justify-center">
              <p className="text-lg font-semibold opacity-70 tracking-tight">Name:</p>
              <p>{session.user.name}</p>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <p className="text-lg font-semibold opacity-70 tracking-tight">Email:</p>
              <p>{session.user.email}</p>
            </div>
          <UpdateSubscription />

        </div>
      </MaxWidthContentWrapper>
            <MaxWidthContentWrapper>
        <div className="w-full max-w-[600px] ml-auto mr-auto bg-white rounded-md flex flex-col items-center justify-center mt-12 px-4 py-12 gap-4 border-[1px] border-neutral-200">
          <p className="text-xl mb-7 font-medium opacity-50 tracking-tight">Dashboard</p>
          <Image
            src={session.user.image ?? ""}
            alt={session.user.name ?? ""}
            className=" rounded-full"
            width={120}
            height={120}
          />
              <p className="mt-4 text-3xl font-semibold opacity-80 tracking-tight">{session.user.name}</p>
              <p className="text-md font-medium opacity-50 mt-[-5px]">{session.user.email}</p>
              <p className="text-sm font-medium opacity-40 mt-[-5px]">Provider: {session.user.provider}</p>
        </div>
      </MaxWidthContentWrapper>

    </>
  )
}

export default Page

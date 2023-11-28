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
      <div className="mt-0" />
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
          <UpdateSubscription/>
          <p className="text-sm font-medium mt-7 opacity-40">Click the button below to access the Pro Dashboard!</p>
          <Link href="/subscriberonly" className="px-4 py-2 rounded-md text-white bg-sky-400 hover:bg-sky-500 text-sm font-medium">Pro Dashboard</Link>
        </div>
      </MaxWidthContentWrapper>

    </>
  )
}

export default Page

import React from 'react'
import Image from 'next/image';

import { redirect } from 'next/navigation';

import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";

import prisma from '../lib/prisma';

import MainNav from '../_components/Navbars/MainNav';
import MaxWidthContentWrapper from '../_components/Wrappers/MaxWidthContentWrapper';
import UpdateSubscription from './components/UpdateSubscription';

const page = async() => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session) {
    redirect('/')
  }
  return (
    <>
      <MainNav />
      <div className="mt-5" />
      <MaxWidthContentWrapper>
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
    </>
  )
}

export default page

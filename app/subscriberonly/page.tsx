"use client";
import React, { useEffect } from 'react'

import { useSession } from 'next-auth/react';
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from 'next/navigation';
import MainNav from '../_components/Navbars/MainNav';

import MaxWidthContentWrapper from '../_components/Wrappers/MaxWidthContentWrapper';

const page = () => {
  const { data: session, status, update } = useSession()

  useEffect(() => {
    if (!session?.user || !session) {
      redirect('/')
    }
  })

  if (!(session?.user.role=="subscribed")) {
    return (
    <>
      <MainNav/>
        <div className="mt-12" />
      <MaxWidthContentWrapper>
        <p>You are not subscribed. You do not have access to this page. Normally you would be redirected but this is an example, so you are seeing this message. Please go to dashboard to update the subscription.</p>
      </MaxWidthContentWrapper>
    </>
    )
  }

  return (
    <>
      <MainNav/>
        <div className="mt-12" />
      <MaxWidthContentWrapper>
        <p>You are subscribed, and you would be able to view the protected content inside this page! </p>
      </MaxWidthContentWrapper>

    </>
  )
}

export default page;

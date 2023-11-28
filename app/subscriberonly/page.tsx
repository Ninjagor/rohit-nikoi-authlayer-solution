"use client";
import React, { useEffect, useState } from 'react'

import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { authOptions } from "../api/auth/[...nextauth]/route";

import { redirect } from 'next/navigation';
import MainNav from '../_components/Navbars/MainNav';

import axios from 'axios';

import MaxWidthContentWrapper from '../_components/Wrappers/MaxWidthContentWrapper';

const Page = () => {
  const { data: session, status, update } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session?.user || !session) {
      redirect('/')
    }
  })

  const removeSubscription = () => {
  setIsLoading(prev => true)
  axios.post('/api/subscriptions/remove', {
    email: session?.user.email as string
  })
  .then(function (response) {
    console.log(response);
    update({ info: "notsubscribed" })
    console.log(session)
  })
  .catch(function (error) {
    console.log(error);
  }) 
  .finally(() => {
      setIsLoading(prev => false)
    })

}


  const addSubscription = () => {
  setIsLoading(prev => true)
  axios.post('/api/subscriptions/add', {
    email: session?.user.email as string
  })
  .then(function (response) {
    console.log(response);
    update({ info: "subscribed" })
    console.log(session)
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => {
      setIsLoading(prev => false)
    })
}


  if (!(session?.user.role=="subscribed")) {
    return (
    <>
      <MainNav/>
      <div className="mt-0" />
      <MaxWidthContentWrapper>
        <div className="w-full max-w-[600px] ml-auto mr-auto bg-white rounded-md flex flex-col items-center justify-center mt-12 px-4 py-12 gap-4 border-[1px] border-neutral-200">
            <h1 className="text-2xl opacity-80 font-semibold tracking-tight text-center">Unauthorized</h1>
            <p className="text-center text-sm opacity-50 font-medium mt-3">Uh oh! It appears that your account is not currently on the Pro Tier plan. You can click the below button to purchase the Pro Tier, or you can do this from the dashboard. (Payment and &quot;Purchasing pro tier&quot; is conceptual, there is no money involved for this demo)</p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <button onClick={addSubscription} disabled={isLoading} className={`px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white ${isLoading && "bg-sky-500 opacity-80 cursor-auto"}`}>Purchase Pro</button>
          <Link className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700/80" href="/dashboard">Take me back</Link>
        </div>
      </div>
      </MaxWidthContentWrapper>
    </>
    )
  }

  return (
    <>
      <MainNav/>
      <MaxWidthContentWrapper>
        <div className="w-full max-w-[600px] ml-auto mr-auto bg-white rounded-md flex flex-col items-center justify-center mt-12 px-4 py-12 gap-4 border-[1px] border-neutral-200">
            <h1 className="text-2xl text-sky-700 opacity-80 font-semibold tracking-tight text-center">Welcome!</h1>
            <p className="text-center text-sm opacity-50 font-medium mt-3">You are in the Pro Tier, and you would be able to view the premium content/services on this page! Since this is a demo, there is no actual premium content here.</p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <button onClick={removeSubscription} disabled={isLoading} className={`px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white ${isLoading && "bg-sky-500 opacity-80 cursor-auto"}`}>Leave Pro Tier</button>
          <Link className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700/80" href="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
      </MaxWidthContentWrapper>
    </>
  )
}

export default Page;

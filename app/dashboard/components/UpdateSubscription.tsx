"use client"
import React, { useState } from 'react'

import axios from 'axios'

import { useSession } from "next-auth/react"

const UpdateSubscription = () => {
  const { data: session, status, update } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return (
  <>
      { session?.user.role=="subscribed" ? (
      <>
      <div className="flex items-center justify-center gap-4">
        <p className="opacity-50 text-sm font-medium">Tier: Pro Tier</p>
        <button disabled={isLoading} onClick={removeSubscription} className={`px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white ${isLoading && "bg-sky-500 opacity-80 cursor-auto"}`}>Unsubscribe</button>
      </div>

      </>
      ) : (
      <>
      <div className="flex items-center justify-center gap-4">
        <p className="opacity-50 text-sm font-medium">Tier: Free Tier</p>
        <button onClick={addSubscription} disabled={isLoading} className={`px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white ${isLoading && "bg-sky-500 opacity-80 cursor-auto"}`}>Purchase Pro</button>
      </div>

      </>
      ) }
  </>
  )
}

export default UpdateSubscription;

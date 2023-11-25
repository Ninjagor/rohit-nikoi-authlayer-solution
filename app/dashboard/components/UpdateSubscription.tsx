"use client"
import React from 'react'

import axios from 'axios'

import { useSession } from "next-auth/react"

const UpdateSubscription = () => {
  const { data: session, status, update } = useSession()
  const addSubscription = () => {
    console.log("added")
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
  }
  const removeSubscription = () => {
    console.log("removed")
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
    });
  }

  return (
  <>
      { session?.user.role=="subscribed" ? (
      <>
      <div className="flex flex-col gap-2">
        <p className="opacity-50">You are currently subscribed.</p>
        <button onClick={removeSubscription} className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">Unsubscribe</button>
      </div>

      </>
      ) : (
      <>
      <div className="flex flex-col gap-2">
        <p className="opacity-50">You are not currently subscribed.</p>
        <button onClick={addSubscription} className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">Subscribe</button>
      </div>

      </>
      ) }
  </>
  )
}

export default UpdateSubscription;

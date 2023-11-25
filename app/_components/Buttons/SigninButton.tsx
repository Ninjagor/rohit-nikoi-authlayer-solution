"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";

import { ChevronDown } from "react-feather";


const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex cursor-pointer relative gap-3 ml-auto group justify-center items-center">
        <Image
          src={session.user.image ?? ""}
          alt={session.user.name ?? ""}
          className=" rounded-full"
          width={32}
          height={32}
        />
        <p className="text-sky-600">{session.user.name}</p>
        <ChevronDown
          size={20}
          opacity={0.5}
        />
        <div className="absolute top-[100%] left-0 w-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
          <button onClick={() => signOut()} className="w-full border-[1px] border-neutral-200 rounded-md px-2 py-1.5 hover:bg-neutral-50 bg-white mt-2 text-sm text-neutral-500">Sign out</button>
        </div>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} className="px-4 text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">
      Sign In
    </button>
  );
};

export default SigninButton;

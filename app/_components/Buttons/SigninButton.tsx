"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Link from "next/link";

import { ChevronDown } from "react-feather";

import { LogOut } from "react-feather";


const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
      <div className="flex cursor-pointer relative gap-3 ml-auto group justify-center items-center">
        <Image
          src={session.user.image ?? ""}
          alt={session.user.name ?? ""}
          className=" rounded-full"
          width={32}
          height={32}
        />
        <Link href="/dashboard" className="text-sky-600">{session.user.name}</Link>
      </div>
      <LogOut
      size={20}
          className="ml-5 hover:opacity-70 opacity-50 cursor-pointer"
      color="#e11d48"
          onClick={() => signOut()}

        />
      </>
    );
  }
  return (
    <button onClick={() => signIn()} className="px-4 text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">
      Sign In
    </button>
  );
};

export default SigninButton;

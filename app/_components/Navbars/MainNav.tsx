import React from 'react'

import Link from 'next/link';

import SigninButton from '../Buttons/SigninButton';

const MainNav = () => {
  return (
  <>
      <nav className="relative w-full flex items-center justify-center border-b-[1px] border-b-neutral-200">
        <div className="w-full px-7 py-5 flex items-center justify-between max-w-[1400px]">
          <Link href="/" className="text-xl cursor-pointer font-semibold tracking-tight">Authlayer <span className="text-sky-500">Solution</span></Link>
          <SigninButton />
        </div>
      </nav>
  </>
  )
}

export default MainNav;

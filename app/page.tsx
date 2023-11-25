import Image from 'next/image'

// Component Imports 
import MainNav from './_components/Navbars/MainNav'
import MaxWidthContentWrapper from './_components/Wrappers/MaxWidthContentWrapper' 
import Link from 'next/link'

export default function Home() {
  return (
  <>
      <MainNav/>
      <div className="mt-5" />
      <MaxWidthContentWrapper>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight opacity-80">Hello! 👋</h1>
          <p className="text-sm opacity-70 max-w-[600px]">This is my solution to the authentication layer problemset for nikoi. My solution includes protected routes, a google authentication layer, role-based access as well as the storing of user data in a PostgreSQL database.</p>
          <p>Routes:</p>
          <div className="flex gap-3 max-w-[600px] flex-wrap">
          <Link href='/' className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">Home page (current page)</Link>
          <Link href='/dashboard' className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">Dashboard <span className="opacity-70 font-bold">(restricted)</span></Link>
          <Link href='api/auth/signin' className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">Auth endpoint</Link>
          <Link href='/subscriberonly' className="px-4 w-fit text-sm font-medium py-2 rounded-md bg-sky-500 text-white/90 hover:bg-sky-600 hover:text-white">Subscriber Only Endpoint <span className="opacity-70 font-bold">(More restricted)</span></Link>
          </div>
        </div>
      </MaxWidthContentWrapper>
  </>
  )
}

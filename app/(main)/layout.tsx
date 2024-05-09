import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

const MainLayout = async ({ children } : { children: ReactNode }) => {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  )
}

export default MainLayout

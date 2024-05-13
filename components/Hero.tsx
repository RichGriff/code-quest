
/* eslint-disable react/no-unescaped-entities */
import { checkCategoryCompletion, getCategory } from '@/actions/fetchQuestions'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Notification from './Notification'
import CustomLinkButton from './ui/custom-button'
import { useUser } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

const Hero = async () => {
  // const [category, setCategory] = useState(null)
  // const [completedCategory, setCompletedCategory] = useState(false)
  // const { user } = useUser()
  let completedCategory = false
  const user = await currentUser()

  const { category } = await getCategory()
  if(category) {
    completedCategory = user ? await checkCategoryCompletion(user?.id, category._id) : false
  }

  // useEffect(() => {
  //   getCategory().then(categoryResult => {
  //     setCategory(categoryResult.category)
  //     checkCategoryCompletion(user?.id, categoryResult._id).then(completed => {
  //       setCompletedCategory(completed)
  //     })
  //   })
  // },[user?.id])

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center text-center">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        
        <div className="w-full flex md:hidden justify-center items-center mb-8">
          <span className="bg-slate-100 px-5 py-2 rounded-md text-slate-700">
            Today's Category: <span className='font-bold'>{category}</span>
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-dark">
            Ready to take this week's quiz?
          </h1>
          <p className="text-gray-600">
            Get ready to ace it.
          </p>
        </div>
        <div className="mt-6">
          {/* <Link
            href={"/quiz"}
            className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-8 py-3 text-sm font-medium text-gray-50 shadow transition-colors duration-500 hover:bg-indigo-500"
          >
            Let's do this!
          </Link> */}
          <CustomLinkButton link={'/quiz'} disabled={completedCategory}>Let's do this!</CustomLinkButton>
        </div>
      </div>
      {completedCategory && <Notification />}
    </section>
  )
}

export default Hero

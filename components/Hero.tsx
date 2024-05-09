/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center text-center">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-dark">
            Ready to take this week's quiz?
          </h1>
          <p className="text-gray-600">
            Get ready to ace it.
          </p>
        </div>
        <div className="mt-6">
          <Link
            href={"/quiz"}
            className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-8 py-3 text-sm font-medium text-gray-50 shadow transition-colors duration-500 hover:bg-indigo-500"
          >
            Let's do this!
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

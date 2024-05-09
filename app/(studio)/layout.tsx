import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const StudioLayout = ({ children } : { children: ReactNode }) => {
  return (
    <>
      <div className='w-full px-4 py-2 bg-indigo-500'>
        <Link href={'/'} className='inline-flex justify-start items-center gap-2 py-2 px-3 hover:bg-indigo-600 text-white rounded-lg'><MoveLeft className='w-4 h-4' />Back</Link>
      </div>
      {children}
    </>
  )
}

export default StudioLayout

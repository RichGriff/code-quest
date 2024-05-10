'use client'

import React, { ReactNode } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type CustomButtonProps = {
  children: ReactNode, 
  className?: any,
  link: string,
  disabled?: boolean
}

const CustomLinkButton = ({ children, className, link, disabled } : CustomButtonProps) => {
  const router = useRouter()
  return (
    <Button disabled={disabled} onClick={() => router.push(link)}className={cn(className, 'bg-indigo-500 hover:bg-indigo-600 text-white')}>
      {children}
    </Button>
  )
}

export default CustomLinkButton

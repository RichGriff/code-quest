'use client'

import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import { Button } from './ui/button'
import { BarChart2, Crown, LayoutDashboard, Library } from 'lucide-react'

const LoggedInUser = () => {
  const { user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback className='flex justify-center items-center bg-indigo-500 text-white'>RG</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-ml-24">
          <DropdownMenuLabel>
            <div className='flex flex-col justify-start items-start'>
              <span className='text-muted-foreground text-xs'>Logged in as</span>
              <p>{user?.fullName}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
              <Crown className="mr-2 h-4 w-4" />
              <Link href={'/leaders'}>Leaderboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
              <BarChart2 className="mr-2 h-4 w-4" />
              <Link href={'/studio'}>My Results</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <Link href={'/studio'}>Admin</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
              <Library className="mr-2 h-4 w-4" />
              <Link href={'/studio'}>Studio</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
              <Button asChild className='bg-red-500 hover:bg-red-600'><div className='w-full'><SignOutButton /></div></Button>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoggedInUser

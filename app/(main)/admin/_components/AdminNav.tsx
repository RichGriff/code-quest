'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

const AdminNav = () => {
  const path = usePathname()

  const navItems = [
    { name: 'Users', href: '/admin', current: false },
    { name: 'Categories', href: '/admin/notifications', current: false },
    { name: 'Questions', href: '/admin/billing', current: false }
  ]

  return (
    <nav className="flex overflow-x-auto py-4">
      <ul
        role="list"
        className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-foreground sm:px-6 lg:px-8"
      >
        {navItems.map((item) => (
          <li key={item.name}>
            <a href={item.href} className={path === item.href ? 'text-indigo-500' : ''}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default AdminNav

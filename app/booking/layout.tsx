'use client'

import { Separator } from '@/components/ui/separator'
import React from 'react'
import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: "高鐵",
    href: "/booking/thsrc",
  },
  {
    title: "台鐵",
    href: "/booking/tr",
  },
  {
    title: "Inline",
    href: "/booking/inline",
  },
  {
    title: "拓元",
    href: "/booking/tixcraft",
  },
]

type BookingLayoutProps = {
  children: React.ReactNode
}

export default function BookingLayout({ children }: BookingLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">訂票</h2>
          <p className="text-muted-foreground">
            選取你想要預先訂購的票種
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}

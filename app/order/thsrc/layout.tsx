import React from 'react'

type OrderLayoutProps = {
  children: React.ReactNode
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <>
      <div className="space-y-6 py-10 md:flex md:justify-center md:p-10">
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </>
  )
}

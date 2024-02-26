import React from 'react'

type AuthLayoutProps = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex justify-center mt-20 h-screen">
      {children}
    </div>
  )
}

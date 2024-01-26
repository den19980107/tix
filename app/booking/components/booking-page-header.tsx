'use client'

import { Separator } from '@/components/ui/separator'
import React from 'react'

type BookingPageHeaderProps = {
  title: string
  subTitle: string
}

export default function BookingPageHeader({ title, subTitle }: BookingPageHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-muted-foreground">
          {subTitle}
        </p>
      </div>
      <Separator />
    </div>
  )
}

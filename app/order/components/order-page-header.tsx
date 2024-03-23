'use client'

import { Separator } from '@/components/ui/separator'
import React from 'react'

type OrderPageHeaderProps = {
  title: string
  subTitle: string
}

export default function OrderPageHeader({ title, subTitle }: OrderPageHeaderProps) {
  return (
    <div className="space-y-6 mb-6">
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

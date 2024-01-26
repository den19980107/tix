'use client'

import { Separator } from '@/components/ui/separator'
import React from 'react'

type PageHeaderProps = {
  title: string
  subTitle: string
}

export default function PageHeader({ title, subTitle }: PageHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">
          {subTitle}
        </p>
      </div>
      <Separator />
    </div>
  )
}

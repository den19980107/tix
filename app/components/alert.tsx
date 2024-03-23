'use client'
import React from 'react'
import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon } from 'lucide-react'


interface AlertProps {
  title: string
  description?: string
}

export default function Alert({ title, description }: AlertProps) {
  return (
    <div className="mt-6">
      <ShadcnAlert>
        <AlertCircleIcon></AlertCircleIcon>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </ShadcnAlert>
    </div>
  )
}

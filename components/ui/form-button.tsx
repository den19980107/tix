'use client'
import { LoaderIcon } from 'lucide-react'
import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './button'

type FormButtonProps = {
}

export default function FormButton({ children }: PropsWithChildren<FormButtonProps>) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <div className="animate-spin"><LoaderIcon /></div> : children}
    </Button>
  )
}

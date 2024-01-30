'use client'
import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './button'


export const FormButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? <div className="animate-spin"><LoaderIcon /></div> : children}
    </Button>
  )
})

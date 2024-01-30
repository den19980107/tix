'use client'
import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './button'


export const FormButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} ref={ref} {...props}>
      {pending ? <div className="animate-spin"><LoaderIcon /></div> : children}
    </Button>
  )
})


FormButton.displayName = "FormButton"

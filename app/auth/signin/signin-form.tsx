'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function SignInForm() {

  const form = useForm<{ username: string, password: string }>({
    defaultValues: { username: "", password: "" }
  })

  const onAction = () => {
    const credential = form.getValues()
    signIn("credentials", { username: credential.username, password: credential.password, callbackUrl: "/" })
  }
  return (
    <form
      action={onAction}
      className="space-y-8">
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>帳號</FormLabel>
              <FormControl>
                <Input type="email" className="w-full md:w-[300px]" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>密碼</FormLabel>
              <FormControl>
                <Input type="password" className="w-full md:w-[300px]" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="mt-2">
          <FormButton className="w-full mb-2">
            登入
          </FormButton>
          <FormDescription className="mt-2">
            還沒有帳號嗎?
          </FormDescription>
          <FormButton variant="secondary" className="w-full" >
            <Link href="/auth/register">
              註冊
            </Link>
          </FormButton>
        </div>
      </Form>
    </form >
  )
}

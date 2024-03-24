'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'
import { redirect } from 'next/navigation'

export default function SignInForm() {

  const form = useForm<{ username: string, password: string }>({
    defaultValues: { username: "", password: "" }
  })

  const onAction = async () => {
    const credential = form.getValues()
    const res = await signIn("credentials", { username: credential.username, password: credential.password, callbackUrl: "/", redirect: true })
    if (res?.error) {
      toast({
        title: "登入失敗",
        description: res.error,
      })
      return
    }

    redirect("/")
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
          <FormButton type="submit" className="w-full mb-2">
            登入
          </FormButton>
          <FormDescription className="mt-2 mb-2">
            還沒有帳號嗎?
          </FormDescription>
          <Button asChild className="w-full" variant="outline">
            <Link href="/auth/register">
              註冊
            </Link>
          </Button>
        </div>
      </Form>
    </form >
  )
}

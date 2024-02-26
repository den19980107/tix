import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import SignInForm from './signin-form';

export default async function SignInPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/")
  }


  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          登入
        </CardHeader>
        <CardContent>
          <SignInForm></SignInForm>
        </CardContent>
      </Card>
    </div >
  )
}


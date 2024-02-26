import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import React from 'react'
import RegisterForm from './register-form';

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    return { redirect: { destination: "/" } }
  }

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          註冊
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
        </CardContent>
      </Card>
    </div >
  )
}

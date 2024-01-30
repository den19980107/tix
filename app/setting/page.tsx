import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>選擇想調整的設定</AlertTitle>
      <AlertDescription className="w-full">
        你可以透過選單調整不同設定
      </AlertDescription>
    </Alert>
  )
}

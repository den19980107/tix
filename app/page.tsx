'use client'

import { Separator } from "@/components/ui/separator"

export default function IndexPage() {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">首頁</h2>
          <p className="text-muted-foreground">
            一個訂票服務
          </p>
        </div>
        <Separator />
      </div>
    </div>
  )
}

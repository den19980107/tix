'use client'
import { Separator } from "@/components/ui/separator";
import ThsrcForm from "./thsrc-form";

export default function ThsrcPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">高鐵</h3>
        <p className="text-sm text-muted-foreground">
          選取你想要訂購的出發站、抵達站，並選取可接受的時間，系統會在您指定的時間自動搶票
        </p>
      </div>
      <Separator />
      <ThsrcForm />
    </div>
  )
}

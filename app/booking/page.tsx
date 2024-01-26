import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";

export default function BookingPage() {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>選擇想預定的票種</AlertTitle>
      <AlertDescription className="w-full">
        你可以透過選單選擇不同票種
      </AlertDescription>
    </Alert>
  )
}

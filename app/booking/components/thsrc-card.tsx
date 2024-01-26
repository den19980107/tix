import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getThsrcStationName, ThsrcTicket } from '@/types/thsrc-ticket'
import { ArrowRightIcon } from 'lucide-react'
import React from 'react'

type ThsrcCardProps = {
  ticket: ThsrcTicket
}

export default function ThsrcCard({ ticket }: ThsrcCardProps) {
  return (
    <Card className="w-[250px] md:w-[350px]">
      <CardHeader>
        <CardTitle className="flex text-lg">
          {getThsrcStationName(ticket.from)}
          <ArrowRightIcon></ArrowRightIcon>
          {getThsrcStationName(ticket.to)}
        </CardTitle>
        <CardDescription>{formatDate(ticket.departureDay)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
        >
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              出發時間
            </p>
            <p className="text-sm text-muted-foreground">
              {ticket.startTime} ~ {ticket.endTime}
            </p>
          </div>
        </div>
        <div
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
        >
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              搶票時間
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(ticket.execDay)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">取消</Button>
        <Button>編輯</Button>
      </CardFooter>
    </Card>
  )
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

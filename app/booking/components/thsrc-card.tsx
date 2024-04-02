import { deleteThsrcOrder } from '@/app/actions/booking/thsrc'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FormButton } from '@/components/ui/form-button'
import { getThsrcStationName, getThsrcStatusName, ThsrcTicket, ThsrcTicketStatus } from '@/types/thsrc-ticket'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type ThsrcCardProps = {
  className?: string
  ticket: ThsrcTicket
}

export default function ThsrcCard({ ticket, className }: ThsrcCardProps) {
  let variant: 'default' | 'outline' | 'destructive' = 'outline'
  switch (ticket.status) {
    case ThsrcTicketStatus.pending:
      variant = 'outline'
      break
    case ThsrcTicketStatus.complete:
      variant = 'default'
      break
    case ThsrcTicketStatus.failed:
      variant = 'destructive'
      break
  }

  return (
    <Card className={className} >
      <CardHeader>
        <div className="flex justify-between">
          <CardDescription >
            {formatDate(ticket.departureDay)}
          </CardDescription>
          <Badge variant={variant}> {getThsrcStatusName(ticket.status)}</Badge>
        </div>
        <CardTitle className="flex text-lg">
          {getThsrcStationName(ticket.from)}
          <ArrowRightIcon className="mx-2"></ArrowRightIcon>
          {getThsrcStationName(ticket.to)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              最早出發時間
            </p>
            <p className="text-sm text-muted-foreground">
              {ticket.startTime}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              最晚出發時間
            </p>
            <p className="text-sm text-muted-foreground">
              {ticket.endTime}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              搶票日
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(ticket.execDay)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <Button variant="secondary" className="mr-auto" disabled={ticket.status !== ThsrcTicketStatus.pending}>
          <Link href={`/order/thsrc/${ticket.id}`}>輸入驗證碼</Link>
        </Button>
        <form action={async () => deleteThsrcOrder(ticket.id)} className="ml-auto">
          <FormButton>刪除</FormButton>
        </form>
      </CardFooter>
    </Card>
  )
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

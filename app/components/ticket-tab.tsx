"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThsrcTicket, ThsrcTicketStatus } from '@/types/thsrc-ticket'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../actions/order/get-orders'
import ThsrcTicketList from './thsrc-ticket-list'


interface TicketTabProps {
  initialOrders: ThsrcTicket[]
}

export default function TicketTab({ initialOrders }: TicketTabProps) {
  const { data: session } = useSession()
  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  const [orders, setOrders] = useState<ThsrcTicket[]>(initialOrders)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleTabChange = async (tab: string) => {
    setIsLoading(true)
    let orderStatus: ThsrcTicketStatus | null = null
    if (tab !== "all") {
      orderStatus = tab as ThsrcTicketStatus
    }

    const filteredOrders = await getOrders(session.user!.id, orderStatus)
    setOrders(filteredOrders)
    setIsLoading(false)
  }

  useEffect(() => {
    setOrders(initialOrders)
  }, [initialOrders])

  return (
    < Tabs defaultValue="all" onValueChange={handleTabChange} >
      <TabsList className="grid w-full grid-cols-4 md:w-[400px] md:ml-auto" >
        <TabsTrigger value="all">全部</TabsTrigger>
        <TabsTrigger value={ThsrcTicketStatus.pending}>準備中</TabsTrigger>
        <TabsTrigger value={ThsrcTicketStatus.complete}>完成</TabsTrigger>
        <TabsTrigger value={ThsrcTicketStatus.failed}>失敗</TabsTrigger>
      </TabsList>
      {
        isLoading ?
          <div className="flex justify-center pt-56">
            <Loader className="animate-spin justify-center"></Loader>
          </div>
          : <>
            <TabsContent value="all">
              <ThsrcTicketList orders={orders}></ThsrcTicketList>
            </TabsContent>
            <TabsContent value="pending">
              <ThsrcTicketList orders={orders}></ThsrcTicketList>
            </TabsContent>
            <TabsContent value="complete">
              <ThsrcTicketList orders={orders}></ThsrcTicketList>
            </TabsContent>
            <TabsContent value="failed">
              <ThsrcTicketList orders={orders}></ThsrcTicketList>
            </TabsContent>
          </>
      }
    </Tabs >
  )
}

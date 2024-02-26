import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MenuIcon, TicketIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Dialog>
        <DialogTrigger asChild className="md:hidden">
          <Button variant="ghost" className="-ml-4">
            <MenuIcon></MenuIcon>
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm pr-0 md:hidden">
          <Link href="/" className="flex items-center space-x-2 md:hidden pb-4 mb-4">
            <TicketIcon></TicketIcon>
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <nav className="flex gap-6 flex-col ml-8">
            {items?.map(
              (item, index) =>
                item.href && (
                  <DialogClose asChild key={index}>
                    <Link
                      key={index}
                      href={item.href}
                    >
                      <span className="inline-block">
                        {item.title}
                      </span>
                    </Link>
                  </DialogClose>
                )
            )}
          </nav>
        </DialogContent>
      </Dialog>

      <Link href="/" className="hidden sm:flex items-center space-x-2 ">
        <TicketIcon></TicketIcon>
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      {items?.length ? (
        <nav className="hidden sm:flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}

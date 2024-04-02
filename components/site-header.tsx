'use client'

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOut, useSession } from "next-auth/react"
import { LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Link from "next/link"

export function SiteHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} isLogin={!!session} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {session && session.user && session.user.username && session.user.username.length > 0 ?
              <>
                <Button variant="ghost" onClick={() => signOut({ redirect: true })}>
                  <LogOutIcon className="mr-2"></LogOutIcon>
                  Logout
                </Button>
                <Avatar>
                  <AvatarFallback>{session.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </>
              :
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" >
                    <LogInIcon className="mr-2" />
                    Login
                  </Button>
                </Link>
              </>
            }
          </nav>
        </div>
      </div>
    </header>
  )
}

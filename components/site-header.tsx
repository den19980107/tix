'use client'

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOut, useSession } from "next-auth/react"
import { LogOutIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"

export function SiteHeader() {
  const { data: session } = useSession()
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} isLogin={!!session} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session &&
              <>
                <UserIcon></UserIcon>
                <span>{session?.user?.name}</span>
                <Button variant="ghost" onClick={() => signOut()}>
                  <LogOutIcon></LogOutIcon>
                </Button>
              </>
            }
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

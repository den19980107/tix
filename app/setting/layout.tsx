import { SidebarNav } from '@/components/sidebar-nav'
import PageHeader from '../page-header'

const sidebarNavItems = [
  {
    title: "個人資料",
    href: "/setting/profile",
  },
]

type BookingLayoutProps = {
  children: React.ReactNode
}

export default function BookingLayout({ children }: BookingLayoutProps) {
  return (
    <>
      <div className="space-y-6 py-10 md:block md:p-10">
        <PageHeader title="設定" subTitle="選取你想設定的內容"></PageHeader>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}

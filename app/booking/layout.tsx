import PageHeader from '../page-header'
import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: "高鐵",
    href: "/booking/thsrc",
  },
  {
    title: "台鐵",
    href: "/booking/tr",
  },
  {
    title: "Inline",
    href: "/booking/inline",
  },
  {
    title: "拓元",
    href: "/booking/tixcraft",
  },
]

type BookingLayoutProps = {
  children: React.ReactNode
}

export default function BookingLayout({ children }: BookingLayoutProps) {
  return (
    <>
      <div className="space-y-6 py-10 md:block md:p-10">
        <PageHeader title="訂票" subTitle="選取你想要預先訂購的票種"></PageHeader>
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

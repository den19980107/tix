export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Tix",
  description:
    "訂票系統",
  mainNav: [
    {
      title: "首頁",
      href: "/home",
    },
    {
      title: "訂票",
      href: "/booking",
    },
    {
      title: "設定",
      href: "/setting",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}

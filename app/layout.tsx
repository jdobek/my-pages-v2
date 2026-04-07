import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/components/layout-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { DevProvider } from "@/lib/contexts/dev-context"
import { DevToolbar } from "@/components/dev-toolbar"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: "white",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <DevProvider>
              <LayoutProvider>{children}</LayoutProvider>
              <DevToolbar />
            </DevProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

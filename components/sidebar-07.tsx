"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, FileText, FileSpreadsheet, ChevronsUpDown, LogOut, FileText as TermsIcon, BarChart3 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  {
    title: "Navigation",
    items: [
      { icon: Home, label: "Dashboard", href: "/" },
      { icon: BarChart3, label: "Risk Score", href: "/risk-score" },
      { icon: FileText, label: "Policies", href: "/policies" },
      { icon: FileSpreadsheet, label: "Invoices", href: "/invoices" },
    ],
  },
]

function SidebarToggleButton() {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button


    variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="h-8 w-8 rounded-md border border-gray-300 bg-white"
    >
      {state === "expanded" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M15 3v18" />
          <path d="m10 15-3-3 3-3" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
          <path d="m14 9 3 3-3 3" />
        </svg>
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarHeaderContent() {
  const { state } = useSidebar()

  return (
    <div className={`flex items-center py-4 ${state === "collapsed" ? "justify-center px-1" : "justify-between px-2"}`}>
      {state === "expanded" && (
        <Image
          src="/fair-logo.svg"
          alt="Fair Logo"
          width={88}
          height={40}
          className="h-8 w-auto"
        />
      )}
      <SidebarToggleButton />
    </div>
  )
}

export function Sidebar07() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={isActive} className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                        <a
                          href={item.href}
                          style={{ fontWeight: 600 }}
                        >
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="pl-2 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:!py-2 cursor-pointer">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center text-sm font-semibold" style={{ backgroundColor: "#E4E4E7", color: "#1C1917", borderRadius: "8px" }}>
                    JD
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Jakub Dobek</span>
                    <span className="truncate text-xs">jakub.dobek@abax.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <TermsIcon className="mr-2 size-4" />
                  Terms of Use
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

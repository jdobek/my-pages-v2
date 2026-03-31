"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, FileText, FileSpreadsheet, ChevronsUpDown, LogOut, FileText as TermsIcon } from "lucide-react"

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
} from "@/components/ui/sidebar"
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
      { icon: FileText, label: "Policies", href: "/policies" },
      { icon: FileSpreadsheet, label: "Invoices", href: "/invoices" },
    ],
  },
]

export function Sidebar07() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center px-2 py-4">
          <Image
            src="/fair-logo.svg"
            alt="Fair Logo"
            width={88}
            height={40}
            className="h-10 w-auto"
          />
        </div>
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
                      <SidebarMenuButton asChild>
                        <a
                          href={item.href}
                          className={isActive ? "font-semibold" : ""}
                          style={isActive ? { color: "#005055" } : {}}
                        >
                          <item.icon style={isActive ? { color: "#005055" } : {}} />
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
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold bg-gray-300 text-black">
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

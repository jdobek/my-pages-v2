"use client"

import { useState } from "react"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

// Mock customer data - replace with actual user data
const customer = {
  firstName: "Jakub",
  lastName: "Dobek",
}

function Avatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  return (
    <div
      className="flex items-center justify-center rounded-full text-sm font-semibold"
      style={{ width: '40px', height: '40px', backgroundColor: '#CCDCDD', color: '#005055' }}
    >
      {initials}
    </div>
  )
}

export function SiteHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full" style={{ backgroundColor: '#FBFBFB' }}>
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <MainNav items={siteConfig.mainNav} />
        <div
          className="flex items-center gap-2 relative"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <span className="text-sm font-normal text-black" style={{ fontFamily: 'Inter' }}>
              {customer.firstName}, {customer.lastName}
            </span>
            <Avatar firstName={customer.firstName} lastName={customer.lastName} />
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <div className="px-4 py-1.5 text-sm font-medium text-black" style={{ fontFamily: 'Inter' }}>
                My Account
              </div>
              <div className="border-t border-gray-200"></div>
              <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span style={{ fontFamily: 'Inter' }}>Terms of Use</span>
              </button>
              <div className="border-t border-gray-200"></div>
              <button className="w-full flex items-center gap-2 px-4 py-1.5 text-sm hover:bg-gray-50 transition-colors text-red-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span style={{ fontFamily: 'Inter' }}>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

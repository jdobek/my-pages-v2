"use client"

import { useEffect, useRef, useState } from "react"

import { siteConfig } from "@/config/site"
import { currentUser } from "@/lib/data"
import { MainNav } from "@/components/main-nav"

function Avatar({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  return (
    <div
      className="flex size-10 items-center justify-center rounded-full text-sm font-semibold"
      style={{ backgroundColor: "#CCDCDD", color: "#005055" }}
    >
      {initials}
    </div>
  )
}

export function SiteHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ backgroundColor: "#FBFBFB" }}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <MainNav items={siteConfig.mainNav} />
        <div ref={dropdownRef} className="relative flex items-center gap-2">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap transition-opacity hover:opacity-80"
          >
            <span className="text-sm font-normal text-black">
              {currentUser.firstName}, {currentUser.lastName}
            </span>
            <Avatar
              firstName={currentUser.firstName}
              lastName={currentUser.lastName}
            />
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <div className="px-4 py-1.5 text-sm font-medium text-black">
                My Account
              </div>
              <div className="border-t border-gray-200"></div>
              <button className="flex w-full items-center gap-2 px-4 py-1.5 text-sm text-black transition-colors hover:bg-gray-50">
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span>Terms of Use</span>
              </button>
              <div className="border-t border-gray-200"></div>
              <button className="flex w-full items-center gap-2 px-4 py-1.5 text-sm text-red-600 transition-colors hover:bg-gray-50">
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

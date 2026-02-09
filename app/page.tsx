"use client"

import { useState } from "react"
import { currentUser } from "@/lib/data"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export default function IndexPage() {
  const [selectedCoverLevels, setSelectedCoverLevels] = useState<string[]>([])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] = useState<string>("")
  return (
    <section className="w-full">
      {/* Header and boxes section with light background */}
      <div style={{ backgroundColor: '#FBFBFB' }}>
        <div className="container mx-auto max-w-7xl px-4 pt-10 pb-4 md:pt-16 md:pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Total amount of vehicles */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <p style={{ color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
              Total amount of vehicles
            </p>
            <p style={{ fontFamily: 'Inter', color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.totalVehicles}
            </p>
          </div>

          {/* Total amount of premium */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <p style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>
                Total amount of premium
              </p>
              <svg style={{ width: '16px', height: '16px', color: '#94A3B8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <p style={{ color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.totalPremium.toLocaleString('sv-SE', { maximumFractionDigits: 0 })} kr
            </p>
          </div>

          {/* Avg. vehicle insurance price */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <p style={{ color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
              Avg. vehicle insurance price
            </p>
            <p style={{ color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.avgVehicleInsurancePrice.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr
            </p>
          </div>

          {/* Risk score */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <p style={{ color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
              Risk score
            </p>
            <p style={{ color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.riskScore}/10
            </p>
          </div>
        </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-10 pb-4 md:pt-16 md:pb-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ color: '#0F172A', fontWeight: '600', fontSize: '24px' }}>
              Get in touch
            </h1>
            <p style={{ color: '#334155', fontSize: '14px', lineHeight: '24px' }}>
              Want to update something in your active policy? Send us a request whenever you need - it&apos;s fast, simple, and we&apos;ll take care of everything for you.
            </p>
          </div>
          <div className="flex gap-4 items-center">
          <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#005055',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '8px',
            border: 'none',
                        fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <span style={{ fontSize: '24px', lineHeight: '24px', display: 'flex', alignItems: 'center', fontWeight: '400' }}>+</span>
          Submit a request
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'white',
            color: '#0F172A',
            padding: '8px 20px',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
                        fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#005055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download all insurance letters
        </button>
          </div>
          <div className="border-t border-gray-200 mt-12"></div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-10 pb-4 md:pt-16 md:pb-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ color: '#0F172A', fontWeight: '600', fontSize: '24px' }}>
              My vehicles
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
              <input
                type="text"
                placeholder="Search by plate number or model"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  flex: '1',
                  minWidth: '0',
                  backgroundColor: 'white',
                  color: '#0F172A'
                }}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      color: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Cover lvl
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedCoverLevels.includes('full')}
                    onCheckedChange={(checked) => {
                      setSelectedCoverLevels(
                        checked
                          ? [...selectedCoverLevels, 'full']
                          : selectedCoverLevels.filter(item => item !== 'full')
                      )
                    }}
                  >
                    Full Coverage
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedCoverLevels.includes('basic')}
                    onCheckedChange={(checked) => {
                      setSelectedCoverLevels(
                        checked
                          ? [...selectedCoverLevels, 'basic']
                          : selectedCoverLevels.filter(item => item !== 'basic')
                      )
                    }}
                  >
                    Basic Coverage
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      color: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Add-ons
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes('roadside')}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, 'roadside']
                          : selectedAddOns.filter(item => item !== 'roadside')
                      )
                    }}
                  >
                    Roadside Assistance
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes('glass')}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, 'glass']
                          : selectedAddOns.filter(item => item !== 'glass')
                      )
                    }}
                  >
                    Glass Protection
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes('belongings')}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, 'belongings']
                          : selectedAddOns.filter(item => item !== 'belongings')
                      )
                    }}
                  >
                    Personal Belongings
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedAddOns.includes('legal')}
                    onCheckedChange={(checked) => {
                      setSelectedAddOns(
                        checked
                          ? [...selectedAddOns, 'legal']
                          : selectedAddOns.filter(item => item !== 'legal')
                      )
                    }}
                  >
                    Legal Protection
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      color: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Sort by
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortBy === 'model'}
                    onCheckedChange={(checked) => {
                      setSelectedSortBy(checked ? 'model' : '')
                    }}
                  >
                    Model
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortBy === 'price'}
                    onCheckedChange={(checked) => {
                      setSelectedSortBy(checked ? 'price' : '')
                    }}
                  >
                    Price
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedSortBy === 'age'}
                    onCheckedChange={(checked) => {
                      setSelectedSortBy(checked ? 'age' : '')
                    }}
                  >
                    Age
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                color: '#0F172A',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#005055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 5 7 13 17 13 17 5"></polyline>
              </svg>
              Download excel file
            </button>
          </div>

          <div className="mt-8" style={{ borderRadius: '6px', overflow: 'hidden' }}>
            <table className="w-full border-collapse">
              <thead className="table-header">
                <tr>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Plate number</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Model</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Age</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Price</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Price (TFA)</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Cover lvl</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Add-ons</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Start Date</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Renewal Date</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '600', fontSize: '14px', color: '#0F172A' }}>Action</th>
                </tr>
              </thead>
              <tbody className="table-body" style={{ border: '1px solid #E2E8F0', borderRadius: '8px', display: 'table-row-group' }}>
                {currentUser.vehicles.map((vehicle) => (
                  <tr key={vehicle.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#005055' }}>
                      <a href="#" style={{ textDecoration: 'underline', color: '#005055', fontWeight: '500' }}>
                        {vehicle.plateNumber}
                      </a>
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>{vehicle.model}</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>{vehicle.age} yo</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>{vehicle.price.toLocaleString('sv-SE')} kr</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>{vehicle.priceWithTFA.toLocaleString('sv-SE')} kr</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>{vehicle.coverLevel}</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>{vehicle.addOns.length}</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>
                      {new Date(vehicle.startDate).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#0F172A' }}>
                      {new Date(vehicle.renewalDate).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '14px' }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: 'transparent',
                          color: '#0F172A',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="#005055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Submit a request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

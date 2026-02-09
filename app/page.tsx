"use client"

import { currentUser } from "@/lib/data"

export default function IndexPage() {
  return (
    <section className="w-full">
      {/* Header and boxes section with light background */}
      <div style={{ backgroundColor: '#FBFBFB' }}>
        <div className="container mx-auto max-w-7xl px-4 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Total amount of vehicles */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontFamily: 'Inter', color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
              Total amount of vehicles
            </p>
            <p style={{ fontFamily: 'Inter', color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.totalVehicles}
            </p>
          </div>

          {/* Total amount of premium */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'Inter', color: '#64748B', fontSize: '14px', fontWeight: '500' }}>
                Total amount of premium
              </p>
              <svg style={{ width: '16px', height: '16px', color: '#94A3B8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <p style={{ fontFamily: 'Inter', color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.totalPremium.toLocaleString('sv-SE', { maximumFractionDigits: 0 })} kr
            </p>
          </div>

          {/* Avg. vehicle insurance price */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontFamily: 'Inter', color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
              Avg. vehicle insurance price
            </p>
            <p style={{ fontFamily: 'Inter', color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.avgVehicleInsurancePrice.toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr
            </p>
          </div>

          {/* Risk score */}
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '24px', backgroundColor: '#FFFFFF' }}>
            <p style={{ fontFamily: 'Inter', color: '#64748B', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
              Risk score
            </p>
            <p style={{ fontFamily: 'Inter', color: '#0F172A', fontSize: '32px', fontWeight: '700' }}>
              {currentUser.riskScore}/10
            </p>
          </div>
        </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 style={{ color: '#0F172A', fontFamily: 'Inter', fontWeight: '600', fontSize: '24px' }}>
              Get in touch
            </h1>
            <p style={{ fontFamily: 'Inter', color: '#334155', fontSize: '14px', lineHeight: '24px' }}>
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
            fontFamily: 'Inter',
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
            fontFamily: 'Inter',
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
        </div>
      </div>
    </section>
  )
}

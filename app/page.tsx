"use client"

export default function IndexPage() {
  return (
    <section className="w-full">
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

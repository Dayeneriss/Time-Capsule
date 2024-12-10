// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import React from 'react'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return React.createElement('img', props)
  },
}))

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_PINATA_JWT: 'test-jwt',
  NEXT_PUBLIC_CONTRACT_ADDRESS: '0x123',
}

// Mock global objects
if (typeof global.URL.createObjectURL === 'undefined') {
  global.URL.createObjectURL = jest.fn(() => 'mock-url')
  global.URL.revokeObjectURL = jest.fn()
}

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ IpfsHash: 'test-hash' }),
  })
)

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreatePage from '../create/page'

// Mock FloatingParticles component
jest.mock('../components/FloatingParticles', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="floating-particles" />,
  }
})

// Mock TextEncoder and TextDecoder for viem
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder

describe('CreatePage', () => {
  const setup = () => {
    const user = userEvent.setup()
    const utils = render(<CreatePage />)
    return {
      user,
      ...utils,
    }
  }

  it('renders create page with all form elements', () => {
    setup()

    // Check for main title
    expect(screen.getByText('Create Your Time Capsule')).toBeInTheDocument()

    // Check for form inputs
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/unlock date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/upload files/i)).toBeInTheDocument()

    // Check for submit button
    expect(screen.getByRole('button', { name: /create time capsule/i })).toBeInTheDocument()
  })

  it('handles file upload correctly', async () => {
    const { user } = setup()

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = screen.getByLabelText(/upload files/i)

    await user.upload(input, file)

    // Check if file name is displayed
    expect(screen.getByText('hello.png')).toBeInTheDocument()
    
    // Check if file size is displayed
    expect(screen.getByText('5 B')).toBeInTheDocument()
  })

  it('validates file size', async () => {
    const { user } = setup()

    // Create a file larger than 10MB
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.png', { type: 'image/png' })
    const input = screen.getByLabelText(/upload files/i)

    await user.upload(input, largeFile)

    // Check for error message
    expect(screen.getByText(/some files exceed the 10MB size limit/i)).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    const { user } = setup()

    // Fill in form fields
    await user.type(screen.getByLabelText(/title/i), 'Test Capsule')
    await user.type(screen.getByLabelText(/description/i), 'Test Description')
    
    // Set future date
    const futureDate = new Date()
    futureDate.setFullYear(futureDate.getFullYear() + 1)
    const dateInput = screen.getByLabelText(/unlock date/i)
    fireEvent.change(dateInput, { target: { value: futureDate.toISOString().slice(0, 16) } })

    // Upload file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText(/upload files/i)
    await user.upload(fileInput, file)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /create time capsule/i })
    await user.click(submitButton)

    // Check if upload started
    await waitFor(() => {
      expect(screen.getByText(/uploading to ipfs/i)).toBeInTheDocument()
    })
  })

  it('validates unlock date is in the future', async () => {
    const { user } = setup()

    // Fill in form fields
    await user.type(screen.getByLabelText(/title/i), 'Test Capsule')
    
    // Set past date
    const pastDate = new Date()
    pastDate.setFullYear(pastDate.getFullYear() - 1)
    const dateInput = screen.getByLabelText(/unlock date/i)
    fireEvent.change(dateInput, { target: { value: pastDate.toISOString().slice(0, 16) } })

    // Upload file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const fileInput = screen.getByLabelText(/upload files/i)
    await user.upload(fileInput, file)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /create time capsule/i })
    await user.click(submitButton)

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/unlock date must be in the future/i)).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    const { user } = setup()

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /create time capsule/i })
    await user.click(submitButton)

    // Check for error messages
    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/description is required/i)).toBeInTheDocument()
    expect(screen.getByText(/unlock date is required/i)).toBeInTheDocument()
    expect(screen.getByText(/at least one file is required/i)).toBeInTheDocument()
  })

  it('validates title length', async () => {
    const { user } = setup()

    // Type a very long title (more than 100 characters)
    const longTitle = 'a'.repeat(101)
    await user.type(screen.getByLabelText(/title/i), longTitle)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /create time capsule/i })
    await user.click(submitButton)

    // Check for error message
    expect(screen.getByText(/title must be less than 100 characters/i)).toBeInTheDocument()
  })

  it('validates description length', async () => {
    const { user } = setup()

    // Type a very long description (more than 500 characters)
    const longDescription = 'a'.repeat(501)
    await user.type(screen.getByLabelText(/description/i), longDescription)

    // Submit form
    const submitButton = screen.getByRole('button', { name: /create time capsule/i })
    await user.click(submitButton)

    // Check for error message
    expect(screen.getByText(/description must be less than 500 characters/i)).toBeInTheDocument()
  })

  it('handles multiple file uploads', async () => {
    const { user } = setup()

    const files = [
      new File(['hello'], 'hello1.png', { type: 'image/png' }),
      new File(['world'], 'hello2.png', { type: 'image/png' })
    ]
    const input = screen.getByLabelText(/upload files/i)

    await user.upload(input, files)

    // Check if both file names are displayed
    expect(screen.getByText('hello1.png')).toBeInTheDocument()
    expect(screen.getByText('hello2.png')).toBeInTheDocument()
    
    // Check if file sizes are displayed
    expect(screen.getByText('5 B')).toBeInTheDocument()
    expect(screen.getByText('5 B')).toBeInTheDocument()
  })

  it('allows file removal', async () => {
    const { user } = setup()

    // Upload a file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = screen.getByLabelText(/upload files/i)
    await user.upload(input, file)

    // Find and click remove button
    const removeButton = screen.getByLabelText(/remove hello.png/i)
    await user.click(removeButton)

    // Check if file was removed
    expect(screen.queryByText('hello.png')).not.toBeInTheDocument()
  })
})

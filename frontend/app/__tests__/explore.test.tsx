import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExplorePage from '../explore/page'

// Mock FloatingParticles component
jest.mock('../components/FloatingParticles', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="floating-particles" />,
  }
})

describe('ExplorePage', () => {
  const setup = () => {
    const user = userEvent.setup()
    const utils = render(<ExplorePage />)
    return {
      user,
      ...utils,
    }
  }

  it('renders explore page with title', () => {
    setup()
    expect(screen.getByText('Explore Time Capsules')).toBeInTheDocument()
  })

  it('displays time capsules', () => {
    setup()
    
    // Check for mock capsules
    expect(screen.getByText('Memories of 2023')).toBeInTheDocument()
    expect(screen.getByText('Message to the Future')).toBeInTheDocument()
  })

  it('displays capsule details', () => {
    setup()

    // Check for capsule information
    const capsule = screen.getByText('Memories of 2023').closest('div')
    expect(capsule).toBeInTheDocument()
    
    if (capsule) {
      expect(within(capsule).getByText(/created/i)).toBeInTheDocument()
      expect(within(capsule).getByText(/unlocks/i)).toBeInTheDocument()
      expect(within(capsule).getByText(/creator/i)).toBeInTheDocument()
    }
  })

  it('handles view details button click', async () => {
    const { user } = setup()
    
    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    
    // Click view details button
    const viewButton = screen.getAllByText('View Details')[0]
    await user.click(viewButton)
    
    // Check if alert was called
    expect(alertMock).toHaveBeenCalledWith('Viewing details for capsule 1')
    
    // Cleanup
    alertMock.mockRestore()
  })

  it('applies hover styles to capsule cards', async () => {
    const { user } = setup()
    
    const capsuleCard = screen.getByText('Memories of 2023').closest('div')
    expect(capsuleCard).toHaveClass('group')
    
    // Note: Testing hover styles is limited in JSDOM
    // We can only test the presence of the classes
    if (capsuleCard) {
      expect(capsuleCard).toHaveClass('hover:scale-[1.02]')
      expect(capsuleCard).toHaveClass('transition-all')
    }
  })

  it('filters capsules by search term', async () => {
    const { user } = setup()
    
    // Type in search box
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    await user.type(searchInput, 'Memories')
    
    // Check filtered results
    expect(screen.getByText('Memories of 2023')).toBeInTheDocument()
    expect(screen.queryByText('Message to the Future')).not.toBeInTheDocument()
  })

  it('filters capsules by date range', async () => {
    const { user } = setup()
    
    // Select date range
    const dateFilter = screen.getByRole('combobox', { name: /filter by date/i })
    await user.selectOptions(dateFilter, 'last-week')
    
    // Check filtered results
    const capsules = screen.getAllByRole('article')
    expect(capsules.length).toBeGreaterThan(0)
    
    // Verify dates are within range
    capsules.forEach(capsule => {
      const dateText = within(capsule).getByText(/created/i).textContent
      const createdDate = new Date(dateText!.replace('Created: ', ''))
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      expect(createdDate).toBeGreaterThan(oneWeekAgo)
    })
  })

  it('sorts capsules by creation date', async () => {
    const { user } = setup()
    
    // Click sort button
    const sortButton = screen.getByRole('button', { name: /sort by date/i })
    await user.click(sortButton)
    
    // Get all capsule dates
    const capsules = screen.getAllByRole('article')
    const dates = capsules.map(capsule => {
      const dateText = within(capsule).getByText(/created/i).textContent
      return new Date(dateText!.replace('Created: ', '')).getTime()
    })
    
    // Check if dates are sorted in descending order
    const sortedDates = [...dates].sort((a, b) => b - a)
    expect(dates).toEqual(sortedDates)
  })

  it('handles no search results', async () => {
    const { user } = setup()
    
    // Search for non-existent capsule
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    await user.type(searchInput, 'NonExistentCapsule')
    
    // Check for no results message
    expect(screen.getByText('No capsules found')).toBeInTheDocument()
  })

  it('displays loading state', () => {
    render(<ExplorePage isLoading={true} />)
    
    // Check for loading indicator
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('handles error state', () => {
    render(<ExplorePage error="Failed to fetch capsules" />)
    
    // Check for error message
    expect(screen.getByText('Failed to fetch capsules')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })
})

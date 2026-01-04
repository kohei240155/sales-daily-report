import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

// Simple component for testing
function ExampleComponent({ title }: { title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>This is an example component for testing.</p>
    </div>
  )
}

describe('ExampleComponent', () => {
  it('should render the title', () => {
    render(<ExampleComponent title="Test Title" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render the description', () => {
    render(<ExampleComponent title="Test Title" />)

    expect(
      screen.getByText('This is an example component for testing.')
    ).toBeInTheDocument()
  })

  it('should render with correct structure', () => {
    const { container } = render(<ExampleComponent title="Test Title" />)

    expect(container.querySelector('h1')).toBeInTheDocument()
    expect(container.querySelector('p')).toBeInTheDocument()
  })
})

// Simple utility function test
function add(a: number, b: number): number {
  return a + b
}

describe('add utility function', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })
})

import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SimpleHeader from './SimpleHeader'

describe('SimpleHeader Component', function () {
  afterEach(cleanup)

  it('renders SimpleHeader Component', () => {
    render(<SimpleHeader />)
  })

  it('should take a snapshot', () => {
    const { asFragment } = render(<SimpleHeader />)
    expect(asFragment(<SimpleHeader />)).toMatchSnapshot()
  })

  it('should have Hello world title', () => {
    const { getByTestId } = render(<SimpleHeader title='Hello world' />)
    expect(getByTestId('header-title')).toMatchInlineSnapshot(`
    <h1
      class="MuiTypography-root makeStyles-title-8 MuiTypography-h5"
      data-testid="header-title"
    >
      Hello world
    </h1>
    `)
  })

  it('should have a title', () => {
    const { queryByTestId } = render(<SimpleHeader title='title text' />)
    expect(queryByTestId('header-title')).toBeTruthy()
  })

  it('should not have a title', () => {
    const { queryByTestId } = render(<SimpleHeader />)
    expect(queryByTestId('header-title')).toBeNull()
  })

  it('should have a button', () => {
    const { queryByTestId } = render(<SimpleHeader btnText='Go back' />)
    expect(queryByTestId('header-button')).toBeTruthy()
  })

  it('should not have a button', () => {
    const { queryByTestId } = render(<SimpleHeader />)
    expect(queryByTestId('header-button')).toBeNull()
  })
})

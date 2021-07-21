import React from 'react'
import { render, fireEvent } from 'test-utils'
import SimpleHeader from './SimpleHeader'

it('matches snapshot', () => {
  const { asFragment } = render(<SimpleHeader title='Test Title' />)

  expect(asFragment()).toMatchSnapshot()
});
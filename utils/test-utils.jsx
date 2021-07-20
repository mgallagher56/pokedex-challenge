import React from 'react'
import { render } from '@testing-library/react'
import { render, queries } from '@testing-library/react'
import * as customQueries from '../custom-queries'
import { ThemeProvider } from 'my-ui-lib'
import { TranslationProvider } from 'my-i18n-lib'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme='light'>
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries, ...customQueries }, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
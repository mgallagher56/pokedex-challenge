describe('Lighthouse', () => {
  it('should run performance audits using custom thresholds', () => {
    const customThresholds = {
      performance: 90,
      accessibility: 90,
      seo: 90,
      pwa: 100
    }

    const desktopConfig = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true }
    }

    cy.visit('/')
    cy.lighthouse(customThresholds, desktopConfig)
    cy.pa11y()
  })
})

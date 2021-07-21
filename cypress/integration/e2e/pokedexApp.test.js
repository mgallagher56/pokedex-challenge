/// <reference types="cypress" />

describe('pokemon listing app', () => {
  // visits this url before every test
  beforeEach(() => {
    cy.visit('/')
  })

  // check 20 pokemon cards are rendered when the app starts
  it('displays 20 pokemon cards', () => {
    cy.get('.pokemon-card').should('have.length', 20)

    cy.get('.pokemon-card').first().should('contain', 'bulbasaur')
    cy.get('.pokemon-card').last().should('contain', 'raticate')
  })

  // test functionality of seach
  it('can search for items in collection', () => {
    const searchStr = 'char'

    cy.get('#search-bar').type(`${searchStr}`)

    cy.get('.pokemon-card').each((card) => {
      cy.wrap(card).get('h2').should('contain', searchStr)
    })
  })

  // checks link on each card goes to specific pokemon page
  it('can link to pokemon detail page', () => {
    cy.get('.pokemon-card').each((card) => {
      cy.wrap(card).find('h2').then((el) => {
        const name = el.text()
        cy.wrap(card).parent().should('have.attr', 'href', `/pokemon/${name}`)
      })
    })
  })

  // tests button on pokemon detail page to take back to homepage
  it('can return to the homepage from pokemon detail page', () => {
    cy.get('.pokemon-card').first().click()
    cy.wait(1000)
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:9001/')
  })

  // tests pagination
  it('can move between pages', () => {
    cy.get('.MuiPaginationItem-page').last().click()
    cy.get('.pokemon-card').should('exist')
  })

  // tests pagination when search is active
  it('can search and move through search results', () => {
    const searchStr = 'a'
    cy.get('#search-bar').type(`${searchStr}`)

    cy.get('.pokemon-card').each((card) => {
      cy.wrap(card).should('contain', searchStr)
    })

    cy.get('.MuiPaginationItem-page').eq(2).click()

    cy.get('.pokemon-card').should('exist')

    cy.get('.pokemon-card').each((card) => {
      cy.wrap(card).should('contain', searchStr)
    })
  })

  // tests button to show all pokemon when no search results are found
  it('can reset app if search returns no results', () => {
    const searchStr = 'sdasgdfgd'

    cy.get('#search-bar').type(`${searchStr}`)
    cy.get('.pokemon-card').should('have.length', 0)
    cy.contains('Catch EM\' ALl').click()
    cy.get('.pokemon-card').should('have.length', 20)
    cy.get('.pokemon-card').first().should('contain', 'bulbasaur')
    cy.get('.pokemon-card').last().should('contain', 'raticate')
  })
})

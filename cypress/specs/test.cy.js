describe('setCookie', () => {
  it.skip('cookies are sent', () => {
    cy.visit('/')
    cy.get('a').contains('API').click()
    cy.get('ul > li').contains('username').should('exist')
    cy.wait(1000)
  })

  it('external: cookies are not sent', () => {
    cy.visit(Cypress.env('SECONDARY_URL'))

    cy.origin(Cypress.config('baseUrl'), { args: {} }, ({}) => {
      cy.visit('/')
      cy.get('a').contains('API').click()
      cy.get('ul > li').contains('username').should('exist')
    })
  })
})

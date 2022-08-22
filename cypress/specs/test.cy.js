describe('setCookie', () => {
  it.skip('cookies are sent', () => {
    cy.visit('/')
    cy.get('a').contains('API').click()
    cy.get('ul > li').contains('username').should('exist')
    cy.wait(1000)
  })

  it('external: cookies are not sent', () => {
    cy.session('test', () => {
      cy.visit('http://secondary.bar:8090/')

      cy.origin(Cypress.config('baseUrl'), { args: {} }, ({}) => {
        cy.log(Cypress.config('baseUrl'))

        cy.setCookie('name', 'marcel')

        cy.visit({ url: '/' })
        cy.get('a').contains('API').click()
        cy.get('ul > li').contains('username').should('exist')
      })
    })
  })
})

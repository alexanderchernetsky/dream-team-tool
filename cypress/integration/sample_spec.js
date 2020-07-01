describe('Login tests', () => {
  it('Visit the Login page, type in credentials and click Submit', () => {
    cy.visit('/login')
    cy.get('[data-test-id="login-email"]').type('admin@example.com')
    cy.get('[data-test-id="login-password"]').type('12345678')
    cy.contains('Submit').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

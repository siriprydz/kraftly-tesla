describe('inloggning', () => {
  it('kunden kan logga in och ser sin översikt', () => {
    cy.visit('/login')
    cy.get('input[autocomplete="username"]').type('anna@example.com')
    cy.get('input[autocomplete="current-password"]').type('hemligt')
    cy.contains('button', 'Logga in').click()

    cy.get('h1').should('have.text', 'Hej Anna!')
  })
})

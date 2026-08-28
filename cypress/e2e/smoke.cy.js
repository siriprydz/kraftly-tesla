describe('inloggning', () => {
  it('kunden kan logga in och ser sin översikt', () => {
    cy.visit('/login')
    cy.get('input[placeholder="E-postadress"]').type('anna@example.com')
    cy.get('input[placeholder="Lösenord"]').type('hemligt')
    cy.contains('button', 'Logga in').click()

    cy.get('h1').should('have.text', 'Hej Anna!')
  })
})
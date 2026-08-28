describe('fakturor', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/login', { token: 'test', name: 'Test Testsson' })
    cy.intercept('GET', '**/api/user', { name: 'Test Testsson', contract: 'Rörligt pris' })
    cy.intercept('GET', '**/api/consumption', { unit: 'kWh', months: ['Jan'], values: [100], pricePerKwh: 2 })
  })

  it('fakturasidan visar det API:et svarar – även en faktura servern aldrig haft', () => {
    cy.intercept('GET', '**/api/invoices', [
      { id: 'F-999', period: 'December 2019', amount: 999, status: 'Obetald', due: '2020-01-01' }
    ]).as('invoices')

    cy.visit('/login')
    cy.contains('button', 'Logga in').click()
    cy.contains('a', 'Fakturor').click()
    cy.wait('@invoices')

    cy.contains('td', 'F-999').should('be.visible')
    cy.contains('December 2019').should('be.visible')
  })
})
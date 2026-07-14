describe('Pruebas E2E - RouletteDecider', () => {
  
  beforeEach(() => {
    // Hace la visita.
    cy.visit('http://localhost:8100/login');
  });

  it('Bloquea el acceso a los tabs si no hay login (Route Guard)', () => {
    // Intento sin login.
    cy.visit('http://localhost:8100/tabs/tabs/tab3');
    // Lo tira de vuelta a login.
    cy.url().should('include', '/login');
  });

  it('Inicia sesión correctamente y permite la navegación', () => {
    // Clic en ingreso.
    cy.get('ion-button').contains('Ingresar').click();

    // Almacenamiento local funcional.
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user_authenticated')).to.equal('true');
    });

    // Confirma si lo llevo a la pagina principal.
    cy.url().should('include', '/tabs/tabs/tab1');
  });
});
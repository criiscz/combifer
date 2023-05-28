describe('template spec', () => {

    /* ==== Test Created with Cypress Studio ==== */
    it('LoginFail', function () {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3000');
        cy.get('#username').type('usuario-no-registrado');
        cy.get('#password').type('contraseña');
        cy.get('.login_form_button__luhPS').click();
        cy.get('.login_form_error__r04XN').should('have.text', 'Contraseña Incorrecta, Verifique sus credenciales.');
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('Login-successfully', function () {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3000');
        cy.get('#username').type('test');
        cy.get('#password').type('123');
        cy.get('.login_form_button__luhPS').click();
        cy.get('h1').should('have.text', 'Orlando Vargas');
        cy.get('.style_body___lwE7').click();
        cy.get('.navbar_navbar__logout_text__fsbRS').click();
        cy.get('.login_form_login__I6FTh > h1').should('have.text', 'Inicio de sesión');
        /* ==== End Cypress Studio ==== */
    });
})

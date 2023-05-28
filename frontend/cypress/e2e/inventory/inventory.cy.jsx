describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('Inventory', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#username').type('criiscz');
    cy.get('#password').type('pass123');
    cy.get('.login_form_button__luhPS').click();
    cy.get(':nth-child(1) > a').click();
    cy.get('.style_productList__title__Ze_LB').should('have.text', 'Inventario');
    cy.get('.style_overview__title_product_name__jMOBg').should('have.text', 'No hay producto seleccionado');
    cy.wait(10000);
    cy.get('.style_searchbar_input__eaQpa').type('Llave inglesa');
    cy.get('.style_table__body_row__cdH5D > :nth-child(2)').click();
    cy.get('.style_overview__title_product_name__jMOBg').click();
    cy.get('.style_overview__title_product_name__jMOBg').should('have.text', 'Llave inglesa');
    cy.get('.component_button__KdqFe > button').should('have.text', 'Agregar Producto');
    cy.get('.component_button__KdqFe > button').click();
    cy.get('.style_dialog__title__MlV_b').should('have.text', 'Agregar Producto');
    cy.wait(10000);
    cy.get('.style_dialog__form__DS9WD > :nth-child(4)').click();
    cy.get('#location').select('7');
    cy.get('#location').should('have.id', 'location');
    cy.get('.style_dialog__form__DS9WD').click();
    cy.get('#category').should('have.id', 'category');
    cy.get('#buy-date').click();
    cy.get('.style_dialog__body_group_button__pfvFh').click();
    cy.get('#name').should('not.be.checked');
    cy.get('.style_dialog__header__Np_A1').click();
    cy.get('.style_dialog__closeButton__Ef7ge > .iconify').click();
    cy.get('.style_inventory_container__E41us').click();
    cy.get('.style_table__body_row__cdH5D').click();
    cy.get('.style_table__body_row__cdH5D > :nth-child(2)').click();
    cy.get('.style_overview__actionButtons_button_edit__agzPu > .iconify').click();
    cy.get('#name').should('have.value', 'Llave inglesa');
    cy.get('.style_dialog__body_group_button__pfvFh').click();
    cy.wait(10000);
    cy.get('.style_toast__content__DeL0n').should('have.text', 'Producto editado correctamenteX');
    cy.get('.style_overview__container__TUjdQ').click();
    cy.get('.navbar_navbar__logout_text__fsbRS').click();
    cy.get('.login_form_login__I6FTh > h1').should('have.text', 'Inicio de sesión');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Sells-Incomplete', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#username').type('criiscz');
    cy.get('#password').clear();
    cy.get('#password').type('pass123');
    cy.get('.login_form_button__luhPS').click();
    cy.get(':nth-child(2) > a').click();
    cy.get('.style_searchbar_input__eaQpa').type('1007');
    cy.get('.style_loading__spinner__zrD4e').should('have.class', 'style_loading__spinner__zrD4e');
    cy.get('.style_searchbar_input__eaQpa').type('44');
    cy.wait(5000);
    cy.get('.style_bill__actionButtons_button_edit__2hVfI > .iconify').should('be.visible');
    cy.get('.style_bill__actionButtons_button_edit__2hVfI > .iconify').click();
    cy.get('.style_title__JGc1E').should('have.text', 'Generar Factura');
    cy.get(':nth-child(1) > .style_rowItem__content__nsI_d > :nth-child(5) > :nth-child(2)').should('have.text', '$165900.00');
    cy.get('.style_rowItem__content__nsI_d > :nth-child(6) > :nth-child(2)').should('have.text', 'felipeandresgutierrezpalacio@yahoo.es');
    cy.get('.style_table__body__PrIyW > :nth-child(2) > :nth-child(2)').should('have.text', 'Varillas de acero');
    cy.get('.style_table__body__PrIyW > :nth-child(2) > :nth-child(5)').should('have.text', '$26000');
    cy.get('.style_closeButton__aZi0M > .iconify > path').should('be.visible');
    cy.get('.style_closeButton__aZi0M > .iconify > path').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('users', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#username').type('criiscz');
    cy.get('#password').type('pass123');
    cy.get('.login_form_button__luhPS').click();
    cy.get(':nth-child(3) > a').click();
    cy.get('.style_title__DufJn').should('have.text', 'Detalles de Usuario');
    cy.get('.component_button__KdqFe > button').should('have.text', 'Agregar Usuario');
    cy.get('.style_table__body__lGD3l > :nth-child(1) > :nth-child(1)').should('have.text', '10023');
    cy.get('.component_button__KdqFe > button').click();
    cy.get('.style_title__s8wO5').should('have.text', 'Nuevo usuario');
    cy.get('.registerForm_form_button__1GYPs > button').should('have.text', 'Crear usuario');
    cy.get('.registerForm_form_button__1GYPs > button').click();
    cy.get('#name').should('not.be.checked');
    cy.get('.style_closeButton__5SPxr > .iconify').click();
    cy.get('.style_table__body__lGD3l > :nth-child(1) > :nth-child(2)').click();
    cy.get(':nth-child(2) > .style_body__data_item_value__DlmHm').should('have.text', 'criiscz');
    cy.get('.style_body__actionButtons_edit__m3KGv > .iconify > path').click();
    cy.get('#phone').should('have.value', '3145434343');
    cy.get('.style_closeButton__0qhyV > .iconify > path').click();
    cy.get('.navbar_navbar__logout_text__fsbRS').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('orders', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#username').type('criiscz');
    cy.get('#password').type('pass123');
    cy.get('.login_form_button__luhPS').click();
    cy.get('.style_body___8gDq > div > h1').should('have.text', 'No hay orden seleccionada');
    cy.get(':nth-child(3) > .style_body__data_item_value__MT8a1').should('have.text', 'email@fake.com');
    cy.get(':nth-child(1) > .style_body__data_item_value__MT8a1').should('have.text', 'Orlando Vargas');
    cy.get('.style_body__actionButtons_details__gM_1c > .iconify').click();
    cy.get('.style_rowItem__content__mvW5Z > .style_table__container__XLc5y > .style_table__body__lGD3l > .style_table__body_row__vopOp > :nth-child(1)').should('have.text', 'Varillas de acero');
    cy.get('.style_table__body_row__vopOp > :nth-child(5)').should('have.text', '$320000');
    cy.get('.style_closeButton__HK1Pv > .iconify').click();
    cy.get('.style_header__Zu4YN > .component_button__KdqFe > button').click();
    cy.get('.style_order__carList__5s1u7 > .style_table__container__XLc5y > .style_table__body__lGD3l').click();
    cy.get('.style_bill__actionButtons_button_buy__s387F > .iconify > path').click();
    cy.get('#products-input').should('have.attr', 'placeholder', 'Obteniendo Productos...');
    cy.get('#products-input').click();
    cy.get('.style_modal__close__icon__11AK4').click();
    cy.get('.style_bill__actionButtons_button_buy__s387F > .iconify > path').click();
    cy.get('.style_modal__8XWhO').click();
    cy.get('#products-input').click();
    cy.get('#buy-price').click();
    cy.get('#products-input').click();
    cy.get('.style_modal__close__icon__11AK4').click();
    cy.get('.style_bill__actionButtons_button_buy__s387F > .iconify').click();
    cy.get('.style_modal__close__icon__11AK4').click();
    cy.get('.navbar_navbar__logout_text__fsbRS').click();
    /* ==== End Cypress Studio ==== */
  });
})
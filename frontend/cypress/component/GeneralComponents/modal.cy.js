import Modal from '../../../src/app/components/Modal/Modal'

describe('Modal', () => {
  it('should render children when isOpen is true', () => {
    cy.mount(<Modal isOpen={true}>Contenido del modal</Modal>)
    cy.contains('Contenido del modal')
  })

  it('should not render children when isOpen is false', () => {
    cy.mount(<Modal isOpen={false}>Contenido del modal</Modal>)
    cy.contains('Contenido del modal').should('not.be.disabled')
  })
})
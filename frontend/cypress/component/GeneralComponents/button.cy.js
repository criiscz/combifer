import Button from '../../../src/app/components/Button'

const onClick = () => {
  console.log('click')
}
describe('ButtonTest', () => {
  it('should render children', () => {
    cy.mount(<Button onClick={onClick} title={'Titulo del Boton'}/>)
    cy.contains('Titulo del Boton')
  })

  it('should call onClick when clicked', () => {
    cy.mount(<Button onClick={onClick} title={'Titulo del Boton'}/>)
    cy.contains('Titulo del Boton').click()
    cy.log('click')
  })
})
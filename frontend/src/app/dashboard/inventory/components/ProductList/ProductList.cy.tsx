import React from 'react'
import ProductList from './ProductList'

describe('<ProductList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProductList products={[]}/>)
  })
})
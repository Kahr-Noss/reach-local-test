import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';

import { BuyStocks } from './BuyStocks';


const defaultProps = {
  company: 'GOOGL',
  price: 1000,
  quantity: 50,
  status: 'complete',
  errors: {
    company: null,
    quantity: null,
    total: null,
  },
  cart: []
};


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((<BuyStocks {...defaultProps} />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render standard inputs properly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<BuyStocks {...defaultProps} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('render error inputs properly', () => {
  const errorProps = {
      company: 'GOOGL',
      price: 1000,
      quantity: 50,
      status: 'complete',
      errors: {
        company: 'error company',
        quantity: 'error quantity',
        total: 'error total',
      },
      cart: []
  };
  const renderer = new ShallowRenderer();
  renderer.render(<BuyStocks {...errorProps} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
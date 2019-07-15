import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import BuyStocks from './BuyStocks';
import { actions } from '../../redux/BuyStocksActions';

import "../../setupTests";

const buildStore = configureStore();

describe('BuyStocks', () => {
  let store;
  let wrapper;
  const initialState = {
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
  beforeEach(() => {
    store = buildStore(initialState);
    wrapper = shallow();
  });

  it('renders without crashing', () => {
    shallow(<BuyStocks />);
  });

  it('passes props from store', () => {
    expect(wrapper.props().company).toBe(initialState.company);
    // expect(wrapper.props().price).toBe(initialState.price);
    // expect(wrapper.props().quantity).toBe(initialState.quantity);
    // expect(wrapper.props().status).toBe(initialState.status);
  });

  // it('can click yellow', () => {
  //   const color = 'yellow';
  //   wrapper.props().onClick(color)();
  //   expect(store.getActions()).toContainEqual(saveColor({ color }));
  // });
});
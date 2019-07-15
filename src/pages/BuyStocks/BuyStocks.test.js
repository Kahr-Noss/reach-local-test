import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

import BuyStocks from './BuyStocks';
import { actions } from '../../redux/BuyStocksActions';

import "../../../setupTests";

const mockStore = configureStore([thunk]);

describe('BuyStocks', () => {
  let store;
  let wrapper;
  const initialState = {
    buyStocks: {
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
    }
  };
  beforeEach(() => {
    store = mockStore(initialState, actions);
    wrapper = shallow(<BuyStocks store={store}/>);
  });

  // check that store state is correctly passed
  it('Passes props from store', () => {
    expect(wrapper.props().children.props.company).toBe(initialState.buyStocks.company);
    expect(wrapper.props().children.props.price).toBe(initialState.buyStocks.price);
    expect(wrapper.props().children.props.quantity).toBe(initialState.buyStocks.quantity);
    expect(wrapper.props().children.props.status).toBe(initialState.buyStocks.status);
  });

  // check that an action is applied on the store
  it('Input company', () => {
    const company = 'AMZN';
    wrapper.props().children.props.onCompanyChange(company);
    expect(store.getActions()).toContainEqual(actions.selectCompany(company));
  });
});
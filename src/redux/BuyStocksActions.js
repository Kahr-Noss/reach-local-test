import request from 'request-promise';
import moment from 'moment';

import isStockExchangeOpen from '../utils/isStockExchangeOpen';

export const actionsTypes = {
  SELECT_COMPANY: 'SELECT_COMPANY',
  CHANGE_QUANTITY: 'CHANGE_QUANTITY',
  BUY: 'BUY',
  LOAD_PRICE: 'LOAD_PRICE',
  SHOW_ERROR_BUY: 'SHOW_ERROR_BUY',
  EDIT_CART: 'EDIT_CART',
  REMOVE: 'REMOVE',
}

let lastAPICallID = 0; // id to check what the last API code was, and discard the rest

// get the last stock price for the inputed company code
function selectCompany(company) {
  const upperCaseCode = company.toUpperCase();
  return (dispatch) => {
    dispatch({ type: actionsTypes.SELECT_COMPANY, company: upperCaseCode }); // this reset the values and display them as loading
    lastAPICallID++;
    const APICallID = lastAPICallID;
    return request(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${encodeURI(upperCaseCode)}`)
      .then((data) => {
        if (APICallID === lastAPICallID) { // only apply the changes if it was the last api call
          const parsedData = JSON.parse(data);
          if (parsedData.Error) {
            // if no company found
            dispatch({ type: actionsTypes.SHOW_ERROR_BUY, category: 'company', msg: 'Company code not found.' });
          } else {
            // update the company's stock price
            dispatch({ type: actionsTypes.LOAD_PRICE, price: parsedData.price });
          }
        }
      })
      .catch((err) => {
        return { type: actionsTypes.SHOW_ERROR_BUY, category: 'company', msg: 'API is down, please retry later.' };
      });
  };
}

// edit the quantity of stocks to buy
function changeQuantity(quantity, price) {
  return (dispatch) => {
    dispatch({ type: actionsTypes.CHANGE_QUANTITY, quantity }); // update the field
    // check if it's a number
    if (!quantity.match(/^[0-9]*$/)) {
      dispatch({ type: actionsTypes.SHOW_ERROR_BUY, category: 'quantity', msg: 'Please input a number between 1 and 1000' });
    } else {
      const parsedQuantity = Number.parseInt(quantity, 10);
      // check if the quantity if lower than 1000
      if (parsedQuantity > 1000) {
        dispatch({ type: actionsTypes.SHOW_ERROR_BUY, category: 'quantity', msg: 'You can only buy a maximum of 1000 stocks in one time.' });
      }
        // check if the total price if lower than 1000000
      if (price * parsedQuantity > 1000000) {
        dispatch({ type: actionsTypes.SHOW_ERROR_BUY, category: 'total', msg: 'You can only buy a maximum of 1.000.000$ in one time.' });
      }
    }
  };
}

//
function buyStocks(company, price, quantity) {
      // check if the quantity if lower than 1000
  if (quantity > 1000) {
    return { type: actionsTypes.SHOW_ERROR_BUY, category: 'quantity', msg: 'You can only buy a maximum of 1000 stocks in one time.' };
  }
        // check if the total price if lower than 1000000
  if (price * quantity > 1000000) {
    return { type: actionsTypes.SHOW_ERROR_BUY, category: 'total', msg: 'You can only buy a maximum of 1.000.000$ in one time.' };
  }

  // check if the stock exchange is open
  if (isStockExchangeOpen(moment())) {
    return {
      type: actionsTypes.BUY,
      company,
      price,
      quantity,
    };
  }
}

// remove an item from cart
function removeStocks(id) {
  return {
    type: actionsTypes.REMOVE,
    id
  };
}

// edit an item's quantity from cart
function editCart(id, quantity, price) {
  // only edit the cart is the values are correct
  if (!isNaN(quantity) && quantity <= 1000 && quantity * price <= 1000000) {
    return {
      type: actionsTypes.EDIT_CART,
      id,
      quantity
    };
  }
}

export const actions = {
  selectCompany,
  changeQuantity,
  buyStocks,
  removeStocks,
  editCart,
}
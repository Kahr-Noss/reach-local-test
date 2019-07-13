import request from 'request-promise';


export const actionsTypes = {
  SELECT_COMPANY: 'SELECT_COMPANY',
  CHANGE_QUANTITY: 'CHANGE_QUANTITY',
  BUY: 'BUY',
  LOAD_PRICE: 'LOAD_PRICE',
  SHOW_ERROR: 'SHOW_ERROR',
}

function selectCompany(code) {
  return (dispatch) => {
    dispatch({ type: actionsTypes.SELECT_COMPANY, code }); // this reset the values and display them as loading
    return request(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${code}`)
      .then((data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.Error) {
          dispatch({ type: actionsTypes.SHOW_ERROR, category: 'company', msg: 'There was a problem loading the price for this company, please chack that you put a valid company code.' });
        }
        dispatch({ type: actionsTypes.LOAD_PRICE, price: parsedData.price });
      })
      .catch((err) => {
        return { type: actionsTypes.SHOW_ERROR, category: 'company', msg: 'There was a problem loading the price for this company, please chack that you put a valid company code.' };
      });
  };
}

function changeQuantity(quantity) {
  return (dispatch) => {

    const parsedQuantity = Number.parseInt(quantity, 10);
    dispatch({ type: actionsTypes.CHANGE_QUANTITY, quantity });
    if (isNaN(parsedQuantity)) {
      dispatch({ type: actionsTypes.SHOW_ERROR, category: 'quantity', msg: 'Please input a number between 1 and 1000' });
    }
    if (quantity > 1000) {
      dispatch({ type: actionsTypes.SHOW_ERROR, category: 'quantity', msg: 'You can only buy a maximum of 1000 stocks in one time.' });
    }
  };
}

function buy(code, price, quantity) {
  if (price * quantity > 1000000) {
    return { type: actionsTypes.SHOW_ERROR, category: 'price', msg: 'You can only buy a maximum of 1.000.000$ worth of stocks in one time.' };
  }
  return {
    type: actionsTypes.BUY,
    code,
    price,
    quantity,
  };
}

export const actions = {
  selectCompany,
  changeQuantity,
  buy,
}
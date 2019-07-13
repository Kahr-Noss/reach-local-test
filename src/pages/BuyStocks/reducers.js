import moment from 'moment';

import { actionsTypes } from './actions';

const initialState = {
  company: '',
  price: null,
  quantity: 1,
  errorList: [],
}

function stockComparisonReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.SELECT_COMPANY: {
      return {
        ...state,
        company: action.code,
        errorList: state.errorList.filter((err) => err.category !== 'company' && err.category !== 'price')
      }
    }

    case actionsTypes.CHANGE_QUANTITY: {
      return {
        ...state,
        quantity: action.quantity,
        errorList: state.errorList.filter((err) => err.category !== 'quantity' && err.category !== 'price')
      }
    }

    case actionsTypes.LOAD_PRICE: {
      return {
        ...state,
        price: action.price
      };
    }

    case actionsTypes.BUY: {
      return initialState;
    }

    case actionsTypes.SHOW_ERROR: {
      return {
        ...state,
        errorList: [
          ...state.errorList,
          {
            msg: action.msg,
            category: action.category
          }
        ]
      }
    }

    default:
      return state
  }
}

export default stockComparisonReducer;
import moment from 'moment';

import { actionsTypes } from './BuyStocksActions';

const initialState = {
  company: '',
  price: 0,
  quantity: 1,
  status: 'complete',
  errors: {
    company: null,
    quantity: null,
    total: null,
  },
  cart: []
}

function stockComparisonReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.SELECT_COMPANY: {
      return {
        ...state,
        company: action.company,
        status: 'Loading...',
        errors: {
          ...state.errors,
          company: null,
          total: null,
        }
      }
    }

    case actionsTypes.CHANGE_QUANTITY: {
      return {
        ...state,
        quantity: action.quantity,
        errors: {
          ...state.errors,
          quantity: null,
          total: null,
        }
      }
    }

    case actionsTypes.LOAD_PRICE: {
      return {
        ...state,
        status: 'complete',
        price: action.price
      };
    }

    case actionsTypes.SHOW_ERROR_BUY: {
      return {
        ...state,
        status: action.category === 'company' ? 'Error' : state.status,
        errors: {
          ...state.errors,
          [action.category]: action.msg,
        }
      }
    }

    case actionsTypes.BUY: {
      return {
        ...initialState,
        cart: [
          ...state.cart,
          {
            id: `${action.company.toLowerCase()}${moment().unix()}`,
            time: moment(),
            company: action.company,
            quantity: action.quantity,
            price: action.price
          }
        ]
      };
    }

    case actionsTypes.EDIT_CART: {
      return {
        ...initialState,
        cart: [...state.cart.map((item) => {
          if (item.id !== action.id) {
            return item;
          }
          return {
            ...item,
            quantity: action.quantity
          };
        })]
      };
    }

    case actionsTypes.REMOVE: {
      return {
        ...initialState,
        cart: [...state.cart.filter((item) => item.id !== action.id)]
      };
    }

    default:
      return state
  }
}

export default stockComparisonReducer;
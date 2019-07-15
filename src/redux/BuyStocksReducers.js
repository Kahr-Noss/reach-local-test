import moment from 'moment';

import { actionsTypes } from './BuyStocksActions';

const initialState = {
  company: '',
  price: null,
  quantity: 1,
  errors: {
    company: null,
    quantity: null,
    total: null,
  },
  cart: [{
    id: `dsffsddfdskjsdgdsh`,
    time: moment(),
    company: 'PLOP',
    quantity: 12,
    price: 10000
  },
  {
    id: `dsffsddfdskjsddgsdgfghgdsh`,
    time: moment(),
    company: 'FLIBIDI',
    quantity: 456,
    price: 5
  }]
}

function stockComparisonReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.SELECT_COMPANY: {
      return {
        ...state,
        company: action.company,
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
        price: action.price
      };
    }

    case actionsTypes.SHOW_ERROR: {
      return {
        ...state,
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
import moment from 'moment';

import { actionsTypes } from './actions';

const initialState = {
  companies: {},
  startDate: moment().subtract(1, 'month'),
  endDate: moment(),
}

function stockComparisonReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.CHANGE_DATE: {
      return {
        ...state,
        [action.key]: action.date
      }
    }

    case actionsTypes.ADD_COMPANY: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.code]: { name: action.code, values: [], isLoading: true },
        }
      }
    }

    case actionsTypes.LOAD_COMPANY_DATA: {
      return {
        ...state,
        companies: {
          ...state.companies,
          [action.code]: action.result
        }
      }
    }

    case actionsTypes.REMOVE_COMPANY: {
      const  {[action.code]: deleted, ...companyList} = state.companies;
      return {
        ...state,
        companies: companyList
      }
    }

    default:
      return state
  }
}

export default stockComparisonReducer;
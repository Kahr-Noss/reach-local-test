import { combineReducers } from 'redux'
import stockComparison from './StockComparisonReducers';
import buyStocks from './BuyStocksReducers';

// combining the two reducers
export default combineReducers({
  stockComparison,
  buyStocks
})
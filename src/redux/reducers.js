import { combineReducers } from 'redux'
import stockComparison from './StockComparisonReducers';
import buyStocks from './BuyStocksReducers';

export default combineReducers({
  stockComparison,
  buyStocks
})
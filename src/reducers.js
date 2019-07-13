import { combineReducers } from 'redux'
import stockComparison from './pages/StockComparison/reducers';
import buyStocks from './pages/BuyStocks/reducers';

export default combineReducers({
  stockComparison,
  buyStocks
})
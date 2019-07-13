import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers';
import StockComparison from './pages/StockComparison/StockComparison';
import BuyStocks from './pages/BuyStocks/BuyStocks';

import './App.css';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/stocks" exact component={StockComparison} />
          <Route path="/buy" exact component={BuyStocks} />
        </Router>
      </Provider>
    );
  }
}

export default App;

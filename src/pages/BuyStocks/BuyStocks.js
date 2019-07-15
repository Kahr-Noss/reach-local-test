import React from 'react';
import request from 'request-promise';
import moment from 'moment';
import { connect } from 'react-redux';

import { actions } from '../../redux/BuyStocksActions';
import isStockExchangeOpen from '../../utils/isStockExchangeOpen';

// import './BuyStocks.css';
// import "react-datepicker/dist/react-datepicker.css";


export function BuyStocks(props) {

  const isMarketOpen = isStockExchangeOpen(moment());

  return (
    <div className="buy-stocks-wrapper">
      <div className="data-container">
        <div className='text'>Type the company code you want:</div>
        <input className="buy-input" value={props.company} onChange={(e) => props.onCompanyChange(e.target.value)} />
      </div>
      <div className="empty-line error-msg">{props.errors.company}</div>

      <div className="data-container">
        <div className='text'>Stock Price: </div>
        <div>{props.status === 'complete' ? `${props.price}$` : props.status}</div>
      </div>
      <div className="empty-line" />

      <div className="data-container">
        <div className='text'>Quantity:</div>
        <input className="buy-input" value={props.quantity} onChange={(e) => props.onQuantityChange(e.target.value, props.price)} />
      </div>
      <div className="empty-line error-msg">{props.errors.quantity}</div>

      <div className="data-container">
        <div className='text'>Total: </div>
        {isNaN(props.price * props.quantity) ? '' : `${props.price * props.quantity}$`}
      </div>
      <div className="empty-line error-msg">{props.errors.total}</div>

      <br />
      <button
        className="buy-btn btn"
        onClick={() => props.onBuy(props.company, props.price, props.quantity)}
        disabled={!isMarketOpen || !props.company || !props.price || Object.values(props.errors).some((err) => !!err)}
      >
        BUY
      </button>
      {isMarketOpen ? '' : <div className="italic-txt">Sorry, the Tokyo Stock Exchange is currently closed.<br/>Monday to Friday, 09:00-11:30, 12:30-15:00</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  company: state.buyStocks.company,
  quantity: state.buyStocks.quantity,
  price: state.buyStocks.price,
  status: state.buyStocks.status,
  errors: state.buyStocks.errors,
});

const mapDispatchToProps = (dispatch) => ({
  onCompanyChange: (company) => { dispatch(actions.selectCompany(company)) },
  onQuantityChange: (quantity, price) => { dispatch(actions.changeQuantity(quantity, price)) },
  onBuy: (company, price, quantity) => { dispatch(actions.buyStocks(company, price, quantity)) },
});


const ConnectedBuyStocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks);


export default ConnectedBuyStocks;
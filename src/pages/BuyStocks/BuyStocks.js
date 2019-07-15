import React from 'react';
import request from 'request-promise';
import moment from 'moment';
import { connect } from 'react-redux';

import { actions } from '../../redux/BuyStocksActions';

import './BuyStocks.css';
import "react-datepicker/dist/react-datepicker.css";


function BuyStocks(props) {
  console.log(props);
  return (
    <div className="buy-stocks-wrapper">
      Type the company code you want:
      <br /><input value={props.company} onChange={(e) => props.onCompanyChange(e.target.value)} />
      {props.errors.company ? <span className="error-msg" >{props.errors.company}</span> : null}

      <br /> Stock Price: {props.price ? `${props.price}$` : 'Loading...'}
      
      <br />Quantity: <input value={props.quantity} onChange={(e) => props.onQuantityChange(e.target.value, props.price)} />
      {props.errors.quantity ? <span className="error-msg" >{props.errors.quantity}</span> : null}     
     
      <br />Total: {isNaN(props.price * props.quantity) ? '' : `${props.price * props.quantity}$`}
      {props.errors.total ? <span className="error-msg" >{props.errors.total}</span> : null}

      <br />
      <button
        onClick={() => props.onBuy(props.company, props.price, props.quantity)}
        disabled={!props.company || !props.price || Object.values(props.errors).some((err) => !!err)}
      >
        BUY
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  company: state.buyStocks.company,
  quantity: state.buyStocks.quantity,
  price: state.buyStocks.price,
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
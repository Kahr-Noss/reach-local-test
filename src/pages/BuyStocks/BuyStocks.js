import React from 'react';
import request from 'request-promise';
import moment from 'moment';
import { connect } from 'react-redux';

import { actions } from './actions';

import companiesList from '../../data/companyList.json';

import './BuyStocks.css';
import "react-datepicker/dist/react-datepicker.css";


function BuyStocks(props) {
  console.log(props);
  return (
    <div className="buy-stocks-wrapper">
      Select the company you want:
      <br />
      <select
        className="company-select"
        value={props.company}
        onChange={(e) => props.onSelectCompany(e.target.value)}
      >
        <option value="" disabled>Select a company...</option>
        {companiesList.map((company) => <option key={company} value={company}>{company}</option>)}
      </select>
      {props.company
        ? (<div className='stock-price'>

        </div>)
        : null
      }

      {props.company
        ? (
          <div>
            Stock Price: {props.price || 'Loading...'}
            <br />Quantity:
            <input value={props.quantity} onChange={(e) => props.onQuantityChange(e.target.value)} />
          </div>
        )
        : null
      }
      {props.company && !isNaN(props.quantity) && isNaN(props.price)
        ? (
          <div className='total-price'>
            Total: {props.price * props.quantity}
          </div>
        )
        : null
      }
      {props.errorList.map((err) =>  <div className="error-msg" key={err.category}>{err.msg}</div>) }
      
    </div>
  );
}

const mapStateToProps = (state) => ({
  company: state.buyStocks.company,
  quantity: state.buyStocks.quantity,
  price: state.buyStocks.price,
  errorList: state.buyStocks.errorList
});

const mapDispatchToProps = (dispatch) => ({
  onSelectCompany: (code) => { dispatch(actions.selectCompany(code)) },
  onQuantityChange: (quantity) => { dispatch(actions.changeQuantity(quantity)) },
  onBuy: (code, price, quantity) => { dispatch(actions.buyStocks(code, price, quantity)) },
});


const ConnectedBuyStocks = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks);


export default ConnectedBuyStocks;
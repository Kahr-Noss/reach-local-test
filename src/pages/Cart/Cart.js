import React, { Component } from 'react';
import request from 'request-promise';
import moment from 'moment';
import { connect } from 'react-redux';

import { actions } from '../../redux/BuyStocksActions';

import './Cart.css';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedID: '',
      editedQuantity: 0,
      error: null
    };
  }

  selectItemToEdit(id) {
    this.setState({
      editedID: id,
      editedQuantity: (this.props.cart.find((item) => item.id === id) || { quantity: 0 }).quantity,
      error: null,
    });
  }

  changeInputedQuantity(quantity, price) {
    let error = null;
    const parsedQuantity = Number.parseInt(quantity, 10);
    if (!quantity.match(/^[0-9]*$/) || parsedQuantity > 1000) {
      error = 'Please input a number between 1 and 1000';
    } else if (parsedQuantity * price > 1000000) {
      error = 'You can\'t buy for more than 1.000.000$ in one time.';
    }
    this.setState({
      editedQuantity: isNaN(parsedQuantity) ? 0 : parsedQuantity,
      error
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="cart-wrapper">
        {this.props.cart.map((item) => (
          <div className="item-wrapper" key={item.id}>
            <div>{item.company}<br />{item.time.format('YYYY/MM/DD - hh:mm:ss')}</div>
            <div>
              Quantity:
              {this.state.editedID === item.id
                ? <input value={this.state.editedQuantity} onChange={(e) => this.changeInputedQuantity(e.target.value, item.price)} />
                : item.quantity
              }
              x {item.price}$ 
              = {item.price * (this.state.editedID === item.id ? this.state.editedQuantity :item.quantity)}$
            </div>
            {this.state.editedID === item.id
              ? (<div>
                {this.state.error ? <span className="error-msg" >{this.state.error}</span> : null}
                <button className="edit-validate-btn" onClick={() => {
                  this.props.onEdit(item.id, this.state.editedQuantity, item.price);
                  this.selectItemToEdit('');
                }}>CHANGE</button>
                <button className="edit-cancel-btn" onClick={() => this.selectItemToEdit('')}>CANCEL</button>
              </div>)
              : <button className="edit-select-btn" onClick={() => this.selectItemToEdit(item.id)}>EDIT</button>
            }
            <button className="remove-item-btn" onClick={() => this.props.onItemRemove(item.id)}>REMOVE</button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.buyStocks.cart,
});

const mapDispatchToProps = (dispatch) => ({
  onEdit: (id, quantity, price) => { dispatch(actions.editCart(id, quantity, price)) },
  onItemRemove: (id) => { dispatch(actions.removeStocks(id)) },
});


const ConnectedCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);


export default ConnectedCart;
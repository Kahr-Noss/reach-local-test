import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { actions } from '../../redux/BuyStocksActions';

import './Cart.css';

// component displaying cart content
class Cart extends Component {

  // the state is used to save the currently edited data (no need to go through the store)
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
    return (
      <div className="cart-wrapper">
        <div className="text">MY CART</div>

        {this.props.cart.length === 0 ? <div className="text">My cart is empty...</div> : null}

        {this.props.cart.map((item) => (
          <div className="item-wrapper" key={item.id}>
            <div className="column-wrapper">
              <div className="text">{item.company}</div>
              <div className="date-txt">{item.time.format('YYYY/MM/DD - hh:mm:ss')}</div>
            </div>

            <div className="column-wrapper column-grow">
              <div className="text">Quantity:</div>
              <div>
                {this.state.editedID === item.id
                  ? <input className="edit-quantity-input" value={this.state.editedQuantity} onChange={(e) => this.changeInputedQuantity(e.target.value, item.price)} />
                  : item.quantity
                }
                x {item.price}$
                = {item.price * (this.state.editedID === item.id ? this.state.editedQuantity : item.quantity)}$
              </div>
              {this.state.error && this.state.editedID === item.id ? <div className="error-msg" >{this.state.error}</div> : null}
            </div>

            <div >
              {this.state.editedID === item.id
                ? (
                  <Fragment>
                    <button
                      className="edit-validate-btn btn"
                      disabled={!!this.state.error}
                      onClick={() => {
                        this.props.onEdit(item.id, this.state.editedQuantity, item.price);
                        this.selectItemToEdit('');
                      }}>CHANGE</button>
                    <button className="edit-cancel-btn btn" onClick={() => this.selectItemToEdit('')}>CANCEL</button>
                  </Fragment>
                )
                : <button className="edit-select-btn btn" onClick={() => this.selectItemToEdit(item.id)}>EDIT</button>
              }
              <button className="remove-item-btn btn" onClick={() => this.props.onItemRemove(item.id)}>REMOVE</button>
            </div>
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
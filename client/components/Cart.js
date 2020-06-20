import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Redirect} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      redirecting: false,
      redirectingCheckout: false
    }
    this.handleContinueShopping = this.handleContinueShopping.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  componentDidMount() {
    this.props.getCart(this.props.match.params.id)
  }

  handleCheckout(event) {
    event.preventDefault()
    this.setState(prevState => ({
      redirectingCheckout: !prevState.redirectingCheckout
    }))
  }

  handleContinueShopping(event) {
    event.preventDefault()
    this.setState(prevState => ({
      redirecting: !prevState.redirecting
    }))
  }

  render() {
    const redirecting = this.state.redirecting
    if (redirecting) {
      return <Redirect to="/games" />
    }

    const redirectingCheckout = this.state.redirectingCheckout
    if (redirectingCheckout) {
      return <Redirect to="/cart/guest_checkout" />
    }
    return (
      <div className="container">
        <div id="cart">
          <h3>Your Cart:</h3>
          <div id="cart_view">
            <div className="cart_items">
              <h4 className="items">Items: </h4>
              <div className="cart_contents">
                {' '}
                currently no items because the code hasnt been written!!!
              </div>
              {/* conditional -> empty? 'cart is empty' : 'product list' */}
              {/* this.cart.items ? send to Single-product?*/}
            </div>
            <div className="order_summary_container">
              <div className="order_summary">
                <h4>Order Summary:</h4>
                <div>Subtotal: </div>
                {/* code to calculate subtotal */}
                <div>Shipping: FREE </div>
                <div>Total: </div>
                {/* code to calculate total */}
                <div className="cart_buttons">
                  <button type="submit" onClick={this.handleCheckout}>
                    Checkout
                  </button>
                  <button type="submit" onClick={this.handleContinueShopping}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)

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
      <div>
        <div>
          <h3>This is your cart!</h3>
          <li>Items: </li>
          <li>Subtotal: </li>
          <li>Shipping: FREE</li>
          <li>Total: $</li>
        </div>
        <div>
          <button type="submit" onClick={this.handleCheckout}>
            Checkout
          </button>
          <button type="submit" onClick={this.handleContinueShopping}>
            Continue Shopping
          </button>
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

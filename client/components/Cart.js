/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {increaseQuant, decreaseQuant, removeFromCart} from '../store/usersCart'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      redirecting: false,
      redirectingCheckout: false,
      didItMount: false
    }
    this.handleContinueShopping = this.handleContinueShopping.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    // update usersCart is state to now have .eagerItems
    console.log('componentDidMount in CartView')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate ran in CartView')
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
    console.log('this is props in cart', this.props)
    const {isLoggedIn} = this.props

    const redirecting = this.state.redirecting
    if (redirecting) {
      return <Redirect to="/games" />
    }

    const redirectingCheckout = this.state.redirectingCheckout
    if (redirectingCheckout && !isLoggedIn) {
      return <Redirect to="/cart/guest_checkout" />
    }
    if (redirectingCheckout && isLoggedIn) {
      return <Redirect to="/order_confirmation" />
    }

    let cartItems = []
    // seed cartID 0 as a null default situation ???
    if (this.props.usersCart.products) {
      console.log('set to eagerItems')
      cartItems = this.props.usersCart.products
    }

    // let cartId = this.props.UsersCart.id
    const handleDelete = (productId, cartId) => {
      event.preventDefault()
      console.log('handleDelete ran')
      this.props.deleteItems(productId, cartId)
      // this.setState()
    }

    return (
      <div className="container">
        <div id="cart">
          <h2>Your Cart:</h2>
          <div id="cart_view">
            <div className="cart_items">
              <h4 className="items">Items: </h4>
              <div className="cart_contents">
                {cartItems.length > 0
                  ? cartItems.map(product => {
                      return (
                        <div key={product.id} className="single_product_cart">
                          <div className="cart_image">
                            <img src={product.imageUrl} />
                          </div>
                          <div className="product_specs">
                            <div className="product_headers">
                              <h2 className="product_name">{product.name}</h2>
                              <div className="product_quantity">
                                <h3>Quantity: {product.item.quantity}</h3>
                                <div className="inc_dec">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      this.props.increaseQuant(
                                        this.props.usersCart.id,
                                        product.id
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      this.props.decreaseQuant(
                                        this.props.usersCart.id,
                                        product.id
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                              <h3>
                                Total Price: $
                                {(
                                  product.item.quantity *
                                  product.price /
                                  100
                                ).toFixed(2)}
                              </h3>
                              <button
                                type="submit"
                                onClick={() =>
                                  handleDelete(
                                    product.id,
                                    this.props.usersCart.id
                                  )
                                }
                              >
                                Remove Item{product.item.quantity > 1
                                  ? 's'
                                  : ''}
                              </button>
                              <div />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  : 'Your cart is currently empty'}
              </div>
            </div>
            <div className="order_summary_container">
              <div className="order_summary">
                <div className="order_summary_specs">
                  <h3>Order Summary:</h3>
                  <div>
                    Total Number of Items: {this.props.usersCart.totalQuantity}
                  </div>
                  <div>
                    Subtotal: ${(this.props.usersCart.totalPrice / 100).toFixed(
                      2
                    )}
                  </div>
                  <div>Shipping: FREE </div>
                  <div>
                    Total: $
                    {this.props.usersCart
                      ? (this.props.usersCart.totalPrice / 100).toFixed(2)
                      : 'nothing yet'}
                  </div>
                </div>

                <div className="cart_buttons">
                  <button
                    disabled={!this.props.usersCart.totalQuantity}
                    type="submit"
                    onClick={this.handleCheckout}
                  >
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
  console.log('this is state', state)
  return {
    cart: state.cart,
    usersCart: state.usersCart,
    isLoggedIn: !!state.user.id
    // product: state.singleProduct // This.props.product is never used?
  }
}

const mapDispatch = dispatch => {
  return {
    increaseQuant: (cartId, productId) =>
      dispatch(increaseQuant(cartId, productId)),
    decreaseQuant: (cartId, productId) =>
      dispatch(decreaseQuant(cartId, productId)),
    deleteItems: (itemId, cartId) => {
      return dispatch(removeFromCart(itemId, cartId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

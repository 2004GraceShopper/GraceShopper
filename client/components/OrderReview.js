import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {buyInServer} from '../store/usersCart'

class OrderReview extends React.Component {
  constructor() {
    super()
    this.state = {
      redirectToConfirmation: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    // 1. Change cart to purchased
    // 2. Give guest or user a new cart
    // 3. Redirect to a thank you page
    // 4. Lockin prices for each Item associated with that cart
    // 5. Change inventoryOnHand for the purchased items
    this.props.buyIt(this.props.usersCart.id, this.props.theUser.id)
    this.setState(prevState => ({
      redirectToConfirmation: !prevState.redirectToConfirmation
    }))
  }

  render() {
    const redirectToConfirmation = this.state.redirectToConfirmation
    if (redirectToConfirmation) return <Redirect to="/thanks" />
    const cartItems = this.props.usersCart.products
    let client

    if (!this.props.theUser.id && !this.props.theGuest.id) {
      return <div>NICE TRY</div>
    } else if (!this.props.theUser.id && this.props.theGuest.id) {
      client = this.props.theGuest
    } else {
      client = this.props.theUser
    }

    return (
      <div className="container">
        <div id="cart">
          <h3>Confirm Your Order</h3>
          <div id="cart_view">
            <div className="cart_items">
              <h4 className="items">Items: </h4>
              <div className="cart_contents">
                {cartItems.map(product => {
                  return (
                    <div key={product.id} className="single_product_cart">
                      <div className="image">
                        <img src={product.imageUrl} />
                      </div>
                      <div className="product_specs">
                        <div className="product_headers">
                          <h2 className="product_name">{product.name}</h2>
                          <h3>Quantity: {product.item.quantity}</h3>
                          <h3>
                            Total Price: $
                            {product.item.quantity * product.price / 100}
                          </h3>
                          <div />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="order_summary_container">
              <div className="order_summary">
                <div className="order_summary_specs">
                  <h4>Order Summary:</h4>
                  <div>
                    Total Number of Items: {this.props.usersCart.totalQuantity}
                  </div>
                  <div>Subtotal: ${this.props.usersCart.totalPrice / 100}</div>
                  <div>Shipping: FREE </div>
                  <div> </div>
                  <div>
                    <h4>
                      Total: $
                      {this.props.usersCart
                        ? this.props.usersCart.totalPrice / 100
                        : 'nothing yet'}
                    </h4>
                  </div>
                  <div className="order_summary">
                    <h5>Shipping Address</h5>
                    <div>{client.shippingAddress}</div>
                    <h5>Billing Address</h5>
                    <div>{client.billingAddress}</div>
                    <h5>Email</h5>
                    <div>{client.email}</div>
                    <h5>Payment Info</h5>
                    <div>
                      We're not gonna disclose that because we need to implement
                      a secure way of handling your payment info!
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart_buttons">
                <button
                  disabled={!this.props.usersCart.totalQuantity}
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit Order
                </button>
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
    usersCart: state.usersCart,
    theGuest: state.guest,
    theUser: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    buyIt: (cartId, userId) => dispatch(buyInServer(cartId, userId))
  }
}

export default connect(mapState, mapDispatch)(OrderReview)

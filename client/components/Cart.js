import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {fetchItems} from '../store/usersCart'
import {Redirect} from 'react-router-dom'

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
    // console.log('who r u', this.props.usersCart['0'].id)
    console.log('componentDidMount ran')
    // if(this.props.usersCart['0'] !== undefined){
    //   this.props.getCart(this.props.usersCart['0'].id)
    // }
    // this.props.getCart(this.props.match.params.id)
    this.setState({didItMount: true})
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate ran')
    console.log('this.props.usersCart[0]', this.props.usersCart['0'])
    if (prevState.didItMount === false && this.props.usersCart['0']) {
      //eagerload items with product
      this.props.getItems(this.props.usersCart['0'].id)
      //   if(this.props.usersCart['0'] !== undefined){
      //     this.props.getCart(this.props.usersCart['0'].id)
      //   }
      //   this.props.getCart(this.props.match.params.id)
    } else if (prevState.didItMount === false && this.props.usersCart.id) {
      this.props.getItems(this.props.usersCart.id)
    }
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

    let cartItems = []
    let cartId
    //seed cartID 0 as a null default situation ???
    if (this.props.usersCart.eagerItems) {
      console.log('set to eagerItems')
      cartItems = this.props.usersCart.eagerItems['0'].products
    } else if (this.props.usersCart['0'] !== undefined) {
      console.log('else if is running')
      cartItems = this.props.usersCart['0'].items
      cartId = this.props.usersCart['0'].id
    }
    console.log('cartItems:', cartItems)

    return (
      <div className="container">
        <div id="cart">
          <h3>Your Cart:</h3>
          <div id="cart_view">
            <div className="cart_items">
              <h4 className="items">Items: </h4>
              <div className="cart_contents">
                {cartItems.length > 0 ? 'stuff' : 'no stuff'}
              </div>
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
    cart: state.cart,
    usersCart: state.usersCart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(fetchCart(id)),
    getItems: cartId => dispatch(fetchItems(cartId))
  }
}

export default connect(mapState, mapDispatch)(Cart)

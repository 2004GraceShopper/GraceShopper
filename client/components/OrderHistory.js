import React from 'react'
import {connect} from 'react-redux'

class OrderHistory extends React.Component {
  render() {
    return (
      <div className="container">
        <div id="all_products">
          <h1>Order History</h1>
          <div className="allProducts">
            {this.state.purchasedCarts.map(cart => (
              <div key={cart.id} className="single_product">
                <div>Order date: {cart.createdAt}</div>
                <div>Order number: {cart.mySession + cart.totalPrice}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    theUser: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

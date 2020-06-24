import React from 'react'
import {connect} from 'react-redux'

class OrderHistory extends React.Component {
  render() {
    if (this.props.purchasedCarts) {
      return (
        <div className="container">
          <div>
            <h1>Order History</h1>
            <div>
              {this.props.purchasedCarts.map(cart => (
                <div key={cart.id}>
                  <div>Order date: {cart.createdAt}</div>
                  <div>Order number: {cart.totalPrice + cart.id}</div>
                  <div>Items:</div>
                  {cart.products.map(product => (
                    <div>
                      <div>Item Name: {product.name}</div>
                      <div>Quantity: {product.item.quantity}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      return <div>You have no product history!</div>
    }
  }
}

const mapState = state => {
  return {
    theUser: state.user,
    purchasedCarts: state.history
  }
}

export default connect(mapState)(OrderHistory)

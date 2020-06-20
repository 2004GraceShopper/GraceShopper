import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
import {addToCartInServer} from '../store/usersCart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  handleChange(event) {
    if (event.target.value > -1) {
      this.setState({
        quantity: event.target.value
      })
    }
  }

  render() {
    const product = this.props.product
    const usersCartId = this.props.usersCartId

    return (
      <div className="container">
        <div id="single_product">
          <div className="image">
            <img src={product.imageUrl} />
          </div>
          <div className="product_specs">
            <div className="product_headers">
              <h2 className="product_name">{product.name}</h2>
              <h3 className="product_price">${product.price / 100}</h3>
              <div>
                <div>
                  <label htmlFor={this.props.name}>Quantity</label>
                  <input
                    type="number"
                    name="qty"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  className="addToCart"
                  onClick={() =>
                    this.props.addToCartFunc(
                      product.id,
                      this.state.quantity,
                      usersCartId
                    )
                  }
                >
                  Add To Cart
                </button>
              </div>
              <h4 className="product_publisher">{product.publisher}</h4>
            </div>
            <div className="product_description">{product.description}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('*******state.usersCart[0].id: ', state.usersCart[0].id)
  return {
    product: state.singleProduct,
    usersCartId: state.usersCart[0].id // used to find the cart in the server before updating it.
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => {
      return dispatch(fetchProduct(id))
    },
    addToCartFunc: (productId, quantity, usersCartId) => {
      return dispatch(addToCartInServer(productId, quantity, usersCartId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

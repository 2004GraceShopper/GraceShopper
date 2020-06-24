import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchProduct, clearProductThunk} from '../store/singleProduct'
import {addToCartInServer} from '../store/usersCart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearProduct()
  }

  handleChange(event) {
    if (event.target.value > 0) {
      this.setState({
        quantity: event.target.value
      })
    }
  }

  render() {
    const product = this.props.product
    const cartKeys = Object.keys(this.props.usersCart)
    const usersCartId =
      cartKeys.indexOf('0') === -1
        ? this.props.usersCart.id
        : this.props.usersCart[0].id
    const handleClick = () => {
      this.props.addToCartFunc(product.id, this.state.quantity, usersCartId)
      this.setState({quantity: 1})
    }

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
                  <label htmlFor={this.props.name}>
                    <div>Quantity:</div>
                    <input
                      type="number"
                      name="qty"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <button className="addToCart" onClick={() => handleClick()}>
                  Add To Cart
                </button>
              </div>
              <h4 className="product_publisher">
                Publisher: {product.publisher}
              </h4>
              <div className="product_description">{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  // console.log('*******state.usersCart[0].id: ', state.usersCart[0].id)
  console.log('Inside mapState: ', state.usersCart)
  return {
    product: state.singleProduct,
    usersCart: state.usersCart // the whole user cart item (might be an array if from findOrCreate, or an object).
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => {
      return dispatch(fetchProduct(id))
    },
    addToCartFunc: (productId, quantity, usersCartId) => {
      return dispatch(addToCartInServer(productId, quantity, usersCartId))
    },
    clearProduct: () => {
      return dispatch(clearProductThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

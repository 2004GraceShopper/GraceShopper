import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    const product = this.props.product

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
  console.log('sate.product', state.singleProduct)
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => {
      return dispatch(fetchProduct(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

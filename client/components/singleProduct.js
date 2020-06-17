import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/product'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    const product = this.props.product

    return (
      <div id="single_product">
        <img src={product.imageUrl} />
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
        <h4>{product.publisher}</h4>
        <div>{product.details}</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => {
      dispatch(fetchProduct(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)

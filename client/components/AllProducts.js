import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <h1>This is the All Products Page</h1>
        <div className="allProducts">
          {this.props.products.map(product => (
            <div key={product.id}>
              <Link to={`/games/${product.id}`}>
                <img src={product.imageUrl} />
                {product.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

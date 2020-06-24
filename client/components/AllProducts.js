import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, clearProductsThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    console.log('allproducts mounted')
    this.props.getProducts()
  }

  componentWillUnmount() {
    console.log('allProducts unmounted')
    this.props.clearProducts()
  }

  render() {
    return (
      <div className="container">
        <div id="all_products">
          <h1>All Games</h1>
          <div className="allProducts">
            {this.props.products.map(product => (
              <div key={product.id} className="single_product">
                <Link to={`/games/${product.id}`} className="link">
                  <img src={product.imageUrl} />
                  <h2>{product.name}</h2>
                </Link>
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
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    clearProducts: () => dispatch(clearProductsThunk())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

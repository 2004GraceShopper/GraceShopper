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
      <div className="container">
        <div id="all_products">
          <h1>All Games</h1>
          <div className="allProducts">
            {this.props.products.map(product => (
              <div key={product.id} className="single_product">
                <Link to={`/games/${product.id}`}>
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
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

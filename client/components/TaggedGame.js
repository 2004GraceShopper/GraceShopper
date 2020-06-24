import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTaggedInServer} from '../store/allProducts'

//gets the from react router props
// sends an axios request and the maps through the results

class TaggedGame extends React.Component {
  componentDidMount() {
    this.props.getTagged(this.props.match.params.tag)
  }

  render() {
    return (
      <div className="container">
        <div id="all_products">
          <h1>{this.props.match.params.tag.toUpperCase()} GAMES</h1>
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
    getTagged: tag => dispatch(getTaggedInServer(tag))
  }
}

export default connect(mapState, mapDispatch)(TaggedGame)

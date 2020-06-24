import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, clearProductsThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'
//thoughts: ability to toggle a div saying "welcome back {user}" based on logged in status
// thus no longer making this a dumb compoenent
class GuestHome extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  componentWillUnmount() {
    this.props.clearProducts()
  }

  render() {
    console.log(this.props, 'GUEST HOME')
    return (
      <div className="container">
        <div className="home">
          <div className="title">
            <h1>NEVER-BORED</h1>
            <h2>ALWAYS BOARD!</h2>
            <div>Welcome to the wonderful world of board games! </div>
          </div>
          <div id="tags">
            <Link to="/categories/memory">Memory</Link>
            <Link to="/categories/strategy">Strategy</Link>
            <Link to="/categories/chance"> Chance</Link>
            <Link to="/categories/educational">Educational</Link>
            <Link to="/categories/word"> Word-Based</Link>
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

export default connect(mapState, mapDispatch)(GuestHome)

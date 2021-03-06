import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, qtyInCart}) => (
  <div id="navbar">
    {/* <h1 id="never_bored">NEVER-BORED</h1> */}
    <nav id="nav">
      {isLoggedIn ? (
        <div className="nav_container">
          {/* The navbar will show these links after you log in */}
          <div className="nav">
            <Link to="/home" className="link">
              Home
            </Link>
            <Link to="/games" className="link">
              All Games
            </Link>
          </div>
          <h1 id="never_bored">NEVER-BORED</h1>
          <div className="nav">
            <div className="nav_right">
              <Link to="/order_history" className="link">
                Order History
              </Link>
              <a href="#" onClick={handleClick} className="link">
                Logout
              </a>
              <Link to="/cart" className="link">
                Cart : {qtyInCart}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav_container">
          {/* The navbar will show these links before you log in */}
          <div className="nav_left">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/games" className="link">
              All Games
            </Link>
          </div>
          <h1 id="never_bored">NEVER-BORED</h1>
          <div className="nav_right">
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/signup" className="link">
              Sign Up
            </Link>
            <Link to="/cart" className="link">
              Cart : {qtyInCart}
            </Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    qtyInCart: state.usersCart.totalQuantity
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

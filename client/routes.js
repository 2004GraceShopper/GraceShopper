import React, {Component, useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  GuestCheckoutForm,
  GuestHome
} from './components'
import {me} from './store'
import {fetchCart} from './store/usersCart'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.state = {
      didMount: false
    }
  }

  componentDidMount() {
    console.log('Component did mount:', this.props.isLoggedIn)
    this.props
      .loadInitialData()
      .then(console.log('after loadInitialData: ', this.props))
      .then(
        // Gotta do something so fetching a guest causes an update
        this.setState({didMount: true})
      )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.didMount === false) {
      console.log('Component did update', this.props.isLoggedIn)
      // Note: if guest, else is user
      const loadCartFunc = () => {
        console.log('loadCartFunc')
        if (!this.props.isLoggedIn) {
          this.props.loadCart(null, this.props.isLoggedIn)
        } else {
          this.props.loadCart(this.props.userId, this.props.isLoggedIn)
        }
      }
      loadCartFunc(this.props.userId, this.props.isLoggedIn)
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={GuestHome} />
        <Route exact path="/games" component={AllProducts} />
        <Route exact path="/games/:id" component={SingleProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/cart/guest_checkout"
          component={GuestCheckoutForm}
        />

        {/* Need to consider when :id is null (aka guest) */}
        <Route exact path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('MAP STATE: ', state)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    cart: state.userscart
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      console.log('**loadInitialData**')
      try {
        await dispatch(me())
      } catch (error) {
        console.error(error)
      }

      // await dispatch(fetchCart(id, isUser)) // Doesn't work because it needs the result from dispatch(me), and awaiting isn't helping grab it
    },
    loadCart(id, isUser) {
      // Create or find a cart associated with the session/user
      // At login, this cart should be given the appropriate userId
      console.log('**loadCart, ', id, ' isUser:', isUser)
      dispatch(fetchCart(id, isUser))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

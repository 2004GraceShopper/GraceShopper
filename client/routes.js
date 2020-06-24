import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  SignUpForm,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  GuestCheckoutForm,
  GuestHome,
  OrderReview,
  Signup,
  Thanks,
  OrderHistory
} from './components'
import {me} from './store'
import PathNotFound from './components/PathNotFound'

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

  render() {
    console.log('this is routes props', this.props)
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={GuestHome} />
        <Route exact path="/games" component={AllProducts} />
        <Route exact path="/games/:id" component={SingleProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route
          exact
          path="/cart/guest_checkout"
          component={GuestCheckoutForm}
        />
        <Route exact path="/order_confirmation" component={OrderReview} />
        <Route exact path="/thanks" component={Thanks} />
        <Route exact path="/order_history" component={OrderHistory} />
        <Route exact path="/oldsignup" component={Signup} />

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
        <Route path="/" component={PathNotFound} />
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

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import GuestHome from './guest-home'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome back, {email.slice(0, email.indexOf('@'))}</h3>
      <GuestHome />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

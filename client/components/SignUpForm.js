import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {auth} from '../store'

// Just copy-pasted from GuestCheckoutForm and added a password field.
export class SignUpForm extends React.Component {
  constructor() {
    super()
    this.state = {
      emailAddress: '',
      password: '',
      billingAddress: '',
      shippingAddress: '',
      creditCardNum: '',
      redirectToConfirmation: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addUser(this.state, 'signup')
    this.setState(prevState => ({
      redirectToConfirmation: !prevState.redirectToConfirmation
    }))
  }

  render() {
    const redirectToConfirmation = this.state.redirectToConfirmation
    if (redirectToConfirmation) return <Redirect to="/" />
    return (
      <div className="container">
        <div className="form_sub-container">
          <h2>Create an Account</h2>
          <h4>Please add your information below:</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email" className="input-field">
              <div>Email Address:</div>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="password" className="input-field">
              <div>Password:</div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="billingAddress" className="input-field">
              <div>Billing Address:</div>
              <input
                type="text"
                name="billingAddress"
                value={this.state.billingAddress}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="shippingAddress" className="input-field">
              <div>Shipping Address:</div>
              <input
                type="text"
                name="shippingAddress"
                value={this.state.shippingAddress}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="creditCardNum" className="input-field">
              <div>Credit Card Number:</div>
              <input
                type="text"
                name="creditCardNum"
                value={this.state.creditCardNum}
                onChange={this.handleChange}
              />
            </label>
            <div className="submit_button_specs">
              <button type="submit" className="submit">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    // Instead of dispatch(createUser()), I'm taking the dispatch(auth(user, formName)) from auth-form.js
    // Why? Because it handles the rerouting and getUser that we need here.
    addUser: user => dispatch(auth(user, 'signup'))
  }
}

export default connect(null, mapDispatch)(SignUpForm)

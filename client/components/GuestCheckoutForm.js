import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createGuest} from '../store/guest'

export class GuestCheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      emailAddress: '',
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
    this.props.addGuest(this.state)
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
                Submit
              </button>
              <div> to review your order</div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    addGuest: guests => dispatch(createGuest(guests))
  }
}
export default connect(null, mapDispatch)(GuestCheckoutForm)

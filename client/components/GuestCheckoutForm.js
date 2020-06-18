import React from 'react'
import {connect} from 'react-redux'
import {createGuest} from '../store/guest'

export class GuestCheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      emailAddress: '',
      billingAddress: '',
      shippingAddress: '',
      creditNum: ''
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
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            <div>Email Address:</div>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="billingAddress">
            <div>Billing Address:</div>
            <input
              type="text"
              name="billingAddress"
              value={this.state.billingAddress}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="shippingAddress">
            <div>Shipping Address:</div>
            <input
              type="text"
              name="shippingAddress"
              value={this.state.shippingAddress}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="creditNum">
            <div>Credit Card Number:</div>
            <input
              type="text"
              name="creditNum"
              value={this.state.creditNum}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
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

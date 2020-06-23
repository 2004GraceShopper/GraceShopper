import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createGuest} from '../store/guest'

export class GuestCheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      billingAddress: '',
      shippingAddress: '',
      creditCardNum: '',
      redirectToConfirmation: false,
      notFilledOut: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.amIFilledOut = this.amIFilledOut.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.amIFilledOut()
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addGuest(this.state)
    // this.setState(prevState => ({
    //   redirectToConfirmation: !prevState.redirectToConfirmation
    // }))
  }
  amIFilledOut() {
    // If all of these things are filled out, then notFilledOut is false!
    console.log('amIfilledOut ran!')
    console.log('this.state.email.length: ', this.state.email.length)
    if (
      this.state.email.length > 0 &&
      this.state.billingAddress.length > 0 &&
      this.state.shippingAddress.length > 0 &&
      this.state.creditCardNum.length > 0
    ) {
      console.log('all the things SHOULD be filled out')
      this.setState({notFilledOut: false})
    } else {
      // If all of these things are NOT filled out, then notFilledOut is true!
      console.log('not complete yet!')
      this.setState({notFilledOut: true})
    }
  }

  render() {
    // const redirectToConfirmation = this.state.redirectToConfirmation
    // if (redirectToConfirmation) return <Redirect to="/" />
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
              <button
                type="submit"
                className="submit"
                disabled={this.state.notFilledOut}
              >
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
    addGuest: guest => dispatch(createGuest(guest))
  }
}
export default connect(null, mapDispatch)(GuestCheckoutForm)

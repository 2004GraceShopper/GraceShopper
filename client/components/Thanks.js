import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Thanks = () => {
  return (
    <div className="thankyou">
      <div className="innerthanks">
        <h1>Thanks for your order!</h1>
        <img src="shopping copy.png" /> <br />
        <img src="check-2.png" />
      </div>
    </div>
  )
}

export default Thanks

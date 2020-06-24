import React from 'react'
import {Link} from 'react-router-dom'

const PathNotFound = () => {
  return (
    <div className="pageNotFound">
      <div className="errorcontainer">
        <div className="content">
          <h3>Oops La!</h3>
          <button className="errorButton" type="button">
            <Link to="/">Return to Home</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PathNotFound

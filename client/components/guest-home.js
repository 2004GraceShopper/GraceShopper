import React from 'react'
//thoughts: ability to toggle a div saying "welcome back {user}" based on logged in status
// thus no longer making this a dumb compoenent
const GuestHome = () => {
  return (
    <div className="container">
      <div className="home">
        <div className="title">
          <h1>NEVER-BORED</h1>
          <h2>ALWAYS BOARD!</h2>
          <div>Welcome to the wonderful world of board games! </div>
        </div>
        <div id="tags">
          <div className="tag">Memory</div>
          <div className="tag">Strategy</div>
          <div className="tag">Chance</div>
          <div className="tag">Educational</div>
          <div className="tag">Word-Based</div>
        </div>
      </div>
    </div>
  )
}

export default GuestHome

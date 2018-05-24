import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Zones from './components/zoneComponent/zones'
import Posts from './components/postComponent/posts'
import Header from './components/view/Header'

const App = () => {
    return (
      <div className="container-fluid" style={hs}>
        <div className="row">
          <div className="col-md-8">

            <Posts />
          </div>
          <div className="col-md-4">
            <Zones />
          </div>
        </div>
      </div>
    )
}

const hs = {
  paddingTop: "50px",
  height: "100%"
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

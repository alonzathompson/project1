import React, { Component } from 'react'

const ZoneData = (props) => {
 return (
    <div className="container">
      <h2><a href="#">{props.currentZone.name}</a></h2>
      <span>{props.currentZone.zipcode}</span><br/>
      <span>{props.currentZone.numPosts}</span>
    </div>
  )
}

export default ZoneData

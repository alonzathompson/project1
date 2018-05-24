import React, { Component } from 'react'

const PostData =(props) => {
    return(
      <div>
        <span>{props.currentPost.timeStamp}</span> -> &nbsp;
        <span><strong>{props.currentPost.title}</strong>:</span>
        <br/>
        <br/>
        <p className="card-text">{props.currentPost.body}</p>
      </div>
    )
  }

export default PostData

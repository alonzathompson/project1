import React, { Component } from 'react'
import PostData from './postData'
import ApiManager from '../utils/ApiManager'

class Posts extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: {
        title: '',
        body: ''
      },
      list: []
    }
  }

  componentDidMount(){
    console.log('component did mount')
    ApiManager.get('http://localhost:3023/api/post', null, (err, response) => {
      if(err){
        console.log(err)
        alert('ERROR '+err.message)
        return
      }
      console.log(response)
      this.setState({
        list: response.results
      })
    })
  }

  updatePost (event) {
    event.preventDefault()
    console.log('updatePost: '+event.target.id+'=='+event.target.value)
    let updatePost = Object.assign({}, this.state.posts)
    updatePost[event.target.id] = event.target.value
    this.setState({
      posts: updatePost
    })
  }


  submitPost () {
    console.log("submitted post: "+JSON.stringify(this.state.posts))
    let updatedPost = Object.assign({}, this.state.posts)
    ApiManager.post('http://localhost:3023/api/post', this.state.posts, (err, response) => {
      if(err){
        alert('ERROR '+err.message)
        return
      }
      console.log("Post created: "+JSON.stringify(response))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.results)
      this.setState({
        list: updatedList
      })
    })
  }
  render(){

    const listItems = this.state.list.map((item, i) => {
      return <div className="card-block" style={{borderBottom: "1px solid #ccc"}} key={i}><PostData currentPost={item}/></div>
    })
    return(
      <div className="card" style={{backgroundColor: '#e6e6e6'}}>
        <img className="card-img-top" src="..." alt="Card image cap" />
          {listItems}
          <div style={{borderBottom: "1px solid #ccc"}} className="card-block">
            <h3>Create Message</h3>
            <input id="title" className="form-control" type="text" placeholder="username" name="title" onChange={this.updatePost.bind(this)}/>
          </div>
          <div className="card-block">
            <input id="body" className="form-control" type="text" placeholder="your post" name="body" onChange={this.updatePost.bind(this)}/>
          </div>
          <button className="btn btn-primary" onClick={this.submitPost.bind(this)}>Submit</button>
      </div>
    )
  }
}

export default Posts

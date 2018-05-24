import React, { Component } from 'react'
import ZoneData from './zoneData'
import { ApiManager }  from '../utils'

class Zones extends Component {
  constructor(props){
    super(props)
    this.state = {
      zone:{
        name:'',
        zipcode: ''
      },
      list: []
    }
  }

  componentDidMount(){
    ApiManager.get('http://localhost:3023/api/zone', null, (err, response) => {
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

  updateZone (event) {
    event.preventDefault()
    console.log('updateZone: '+event.target.id+'=='+event.target.value)
    let updateZone = Object.assign({}, this.state.zone)
    updateZone[event.target.id] = event.target.value
    this.setState({
      zone: updateZone
    })
  }

  addZone (event) {
    console.log('ADD Zone'+ JSON.stringify(this.state.zone))
    let updatedZone = Object.assign({}, this.state.zone)
    console.log(this.state)
    ApiManager.post('http://localhost:3023/api/zone', this.state.zone, (err, response) => {
      if(err){
        alert('ERROR '+err.message)
        return
      }
      console.log("Zone created: "+JSON.stringify(response))
      let zoneList = Object.assign([], this.state.list)
      zoneList.push(response.results)
      this.setState({
        list: zoneList
      })
    })
  }

  render(){
    const listItems =  this.state.list.map((zone, i) => {
      return (
        <li className="list-group-item"  key={i}><ZoneData currentZone={zone}/></li>
      )
    })
    return (
      <div className="position-sticky">
      <ul className="list-group">
        { listItems }
      </ul>
        <input id='name' onChange={this.updateZone.bind(this)} className='form-control' placeholder="name"/>
        <input id='zipcode' onChange={this.updateZone.bind(this)} className='form-control' placeholder="zipcode"/>
        <button onClick={this.addZone.bind(this)} className='btn btn-primary'>Add Zone</button>
      </div>
    )
  }
}

export default Zones

import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp';
class Request2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      msg:'fetchjsonp请求组件',
      list:[]
    }
  }
  getdata=()=>{
    let _t = this
    var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20'; 
    fetchJsonp(api)
    .then(function(response) {
        return response.json()
    }).then(function(json) {
        console.log('parsed json', json)
        _t.setState({
            list:json.result
        })
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
  }
  render() {
    return (
      <div>
        <h3>{this.state.msg}</h3>
        <button onClick={this.getdata}>fetchjsonp请求</button>
        <dl>
          {
            this.state.list.map((value,key)=>{
              return (
                <dd key={key}>{value.title}</dd>
              )
            })
          }
        </dl>
      </div>
    )
  }
}

export default Request2


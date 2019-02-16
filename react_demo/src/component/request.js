import React, { Component } from "react";
import axios from "axios";
import fetchJsonp from 'fetch-jsonp';


class Axios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "axios请求组件",
      list: [],
      msg2:'fetchjsonp跨域请求',
      list2:[]
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("是否要更新数据", "shouldComponentUpdate");
    console.log("更新时, 父传子的值", nextProps); //更新时, 父传子的值
    console.log("更新后的值", nextState); //更新后的值
    return true; //返回true才更新
  }
  componentWillUpdate() {
    console.log("数据将要更新", "componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("数据更新完成", "componentDidUpdate");
  }
  //非跨域
  getdata = () => {
    let _t = this;
    var api = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20"; 
    axios
      .get(api)
      .then(res => {
        console.log(res);
        _t.setState({
          list: res.data.result
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //跨域请求
  getdata2=()=>{
    let _t = this
    var api='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20'; 
    fetchJsonp(api)
    .then(function(response) {
      console.log('跨域回调',response)
        return response.json()
    }).then(function(json) {
        
        _t.setState({
            list2:json.result
        })
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
  }
  render() {
    return (
      <div>
        <h3>{this.state.msg}</h3>
        <button onClick={this.getdata}>无跨域请求</button>
        {/* {this.props.title} */}
        <dl>
          {this.state.list.map((value, key) => {
            return <dd key={key}>{value.title}</dd>;
          })}
        </dl>

        <br/>
        <h3>{this.state.msg2}</h3>
        <button onClick={this.getdata2}>fetchjsonp请求</button>
        <dl>
          {
            this.state.list2.map((value,key)=>{
              return (
                <dd key={key}>{value.title}</dd>
              )
            })
          }
        </dl>
      </div>
    );
  }
}

export default Axios;

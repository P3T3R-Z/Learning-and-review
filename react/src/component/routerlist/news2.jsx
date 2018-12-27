import React, { Component } from 'react';
import url from 'url';
class News2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg:'get路由--',
            aid:''
        }
    }
    componentDidMount=()=>{
        //获取get传值
        // 在react中使用url模块需要安装
        console.log(url.parse(this.props.location.search, true))
        var aid = url.parse(this.props.location.search, true).query.a
        this.setState({
            aid
        })
    }
    render() {
        return (
            <div>{this.state.msg+this.state.aid}</div>
            
        );
    }
}

export default News2;
import React, { Component } from 'react';
import url from 'url';
class News2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg:'',
            aid:''
        }
    }
    componentDidMount=()=>{
        //获取get传值
        // 在react中使用url模块需要安装
        console.log(url.parse(this.props.location.search, true))
        var aid = url.parse(this.props.location.search, true).query.aid
        this.setState({
            aid
        })
    }
    render() {
        return (
            <div>get路由aid---{+this.state.aid}</div>
            
        );
    }
}

export default News2;
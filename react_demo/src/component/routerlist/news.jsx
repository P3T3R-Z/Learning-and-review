import React, { Component } from 'react';

class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg:'动态路由--',
            aid:'',
            
        }
    }
    componentDidMount=()=>{
        //获取动态路由的传值
        console.log(this.props.match.params.aid);  
        this.setState({
            aid:this.props.match.params.aid
        })
    }
    render() {
        
        return (
            <div>
            {this.state.msg+this.state.aid}
            </div>
            
            
        );
    }
    
}

export default News;
import React, { Component } from 'react';
class Rightpage extends Component {
    constructor(props){
        super(props);
        this.state={
            msg:'页面'
        }
    }
    componentDidMount(){
        if(this.props.location.pathname === "/drouter/bb"){
            this.setState({
                msg:'bb页面'
            })
        }else{
            this.setState({
                msg:'aa页面'
            }) 
        }
    }
    render() {
        return (
            <div>
                {this.state.msg}
            </div>
        );
    }
}

export default Rightpage;
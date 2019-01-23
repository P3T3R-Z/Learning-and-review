import React, { Component } from 'react';

import Foot from "../components/footer/foot.jsx";
class Center extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            nowpath:""
        };
    }
    render() {
        return (
            <div >
                 <Foot pathname={this.props.location.pathname} />
                 <div>开发中.</div>
            </div>
        );
    }
    componentDidMount=()=>{
        console.log(this.props.location.pathname)
        
    }
}

export default Center;

import React, { Component } from 'react'

class Lifecycle extends Component {
    constructor(props){
        console.log('构造函数')
        super(props);
        this.state = {
            title:'react组件生命周期'
        }
    }
    componentWillMount(){
        console.log('组件将要挂载','componentWillMount')
    }
    componentDidMount(){
        console.log('组件挂载完成','componentDidMount')
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log('是否要更新数据','shouldComponentUpdate')
        console.log('更新时, 父传子的值',nextProps) //数据更新时, 组件传值
        console.log('更新后的值',nextState)  //更新后的值
        return true;
    }
    componentWillUpdate(){
        console.log('数据将要更新','componentWillUpdate')
    }
    componentDidUpdate(){
        console.log('数据更新完成','componentDidUpdate')
    }
    componentWillUnmount(){
        console.log('组件销毁','componentWillUnmount')
    }
    componentWillReceiveProps(){
        console.log('父传子值改变时触发的方法','componentWillReceiveProps')
    }

    render() {
        console.log('数据渲染')
        return (
            <div>
                <h3>{this.state.title}</h3>
                
                    <h3> 组件将要挂载--componentWillMount  </h3> <br/>
                    <h3> 组件挂载完成--componentDidMount </h3> <br/>
                    <h3> 是否要更新数据--shouldComponentUpdate </h3> <br/>
                    <h3> 数据将要更新--componentWillUpdate </h3> <br/>
                    <h3> 数据更新完成--componentDidUpdat  </h3> <br/>
                    <h3> 组件销毁--componentWillUnmountb  </h3> <br/>
                    <h3> 父传子值改变时触发的方法--componentWillReceiveProps  </h3>  <br/>
                
            </div>
        );
    }
}

export default Lifecycle;

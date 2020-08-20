import React from "react";
import PropTypes from "prop-types"; //无需单独安装

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: "子组件"
    };
  }
  render() {
    return (
      <div>
        传递数据:{this.props.title} <br/>
		传值验证:{this.props.num.toString()} <br/>
        <button onClick={this.props.run}>父传子方法</button> <br/>
        <button onClick={this.getParentData.bind(this, this.props.other)}> 
          父组件无传值时的默认值
        </button> <br/>
        <button
          onClick={this.props.all.sendChildData.bind(this, this.state.userinfo)}
        >
          父传子整个实例,子组件获取父组件方法并传递自身数据
        </button> <br/>
      </div>
    );
  }
  getParentData(data) {
    alert(data);
  }
}

//父组件没有传值时的默认值
Header.defaultProps = {
  other: "默认值"
};
//父组件传值类型验证
Header.propTypes = {
  num: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired //验证数字或者布尔值, `.isRequired`表示必须传值
};
/*https://reactjs.org/docs/typechecking-with-proptypes.html*/
export default Header;



/*

React中的组件: 解决html 标签构建应用的不足。         


使用组件的好处：把公共的功能单独抽离成一个文件作为一个组件，哪里里使用哪里引入。


父子组件：组件的相互调用中，我们把调用者称为父组件，被调用者称为子组件


父子组件传值（react 父子组件通信）：

    父组件给子组件传值 

		    1.在调用子组件的时候定义一个属性  <Header msg='首页'></Header>

			  2.子组件里面 this.props.msg          


        说明：父组件不仅可以给子组件传值，还可以给子组件传方法,以及把整个父组件传给子组件,可以让子组件给父组件传值。


    父组件主动获取子组件的数据

        1、父组件调用子组件的时候指定ref的值 <Header ref='header'></Header>      
        
        2、父组件通过this.refs.header  获取整个子组件实例  (dom（组件）加载完成以后获取 )



*/
import React from "react";
class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      a: 1
    }
  }
  render() {
    return <div>{this.props.user}</div>;
  }
}
//基于反向继承的方式
export function phoc(WrappedComponent) {

  //此处通过继承包裹的组件获取其state或者props进行修改
  return class PP extends WrappedComponent {
    render() {
      const newProps = {
        user: '高阶组件props'
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
    componentDidMount() {
      // 可以方便地得到state，做一些更深入的修改。
      console.log(this.state);
    }
  };
}

//  function withheader(title) {
//     return function (WrappedComponent) {
//       return class HOC extends React.Component {
//         render() {
//           return <div>
//             <div className="demo-header">
//               {title
//                 ? title
//                 : '我是标题'}
//             </div>
//             <WrappedComponent {...this.props}/>
//           </div>
//         }
//       }
//     }
//   }



export default Demo



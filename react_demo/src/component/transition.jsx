import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import "../assets/css/trans.css";
class Trans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStatus: true,
      arrayclass: [
        ".fade-enter",
        ".fade-appear",
        ".fade-enter-active",
        ".fade-appear-active",
        ".fade-exit",
        ".fade-exit-active"
      ],
      bindval: ""
    };
  }
  render() {
    return (
      <Fragment>
        <p>react-transition-group组件</p>
        <input type="text" value={this.state.bindval} onChange={this.inputchange} />
        <button onClick={this.add}>add</button><br/>
        <button onClick={this.toggle}>toggle</button>

        {this.state.arrayclass.map((item,i) => {
          return (
            <CSSTransition
              key={item+i}
              in={this.state.toggleStatus}
              timeout={1000}
              classNames="fade" //动画类名前缀
              unmountOnExit //组件退出后卸载
              appear={true} //添加这个属性使组件第一次出现的时候（即页面刚加载时）也使用动画，对应css中的fade-appear和fade-appear-active样式
            >
              <div onClick={this.removeItem.bind(this, i)}>{item}</div>
            </CSSTransition>
          );
        })}
      </Fragment>
    );
  }
  toggle = () => {
    this.setState(
      prevStatus => {
        var { toggleStatus } = prevStatus;
        var changed = !toggleStatus;
        return {
          toggleStatus: changed
        };
      },
      () => {
        console.log(this.state.toggleStatus);
      }
    );
  };
  inputchange = (e) => {
    this.setState({
        bindval: e.target.value
    });
  };
  add = () => {
    this.setState(prevState => {
        console.log(prevState)
      var newlist = [...prevState.arrayclass, prevState.bindval];
      return { arrayclass: newlist, bindval:"" };
    });
  };
  removeItem=(key)=>{
   console.log(key)
    const newlist = this.state.arrayclass;
    newlist.splice(key,1)
    this.setState({
      arrayclass: newlist
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
      //若输入框与下面list是分开的组件 需要优化如下
    //当下一个即将更新的state.bindval 不等于当前state.bindval 就阻止更新
    //目的:优化render函数渲染,
    //原因:只要nextProps, nextState改变render函数就会重新执行,各组件都会重新render渲染
    //输入框输入时,即将更新的数据变动了,但是state没有变动,所有会触发render,所以此处要优化
    // console.log(nextProps.bindval, this.state.bindval)
    // if (nextProps.bindval !== this.state.bindval) {
    //   return false;
    // } else {
    //   return true;
    // }

    return true
  }
  //组件卸载时 阻止异步操作数据赋值
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
}

export default Trans;


import React, { Component } from "react";
import { Input, Button, List } from "antd";
//当react组件class类中只有render函数时,可以写成如下形式, 这种形式叫做无状态组件,新能高于react类组件
const ReduxpageUi = props => {
  return (
    <div>
      <Input
        placeholder="todolist"
        style={{ width: "60%" }}
        value={props.inputValue}
        onChange={props.handleInputChange}
      />
      <Button
        type="primary"
        style={{ marginLeft: "10px" }}
        onClick={props.handleBtnclick}
      >
        添加
      </Button>
      <List
        style={{ marginTop: "10px", width: "60%" }}
        bordered
        dataSource={props.list}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                shape="circle"
                icon="delete"
                onClick={props.itemDelete.bind(this, index)}
                size={"small"}
              />
            ]}
          >
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};

//此组件为reduxpage的ui子组件,数据来源于父级容器组件的传值

// class ReduxpageUi extends Component {
//   render() {
//     return (
//       <div>
//         <Input
//           placeholder="todolist"
//           style={{ width: "60%" }}
//           value={this.props.inputValue}
//           onChange={this.props.handleInputChange}
//         />
//         <Button
//           type="primary"
//           style={{ marginLeft: "10px" }}
//           onClick={this.props.handleBtnclick}
//         >
//           添加
//         </Button>
//         <List
//           style={{ marginTop: "10px", width: "60%" }}
//           bordered
//           dataSource={this.props.list}
//           renderItem={(item, index) => (
//             <List.Item
//               actions={[
//                 <Button
//                   shape="circle"
//                   icon="delete"
//                   onClick={this.props.itemDelete.bind(this, index)}
//                   size={"small"}
//                 />
//               ]}
//             >
//               {item}
//             </List.Item>
//           )}
//         />
//       </div>
//     );
//   }
// }

export default ReduxpageUi;

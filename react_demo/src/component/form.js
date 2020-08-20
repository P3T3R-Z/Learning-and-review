import React from "react";

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "react组件",
      name: "",
      sex: 1,
      city: "",
      citys: ["北京", "上海", "深圳"],
      hobby: [
        {
          title: "睡觉",
          checked: true
        },
        {
          title: "吃饭",
          checked: false
        },
        {
          title: "敲代码",
          checked: true
        }
      ],
      info: ""
    };
    this.state.city = this.state.citys[0];
  }

  render() {
    return (
      <div>
        <h3>{this.state.msg}</h3>
        <form onSubmit={this.formsubmit}>
          姓名:
          <input type="text" onChange={this.getname} value={this.state.name} />
          <br />
          性别:
          <input
            type="radio"
            checked={this.state.sex === 1}
            onChange={this.getSex}
            value="1"
          />
          男
          <input
            type="radio"
            checked={this.state.sex === 2}
            onChange={this.getSex}
            value="2"
          />
          女
          <br />
          城市:
          <select onChange={this.getcity}>
            {this.state.citys.map((v, k) => {
              return (
                <option key={k} value={v}>
                  {v}
                </option>
              );
            })}
          </select>
          <br />
          爱好:
          {this.state.hobby.map((v, k) => {
            return (
              <div key={k}>
                {v.title}
                <input
                  checked={v.checked}
                  type="checkbox"
                  onChange={this.gethobby.bind(this, k)}
                />
              </div>
            );
          })}
          <br />
          其他:
          <textarea onChange={this.gettextarea} value={this.state.info} />
          <br />
          <input type="submit" value="提交" />
        </form>
      </div>
    );
  }
  formsubmit = e => {
    e.preventDefault();
    let g = this.state;
    console.log(g.name, g.sex, g.city, g.hobby, g.info);
  };
  getname = e => {
    this.setState({
      name: e.target.value
    });
  };
  getSex = e => {
    this.setState({
      sex: parseInt(e.target.value)
    });
  };
  getcity = e => {
    this.setState({
      city: e.target.value
    });
  };
  gethobby(key) {
    var hobby = this.state.hobby;

    hobby[key].checked = !hobby[key].checked;
    this.setState({
      hobby: hobby
    });
  }
  gettextarea = e => {
    this.setState({
      info: e.target.value
    });
  };
}

export default form;

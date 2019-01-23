import React, { Component } from "react";
import Foot from "../components/footer/foot.jsx";
import { SearchBar, WhiteSpace, Tag, WingBlank, Toast } from "antd-mobile";
import "../assets/css/relationship.css";
import jscookie from "jscookie";


//let qqurl = /.*\.qq\.com/;
let link = "https://www.peterzhu.club/api/getQQvideo2?url=";

class Relationship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowpath: "",
      value: "",
      historyTag: []
    };
  }
  render() {
    return (
      <div>
        <Foot pathname={this.props.location.pathname} />
        <WhiteSpace />
        <WingBlank>输入视频地址并回车获取免费资源</WingBlank>
        <WhiteSpace />
        <SearchBar
          value={this.state.value}
          placeholder="Search"
          onSubmit={this.onSubmit}
          onClear={value => console.log(value, "onClear")}
          onChange={this.onChange}
        />
        <WhiteSpace />

        <WingBlank>搜索历史</WingBlank>

        <div className="historybox">
          {this.state.historyTag.map((item, index) => {
            return (
              <Tag onChange={this.tagsclick.bind(this, index)} key={index}>
                {item.substring(0, 20) +
                  " ..." +
                  item.substring(item.length - 15, item.length)}
              </Tag>
            );
          })}
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    //console.log(this.props.location.pathname);
    let sh = jscookie.get("serchUrl");
    if (sh) {
      let tags = sh.indexOf(",") > -1 ? sh.split(",") : [sh];
      this.setState({
        historyTag: tags
      });
    }
  };

  onChange = value => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: "" });
  };
  onSubmit = value => {
    // if (!qqurl.test(value)) {
    //   Toast.offline("靓仔,请输入qq视频地址", 2);
    //   return;
    // }
    Toast.loading("Loading...", 1, () => {
      window.location.href = link + value;
    });

    if (this.state.historyTag.indexOf(value) > -1) {
      return;
    }
    var savehistory =
      this.state.historyTag.length > 0
        ? `${this.state.historyTag.join(",")},${value}`
        : `${value}`;

    jscookie.set({
      name: "serchUrl",
      value: savehistory
    });
  };

  tagsclick = index => {
    Toast.loading("Loading...", 1, () => {
      window.location.href = link + this.state.historyTag[index];
    });
  };
}

export default Relationship;

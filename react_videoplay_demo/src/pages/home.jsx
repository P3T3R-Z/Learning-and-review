import React, { Component } from "react";
import Foot from "../components/footer/foot.jsx";
import "../assets/css/home.css";
import { Redirect } from "react-router-dom";
import { Carousel, WingBlank, WhiteSpace, Button } from "antd-mobile";

import { CSSTransition } from "react-transition-group";

let link = "https://www.peterzhu.club/api/getQQvideo2?url=";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          path: "https://v.qq.com/x/cover/hi1gl5jmmsxbotc.html",
          cover:
            "https://i.gtimg.cn/qqlive/img/jpgcache/files/qqvideo/h/hi1gl5jmmsxbotc_y.jpg",
          title: "流浪猫鲍勃"
        },
        {
          path: "https://v.qq.com/x/cover/qee75hz1x7m6n3s.html",
          cover:
            "https://puui.qpic.cn/videovert/0/vnewpictag_qee75hz1x7m6n3s_y_2538_2952_1531106713802732_31972/0",
          title: "变形金刚5"
        },
        {
          path: "https://v.qq.com/x/cover/2j5kilwvtepehti.html",
          cover:
            "https://puui.qpic.cn/videovert/0/vnewpictag_1_118_1546762908540213_28848/0",
          title: "狗十三"
        }
      ],
      imgHeight: 176,
      slideIndex: 0,
      indexTitle: "",
      linkSearchStatus: false,

      name: "",
      fadein: true
    };
  }
  render() {
    if (this.state.linkSearchStatus === true) {
      //console.log('---------', this.props)
      return (
       
        <Redirect
          to={{
            pathname: "/relationship",
          }}
          push
          from = '/'
          
        />
      );
    }
    return (
      <div>
        <Foot pathname={this.props.location.pathname} />
        <WhiteSpace />
        <WingBlank className="homeTop">
          <img
            src="https://vm.gtimg.cn/tencentvideo/vstyle/mobile/channel/style/image/logo_black.svg"
            alt=""
          />
          <Button
            icon="search"
            size="small"
            inline
            type="primary"
            onClick={this.linksearch}
          >
            搜索
          </Button>
        </WingBlank>
        <WhiteSpace />
        <Carousel
          className="space-carousel"
          frameOverflow="visible"
          cellSpacing={0}
          slideWidth={0.8}
          infinite
          dotStyle={{
            backgroundColor: "#fff",
            transition: "all 300ms ease-in-out"
          }}
          dotActiveStyle={{
            backgroundColor: "#108ee9",
            width: "16px",
            borderRadius: "4px",
            transition: "all 300ms ease-in-out"
          }}
          // beforeChange={(from, to) =>
          //   console.log(`slide from ${from} to ${to}`)
          // }
          afterChange={this.swiperAfterChange}
        >
          {this.state.data.map((val, index) => {
            return (
              <a
                key={index}
                href={`${link}${val.path}`}
                className="swiper_item"
              >
                <img
                  src={val.cover}
                  alt=""
                  style={{
                    width: "95%",
                    boxShadow: "2px 1px 1px rgba(0, 0, 0, 0.2)"
                  }}
                  onLoad={() => {
                    //window.dispatchEvent(new Event("resize"));
                    //this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            );
          })}
        </Carousel>
        {/* 组件动画 */}
        <CSSTransition
          in={this.state.fadein}
          timeout={300}
          classNames="fade" //动画类名前缀
          //unmountOnExit //组件退出后卸载
          appear={true} //添加这个属性使组件第一次出现的时候（即页面刚加载时）也使用动画，对应css中的fade-appear和fade-appear-active样式
        >
          <p className="swiper_title">{this.state.indexTitle}</p>
        </CSSTransition>
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      indexTitle: this.state.data[0].title
    });
  }
  swiperAfterChange = index => {
    this.setState({
      slideIndex: index,
      indexTitle: this.state.data[index].title,
      fadein: !this.state.fadein
    });
    //console.log(this.state.slideIndex)
  };
  linksearch = () => {
    //history.push(location)
    // this.setState({
    //   linkSearchStatus: true
    // });
  };
}

export default Home;

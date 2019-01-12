import React from "react";
import zhCN from "antd/lib/locale-provider/zh_CN";
import {
  Button,
  Radio,
  Icon,
  Row,
  Col,
  Checkbox,
  DatePicker,
  Upload,
  message,
  Progress,
  LocaleProvider,
  Pagination
} from "antd";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Antdpage extends React.Component {
  state = {
    size: "large",
    percent: 0,
    uploadinfo: {
      name: "file",
      action: "//jsonplaceholder.typicode.com/posts/",
      headers: {
        authorization: "authorization-text"
      },
      listType: "picture",
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    }
  };
  componentDidMount() {
    var loopC = () => {
      setTimeout(() => {
        this.setState({
          percent: 0
        });
        var x = setInterval(() => {
          this.setState({
            percent: (this.state.percent += 10)
          });
          if (this.state.percent === 100) {
            clearInterval(x);
            console.log("循环完成");
            loopC();
          }
        }, 200);
      }, 1000);
    };
    var promise = new Promise(resolve => {
      var x = setInterval(() => {
        this.setState({
          percent: (this.state.percent += 10)
        });
        if (this.state.percent === 100) {
          clearInterval(x);
          resolve("进度完成");
        }
      }, 200);
    });
    promise.then(res => {
      console.log(res);

      //loopC();
    });
  }

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };
  onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  onChangeDp = (date, dateString) => {
    console.log(date, dateString);
  };
  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  render() {
    const size = this.state.size;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Button type="primary" size={size}>
          Primary
        </Button>
        <Button size={size}>Normal</Button>
        <Button type="dashed" size={size}>
          Dashed
        </Button>
        <Button type="danger" size={size}>
          Danger
        </Button>
        <br />
        <Button type="primary" shape="circle" icon="download" size={size} />
        <Button type="primary" icon="download" size={size}>
          Download
        </Button>
        <br />
        <Button.Group size={size}>
          <Button type="primary">
            <Icon type="left" />
            Backward
          </Button>
          <Button type="primary">
            Forward
            <Icon type="right" />
          </Button>
        </Button.Group>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">col-6</div>
          </Col>
        </Row>

        <Checkbox onChange={this.onChange}>Checkbox</Checkbox>

        <DatePicker onChange={this.onChangeDp} />

        <MonthPicker onChange={this.onChangeDp} placeholder="Select month" />

        <RangePicker onChange={this.onChangeDp} />

        <WeekPicker onChange={this.onChangeDp} placeholder="Select week" />

        <Upload {...this.state.uploadinfo}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>

        <Progress type="circle" percent={this.state.percent} />
        <LocaleProvider locale={zhCN}>
          <Pagination
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange.bind(this)}
            defaultCurrent={3}
            total={500}
          />
        </LocaleProvider>
      </div>
    );
  }
}

export default Antdpage;

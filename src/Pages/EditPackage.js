import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Card,
  Checkbox,
  Input,
  Col
} from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

class EditPackage extends React.Component {
  handleSubmit = e => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.editPackage(this.props.match.params.id, values);
        this.props.history.push("/");
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10 }}>Edit Package</h3>
          </div>

          <div>
            <Link to="/">
              <Button
                type="primary"
                style={{ marginLeft: 1029, marginBottom: 20 }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>

        {this.props.packages
          .filter(packaged => packaged.id == this.props.match.params.id)
          .map(editPackage => (
            <Card>
              <Form
                onSubmit={() => {
                  this.props.editPackage();
                }}
              >
                <Form.Item
                  label="PackageName"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator("name", {
                    initialValue: editPackage.name,
                    rules: [
                      { required: true, message: "Please add a Package name" }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label="Description"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator("description", {
                    initialValue: editPackage.description,
                    rules: [
                      {
                        required: true,
                        message: "Please describe the package briefly"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                {/* <Form.Item
                  label="Upload Logo"
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 12 }}
                >
                  {getFieldDecorator("upload", {
                    valuePropName: "fileList",
                    getValueFromEvent: this.normFile
                  })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item> */}

                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.handleSubmit(this.props.match.params.id);
                    }}
                  >
                    Submit
                  </Button>
                  <Link to="/">
                    <Button type="primary" style={{ marginLeft: 15 }}>
                      Cancel
                    </Button>
                  </Link>
                </Form.Item>
              </Form>
            </Card>
          ))}
      </div>
    );
  }
}

export default Form.create()(EditPackage);

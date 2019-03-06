import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import firebase from "../firebase";
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
import { database } from "firebase";

const { Option } = Select;

class CreatePackageForm extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("packages");
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addPackage();
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10 }}>Add Package</h3>
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

        <Card>
          <Form>
            <Form.Item
              label="PackageName"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Please add a Package name" }
                ]
              })(
                <Input
                  onChange={e => {
                    this.props.updatePackageName(e.target.value);
                  }}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Description"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "Please describe the package briefly"
                  }
                ]
              })(
                <Input
                  onChange={e => this.props.updateDescription(e.target.value)}
                />
              )}
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
              <Button type="primary" onClick={this.handleSubmit}>
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
      </div>
    );
  }
}

export default Form.create()(CreatePackageForm);
//

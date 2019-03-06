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
    this.ref = firebase.firestore().collection("components");

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.props.addComponent(this.props.match.params.id);
    this.props.history.push(`/${this.props.match.params.id}/components`);
  };

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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10 }}>Add Component</h3>
          </div>

          <div>
            <Link to={`/${this.props.match.params.id}/components`}>
              <Button
                type="primary"
                style={{ marginLeft: 1009, marginBottom: 20 }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label="ComponentName"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Please add a Component name" }
                ]
              })(
                <Input
                  onChange={e => {
                    this.props.updateComponentName(e.target.value);
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
                    message: "Please describe the component briefly"
                  }
                ]
              })(
                <Input
                  onChange={e => {
                    this.props.updateComponentDescription(e.target.value);
                  }}
                />
              )}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button
                type="primary"
                onClick={() => {
                  this.handleSubmit();
                }}
              >
                Submit
              </Button>
              <Link to={`/${this.props.match.params.id}/components`}>
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

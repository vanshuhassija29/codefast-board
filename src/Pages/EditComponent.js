import React from "react";

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

class EditComponent extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editComponent(this.props.match.params.id2);
        this.props.history.push(`/${this.props.match.params.id}/components`);
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`
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
    console.log("I recieved props as", this.props);
    const { getFieldDecorator } = this.props.form;
    console.log("Received Components as", this.props.components);
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10 }}>Edit Component</h3>
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

        {this.props.components
          .filter(component => component.id == this.props.match.params.id2)
          .map(editComponent => (
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
                      placeholder={editComponent.name}
                      onChange={e =>
                        this.props.updateComponentName(e.target.value)
                      }
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
                      onChange={e =>
                        this.props.updateComponentDescription(e.target.value)
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" onClick={this.handleSubmit}>
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
          ))}
      </div>
    );
  }
}

export default Form.create()(EditComponent);

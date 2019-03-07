// import React from "react";
// import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
// import "../index.css";
// import firebase from "../firebase";
// import {
//   Form,
//   Select,
//   InputNumber,
//   Switch,
//   Radio,
//   Slider,
//   Button,
//   Upload,
//   Icon,
//   Card,
//   Checkbox,
//   Input,
//   Col
// } from "antd";
// import { Link } from "react-router-dom";
// import { database } from "firebase";

// const { Option } = Select;

// class CreatePackageForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ref = firebase.firestore().collection("components");

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit = () => {
//     this.props.addComponent(this.props.match.params.id);
//     this.props.history.push(`/${this.props.match.params.id}/components`);
//   };

//   normFile = e => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e && e.fileList;
//   };
//   normFile = e => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e && e.fileList;
//   };

//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div>
//         <div style={{ display: "flex" }}>
//           <div>
//             <h3 style={{ paddingLeft: 10 }}>Add Component</h3>
//           </div>

//           <div>
//             <Link to={`/${this.props.match.params.id}/components`}>
//               <Button
//                 type="primary"
//                 style={{ marginLeft: 1009, marginBottom: 20 }}
//               >
//                 Back
//               </Button>
//             </Link>
//           </div>
//         </div>

//         <Card>
//           <Form onSubmit={this.handleSubmit}>
//             <Form.Item
//               label="ComponentName"
//               labelCol={{ span: 5 }}
//               wrapperCol={{ span: 12 }}
//             >
//               {getFieldDecorator("name", {
//                 rules: [
//                   { required: true, message: "Please add a Component name" }
//                 ]
//               })(
//                 <Input
//                   onChange={e => {
//                     this.props.updateComponentName(e.target.value);
//                   }}
//                 />
//               )}
//             </Form.Item>
//             <Form.Item
//               label="Description"
//               labelCol={{ span: 5 }}
//               wrapperCol={{ span: 12 }}
//             >
//               {getFieldDecorator("description", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please describe the component briefly"
//                   }
//                 ]
//               })(
//                 <Input
//                   onChange={e => {
//                     this.props.updateComponentDescription(e.target.value);
//                   }}
//                 />
//               )}
//             </Form.Item>

//             <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
//               <Button
//                 type="primary"
//                 onClick={() => {
//                   this.handleSubmit();
//                 }}
//               >
//                 Submit
//               </Button>
//               <Link to={`/${this.props.match.params.id}/components`}>
//                 <Button type="primary" style={{ marginLeft: 15 }}>
//                   Cancel
//                 </Button>
//               </Link>
//             </Form.Item>
//           </Form>
//         </Card>
//       </div>
//     );
//   }
// }

// export default Form.create()(CreatePackageForm);

// //

import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Icon, Button, Card } from "antd";

let id = 0;
let did = 0;
let methodId = 0;

class CreateComponent extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    console.log("Received k as", k);
    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue(
      {
        keys: keys.filter(key => key !== k)
      },
      console.log("After removing keys are:", keys)
    );
  };
  removeDefault = k => {
    const { form } = this.props;
    // can use data-binding to get
    const defaultValues = form.getFieldValue("defaultValues");

    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue(
      {
        defaultValues: defaultValues.filter(key => key !== k)
      },
      console.log("After removing keys are:", defaultValues)
    );
  };
  removeMethod = k => {
    const { form } = this.props;
    // can use data-binding to get
    const classMethods = form.getFieldValue("classMethods");

    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue(
      {
        classMethods: classMethods.filter(key => key !== k)
      },
      console.log("After removing keys are:", classMethods)
    );
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    console.log("Next Key is", nextKeys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };
  addDefault = () => {
    const { form } = this.props;
    // can use data-binding to get
    const defaultValues = form.getFieldValue("defaultValues");
    const nextKeys = defaultValues.concat(did++);
    console.log("Next Key is", nextKeys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      defaultValues: nextKeys
    });
  };
  addMethods = () => {
    const { form } = this.props;
    // can use data-binding to get
    const classMethods = form.getFieldValue("classMethods");
    const nextKeys = classMethods.concat(methodId++);
    console.log("Next Key is", nextKeys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      classMethods: nextKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please enter key for style."
              }
            ]
          })(
            <Input
              placeholder="Key"
              style={{ width: "260px", marginLeft: 17 }}
            />
          )}
        </Form.Item>
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          required={false}
          key={k}
        >
          {getFieldDecorator(`values[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please enter value for key"
              }
            ]
          })(
            <Input.TextArea
              placeholder="Value"
              className="textArea"
              style={{ width: "260px", marginRight: 8, height: 32 }}
            />
          )}
        </Form.Item>

        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={keys.length === 1}
          onClick={() => this.remove(k)}
          style={{
            marginTop: "10px",
            fontSize: "20px",
            marginLeft: "50px"
          }}
        />
      </div>
    ));
    getFieldDecorator("defaultValues", { initialValue: [] });
    const defaultValues = getFieldValue("defaultValues");
    const formItem = defaultValues.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field."
              }
            ]
          })(
            <Input
              placeholder="Key"
              style={{ width: "260px", marginLeft: 17 }}
            />
          )}
        </Form.Item>
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          required={false}
          key={k}
        >
          {getFieldDecorator(`values[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field."
              }
            ]
          })(
            <Input.TextArea
              placeholder="Value"
              className="textArea"
              style={{ width: "260px", marginRight: 8, height: 32 }}
            />
          )}
        </Form.Item>

        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={defaultValues.length === 1}
          onClick={() => this.removeDefault(k)}
          style={{
            marginTop: "10px",
            fontSize: "20px",
            marginLeft: "50px"
          }}
        />
      </div>
    ));
    getFieldDecorator("classMethods", { initialValue: [] });
    const classMethods = getFieldValue("classMethods");
    const methods = classMethods.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field."
              }
            ]
          })(
            <Input
              placeholder="Key"
              style={{ width: "260px", marginLeft: 17 }}
            />
          )}
        </Form.Item>
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          required={false}
          key={k}
        >
          {getFieldDecorator(`values[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field."
              }
            ]
          })(
            <Input.TextArea
              placeholder="Value"
              className="textArea"
              style={{ width: "260px", marginRight: 8, height: 32 }}
            />
          )}
        </Form.Item>

        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          disabled={keys.length === 1}
          onClick={() => this.removeMethod(k)}
          style={{
            marginTop: "10px",
            fontSize: "20px",
            marginLeft: "50px"
          }}
        />
      </div>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="ComponentName"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please add a Component name" }]
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
        <Form.Item
          label="CodeTemplate"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("code", {
            rules: [
              {
                required: true,
                message: "Please write code Template"
              }
            ]
          })(
            <Input.TextArea
              onChange={e => {
                this.props.updateComponentCode(e.target.value);
              }}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Style"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        />

        <Card
          style={{
            width: "51%",
            marginLeft: 250,
            paddingBottom: 0,
            marginBottom: -29,
            marginTop: -10
          }}
        >
          <div
            className="ant-card-body"
            style={{ paddingTop: 0, paddingBottom: 0, marginBottom: -29 }}
          >
            <div style={{ marginLeft: -187, paddingBotttom: 0 }}>
              <div style={{ marginLeft: 127 }}>{formItems}</div>
            </div>

            <Form.Item {...formItemLayoutWithOutLabel}>
              <Icon
                type="plus-circle"
                onClick={this.add}
                theme="filled"
                style={{ fontSize: 30, marginLeft: 445, marginTop: 10 }}
              />
            </Form.Item>
          </div>
        </Card>
        <Form.Item
          label="DefaultValues"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          style={{ marginTop: 40, marginLeft: 50 }}
        />

        <Card
          style={{
            width: "51%",
            marginLeft: 250,
            paddingBottom: 0,
            marginBottom: -29,
            marginTop: -10
          }}
        >
          <div
            className="ant-card-body"
            style={{ paddingTop: 0, paddingBottom: 0, marginBottom: -29 }}
          >
            <div style={{ marginLeft: -187, paddingBotttom: 0 }}>
              <div style={{ marginLeft: 127 }}>{formItem}</div>
            </div>

            <Form.Item {...formItemLayoutWithOutLabel}>
              <Icon
                type="plus-circle"
                onClick={this.addDefault}
                theme="filled"
                style={{ fontSize: 30, marginLeft: 445, marginTop: 10 }}
              />
            </Form.Item>
          </div>
        </Card>
        <Form.Item
          label="ClassMethods"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          style={{ marginTop: 40, marginLeft: 55 }}
        />

        <Card
          style={{
            width: "51%",
            marginLeft: 250,
            paddingBottom: 0,
            marginTop: -10
          }}
        >
          <div
            className="ant-card-body"
            style={{ paddingTop: 0, paddingBottom: 0, marginBottom: -29 }}
          >
            <div style={{ marginLeft: -187, paddingBotttom: 0 }}>
              <div style={{ marginLeft: 127 }}>{methods}</div>
            </div>

            <Form.Item {...formItemLayoutWithOutLabel}>
              <Icon
                type="plus-circle"
                onClick={this.addMethods}
                theme="filled"
                style={{ fontSize: 30, marginLeft: 445, marginTop: 10 }}
              />
            </Form.Item>
          </div>
        </Card>

        <Form.Item
          {...formItemLayoutWithOutLabel}
          style={{ marginTop: 20, marginLeft: 400 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CreateComponent);

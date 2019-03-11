import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Icon, Button, Card } from "antd";
import Spins from "./Spin";
import firebase from "firebase";

let id = 0;
let did = 0;
let methodId = 0;

class CreateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      placeholder: "",
      descriptionPlaceholder: "",
      codePlaceholder: "",
      styles: [],
      extendsPlaceholder: "",
      acceptsPlaceholder: "",
      isLoading: true
    };
  }

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

  add = e => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    console.log("At KEy", keys);
    const nextKeys = keys.concat(id++);
    console.log("Next Key is", nextKeys);
    console.log("Received Values", e.target.value);
    // can use data-binding to set
    // important! notify form to detect changes
    console.log("Here", this.props.form.values);
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
  show = snap => {
    console.log("Value is", JSON.stringify(snap.val(), null, 2));
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
    console.log("Her we have id 2 as ", this.props.match.params.id2);
    var self = this;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        console.log("Props are", this.props);

        this.props.updateDefaultStateArray(
          values.defaultStateKey,
          values.defaultStateValue
        );
        this.props.updateClassMethodArray(
          values.classMethodKey,
          values.classMethodValue
        );
        this.props.updateStyleArray(
          values.styleKeys,
          values.styleValues,
          this.props.match.params.id
        );
        this.props.updateValues(
          values.name,
          values.description,
          values.extends,
          values.accepts,
          values.code,
          this.props.match.params.id
        );
        console.log("Everything done and now pushing");

        this.props.history.push(`/${this.props.match.params.id}/components`);
      } else {
        console.log("Error is", err);
      }
    });
  };
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    firebase
      .firestore()
      .collection("components")

      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.id == this.props.match.params.id2) {
            var previous = this.state.styles;
            previous.push(doc.data().styles);
            this.setState({
              placeholder: doc.data().name,
              descriptionPlaceholder: doc.data().description,
              codePlaceholder: doc.data().codeTemplate,
              styles: previous,
              extendsPlaceholder: doc.data().extends,
              acceptsPlaceholder: doc.data
            });
          }
        });
      });
    this.setState({
      isLoading: false
    });
  }

  render() {
    console.log("Styles array in add component is", this.state.styles);
    console.log("Form Items is", formItems);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log("state placeholder", this.state.placeholder);

    var self = this;
    if (this.props.mode == "edit") {
      console.log("Entered");
      firebase
        .firestore()
        .collection("components")

        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.id == self.props.match.params.id2) {
              requiredName = doc.data().name;
              console.log("i set required Name as ", requiredName);
            }
          });
        });
    }

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
          {getFieldDecorator(`styleKeys[${k}]`, {
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
              style={{ width: "260px", marginLeft: 17 }}
              onChange={e => {}}
            />
          )}
        </Form.Item>
        <Form.Item
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          required={false}
          key={k}
        >
          {getFieldDecorator(`styleValues[${k}]`, {
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
    // this.props.mode == "edit"
    //   ? this.state.styles.map((styler, index) => {
    //       formItems.push({
    //         [styler]: index
    //       });
    //     })
    //   : null
    getFieldDecorator("defaultValues", { initialValue: [] });
    const defaultValues = getFieldValue("defaultValues");
    const formItem = defaultValues.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`defaultStateKey[${k}]`, {
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
          {getFieldDecorator(`defaultStateValue[${k}]`, {
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
          {getFieldDecorator(`classMethodKey[${k}]`, {
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
          {getFieldDecorator(`classMethodValue[${k}]`, {
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
    var requiredName;

    return !this.state.isLoading ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="ComponentName"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("name", {
            initialValue: this.state.placeholder,
            rules: [{ required: true, message: "Please add a Component name" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Description"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("description", {
            initialValue: this.state.descriptionPlaceholder,
            rules: [
              {
                required: true,
                message: "Please describe the component briefly"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Extends"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("extends", {
            initialValue: this.state.extendsPlaceholder,
            rules: [
              {
                required: true,
                message: "Please specify what does component  extend"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="Accepts"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("accepts", {
            initialValue: this.state.acceptsPlaceholder,
            rules: [
              {
                required: true,
                message:
                  "Please specify the type of components,the component accepts"
              }
            ]
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label="CodeTemplate"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("code", {
            initialValue: this.state.codePlaceholder,
            rules: [
              {
                required: true,
                message: "Please write code Template"
              }
            ]
          })(<Input.TextArea />)}
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
          label="DefaultStates"
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
    ) : (
      <Spins />
    );
  }
}

export default Form.create()(CreateComponent);

import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Form, Input, Icon, Button, Card } from "antd";
import Spins from "./Spin";
import firebase from "firebase";
import { Link } from "react-router-dom";

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
      defaultStates: [],
      classMethods: [],
      extendsPlaceholder: "",
      acceptsPlaceholder: "",
      isLoading: true
    };
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");

    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue(
      {
        keys: keys.filter(key => key !== k)
      }
      //console.log("After removing keys are:", keys)
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
      }
      //console.log("After removing keys are:", defaultValues)
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
      }
      //console.log("After removing keys are:", classMethods)
    );
  };

  add = e => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    //console.log("At KEy", keys);
    console.log("Keys of style are", keys);
    const nextKeys = keys.concat(id++);
    //console.log("Next Key is", nextKeys);
    //console.log("Received Values", e.target.value);
    // can use data-binding to set
    // important! notify form to detect changes
    //console.log("Here", this.props.form.values);
    form.setFieldsValue({
      keys: nextKeys
    });
  };
  addDefault = () => {
    const { form } = this.props;
    // can use data-binding to get
    const defaultValues = form.getFieldValue("defaultValues");
    const nextKeys = defaultValues.concat(did++);
    //console.log("Next Key is", nextKeys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      defaultValues: nextKeys
    });
  };
  show = snap => {
    //console.log("Value is", JSON.stringify(snap.val(), null, 2));
  };
  addMethods = () => {
    const { form } = this.props;
    // can use data-binding to get
    const classMethods = form.getFieldValue("classMethods");
    const nextKeys = classMethods.concat(methodId++);
    //console.log("Next Key is", nextKeys);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      classMethods: nextKeys
    });
  };

  handleSubmit = e => {
    var self = this;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.props.updateDefaultStateArray(
          values.defaultStateKey,
          values.defaultStateValue,
          this.props.mode
        );
        this.props.updateClassMethodArray(
          values.classMethodKey,
          values.classMethodValue,
          this.props.mode
        );

        this.props.updateStyleArray(
          values.styleKeys,
          values.styleValues,

          this.props.mode
        );

        this.props.updateValues(
          values.name,
          values.description,
          values.extends,
          values.accepts,
          values.code,
          this.props.match.params.id,
          this.props.mode,
          this.props.match.params.id2
        );

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
            //console.log("data is", doc.data());
            var previous = this.state.styles;
            doc.data().styles.map(style => {
              //console.log("Style currently is", style);
              previous.push(style);
            });
            var previousDefaultState = this.state.defaultStates;
            doc.data().defaultState.map(states => {
              previousDefaultState.push(states);
            });
            var previousClassMethods = this.state.classMethods;
            doc.data().classMethods.map(classMethod => {
              previousClassMethods.push(classMethod);
            });
            this.setState({
              placeholder: doc.data().name,
              descriptionPlaceholder: doc.data().description,
              codePlaceholder: doc.data().codeTemplate,
              styles: previous,
              defaultStates: previousDefaultState,
              extendsPlaceholder: doc.data().extends,
              acceptsPlaceholder: doc.data().accepts
            });
          }
        });
      });
    this.setState({
      isLoading: false
    });
  }

  render() {
    //console.log("Styles array in add component is", this.state.styles);
    //console.log("Form Items is", formItems);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    //console.log("state placeholder", this.state.placeholder);

    var self = this;
    if (this.props.mode == "edit" || "details") {
      //console.log("Entered");
      firebase
        .firestore()
        .collection("components")

        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (doc.id == self.props.match.params.id2) {
              requiredName = doc.data().name;
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
    getFieldDecorator("keys", {
      initialValue:
        this.props.mode == "edit" || "details"
          ? this.state.styles.map(style => {
              return Object.keys(style);
            })
          : []
    });
    const arr = this.state.styles.map(style => {
      return Object.values(style)[0];
    });
    const arrKeys = this.state.styles.map(style => {
      return Object.keys(style)[0];
    });

    //console.log("arr is", arr);
    const keys = getFieldValue("keys");
    //console.log("Keys is", keys);
    const formItems = keys.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`styleKeys[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            initialValue: index < arr.length ? arrKeys[index] : "",
            rules: [
              {
                required: false,
                whitespace: true
                //message: "Please enter key for style."
              }
            ]
          })(
            <Input
              disabled={this.props.mode == "details" ? true : false}
              style={{ width: "260px", marginLeft: 17 }}
              onChange={e => {}}
              placeholder="key"
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
            initialValue: index < arr.length ? arr[index] : "",

            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please enter value for key"
              }
            ]
          })(
            <Input.TextArea
              disabled={this.props.mode == "details" ? true : false}
              placeholder="Value"
              className="textArea"
              style={{ width: "260px", height: 32 }}
            />
          )}
        </Form.Item>
        {this.props.mode != "details" ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
            style={{
              marginTop: "10px",
              fontSize: "20px",
              marginLeft: "10px"
            }}
          />
        ) : null}
      </div>
    ));

    getFieldDecorator("defaultValues", {
      initialValue:
        this.props.mode == "edit" || "details"
          ? this.state.defaultStates.map(defaultState => {
              return Object.keys(defaultState);
            })
          : []
    });
    const defaultValues = getFieldValue("defaultValues");
    const defaultArr = this.state.defaultStates.map(defaultValue => {
      return Object.values(defaultValue)[0];
    });
    const defaultArrKeys = this.state.defaultStates.map(defaultValue => {
      return Object.keys(defaultValue)[0];
    });
    //console.log("Default ka array luch is prakar hai", defaultArr);
    const formItem = defaultValues.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`defaultStateKey[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            initialValue:
              index < defaultArr.length ? defaultArrKeys[index] : "",
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
              disabled={this.props.mode == "details" ? true : false}
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
            initialValue: defaultArr[index],
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
              disabled={this.props.mode == "details" ? true : false}
            />
          )}
        </Form.Item>
        {this.props.mode != "details" ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={defaultValues.length === 1}
            onClick={() => this.removeDefault(k)}
            style={{
              marginTop: "10px",
              fontSize: "20px",
              marginLeft: "10px"
            }}
          />
        ) : null}
      </div>
    ));
    getFieldDecorator("classMethods", {
      initialValue:
        this.props.mode == "edit" || "details"
          ? this.state.classMethods.map(classMethod => {
              return Object.keys(classMethod);
            })
          : []
    });

    const methodsArr = this.state.classMethods.map(method => {
      return Object.values(method)[0];
    });
    const methodsArrkeys = this.state.classMethods.map(method => {
      return Object.keys(method)[0];
    });
    const classMethods = getFieldValue("classMethods");
    const methods = classMethods.map((k, index) => (
      <div style={{ display: "flex" }}>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`classMethodKey[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            initialValue:
              index < methodsArr.length ? methodsArrkeys[index] : "",
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
              disabled={this.props.mode == "details" ? true : false}
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
            initialValue: methodsArr[index],
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
              disabled={this.props.mode == "details" ? true : false}
            />
          )}
        </Form.Item>
        {this.props.mode != "details" ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.removeMethod(k)}
            style={{
              marginTop: "10px",
              fontSize: "20px",
              marginLeft: "10px"
            }}
          />
        ) : null}
      </div>
    ));
    var requiredName;

    return !this.state.isLoading ? (
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10, width: 200 }}>
              Component Description
            </h3>
          </div>

          <div style={{ marginLeft: 925 }}>
            <Link to={`/${this.props.match.params.id}/components`}>
              <Button
                type="primary"
                style={{ marginRight: 50, marginBottom: 20 }}
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
                initialValue: this.state.placeholder,
                rules: [
                  { required: true, message: "Please add a Component name" }
                ]
              })(
                <Input disabled={this.props.mode == "details" ? true : false} />
              )}
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
              })(
                <Input disabled={this.props.mode == "details" ? true : false} />
              )}
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
              })(
                <Input disabled={this.props.mode == "details" ? true : false} />
              )}
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
              })(
                <Input disabled={this.props.mode == "details" ? true : false} />
              )}
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
              })(
                <Input.TextArea
                  disabled={this.props.mode == "details" ? true : false}
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
                marginLeft: 239,
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
                  {this.props.mode != "details" ? (
                    <Icon
                      type="plus-circle"
                      onClick={this.add}
                      theme="filled"
                      style={{ fontSize: 30, marginLeft: 407, marginTop: 10 }}
                    />
                  ) : null}
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
                marginLeft: 239,
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
                  {this.props.mode != "details" ? (
                    <Icon
                      type="plus-circle"
                      onClick={this.addDefault}
                      theme="filled"
                      style={{ fontSize: 30, marginLeft: 407, marginTop: 10 }}
                    />
                  ) : null}
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
                marginLeft: 239,
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
                  {this.props.mode != "details" ? (
                    <Icon
                      type="plus-circle"
                      onClick={this.addMethods}
                      theme="filled"
                      style={{ fontSize: 30, marginLeft: 407, marginTop: 10 }}
                    />
                  ) : null}
                </Form.Item>
              </div>
            </Card>

            <Form.Item
              {...formItemLayoutWithOutLabel}
              style={{ marginTop: 20, marginLeft: 400 }}
            >
              {this.props.mode != "details" ? (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              ) : null}
            </Form.Item>
          </Form>
        </Card>
      </div>
    ) : (
      <Spins />
    );
  }
}

export default Form.create()(CreateComponent);

import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Table, Divider, Tag, Icon, Card, Button, Tooltip, Modal } from "antd";
import { Link } from "react-router-dom";
import firebase from "../firebase";
class ComponentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
      showDeleteModal: false
    };

    // firebase
    //   .firestore()
    //   .collection("packages")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       this.state.packages.push({
    //         name: doc.data().name,
    //         description: doc.data().description
    //       });
    //     });
    //   });
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
  }
  handleOk = () => {
    this.props.deleteComponent(this.state.selectedRow);
    this.setState({
      showDeleteModal: false
    });
  };

  handleCancel = () => {
    this.setState({
      showDeleteModal: false
    });
  };

  handleDelete = id => {
    this.setState({
      showDeleteModal: true,
      selectedRow: id
    });
  };

  componentDidMount() {
    this.props.clearComponents();
    this.props.showComponents();
  }

  render() {
    var self = this;
    var columns;

    columns = [
      {
        title: "Component-Name",
        dataIndex: "name",
        key: "id",
        render: (text, record) => (
          <Link to={`${record.id}/describe`}>{text}</Link>
        )
      },
      {
        title: "Description",
        dataIndex: "age",
        key: "age"
      },

      {
        title: "Action",
        key: "action",
        align: "right",
        render: record => (
          <div className="icons" style={{ textAlign: "right" }}>
            <Tooltip title="Delete Component">
              <Icon
                type="delete"
                className="delete-icon"
                onClick={() => this.handleDelete(record.id)}
              />
            </Tooltip>
            <Tooltip title="Edit Component">
              <Link to={`${record.id}/editComponent`}>
                <Icon type="edit" className="edit-icon" />
              </Link>
            </Tooltip>
          </div>
        )
      }
    ];

    return (
      <div className="table-layout">
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10, width: 200 }}>Components List</h3>
          </div>

          <div style={{ marginLeft: 820 }}>
            <Link to={`/${this.props.match.params.id}/details`}>
              <Button
                type="primary"
                style={{ marginRight: 50, marginBottom: 20 }}
              >
                Back
              </Button>
            </Link>
            <Link to={`/${this.props.match.params.id}/addComponent`}>
              <Button type="primary" style={{ marginBottom: 20 }}>
                +Add
              </Button>
            </Link>
          </div>
        </div>

        <Card style={{ padding: "0px" }}>
          <Table
            columns={columns}
            dataSource={this.props.components}
            rowClassName={(record, index) =>
              record.package == this.props.match.params.id ? null : "hi"
            }
          />
        </Card>
        <Modal
          title="Basic Modal"
          visible={this.state.showDeleteModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Are you sure You want to delete the component</p>
        </Modal>
      </div>
    );
  }
}

export default ComponentTable;

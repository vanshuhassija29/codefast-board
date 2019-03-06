import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Table, Divider, Tag, Icon, Card, Button, Tooltip, Modal } from "antd";
import { Link } from "react-router-dom";
import firebase from "../firebase";
class Tablet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
      showDeleteModal: false
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleCancel = () => {
    console.log("in handle cancel");
    this.props.toggleShowModal(false);
  };
  componentWillMount() {}

  selectRow = record => {
    this.setState({
      selectedRow: record.id
    });
  };
  handleDelete = id => {
    this.props.toggleShowModal(true);
    this.setState({
      selectedRow: id
    });
  };
  handleView = id => {
    this.props.history.push(`${id}/components`);
    //this.props.showComponents();
  };

  render() {
    console.log("At table level components is", this.props.components);
    var self = this;
    var columns;

    columns = [
      {
        title: "Package-Name",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Link to={`${record.id}/details`}>{text}</Link>
        )
      },
      {
        title: "Number of Components",
        dataIndex: "components",
        key: "components"
      },

      {
        title: "Action",
        key: "action",
        align: "right",
        render: record => (
          <div className="icons" style={{ textAlign: "right" }}>
            <Tooltip title="Delete Package">
              <Icon
                type="delete"
                className="delete-icon"
                onClick={() => this.handleDelete(record.id)}
              />
            </Tooltip>
            <Tooltip title="Edit Package">
              <Link to={`${record.id}/edit`}>
                <Icon type="edit" className="edit-icon" />
              </Link>
            </Tooltip>
            <Tooltip title="View Components">
              <Icon
                type="eye"
                className="edit-icon"
                onClick={() => {
                  this.handleView(record.id);
                }}
              />
            </Tooltip>
          </div>
        )
      }
    ];

    return (
      <div className="table-layout">
        <div style={{ display: "flex" }}>
          <div>
            <h3 style={{ paddingLeft: 10, width: 200 }}>Packages List</h3>
          </div>

          <div>
            <Link to="/create">
              <Button
                type="primary"
                style={{ marginLeft: 940, marginBottom: 20 }}
              >
                +Add
              </Button>
            </Link>
          </div>
        </div>

        <Card style={{ padding: "0px" }}>
          <Table columns={columns} dataSource={this.props.packages} />
        </Card>
        <Link
          to="/"
          onOk={() => this.props.handleDelete(this.state.selectedRow)}
        >
          <Modal
            title="Basic Modal"
            visible={this.props.showModal}
            onOk={() => this.props.handleDelete(this.state.selectedRow)}
            onCancel={this.handleCancel}
          >
            <p>Are you sure You want to delete the package</p>
          </Modal>
        </Link>
      </div>
    );
  }
}

export default Tablet;

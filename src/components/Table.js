import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Table, Divider, Tag, Icon, Card, Button, Tooltip, Modal } from "antd";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import Spins from "../Pages/Spin";
class Tablet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
      showDeleteModal: false,

      packages: [],
      isLoading: true
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  handleCancel = () => {
    this.setState({
      showDeleteModal: false
    });
  };

  handleOk(row) {
    console.log("Calling Handle Deletes");
    this.props.handleDelete(this.state.selectedRow);

    this.setState({
      showDeleteModal: false
    });
  }
  componentDidMount() {
    var self = this;

    firebase
      .firestore()
      .collection("packages")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          var previous = self.state.packages;
          previous.push({
            name: doc.data().name,
            description: doc.data().description,
            id: doc.id,
            count: doc.data().count
          });
          self.setState({
            packages: previous,
            isLoading: false
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  selectRow = record => {
    this.setState({
      selectedRow: record.id
    });
  };
  handleDelete = id => {
    this.setState({
      showDeleteModal: true,
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
        dataIndex: "count",
        key: "count"
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
        {!this.props.loading ? (
          <Card style={{ padding: "0px" }}>
            <Table columns={columns} dataSource={this.props.packages} />
          </Card>
        ) : (
          <Spins />
        )}

        <Modal
          title="Basic Modal"
          visible={this.state.showDeleteModal}
          onOk={() => this.handleOk(this.state.selectedRow)}
          onCancel={this.handleCancel}
        >
          <p>Are you sure You want to delete the package</p>
        </Modal>
      </div>
    );
  }
}

export default Tablet;

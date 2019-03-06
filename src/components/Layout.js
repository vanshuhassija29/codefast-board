import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import Table from "./Table";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import Tablet from "./Table";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Layouts extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <div className="logo" />

            <Menu.Item key="1">
              <Icon type="file" />
              <span>Packages</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Tablet packages={this.props.packages} />
          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </Layout>
    );
  }
}

export default Layouts;

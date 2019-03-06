import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import Tablet from "../components/Table";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    console.log(this.props);
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
              <span>{this.props.displayed}</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <div style={{ padding: 15 }}>{this.props.display}</div>

          <Footer style={{ textAlign: "center" }} />
        </Layout>
      </Layout>
    );
  }
}

export default Index;

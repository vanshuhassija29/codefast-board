import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Spin } from "antd";
class Spins extends React.Component {
  render() {
    return (
      <div>
        <Spin
          size="large"
          className="example"
          style={{ marginTop: "200px", marginLeft: 500 }}
        />
      </div>
    );
  }
}
export default Spins;

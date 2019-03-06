import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../index.css";
import { Card, Col, Row, Avatar, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
const { Meta } = Card;

class Description extends React.Component {
  render() {
    console.log(this.props.packages);

    return this.props.packages

      .filter(packaged => packaged.id == this.props.match.params.id)
      .map(detailPackage => (
        <div>
          <div style={{ display: "flex", paddingTop: 20 }}>
            <div>
              <h3 style={{ paddingLeft: 10 }}>Description</h3>
            </div>

            <div>
              <Link to="/">
                <Button
                  type="primary"
                  style={{ marginLeft: 1029, marginBottom: 20 }}
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
          <div
            style={{
              background: "#ECECEC",
              padding: "30px",
              marginTop: 50
            }}
          >
            <Row>
              <Card>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={detailPackage.name}
                  bordered={false}
                />
                <p style={{ paddingTop: 15 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam sed lacus molestie, laoreet libero eget, convallis
                  nibh. Ut scelerisque nec lacus id auctor. Morbi mollis purus
                  ipsum, non fermentum justo vulputate et. Aliquam eu quam
                  justo. Pellentesque diam metus, viverra at vestibulum ac,
                  suscipit facilisis tortor. Nulla fermentum, dui ut fringilla
                  gravida, lacus est tempor arcu, in auctor metus velit ac
                  justo. Curabitur mattis leo eget dolor varius, et tristique
                  lacus viverra.
                </p>
              </Card>
            </Row>
            <Link to={`/${this.props.match.params.id}/components`}>
              <Button
                type="primary"
                style={{ marginTop: 20 }}
                onClick={() => {
                  this.props.changeMode("omponents");
                }}
              >
                View Components
              </Button>
            </Link>
          </div>
        </div>
      ));
  }
}
export default Description;

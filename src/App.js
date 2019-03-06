import React, { Component, ReactPropTypes } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layouts from "./components/Layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Table, Layout } from "antd";
import Index from "./Pages/Index";
import Tablet from "./components/Table";
import Description from "./Pages/Description";
import CreatePackageForm from "./Pages/CreatePackageForm";
import EditPackage from "./Pages/EditPackage";
import firebase from "./firebase";

import ComponentTable from "./Pages/ComponentTable";
import EditComponent from "./Pages/EditComponent";
import AddComponent from "./Pages/AddComponent";
import ComponentDescription from "./Pages/ComponentDescription";

class App extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("Packages");

    this.state = {
      packages: [],
      components: [
        {
          id: 1,
          name: "This Component Belongs to Package React Native",
          package: "slJv9RuQlfFbO1x2Pk5u"
        },
        {
          id: 2,
          name: "belongs to package Flutter",
          package: "vyMre4DiVfRqEqij9rIk"
        },
        {
          id: 3,
          name: "Belongs to Package React Native",
          package: "slJv9RuQlfFbO1x2Pk5u"
        }
      ],
      toDisplay: "Packages",
      packageName: "",
      description: "",
      showModal: false,
      componentName: "",
      componentDescription: ""
    };
    this.changeMode = this.changeMode.bind(this);
    this.updatePackageName = this.updatePackageName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.addPackage = this.addPackage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.editPackage = this.editPackage.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.updateComponentName = this.updateComponentName.bind(this);
    this.updateComponentDescription = this.updateComponentDescription.bind(
      this
    );
    this.showComponents = this.showComponents.bind(this);
    this.clearComponents = this.clearComponents.bind(this);
  }
  changeMode(toShow) {
    this.setState({
      toDisplay: toShow
    });
  }

  updatePackageName(input) {
    this.setState({
      packageName: input
    });
  }
  updateDescription(describe) {
    this.setState({
      description: describe
    });
  }
  updateComponentName(input) {
    this.setState({
      componentName: input
    });
  }
  updateComponentDescription(describe) {
    this.setState({
      componentDescription: describe
    });
  }
  handleDelete = id => {
    var previous = this.state.packages;
    var todelete = this.state.packages.findIndex(i => i.id == id);
    previous.splice(todelete, 1);
    this.setState({
      packages: previous
    });
    firebase
      .firestore()
      .collection("packages")
      .doc(id)
      .delete();

    this.toggleShowModal(false);
  };
  deleteComponent = id => {
    var previous = this.state.components;
    var todelete = this.state.components.findIndex(i => i.id == id);
    previous.splice(todelete, 1);
    this.setState({
      components: previous
    });
    firebase
      .firestore()
      .collection("components")
      .doc(id)
      .delete();

    this.toggleShowModal(false);
  };

  toggleShowModal(value) {
    this.setState({
      showModal: value
    });
  }
  addPackage = async e => {
    //e.preventDefault();

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const packageRef = await db.collection("packages").add({
      name: this.state.packageName,
      description: this.state.description
    });
    var previous = this.state.packages;
    var key = packageRef.id;

    previous.push({
      name: this.state.packageName,
      description: this.state.description,
      id: key
    });
    this.setState({
      packageName: "",
      description: "",
      packages: previous
    });
  };
  clearComponents() {
    var previous = this.state.components;
    this.setState({
      components: []
    });
  }
  showComponents = () => {
    var self = this;
    var db = firebase.firestore();
    db.collection("components")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var previous = self.state.components;
          previous.push({
            name: doc.data().name,
            description: doc.data().description,
            package: doc.data().package,
            id: doc.id
          });
          self.setState({
            components: previous
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  addComponent = async inPackage => {
    console.log("jab aaay tha", this.state.components);
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const packageRef = await db.collection("components").add({
      name: this.state.componentName,
      description: this.state.componentDescription,
      package: inPackage
    });
    // var previous = this.state.components;
    // previous.push({
    //   name: this.state.componentName,
    //   description: this.state.componentDescription,
    //   package: inPackage,
    //   id: packageRef.id
    // });

    // this.setState({
    //   componentName: "",
    //   componentDescription: "",
    //   components: previous
    // });
    console.log("I did state as", this.state.components);
  };
  editPackage = id => {
    var self = this;

    const db = firebase.firestore();

    db.collection("packages")
      .doc(id)
      .update({
        name: this.state.packageName,
        description: this.state.description
      });

    var previous = this.state.packages;
    previous
      .filter(packages => {
        return packages.id == id;
      })
      .map(pack => {
        pack.name = this.state.packageName;
        pack.description = this.state.description;
      });

    // var previous = this.state.packages
    //   .filter(packages => {
    //     packages.id = id;
    //   })
    //   .map(item => {
    //     item.name = this.state.packageName;
    //     item.description = this.state.description;
    //   });
    this.setState({
      packages: previous,
      componentName: "",
      componentDescription: ""
    });
  };
  editComponent = id => {
    var self = this;

    const db = firebase.firestore();

    db.collection("components")
      .doc(id)
      .update({
        name: this.state.componentName,
        description: this.state.componentDescription
      });

    var previous = this.state.components;
    previous
      .filter(component => {
        return component.id == id;
      })
      .map(comp => {
        comp.name = this.state.componentName;
        comp.description = this.state.componentDescription;
      });

    // var previous = this.state.packages
    //   .filter(packages => {
    //     packages.id = id;
    //   })
    //   .map(item => {
    //     item.name = this.state.packageName;
    //     item.description = this.state.description;
    //   });
    this.setState({
      components: previous,
      name: "",
      description: ""
    });
  };

  componentDidMount() {
    console.log("Component Mounted");
    var self = this;
    var db = firebase.firestore();
    db.collection("packages")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          var previous = self.state.packages;
          previous.push({
            name: doc.data().name,
            description: doc.data().description,
            id: doc.id
          });
          self.setState({
            packages: previous
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    var self = this;

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Index
                display={
                  <Tablet
                    packages={this.state.packages}
                    toDisplay={this.state.toDisplay}
                    components={this.state.components}
                    {...props}
                    changeMode={this.changeMode}
                    handleDelete={this.handleDelete}
                    toggleShowModal={this.toggleShowModal}
                    showModal={this.state.showModal}
                  />
                }
                displayed="Packages"
              />
            )}
          />
          <Route
            path="/:id/details"
            render={props => (
              <Index
                display={
                  <Description
                    packages={this.state.packages}
                    changeMode={this.changeMode}
                    {...props}
                  />
                }
                displayed="Packages"
              />
            )}
          />
          <Route
            path="/create"
            render={props => (
              <Index
                display={
                  <CreatePackageForm
                    packages={this.state.packages}
                    updatePackageName={this.updatePackageName}
                    updateDescription={this.updateDescription}
                    addPackage={this.addPackage}
                    {...props}
                    firebase={firebase}
                  />
                }
                displayed="Packages"
              />
            )}
          />
          <Route
            path="/:id/edit"
            render={props => (
              <Index
                display={
                  <EditPackage
                    packages={this.state.packages}
                    editPackage={this.editPackage}
                    updatePackageName={this.updatePackageName}
                    updateDescription={this.updateDescription}
                    {...props}
                  />
                }
                displayed="Packages"
              />
            )}
          />
          <Route
            path="/:id/components"
            render={props => (
              <Index
                display={
                  <ComponentTable
                    components={this.state.components}
                    showComponents={this.showComponents}
                    clearComponents={this.clearComponents}
                    deleteComponent={this.deleteComponent}
                    {...props}
                  />
                }
                displayed="Components"
              />
            )}
          />
          <Route
            path="/:id/:id2/editComponent"
            render={props => (
              <Index
                display={
                  <EditComponent
                    components={this.state.components}
                    updateComponentName={this.updateComponentName}
                    updateComponentDescription={this.updateDescription}
                    editComponent={this.editComponent}
                    {...props}
                  />
                }
                displayed="Components"
              />
            )}
          />
          <Route
            path="/:id/addComponent"
            render={props => (
              <Index
                display={
                  <AddComponent
                    components={this.state.components}
                    {...props}
                    addComponent={this.addComponent}
                    updateComponentName={this.updateComponentName}
                    updateComponentDescription={this.updateComponentDescription}
                  />
                }
                displayed="Components"
              />
            )}
          />
          <Route
            path="/:id/:id2/describe"
            render={props => (
              <Index
                display={
                  <ComponentDescription
                    components={this.state.components}
                    {...props}
                  />
                }
                displayed="Components"
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;

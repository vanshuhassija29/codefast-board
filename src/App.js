import React, { Component, ReactPropTypes } from "react";
import logo from "./logo.svg";
import "./App.css";
import CreateComponent from "./Pages/AddComponent";
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
import AddComponentdemo from "./Pages/AddComponentdemo";

class App extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("Packages");

    this.state = {
      packages: [],
      components: [],
      componentCount: [],
      toDisplay: "Packages",
      loading: true,
      packageName: "",
      description: "",
      showModal: false,
      componentName: "",
      componentDescription: "",
      componentStyles: [],
      componentDefaultStates: [],
      componentClassMethods: [],
      componentExtends: "",
      componentAccepts: "",
      mode: ""
    };

    this.updatePackageName = this.updatePackageName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.addPackage = this.addPackage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.editPackage = this.editPackage.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.changeMode = this.changeMode.bind(this);

    this.showComponents = this.showComponents.bind(this);
    this.clearComponents = this.clearComponents.bind(this);
    this.updateStyleArray = this.updateStyleArray.bind(this);
    this.updateClassMethodArray = this.updateClassMethodArray.bind(this);
    this.updateDefaultStateArray = this.updateDefaultStateArray.bind(this);
    this.updateValues = this.updateValues.bind(this);
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

  updateValues(
    name,
    description,
    extend,
    accepts,
    code,
    packages,
    mode,
    componentId
  ) {
    console.log("Updating values and got ", name, description, accepts);
    console.log("in update Values mode is", mode);
    console.log("Will be sending id as", componentId);
    this.setState(
      {
        componentName: name,
        componentDescription: description,
        componentExtends: extend,
        componentAccepts: accepts,
        componentCode: code,
        mode: mode
      },

      () => {
        if (mode == "edit") {
          this.editComponent(packages, componentId);
        } else {
          this.addComponent(packages);
        }
      }
    );
    console.log("Called the method ");
  }
  updateStyleArray(styleKeys, styleValues, modes) {
    console.log("In update styles");
    console.log("In style array");
    var previous = this.state.componentStyles;
    console.log("Yhan tak to aagya");
    console.log("Mode is", modes);
    console.log("And in mode edit i got styleKeys like", styleKeys);

    if (styleKeys != null) {
      if (modes != "edit") {
        console.log("Entered if");
        styleKeys.map((styler, index) => {
          console.log("I am in map function");
          var currentValue = styleValues[index];
          previous.push({
            [styler]: currentValue
          });
        });
      } else {
        console.log("Object.Keys is", Object.values(styleKeys));

        Object.values(styleKeys).map((styler, index) => {
          console.log("I am in map function");
          var currentValue = Object.values(styleValues)[index];
          previous.push({
            [styler]: currentValue
          });
        });
      }
    }
    this.setState({
      componentStyles: previous
    });

    console.log("Immediate After", this.state.componentStyles);
  }
  updateDefaultStateArray(stateKeys, stateValues, modes) {
    console.log("In Defaultstate array");
    var previous = this.state.componentDefaultStates;
    console.log("Previous is", previous);
    console.log("Mode is", modes);

    if (stateKeys != null) {
      if (modes != "edit") {
        console.log("Entered if");
        stateKeys.map((styler, index) => {
          var currentValue = stateValues[index];
          previous.push({
            [styler]: currentValue
          });
        });
      } else {
        console.log("Entered  else");
        Object.values(stateKeys).map((styler, index) => {
          var currentValue = Object.values(stateValues)[index];
          previous.push({
            [styler]: currentValue
          });
        });
      }
    }
    console.log("Beech me aaya");
    this.setState({
      componentDefaultStates: previous
    });
    console.log("Exit from default state");
  }
  updateClassMethodArray(methodKeys, methodValues, modes) {
    var previous = this.state.componentClassMethods;

    if (methodKeys != null) {
      if (modes != "edit") {
        methodKeys.map((styler, index) => {
          var currentValue = methodValues[index];
          previous.push({
            [styler]: currentValue
          });
        });
      } else {
        Object.values(methodKeys).map((styler, index) => {
          var currentValue = Object.values(methodValues)[index];
          previous.push({
            [styler]: currentValue
          });
        });
      }
    }

    this.setState({
      componentClassMethods: previous
    });
    console.log("Exit from Class methods");
  }
  handleDelete = id => {
    var previous = this.state.packages;
    var todelete = this.state.packages.findIndex(i => i.id == id);
    console.log("Index to be deleted is", todelete);

    firebase
      .firestore()
      .collection("packages")
      .doc(id)
      .delete();
    previous.splice(todelete, 1);
    console.log("Gonna set state");
    this.setState({
      packages: previous
    });
    this.toggleShowModal(false);
  };
  deleteComponent = id => {
    var previous = this.state.components;
    var todelete = this.state.components.findIndex(i => i.id == id);

    firebase
      .firestore()
      .collection("components")
      .doc(id)
      .delete();
    previous.splice(todelete, 1);
    this.setState({
      components: previous
    });

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
      description: this.state.description,
      count: 0
    });
    var previous = this.state.packages;
    var key = packageRef.id;

    previous.push({
      name: this.state.packageName,
      description: this.state.description,
      id: key,
      count: 0
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
    this.setState({
      loading: true
    });
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
            components: previous,
            loading: false
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  addComponent = async inPackage => {
    console.log("In add Component");
    console.log("values are", this.state);

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const packageRef = await db.collection("components").add({
      name: this.state.componentName,
      description: this.state.componentDescription,
      package: inPackage,
      styles: this.state.componentStyles,
      defaultState: this.state.componentDefaultStates,
      classMethods: this.state.componentClassMethods,
      codeTemplate: this.state.componentCode,
      extends: this.state.componentExtends,
      accepts: this.state.componentAccepts
    });

    console.log("I did state as", this.state.components);
    console.log("Component Mounted");
    var self = this;
    this.setState({
      componentDefaultStates: [],
      componentClassMethods: [],
      componentStyles: [],
      codeTemplate: ""
    });

    db.collection("packages")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          if (doc.id == inPackage) {
            var count = parseInt(doc.data().count, 10);
            db.collection("packages")
              .doc(doc.id)
              .update({
                count: count + 1
              });
          }
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
  editPackage = (id, values) => {
    var self = this;
    console.log("Values received is:", values);

    const db = firebase.firestore();

    db.collection("packages")
      .doc(id)
      .update({
        name: values.name,
        description: values.description
      });

    var previous = this.state.packages;
    previous
      .filter(packages => {
        return packages.id == id;
      })
      .map(pack => {
        pack.name = values.name;
        pack.description = values.description;
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
  editComponent = async (inPackage, id) => {
    console.log("Id received in editComponent", id);
    console.log("State ");
    const db = firebase.firestore();

    const packageRef = db
      .collection("components")
      .doc(id)
      .update({
        name: this.state.componentName,
        description: this.state.componentDescription,
        package: inPackage,
        styles: this.state.componentStyles,
        defaultState: this.state.componentDefaultStates,
        classMethods: this.state.componentClassMethods,
        codeTemplate: this.state.componentCode,
        extends: this.state.componentExtends,
        accepts: this.state.componentAccepts
      });

    console.log("I did state as", this.state.components);
    console.log("Component Mounted");
    var self = this;
    this.setState({
      componentDefaultStates: [],
      componentClassMethods: [],
      componentStyles: [],
      codeTemplate: ""
    });

    db.collection("packages")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    console.log("Out of editComponent");
  };

  async componentDidMount() {
    console.log("Component Mounted");
    var self = this;
    var db = firebase.firestore();
    this.setState({
      loading: true
    });
    const querySnapshot = await db
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
            loading: false
          });
        });
        self.setState({
          loading: false
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        self.setState({
          loading: false
        });
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
                    loading={this.state.loading}
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
                    loading={this.state.loading}
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
                  <AddComponent
                    components={this.state.components}
                    showComponents={this.showComponents}
                    clearComponents={this.clearComponents}
                    deleteComponent={this.deleteComponent}
                    loading={this.state.loading}
                    mode="edit"
                    updateStyleArray={this.updateStyleArray}
                    updateClassMethodArray={this.updateClassMethodArray}
                    updateDefaultStateArray={this.updateDefaultStateArray}
                    updateValues={this.updateValues}
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
                  <CreateComponent
                    components={this.state.components}
                    {...props}
                    mode="add"
                    addComponent={this.addComponent}
                    updateValues={this.updateValues}
                    updateStyleArray={this.updateStyleArray}
                    updateClassMethodArray={this.updateClassMethodArray}
                    updateDefaultStateArray={this.updateDefaultStateArray}
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
                  <AddComponent
                    components={this.state.components}
                    {...props}
                    mode="details"
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

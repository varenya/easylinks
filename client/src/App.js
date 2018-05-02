import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import ListItem from "./components/ListItem";
import CreateLink from "./components/CreateLink";

class App extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.addLink = this.addLink.bind(this);
  }
  state = {
    links: []
  };
  componentDidMount() {
    this.callApi()
      .then(links => {
        this.setState({ links });
      })
      .catch(err => console.log(err));
  }
  removeItem(itemIndex) {
    this.removeApi(itemIndex).then(msg => {
      // TODO: Do something with the msg
      let array = [...this.state.links]; // make a separate copy of the array
      let newState = array.filter(link => link._id !== itemIndex);
      this.setState({ links: newState });
    });
  }
  removeApi = async itemIndex => {
    const response = await fetch("/link/" + itemIndex, {
      method: "DELETE"
    });
    const body = await response.json();
    return body;
  };
  addLink(newLink) {
    this.addLinkApi(newLink).then(data => {
      // console.log(data);
      let array = [...this.state.links];
      array.push(data);
      this.setState({ links: array });
    });
  }
  addLinkApi = async newLink => {
    const response = await fetch("/link", {
      method: "POST",
      body: JSON.stringify(newLink),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    const body = await response.json();
    return body;
  };
  callApi = async () => {
    const response = await fetch("/links");
    const body = await response.json();
    // console.log(body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    var items = this.state.links.map((item, index) => {
      return (
        <ListItem
          key={index}
          item={item}
          index={item._id}
          removeItem={this.removeItem}
        />
      );
    });
    var tableHeader = 
       (
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Category</th>
          <th>Rate</th>
          <th></th>
        </tr>
      );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="main">
          <CreateLink addLink={this.addLink} className='form-inline' />
          <table className="table table-striped table-hover">
            <thead>{tableHeader}</thead>
            <tbody>{items}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

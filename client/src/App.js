import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import ListItem from "./components/ListItem";
import CreateLink from "./components/CreateLink";

/* Stick to one form of syntax i.e. if you want to use async/await use them consitently same thing with let/var avoid using var */

class App extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.addLink = this.addLink.bind(this);
    this.loadEditLink = this.loadEditLink.bind(this);
    this.editLink = this.editLink.bind(this);
  }
  state = {
    links: [],
    updateItem: null
  };
  componentDidMount() {
    this.callApi()
      .then(links => {
        this.setState({ links });
      })
      .catch(err => console.log(err));
  }

  // you can use the instance properties syntax and avoid the binds on top 
  removeItem(itemIndex) {

    // use async await syntax here as well and clean it up better
    this.removeApi(itemIndex).then(msg => {
      // TODO: Do something with the msg
      // let array = [...this.state.links]; // make a separate copy of the array
      // u don't need to create a separate copy filter creates a new copy everytime same with map so this works
      let newState = this.state.links.filter(link => link._id !== itemIndex);
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
  loadEditLink(item) {
    this.setState({ updateItem: item });
  }
  editLink(link) {
    // console.log(link);
    this.editLinkApi(link).then(data => {
      this.setState({ updateItem: null });
      let array = [...this.state.links];
      //  Use map here instead and this will become much more concise
      var foundIndex = array.findIndex(x => x._id === data._id);
      array[foundIndex] = data;
      this.setState({links: array});
    });
  }
  editLinkApi = async link => {
    const response = await fetch("/link/" + link._id, {
      method: "PUT",
      body: JSON.stringify(link),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    const body = await response.json();
    return body;
  };
  addLink(newLink) {
    this.addLinkApi(newLink).then(data => {
      // console.log(data);

      // You can use concat here 
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
          loadEditLink={this.loadEditLink}
        />
      );
    });
    var tableHeader = (
      <tr>
        <th>Title</th>
        <th>URL</th>
        <th>Category</th>
        <th>Rate</th>
        <th />
      </tr>
    );
    return (
      /* Rather than creating variables do it inline as much as possible it makes the code lot more readable and maintainable in the future*/
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="main">
          {this.state.updateItem ? (
            <CreateLink addLink={this.editLink} item={this.state.updateItem} />
          ) : (
            <CreateLink addLink={this.addLink} />
          )}
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

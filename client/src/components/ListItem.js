import React, { Component } from "react";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }
  onClickClose() {
    let index = this.props.index;
    this.props.removeItem(index);
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.title}</td>
        <td> {this.props.item.url}</td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.rate}</td>
        <td>
          <button type="button" className="close" onClick={this.onClickClose}>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}
export default ListItem;

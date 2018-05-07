import React, { Component } from "react";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }
  onClickClose() {
    let index = this.props.index;
    this.props.removeItem(index);
  }
  onClickEdit() {
    let item = this.props.item;
    this.props.loadEditLink(item);
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.title}</td>
        <td> {this.props.item.url}</td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.rate}</td>
        <td>
          <button type="button" className="edit" onClick= {this.onClickEdit}>edit</button>
          <button type="button" className="close" onClick={this.onClickClose}>
            &times;
          </button>
        </td>
      </tr>
    );
  }
}
export default ListItem;

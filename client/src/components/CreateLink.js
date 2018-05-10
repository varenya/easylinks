import React, { Component } from "react";
// import ReactDOM from "react-dom";

class CreateLink extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  state = {
    title: "",
    url: "",
    category: "",
    rate: 0,
    isValidated: false
  };
  validate = () => {

    /* you don't need to refs here at all the component is controlled already u have everything in state itself 
       use them instead of using DOM selectors. That will remove most of the code here*/
    const formLength = this.formEl.length;

    if (this.formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const elem = this.formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");

        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }
      return false;
    } else {
      for (let i = 0; i < formLength; i++) {
        const elem = this.formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }

      return true;
    }
  };
  onSubmit = event => {
    event.preventDefault();
    if (this.validate()) {
      // let titleInput = ReactDOM.findDOMNode(this.refs.title);
      // let urlInput = ReactDOM.findDOMNode(this.refs.url);
      // let categoryInput = ReactDOM.findDOMNode(this.refs.category);
      // let rateInput = ReactDOM.findDOMNode(this.refs.rate);
      let newLink = {
        title: this.state.title,
        url: this.state.url,
        category: this.state.category,
        rate: this.state.rate
      };
      if (this.props.item) {
        newLink._id = this.props.item._id;
      }
      this.setState({
        title: "",
        url: "",
        category: "",
        rate: 0
      });
      this.props.addLink(newLink);
      
    }
    this.setState({ isValidated: true });
  };
  componentWillReceiveProps() {
    // Fill in the form with the appropriate data
    // console.log(this.props.item);
    if (this.props.item) {
      // TODO: get item detail from server
      this.setState({
        title: this.props.item.title,
        url: this.props.item.url,
        category: this.props.item.category,
        rate: this.props.item.rate
      });
    }
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  render() {
    // Dont need to do this, in fact don't do it
    const props = [...this.props];
    // let title = this.props.item ? this.props.item.title : "";
    // let url = this.props.item ? this.props.item.url : "";
    // let category = this.props.item ? this.props.item.category : "";
    // let rate = this.props.item ? this.props.item.rate : 0;
    let classNames = "form-inline";
    // if (props.className) {
    //   classNames = [...props.className];
    //   delete props.className;
    // }
    if (this.state.isValidated) {
      classNames = classNames + " was-validated";
    }

    return (
      <form
        ref={form => (this.formEl = form)}
        onSubmit={this.onSubmit}
        {...props}
        className={classNames}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="title" className="control-label">
            Title
          </label>
          <input
            type="text"
            ref="title"
            name="title"
            className="form-control"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleInputChange}
            required={true}
          />
          <div className="invalid-feedback" />
        </div>
        <div className="form-group">
          <label htmlFor="url" className="control-label">
            URL
          </label>
          <input
            type="text"
            ref="url"
            name="url"
            className="form-control"
            placeholder="url"
            value={this.state.url}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="control-label">
            Category
          </label>
          <input
            type="text"
            ref="category"
            name="category"
            className="form-control"
            placeholder="category"
            value={this.state.category}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate" className="control-label">
            Rate
          </label>
          <input
            type="number"
            ref="rate"
            name="rate"
            className="form-control"
            placeholder="rate"
            value={this.state.rate}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    );
  }
}
export default CreateLink;

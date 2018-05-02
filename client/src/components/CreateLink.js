import React, { Component } from "react";
import ReactDOM from "react-dom";

class CreateLink extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    isValidated: false
  };
  validate = () => {
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
      let titleInput = ReactDOM.findDOMNode(this.refs.title);
      let urlInput = ReactDOM.findDOMNode(this.refs.url);
      let categoryInput = ReactDOM.findDOMNode(this.refs.category);
      let rateInput = ReactDOM.findDOMNode(this.refs.rate);
      let newLink = {
        title: titleInput.value,
        url: urlInput.value,
        category: categoryInput.value,
        rate: rateInput.value
      };
      this.props.addLink(newLink);
      event.target.reset();
    }
    this.setState({ isValidated: true });
  };
  render() {
    const props = [...this.props];
    let classNames = ["form-inline"];
    if (props.className) {
      classNames = [...props.className];
      delete props.className;
    }

    if (this.state.isValidated) {
        classNames.push('was-validated');
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
            className="form-control"
            placeholder="title"
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
            className="form-control"
            placeholder="url"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="control-label">
            Category
          </label>
          <input
            type="text"
            ref="category"
            className="form-control"
            placeholder="category"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate" className="control-label">
            Rate
          </label>
          <input
            type="number"
            ref="rate"
            className="form-control"
            placeholder="rate"
          />
        </div>
        <button type="submit" className="btn btn-default">
          Add
        </button>
      </form>
    );
  }
}
export default CreateLink;

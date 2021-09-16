import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import './code-auth.css';
import AuthService from "../.././services/auth.service";
//appears when one thing is requiered
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class CodeAuth extends Component {
  constructor(props) {
    super(props)
   //set State
    this.state = {
      code: "",
      loading: false,
      message: ""
    };
    //bind funtions
    this.handleCode = this.handleCode.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);

  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value
    });
  }

  handleCode(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    //if no error from the button try to login
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.codeCheck(this.state.code).then(
        () => {
          //if log on successfuly
          AuthService.storeCode(this.state.code)
          this.props.history.push("/register");
          window.location.reload(); 
          
        },
        error => {
          //error handeling
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  //render ui
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">

          <Form
            onSubmit={this.handleCode}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="code">Please enter the code here</label>
              <Input
                type="text"
                className="form-control"
                name="code"
                value={this.state.code}
                onChange={this.onChangeCode}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Continue</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

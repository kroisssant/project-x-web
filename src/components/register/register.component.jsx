import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import './register.css';
import AuthService from "../.././services/auth.service";

// requierd message
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
//invalid message
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
//invalid username m essage
const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
// invaliad password message
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
// Register class
export default class Register extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      redirect : null,
      code : null,
      username: "",
      email: "",
      password: "",
      phone:"",
      successful: false,
      message: ""
    };
    //bind funtions
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this)

    
  }

  componentDidMount() {
    const currentCode = AuthService.getCode();
    // if (!currentCode) this.setState({ redirect: "/code" });
    if(!currentCode){
      this.props.history.push("/code");
      window.location.reload();
    }
    this.setState({ code: currentCode, userReady: true })
  }
  //execute when the value in the username is changed
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  //execute when the value in the email is changed
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  //execute when the value in the Password is changed
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }
  handleRegister(e) {
    e.preventDefault();
    
    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    //if no error when pressing the check button register
    if (this.checkBtn.context._errors.length === 0) {
      //register function that change the state to store the username, email, password
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.phone
      ).then(
        
        response => {
          //if register successful
          this.setState({
            message: response.data.message,
            successful: true
          });
          console.log(this.state.username, this.state.password)
          AuthService.login(this.state.username, this.state.password).then(() => {
            //if log on successfuly
            this.props.history.push("/profile");
            window.location.reload();
          })
        },
        error => {
          //if error
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        },
      );
      
    }
    
  }
  //render the ui
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="card-img-top"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Input
                type="text"
                className="form-control"
                name="phone"
                value={this.state.phone}
                onChange={this.onChangePhone}
                validations={[required]} //note for when i come back, make a check sistem for the phone
              />
            </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}
            
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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

// TODO: Give the user img on the register screen
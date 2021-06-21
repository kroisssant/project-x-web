import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../.././services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  //dump user info into the state
  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
//render ui
  render() {
    if (this.state.content === "No token provided!") {
      return <Redirect to={"/login"} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

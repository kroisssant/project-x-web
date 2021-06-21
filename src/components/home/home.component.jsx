import React, { Component } from "react";
import './home.css'
import UserService from "../../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    //set state
    this.state = {
      content: ""
    };
  }
  //dump content into the state
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  //render ui
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

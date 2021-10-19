import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/nav-bar/nav-bar.component";

import Login from "./components/login/login.component.jsx";
import Register from "./components/register/register.component.jsx";
import Home from "./components/home/home.component.jsx";
import Profile from "./components/profile/profile.component.jsx";
import BoardUser from "./components/board/board-user.component.jsx";
import BoardModerator from "./components/board/board-moderator.component.jsx";
import BoardAdmin from "./components/board/board-admin.component.jsx";
import CodeAuth from "./components/code-auth/code-auth.component.jsx";
import BoardPrincipal from "./components/board/board-pricipal.component";
import BoardStudent from "./components/board/board-student.component";

class App extends Component {
  

  render() {
    return (
      <div>
        <NavBar />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path = "/code" component={CodeAuth} />
            <Route path = "/principal" component={BoardPrincipal}/>
            <Route path = "/student" component = {BoardStudent}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

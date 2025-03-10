import React, {Component} from 'react';
import AuthService from "../.././services/auth.service";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service"
import './nav-bar.css'


class NavBar extends Component {
    constructor(props) {
        super(props);
        
        //set state
        this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        };

        //bind funtions
        this.logOut = this.logOut.bind(this);
      }
      //when the componet appears username and role are dumped into the state
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showPrincipalBoard: user.roles.includes("ROLE_PRINCIPAL"),
            showStudentBoard: user.roles.includes("ROLES_STUDENT"),
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }

        UserService.getUserBoard().catch(error => {
            if(error.response.status === 401){
              AuthService.logout()
            }
        })
      }
    
      logOut() {
        AuthService.logout();
      }
      //render ui
    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, showPrincipalBoard, showStudentBoard } = this.state;
        return (
            <nav className="navbar navbar-expand navbar-dark">
            <Link to={"/"} className="navbar-brand">
              Project-X
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {showStudentBoard && (
                <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student Board
                </Link>
              </li>
              )}
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}
  
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {showPrincipalBoard && (
                <li className="nav-item">
                  <Link to={"/principal"} className="nav-link">
                    Principal Board
                  </Link>
                </li>
              )}
  
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
  
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to={"/code"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
        )
    }
}

export default NavBar;
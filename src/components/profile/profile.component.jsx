import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../.././services/auth.service";
import './profile.css'
import FileUpload from "../fileUpload/file-upload.component"
import NotificationService, { NOTIF_FILE_CHANGE } from "../../services/notification.service";
import StorageService from "../../services/storage.service";

const ns = new NotificationService()
export default class Profile extends Component {
  constructor(props) {
    super(props);
    //set state
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      file: null
    };

    //bind funtions
    this.onFileChange = this.onFileChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  //when the component apears the user is dumped into the state
  componentDidMount() {
    ns.addObserver(NOTIF_FILE_CHANGE, this, this.onFileChange)
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  componentWillUnmount() {
    ns.removeObserver(this, NOTIF_FILE_CHANGE)
  }
  onFileChange = file => {
    this.setState({file: file})
  }
  onSubmit = () => {
    const formData = new FormData();
    formData.append("file", this.state.file)
    StorageService.storeProfilePic(formData)
  }
  //render ui
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
        <img className="profile-img-card" src = {currentUser.profilePicUrl} alt=""/>
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <FileUpload />
        <button onClick={this.onSubmit}>Submit</button>
      </div>: null}
      </div>
    );
  }
}

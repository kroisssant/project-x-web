import axios from "axios";

const API_URL = "http://localhost:8080/api";

class AuthService {
  //make the post request for login with the username and password
  login(username, password) {
    return axios
      .post(API_URL + "/auth/signin", {
        username,
        password
      })
      //get the data(token, username, id, etc) and dump it into the localStorage
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  //remove the user from localstorage
  logout() {
    localStorage.removeItem("user");
  }
  //make a register post request with username, email and password
  register(username, email, password, phone) {
    return axios.post(API_URL + "/auth/signup", {
      username,
      email,
      password, 
      phone
    })
    
    
  }

  codeCheck(code) {
    return axios.post(API_URL + "/auth/codeCheck", {code})
  }

  storeCode(code) {
    localStorage.setItem("code", JSON.stringify(code))
  }
  //get the user from the localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  // check the state of the user loged on
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getPrincipalBoard() {
    return axios.get(API_URL + 'principal', {headers: authHeader()})
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getStudentBoard() {
    return axios.get(API_URL + "student", { headers: authHeader() })
  }
}

export default new UserService();

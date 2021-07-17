import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api";
class StorageService {
    storeProfilePic = (img) => {
        return axios.post(
            API_URL + '/storage/profilePics', img, { headers: authHeader() })
    }
    getProfilePic = id => {
        axios.get(
            API_URL + '/storage/profilePics/:' + id, { headers: authHeader() })
        return
    }

}

export default new StorageService()
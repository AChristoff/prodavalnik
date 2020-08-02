import {del, get, put} from './data/requester';

class UserService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/user';

    this.UserDetailsUrl = `${this.baseUrl}/profile`;
    this.editUserUrl = `${this.baseUrl}/edit`;
    this.deleteUserUrl = `${this.baseUrl}/delete`;
  }

  getUserDetails() {
    return get(this.UserDetailsUrl);
  }

  editOffer() {
    return put(this.editUserUrl);
  }

  deleteOffer() {
    return del(this.deleteUserUrl);
  }
}

export default UserService;

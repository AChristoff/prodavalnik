import {del, get, put} from './data/requester';

class UserService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/user`;

    this.UserDetailsUrl = `${this.baseUrl}/profile`;
    this.editUserUrl = `${this.baseUrl}/edit`;
    this.deleteUserUrl = `${this.baseUrl}/delete`;
  }

  getUserDetails() {
    return get(this.UserDetailsUrl);
  }

  editUser(values) {
    return put(this.editUserUrl, values);
  }

  deleteUser() {
    return del(this.deleteUserUrl);
  }
}

export default UserService;

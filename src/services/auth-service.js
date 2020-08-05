import {post, put} from './data/requester';

class AuthService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/user`;

    this.loginUrl = `${this.baseUrl}/login`;
    this.registerUrl = `${this.baseUrl}/register`;
    this.registerConfirmUrl = `${this.baseUrl}/register/confirm/`;
  }

  login(credentials) {
    return post(`${this.loginUrl}`, credentials);
  }

  register(email) {
    return post(`${this.registerUrl}`, email);
  }

  registerConfirm(token, credentials) {
    return put(`${this.registerConfirmUrl}` + token, credentials);
  }

}

export default AuthService;

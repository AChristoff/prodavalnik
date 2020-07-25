import {post} from './data/requester';

class AuthService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/user';

    this.loginUrl = `${this.baseUrl}/login`;
  }

  login(credentials) {
    return post(`${this.loginUrl}`, credentials);
  }
}

export default AuthService;

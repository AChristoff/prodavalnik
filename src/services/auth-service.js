import {post} from './data/crud';

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

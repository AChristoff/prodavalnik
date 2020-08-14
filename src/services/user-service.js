import {del, get, put} from './data/requester';

class UserService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/user`;

    this.userDetailsUrl = `${this.baseUrl}/profile`;
    this.getUserByIdUrl = `${this.baseUrl}/data/`;
    this.editUserUrl = `${this.baseUrl}/edit`;
    this.deleteUserUrl = `${this.baseUrl}/delete`;
    this.addFavoriteOfferUrl = `${this.baseUrl}/favorites/add`;
    this.removeFavoriteOfferUrl = `${this.baseUrl}/favorites/remove`;
  }

  getUserById(id) {
    return get(`${this.getUserByIdUrl}` + id);
  }

  getUserDetails() {
    return get(this.userDetailsUrl);
  }

  editUser(values) {
    return put(this.editUserUrl, values);
  }

  addFavoriteOffer(id) {
    console.log('from service');
    return put(this.addFavoriteOfferUrl, id);
  }

  removeFavoriteOffer(id) {
    return put(this.removeFavoriteOfferUrl, id);
  }

  deleteUser() {
    return del(this.deleteUserUrl);
  }
}

export default UserService;

import {del, get, put} from './data/requester';

class UserService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/user`;

    this.UserDetailsUrl = `${this.baseUrl}/profile`;
    this.editUserUrl = `${this.baseUrl}/edit`;
    this.deleteUserUrl = `${this.baseUrl}/delete`;
    this.addFavoriteOfferUrl = `${this.baseUrl}/favorites/add`;
    this.removeFavoriteOfferUrl = `${this.baseUrl}/favorites/remove`;
  }

  getUserDetails() {
    return get(this.UserDetailsUrl);
  }

  editUser(values) {
    return put(this.editUserUrl, values);
  }

  addFavoriteOffer(id) {
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

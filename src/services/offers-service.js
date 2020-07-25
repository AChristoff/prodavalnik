import {get, post, put} from './data/requester';

class OffersService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/blog';

    this.allOffersUrl = `${this.baseUrl}/posts/all`;
    this.UserOffersUrl = `${this.baseUrl}/posts`;
    this.getOfferUrl = `${this.baseUrl}/post/`;
    this.createOfferUrl = `${this.baseUrl}/post/create`;
    this.editOfferUrl = `${this.baseUrl}/post/edit/`;
  }

  getAllOffers(page = '1', limit = '6', sort = '', order = '', search = '', filter = '') {
    return get(`${this.allOffersUrl}/${page}/${limit}${sort}${order}${search}${filter}`);
  }

  getUserOffers() {
    return get(`${this.UserOffersUrl}`);
  }

  getOffer(id) {
    return get(`${this.getOfferUrl}` + id);
  }

  createOffer(offerData) {
    return post(this.createOfferUrl, offerData);
  }

  editOffer(id, offerData) {
    return put(`${this.editOfferUrl}` + id, offerData);
  }
}

export default OffersService;

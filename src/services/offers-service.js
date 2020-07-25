import {get} from './data/crud';

class OffersService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/blog';

    this.allOffersUrl = `${this.baseUrl}/posts/all`;
    this.UserOffersUrl = `${this.baseUrl}/posts`;
    this.getOfferUrl = `${this.baseUrl}/post/`;
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
}

export default OffersService;

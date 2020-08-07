import {del, get, post, put} from './data/requester';

class OffersService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/blog`;

    this.allOffersUrl = `${this.baseUrl}/posts/all`;
    this.UserOffersUrl = `${this.baseUrl}/posts`;
    this.favoriteOffersUrl = `${this.baseUrl}/favorites`;
    this.getOfferUrl = `${this.baseUrl}/post/`;
    this.createOfferUrl = `${this.baseUrl}/post/create`;
    this.editOfferUrl = `${this.baseUrl}/post/edit/`;
    this.deleteOfferUrl = `${this.baseUrl}/post/delete/`;
  }

  getAllOffers(page = '1', limit = '6', sort = 'createdAt', order = '-1', search = '+', filter = '') {

    if (filter) {
      if (filter.includes('&')) {
        filter = filter.replace(/&/g, '%26amp;');
      }
      filter = '?category=' + filter;
    }

    return get(`${this.allOffersUrl}/${page}/${limit}/${sort}/${order}/search=${search}/${filter}`);
  }

  getUserOffers() {
    return get(`${this.UserOffersUrl}`);
  }

  getFavoriteOffers() {
    return get(`${this.favoriteOffersUrl}`);
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

  deleteOffer(id) {
    return del(`${this.deleteOfferUrl}` + id);
  }
}

export default OffersService;

import {del, get, post, put} from './data/requester';

class OffersService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/blog`;

    this.allOffersUrl = `${this.baseUrl}/posts/all`;
    this.offersForApprovalUrl = `${this.baseUrl}/posts/approval`;
    this.UserOffersUrl = `${this.baseUrl}/posts`;
    this.favoriteOffersUrl = `${this.baseUrl}/favorites`;
    this.getOfferUrl = `${this.baseUrl}/post/`;
    this.setPostStatusUrl = `${this.baseUrl}/post/status`;
    this.createOfferUrl = `${this.baseUrl}/post/create`;
    this.editOfferUrl = `${this.baseUrl}/post/edit/`;
    this.deleteOfferUrl = `${this.baseUrl}/post/delete/`;
    this.commentUrl = `${this.baseUrl}/post/`;
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

  getOffersForApproval(page = '1', limit = '6', sort = 'createdAt', order = '-1', search = '+', filter = '') {

    if (filter) {
      if (filter.includes('&')) {
        filter = filter.replace(/&/g, '%26amp;');
      }
    }

    return get(`${this.offersForApprovalUrl}/${page}/${limit}/${sort}/${order}/search=${search}/${filter}?approval=false`);
  }

  getFavoriteOffers(page = '1', limit = '6', sort = 'createdAt', order = '-1', search = '+', filter = '') {

    if (filter) {
      if (filter.includes('&')) {
        filter = filter.replace(/&/g, '%26amp;');
      }
      filter = '?category=' + filter;
    }

    return get(`${this.favoriteOffersUrl}/${page}/${limit}/${sort}/${order}/search=${search}/${filter}`);
  }

  getUserOffers() {
    return get(`${this.UserOffersUrl}`);
  }

  getOffer(id) {
    return get(`${this.getOfferUrl}` + id);
  }

  setPostStatus(postData) {
    return put(this.setPostStatusUrl, postData);
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

  addComment(offerId, comment) {
    return post(`${this.commentUrl}` + offerId, comment);
  }

  getComments(offerId) {
    return get(`${this.commentUrl}` + offerId + '/comments');
  }
}

export default OffersService;

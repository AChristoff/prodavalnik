import { get } from './data/crud';

class OffersService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/blog';
    this.allBooksUrl = `${this.baseUrl}/posts/all`;
  }

  getAllOffers(page = '1', limit = '6', sort = '', order = '', search = '', filter = '') {
    return get(`${this.allBooksUrl}/${page}/${limit}${sort}${order}${search}${filter}`);
  }
}

export default OffersService;

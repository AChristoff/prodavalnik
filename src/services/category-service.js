import {get, post, put} from './data/requester';

class CategoryService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/category`;

    this.createCategoryUrl = `${this.baseUrl}/create`;
    this.getCategoriesUrl = `${this.baseUrl}/all`;
  }

  createCategory(newCategory) {
    return post(this.createCategoryUrl, newCategory);
  }

  getCategories() {
    return get(`${this.getCategoriesUrl}`);
  }
}

export default CategoryService;

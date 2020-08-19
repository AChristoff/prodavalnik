import {get, post, put} from './data/requester';

class CategoryService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_API}/category`;

    this.getCategoriesUrl = `${this.baseUrl}/all`;
    this.createCategoryUrl = `${this.baseUrl}/create`;
    this.editCategoryUrl = `${this.baseUrl}/edit`;
  }

  getCategories() {
    return get(`${this.getCategoriesUrl}`);
  }

  createCategory(newCategory) {
    return post(this.createCategoryUrl, newCategory);
  }

  editCategory(categoryData) {
    return put(this.editCategoryUrl, categoryData);
  }

}

export default CategoryService;

function request(method) {

  return async (url = '', data, options) => {
    const token = window.localStorage.getItem('token');
    const getAuthHeader = () => {
      return (token && token.length)
        ? {'Authorization': `Bearer ${token}`}
        : '';
    };
    const authHeader = getAuthHeader();

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...authHeader
      },
      body: JSON.stringify(data),
      ...options
    });

    return response.json();
  }
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const del = request('delete');
